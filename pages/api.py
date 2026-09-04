from datetime import datetime
from urllib.parse import urlencode

from flask import Blueprint, Response, abort, render_template, request

from helpers.innertube.search import (
    SEARCH_DURATION_PROTO,
    SEARCH_SORT_PROTO,
    SEARCH_UPLOADED_PROTO,
    SearchFilters,
    apply_category_query,
    encode_search_params,
    get_search_results_page,
)
from helpers.innertube.watch import (
    WatchPageComment,
    WatchPageData,
    get_watch_comments,
    get_watch_data,
    get_watch_related,
)
from helpers.links import video_thumbnail_url
from helpers.parsers import (
    datetime_to_iso8601,
    parse_count,
    parse_duration_seconds,
    parse_int,
    parse_published_at,
    timestamp_to_iso8601,
    truthy,
)
from helpers.rydratings import get_ratings_for_videos


bp = Blueprint('api', __name__)

SEARCH_PAGE_SIZE = 20
MAX_RESULTS = 20
ATOM_CONTENT_TYPE = 'application/atom+xml; charset=utf-8'

GDATA_ORDERBY = {
    'relevance': '',
    'published': 'video_date_uploaded',
    'viewCount': 'video_view_count',
    'rating': 'video_avg_rating',
}
GDATA_TIME = {
    'all_time': '',
    'today': 'd',
    'this_week': 'w',
    'this_month': 'm',
    'this_hour': 'h',
}

GDATA_DEFAULT_STREAM = {
    'quality': 'medium',
    'type': 'video/mp4',
    'yt_format': 18,
    'is_default': True,
}
GDATA_PLAYBACK_STREAMS = [
    {
        'quality': 'small',
        'type': 'video/mp4',
        'yt_format': 17,
    },
    GDATA_DEFAULT_STREAM,
    {
        'quality': 'hd720',
        'type': 'video/mp4',
        'yt_format': 22,
    },
    {
        'quality': 'hd1080',
        'type': 'video/mp4',
        'yt_format': 37,
    },
]


def _gdata_search_filters() -> SearchFilters:
    args = request.args
    search_sort = GDATA_ORDERBY.get(
        args.get('orderby', ''),
        args.get('search_sort', ''),
    )
    uploaded = GDATA_TIME.get(
        args.get('time', ''),
        args.get('uploaded', ''),
    )
    duration = args.get('duration') or args.get('search_duration') or ''
    license_value = (args.get('license') or '').strip().lower()

    return {
        'search_type': 'videos',
        'search_sort': search_sort if search_sort in SEARCH_SORT_PROTO else '',
        'uploaded': uploaded if uploaded in SEARCH_UPLOADED_PROTO else '',
        'search_duration': duration if duration in SEARCH_DURATION_PROTO else '',
        'search_category': (
            args.get('category')
            or args.get('search_category')
            or ''
        ),
        'closed_captions': (
            truthy(args.get('caption'))
            or args.get('closed_captions') == '1'
        ),
        'high_definition': (
            truthy(args.get('hd'))
            or args.get('high_definition') == '1'
        ),
        'rental': (
            truthy(args.get('paid-content'))
            or args.get('rental') == '1'
        ),
        'creative_commons': license_value in {
            'cc', 'creativecommons', 'creative_commons',
        },
        'three_d': truthy(args.get('3d')),
    }


def _base_url() -> str:
    return request.url_root.rstrip('/')


def _pagination() -> tuple[int, int]:
    start_index = parse_int(
        request.args.get('start-index'),
        1,
        minimum=1,
    )
    max_results = parse_int(
        request.args.get('max-results'),
        SEARCH_PAGE_SIZE,
        minimum=1,
        maximum=MAX_RESULTS,
    )
    return start_index, max_results


def _page_from_start_index(start_index: int, page_size: int = SEARCH_PAGE_SIZE) -> tuple[int, int]:
    return ((start_index - 1) // page_size) + 1, (start_index - 1) % page_size


def _next_url(start_index: int, max_results: int, total_results: int) -> str:
    if start_index + max_results > total_results:
        return ''
    next_args = request.args.to_dict(flat=False)
    next_args['start-index'] = [str(start_index + max_results)]
    next_args['max-results'] = [str(max_results)]
    return f'{request.base_url}?{urlencode(next_args, doseq=True)}'


def _atom_response(template: str, **context) -> Response:
    context.setdefault('base_url', _base_url())
    return Response(
        render_template(template, **context),
        content_type=ATOM_CONTENT_TYPE,
    )


def _feed_links(
    *,
    self_url: str,
    alternate_url: str = '',
    next_url: str = '',
    extra: list[dict] | None = None,
) -> list[dict]:
    links = [
        {'rel': 'self', 'type': 'application/atom+xml', 'href': self_url},
    ]
    if alternate_url:
        links.append({
            'rel': 'alternate',
            'type': 'text/html',
            'href': alternate_url,
        })
    if next_url:
        links.append({
            'rel': 'next',
            'type': 'application/atom+xml',
            'href': next_url,
        })
    if extra:
        links.extend(extra)
    return links


def _default_thumbnails(video_id: str, thumbnail_url: str = '') -> list[dict]:
    hq = thumbnail_url or video_thumbnail_url(video_id, hq=True)
    return [
        {
            'name': 'hqdefault',
            'url': hq,
            'width': 480,
            'height': 360,
        },
        {
            'name': 'poster',
            'url': video_thumbnail_url(video_id, hq=True),
            'width': 480,
            'height': 360,
        },
        {
            'name': 'default',
            'url': video_thumbnail_url(video_id),
            'width': 120,
            'height': 90,
        },
    ]


def _gdata_video_from_feed_item(
    entry: dict,
    *,
    playback: bool = False,
) -> dict:
    video = dict(entry)
    video_id = str(video.get('id') or '')
    published_at = video.get('published_at')
    if isinstance(published_at, str):
        try:
            published_at = datetime.fromisoformat(published_at)
        except ValueError:
            published_at = None
    if published_at is None:
        published_at = parse_published_at(
            entry.get('published_text')
            or entry.get('published_date_text')
            or ''
        )

    view_count = video.get('view_count')
    if not isinstance(view_count, int):
        view_count = parse_count(
            str(entry.get('viewcount_text') or view_count or ''),
            default=0,
        )

    video.update({
        'id': video_id,
        'duration_seconds': video.get('duration_seconds') or parse_duration_seconds(
            entry.get('length_text') or entry.get('duration_text') or ''
        ),
        'view_count': view_count or 0,
        'published': datetime_to_iso8601(published_at),
        'comment_count': parse_count(
            str(entry.get('comment_count') or ''),
            default=0,
        ),
        'thumbnails': _default_thumbnails(
            video_id,
            str(video.get('thumbnail_url') or ''),
        ),
        'media_contents': (
            GDATA_PLAYBACK_STREAMS if playback else [GDATA_DEFAULT_STREAM]
        ),
    })
    return video


def _gdata_video_from_watch(
    watch_data: WatchPageData,
    *,
    playback: bool = True,
) -> dict:
    video = watch_data['video']
    video_id = video['video_id']
    published_at = parse_published_at(video.get('published_date') or '')
    thumbnail_url = video_thumbnail_url(video_id, hq=True)
    return {
        'id': video_id,
        'title': video.get('title') or '',
        'description': video.get('description') or '',
        'channel_name': video.get('channel_name') or '',
        'channel_id': video.get('channel_id') or '',
        'channel_handle': '',
        'duration_seconds': parse_duration_seconds(video.get('duration') or ''),
        'view_count': parse_count(video.get('view_count'), default=0),
        'published': datetime_to_iso8601(published_at),
        'comment_count': parse_count(
            video.get('comments_count_text'),
            default=0,
        ),
        'comments_enabled': video.get('comments_enabled', True),
        'rydratings': watch_data.get('rydratings') or {},
        'like_count': parse_count(video.get('like_count'), default=0),
        'dislike_count': parse_count(video.get('dislike_count'), default=0),
        'thumbnail_url': thumbnail_url,
        'thumbnails': _default_thumbnails(video_id, thumbnail_url),
        'media_contents': (
            GDATA_PLAYBACK_STREAMS if playback else [GDATA_DEFAULT_STREAM]
        ),
    }


def _gdata_comment(
    comment: WatchPageComment,
    video_id: str,
) -> dict:
    published_at = parse_published_at(comment.get('published_text') or '')
    published = datetime_to_iso8601(published_at)
    like_count = parse_count(comment.get('like_count'), default=0)
    reply_count = parse_count(comment.get('reply_count'), default=0)
    return {
        'id': comment.get('id') or '',
        'video_id': video_id,
        'text': comment.get('text') or '',
        'author_name': comment.get('author_name') or '',
        'author_handle': comment.get('author_handle') or '',
        'author_channel_id': comment.get('author_channel_id') or '',
        'published': published,
        'updated': published,
        'like_count': like_count,
        'reply_count': reply_count,
    }


def _watch_or_404(video_id: str) -> WatchPageData:
    video_id = (video_id or '').strip()
    if not video_id:
        abort(400)
    watch_data = get_watch_data(video_id)
    if not watch_data.get('video', {}).get('title'):
        abort(404)
    return watch_data


@bp.get("/feeds/api/videos", strict_slashes=False)
def videos_feed() -> Response:
    search_query = (
        request.args.get('q')
        or request.args.get('vq')
        or ''
    ).strip()
    if not search_query:
        return Response(
            'The q query parameter is required.',
            status=400,
            content_type='text/plain; charset=utf-8',
        )

    start_index, max_results = _pagination()
    filters = _gdata_search_filters()
    page_number, page_offset = _page_from_start_index(start_index)

    search_results = get_search_results_page(
        apply_category_query(search_query, filters.get('search_category')),
        page_number=page_number,
        search_params=encode_search_params(filters),
    )
    if search_results is None:
        return Response(
            'Unable to retrieve search results.',
            status=502,
            content_type='text/plain; charset=utf-8',
        )

    videos = [
        _gdata_video_from_feed_item(entry)
        for entry in search_results['entries']
        if entry.get('type') == 'video'
    ]
    videos = videos[page_offset:page_offset + max_results]
    total_results = search_results['estimated_results']
    updated = timestamp_to_iso8601(search_results['fetched_at'])
    base_url = _base_url()
    next_url = _next_url(start_index, max_results, total_results)

    return _atom_response(
        'api/feed.xml.j2',
        feed_id=f'{base_url}/feeds/api/videos',
        title=f'YouTube Videos matching: {search_query}',
        kind='video',
        entry_kind='video',
        entries=videos,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=updated,
        links=_feed_links(
            self_url=request.url,
            alternate_url=f'{base_url}/results?search_query={search_query}',
            next_url=next_url,
        ),
    )


@bp.get("/feeds/api/videos/<video_id>/related", strict_slashes=False)
def video_related_feed(video_id: str) -> Response:
    watch_data = _watch_or_404(video_id)
    start_index, max_results = _pagination()
    page_number, page_offset = _page_from_start_index(start_index)
    related = get_watch_related(video_id, page=page_number)

    videos = [
        _gdata_video_from_feed_item(entry)
        for entry in related.get('related', [])
        if entry.get('type') == 'video'
    ]
    ratings = get_ratings_for_videos(video['id'] for video in videos)
    for video in videos:
        if ryd := ratings.get(video['id']):
            video['rydratings'] = ryd

    sliced = videos[page_offset:page_offset + max_results]
    has_more = (
        bool(related.get('related_token'))
        or page_offset + max_results < len(videos)
    )
    total_results = start_index - 1 + len(sliced)
    if has_more:
        total_results = max(total_results, start_index + max_results)

    video = watch_data['video']
    updated = datetime_to_iso8601(
        parse_published_at(video.get('published_date') or '')
    ) or timestamp_to_iso8601(datetime.now().timestamp())
    base_url = _base_url()
    next_url = _next_url(start_index, max_results, total_results)

    return _atom_response(
        'api/feed.xml.j2',
        feed_id=f'{base_url}/feeds/api/videos/{video_id}/related',
        title=f'YouTube Videos related to: {video.get("title") or video_id}',
        kind='video',
        entry_kind='video',
        entries=sliced,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=updated,
        links=_feed_links(
            self_url=request.url,
            alternate_url=f'{base_url}/watch?v={video_id}',
            next_url=next_url,
        ),
    )


@bp.get("/feeds/api/videos/<video_id>/comments", strict_slashes=False)
def video_comments_feed(video_id: str) -> Response:
    watch_data = _watch_or_404(video_id)
    start_index, max_results = _pagination()
    page_number, page_offset = _page_from_start_index(start_index)
    comments_page = get_watch_comments(video_id, page=page_number)

    comments = [
        _gdata_comment(comment, video_id)
        for comment in comments_page.get('comments', [])
    ]
    sliced = comments[page_offset:page_offset + max_results]
    video = watch_data['video']
    total_results = parse_count(video.get('comments_count_text'), default=0)
    if total_results <= 0:
        has_more = (
            bool(comments_page.get('comments_token'))
            or page_offset + max_results < len(comments)
        )
        total_results = start_index - 1 + len(sliced)
        if has_more:
            total_results = max(total_results, start_index + max_results)

    gdata_video = _gdata_video_from_watch(watch_data, playback=False)
    updated = gdata_video.get('published') or timestamp_to_iso8601(
        datetime.now().timestamp()
    )
    base_url = _base_url()
    next_url = _next_url(start_index, max_results, total_results)

    return _atom_response(
        'api/feed.xml.j2',
        feed_id=f'{base_url}/feeds/api/videos/{video_id}/comments',
        title=f'Comments on: {video.get("title") or video_id}',
        kind='comment',
        entry_kind='comment',
        entries=sliced,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=updated,
        links=_feed_links(
            self_url=request.url,
            alternate_url=f'{base_url}/watch?v={video_id}',
            next_url=next_url,
        ),
    )


@bp.get("/feeds/api/videos/<video_id>", strict_slashes=False)
def video_entry(video_id: str) -> Response:
    watch_data = _watch_or_404(video_id)
    video = _gdata_video_from_watch(watch_data, playback=True)
    return _atom_response(
        'api/video.xml.j2',
        video=video,
        updated=video.get('published') or '',
    )
