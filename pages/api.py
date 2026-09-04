from datetime import datetime
from typing import Callable
from urllib.parse import urlencode

from flask import Blueprint, Response, abort, redirect, render_template, request

from helpers.innertube import FeedItem
from helpers.innertube.channel import (
    CHANNEL_PLAYLISTS_PAGE_SIZE,
    CHANNEL_VIDEOS_PAGE_SIZE,
    ChannelPageData,
    ChannelPlaylist,
    get_channel_data,
    get_channel_playlists_page,
    get_channel_videos_page,
    resolve_channel_handle,
)
from helpers.innertube.playlist import (
    PLAYLIST_PAGE_SIZE,
    PlaylistPageData,
    PlaylistVideo,
    get_playlist_page,
)
from helpers.innertube.search import (
    SEARCH_DURATION_PROTO,
    SEARCH_SORT_PROTO,
    SEARCH_UPLOADED_PROTO,
    SearchFilters,
    apply_category_query,
    encode_search_params,
    get_search_results_page,
)
from helpers.innertube.standardfeeds import get_recently_featured
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
EVENT_RESULTS = 7
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


def _channel_or_404(user: str) -> ChannelPageData:
    user = (user or '').strip()
    if not user or user.lower() == 'default':
        abort(404)
    try:
        channel_id = resolve_channel_handle(user)
        data = get_channel_data(channel_id)
    except ValueError:
        abort(404)
    if not data.get('channel', {}).get('channel_name'):
        abort(404)
    return data


def _channel_handle(data: ChannelPageData) -> str:
    channel = data['channel']
    return channel.get('channel_handle') or channel['channel_id']


def _channel_updated(data: ChannelPageData) -> str:
    return timestamp_to_iso8601(data['fetched_at'])


def _gdata_user(data: ChannelPageData) -> dict:
    channel = data['channel']
    joined = (channel.get('join_date') or '').strip()
    if joined.lower().startswith('joined '):
        joined = joined[7:]
    return {
        **channel,
        'channel_handle': _channel_handle(data),
        'published': datetime_to_iso8601(parse_published_at(joined)),
        'updated': _channel_updated(data),
        'subscriber_count': parse_count(
            channel.get('subscriber_count'),
            default=0,
        ),
        'video_count': parse_count(channel.get('video_count'), default=0),
        'view_count': parse_count(channel.get('view_count'), default=0),
    }


def _collect_source_window(
    *,
    start_index: int,
    max_results: int,
    source_page_size: int,
    loader: Callable[[int], tuple[list[dict], bool]],
) -> tuple[list[dict], bool]:
    page_number, offset = _page_from_start_index(
        start_index,
        source_page_size,
    )
    selected: list[dict] = []
    has_more = False

    while len(selected) < max_results:
        entries, has_next_page = loader(page_number)
        available = entries[offset:]
        needed = max_results - len(selected)
        selected.extend(available[:needed])

        consumed = offset + min(len(available), needed)
        has_more = consumed < len(entries) or has_next_page
        if len(selected) >= max_results or not has_next_page:
            break

        page_number += 1
        offset = 0

    return selected, has_more


def _gdata_playlist(
    playlist: ChannelPlaylist,
    channel_data: ChannelPageData,
) -> dict:
    channel = channel_data['channel']
    thumbnails = playlist.get('thumbnail_urls') or []
    return {
        'id': playlist['id'],
        'title': playlist.get('title') or '',
        'description': playlist.get('description') or '',
        'video_count': parse_count(playlist.get('video_count'), default=0),
        'thumbnail_url': thumbnails[0] if thumbnails else '',
        'channel_id': channel['channel_id'],
        'channel_handle': _channel_handle(channel_data),
        'channel_name': channel['channel_name'],
        'updated': _channel_updated(channel_data),
    }


def _gdata_playlist_metadata(
    playlist_page: PlaylistPageData,
    channel_data: ChannelPageData,
) -> dict:
    metadata = playlist_page['playlist']
    channel = channel_data['channel']
    first_video_id = metadata.get('first_video_id') or ''
    return {
        'id': metadata['playlist_id'],
        'title': metadata.get('title') or '',
        'description': metadata.get('description') or '',
        'video_count': metadata.get('video_count') or 0,
        'thumbnail_url': (
            video_thumbnail_url(first_video_id)
            if first_video_id
            else ''
        ),
        'channel_id': channel['channel_id'],
        'channel_handle': _channel_handle(channel_data),
        'channel_name': channel['channel_name'],
        'updated': timestamp_to_iso8601(playlist_page['fetched_at']),
    }


def _gdata_video_from_playlist_entry(entry: PlaylistVideo) -> dict:
    feed_item: FeedItem = {
        'type': 'video',
        'id': entry['video_id'],
        'title': entry.get('title') or '',
        'url': entry.get('url') or '',
        'thumbnail_url': entry.get('thumbnail_url') or '',
        'description': '',
        'length_text': entry.get('length_text') or '',
        'viewcount_text': entry.get('viewcount_text') or '',
        'channel_name': entry.get('channel_name') or '',
        'channel_id': entry.get('channel_id') or '',
        'channel_handle': '',
        'channel_url': entry.get('channel_url') or '',
    }
    return _gdata_video_from_feed_item(feed_item)


def _video_feed_response(
    *,
    feed_id: str,
    title: str,
    entries: list[dict],
    total_results: int,
    start_index: int,
    max_results: int,
    updated: str,
    alternate_url: str = '',
    next_url: str = '',
    author_data: ChannelPageData | None = None,
    playlist: dict | None = None,
) -> Response:
    base_url = _base_url()
    context: dict = {
        'feed_id': feed_id,
        'title': title,
        'kind': 'playlistLink' if playlist else 'video',
        'entry_kind': 'video',
        'entries': entries,
        'total_results': total_results,
        'start_index': start_index,
        'max_results': max_results,
        'updated': updated,
        'links': _feed_links(
            self_url=request.url,
            alternate_url=alternate_url,
            next_url=next_url,
        ),
        'playlist': playlist,
    }
    if author_data:
        channel = author_data['channel']
        handle = _channel_handle(author_data)
        context.update({
            'author_name': handle,
            'author_display_name': channel['channel_name'],
            'author_uri': f'{base_url}/feeds/api/users/{handle}',
            'author_user_id': channel['channel_id'],
        })
    return _atom_response('api/feed.xml.j2', **context)


def _all_channel_playlists(
    channel_id: str,
) -> tuple[list[ChannelPlaylist], int]:
    first_page = get_channel_playlists_page(channel_id, page_number=1)
    entries = list(first_page['entries'])
    for page_number in range(2, first_page['total_pages'] + 1):
        entries.extend(
            get_channel_playlists_page(
                channel_id,
                page_number=page_number,
            )['entries']
        )
    return entries, first_page['total_entries']


def _playlist_video_window(
    playlist_id: str,
    start_index: int,
    max_results: int,
) -> tuple[list[dict], bool, PlaylistPageData]:
    first_page = get_playlist_page(playlist_id, page_number=1)

    def load(page_number: int) -> tuple[list[dict], bool]:
        try:
            page = (
                first_page
                if page_number == 1
                else get_playlist_page(playlist_id, page_number=page_number)
            )
        except IndexError:
            return [], False
        return (
            [dict(entry) for entry in page['entries']],
            bool(page['continuation_token']),
        )

    raw_entries, has_more = _collect_source_window(
        start_index=start_index,
        max_results=max_results,
        source_page_size=PLAYLIST_PAGE_SIZE,
        loader=load,
    )
    videos = [
        _gdata_video_from_playlist_entry(entry)
        for entry in raw_entries
    ]
    return videos, has_more, first_page


def _playlist_feed_response(
    *,
    channel_data: ChannelPageData,
    playlist_id: str,
    feed_id: str,
    start_index: int,
    max_results: int,
) -> Response:
    try:
        videos, has_more, playlist_page = _playlist_video_window(
            playlist_id,
            start_index,
            max_results,
        )
    except ValueError:
        abort(404)

    owner_id = playlist_page['playlist'].get('owner_channel_id') or ''
    if owner_id and owner_id != channel_data['channel_id']:
        abort(404)

    playlist = _gdata_playlist_metadata(playlist_page, channel_data)
    total_results = playlist['video_count']
    if not total_results:
        total_results = start_index - 1 + len(videos)
        if has_more:
            total_results += 1
    next_url = _next_url(start_index, max_results, total_results)
    return _video_feed_response(
        feed_id=feed_id,
        title=playlist['title'],
        entries=videos,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=playlist['updated'],
        alternate_url=f'{_base_url()}/playlist?list={playlist_id}',
        next_url=next_url,
        author_data=channel_data,
        playlist=playlist,
    )


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


@bp.get(
    "/feeds/api/standardfeeds/recently_featured",
    strict_slashes=False,
)
def recently_featured_feed() -> Response:
    start_index, max_results = _pagination()
    data = get_recently_featured()
    raw_entries = [
        entry
        for entry in data['entries']
        if entry.get('type') == 'video'
    ]
    entries = [
        _gdata_video_from_feed_item(entry)
        for entry in raw_entries[
            start_index - 1:start_index - 1 + max_results
        ]
    ]
    total_results = len(raw_entries)
    updated = timestamp_to_iso8601(data['fetched_at'])
    base_url = _base_url()
    return _video_feed_response(
        feed_id=f'{base_url}/feeds/api/standardfeeds/recently_featured',
        title='Recently Featured',
        entries=entries,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=updated,
        alternate_url=base_url,
        next_url=_next_url(start_index, max_results, total_results),
    )


@bp.get("/feeds/api/channels", strict_slashes=False)
def channels_alias_root() -> Response:
    abort(404)


@bp.get("/feeds/api/users/<user>", strict_slashes=False)
@bp.get("/feeds/api/channels/<user>", strict_slashes=False)
def user_profile_entry(user: str) -> Response:
    if '/channels/' in request.path and request.args.get('q') is not None:
        abort(404)
    data = _channel_or_404(user)
    return _atom_response(
        'api/user.xml.j2',
        user=_gdata_user(data),
    )


@bp.get("/feeds/api/users/<user>/uploads", strict_slashes=False)
def user_uploads_feed(user: str) -> Response:
    data = _channel_or_404(user)
    channel = data['channel']
    start_index, max_results = _pagination()

    def load(page_number: int) -> tuple[list[dict], bool]:
        page = get_channel_videos_page(
            data['channel_id'],
            sort='dd',
            page_number=page_number,
        )
        return (
            [dict(entry) for entry in page['entries']],
            bool(page['continuation_token']),
        )

    raw_entries, has_more = _collect_source_window(
        start_index=start_index,
        max_results=max_results,
        source_page_size=CHANNEL_VIDEOS_PAGE_SIZE,
        loader=load,
    )
    entries = [
        _gdata_video_from_feed_item(entry)
        for entry in raw_entries
        if entry.get('type') == 'video'
    ]
    total_results = parse_count(channel.get('video_count'), default=0)
    if not total_results:
        total_results = start_index - 1 + len(entries)
        if has_more:
            total_results += 1

    handle = _channel_handle(data)
    base_url = _base_url()
    return _video_feed_response(
        feed_id=f'{base_url}/feeds/api/users/{handle}/uploads',
        title=f'Uploads by {channel["channel_name"]}',
        entries=entries,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=_channel_updated(data),
        alternate_url=f'{base_url}{channel["channel_url"]}/videos',
        next_url=_next_url(start_index, max_results, total_results),
        author_data=data,
    )


@bp.get("/feeds/api/users/<user>/playlists", strict_slashes=False)
def user_playlists_feed(user: str) -> Response:
    data = _channel_or_404(user)
    channel = data['channel']
    start_index, max_results = _pagination()
    playlists, total_results = _all_channel_playlists(data['channel_id'])
    entries = [
        _gdata_playlist(playlist, data)
        for playlist in playlists[
            start_index - 1:start_index - 1 + max_results
        ]
    ]

    handle = _channel_handle(data)
    base_url = _base_url()
    return _atom_response(
        'api/feed.xml.j2',
        feed_id=f'{base_url}/feeds/api/users/{handle}/playlists',
        title=f'Playlists by {channel["channel_name"]}',
        kind='playlistLink',
        entry_kind='playlist',
        entries=entries,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=_channel_updated(data),
        links=_feed_links(
            self_url=request.url,
            alternate_url=f'{base_url}{channel["channel_url"]}/videos?view=pl',
            next_url=_next_url(start_index, max_results, total_results),
        ),
        author_name=handle,
        author_display_name=channel['channel_name'],
        author_uri=f'{base_url}/feeds/api/users/{handle}',
        author_user_id=channel['channel_id'],
    )


@bp.get(
    "/feeds/api/users/<user>/playlists/<playlist_id>",
    strict_slashes=False,
)
def user_playlist_feed(user: str, playlist_id: str) -> Response:
    data = _channel_or_404(user)
    start_index, max_results = _pagination()
    handle = _channel_handle(data)
    return _playlist_feed_response(
        channel_data=data,
        playlist_id=playlist_id,
        feed_id=(
            f'{_base_url()}/feeds/api/users/'
            f'{handle}/playlists/{playlist_id}'
        ),
        start_index=start_index,
        max_results=max_results,
    )


@bp.get("/feeds/api/users/<user>/favorites", strict_slashes=False)
def user_favorites_feed(user: str) -> Response:
    data = _channel_or_404(user)
    start_index, max_results = _pagination()
    playlists, _ = _all_channel_playlists(data['channel_id'])
    favorites = next(
        (
            playlist
            for playlist in playlists
            if playlist.get('title', '').strip().casefold() == 'favorites'
        ),
        None,
    )
    handle = _channel_handle(data)
    base_url = _base_url()
    feed_id = f'{base_url}/feeds/api/users/{handle}/favorites'
    if favorites:
        return _playlist_feed_response(
            channel_data=data,
            playlist_id=favorites['id'],
            feed_id=feed_id,
            start_index=start_index,
            max_results=max_results,
        )

    return _video_feed_response(
        feed_id=feed_id,
        title=f'Favorite videos of {data["channel"]["channel_name"]}',
        entries=[],
        total_results=0,
        start_index=start_index,
        max_results=max_results,
        updated=_channel_updated(data),
        alternate_url=f'{base_url}{data["channel"]["channel_url"]}',
        author_data=data,
    )


@bp.get(
    "/feeds/api/users/<user>/recommendations",
    strict_slashes=False,
)
@bp.get(
    "/feeds/api/users/<user>/newsubscriptionvideos",
    strict_slashes=False,
)
def user_featured_fallback(user: str) -> Response:
    return redirect(
        '/feeds/api/standardfeeds/recently_featured',
        code=302,
    )


@bp.get("/feeds/api/events", strict_slashes=False)
def user_events_feed() -> Response:
    author = (request.args.get('author') or '').strip()
    if not author:
        return Response(
            'The author query parameter is required.',
            status=400,
            content_type='text/plain; charset=utf-8',
        )

    data = _channel_or_404(author)
    channel = data['channel']
    start_index = parse_int(
        request.args.get('start-index'),
        1,
        minimum=1,
    )
    requested_max = parse_int(
        request.args.get('max-results'),
        EVENT_RESULTS,
        minimum=1,
        maximum=EVENT_RESULTS,
    )
    max_results = min(
        requested_max,
        max(0, EVENT_RESULTS - start_index + 1),
    )

    raw_entries: list[dict] = []
    has_more = False
    if max_results:
        def load(page_number: int) -> tuple[list[dict], bool]:
            page = get_channel_videos_page(
                data['channel_id'],
                sort='dd',
                page_number=page_number,
            )
            return (
                [dict(entry) for entry in page['entries']],
                bool(page['continuation_token']),
            )

        raw_entries, has_more = _collect_source_window(
            start_index=start_index,
            max_results=max_results,
            source_page_size=CHANNEL_VIDEOS_PAGE_SIZE,
            loader=load,
        )

    handle = _channel_handle(data)
    videos = [
        _gdata_video_from_feed_item(entry)
        for entry in raw_entries
        if entry.get('type') == 'video'
    ]
    events = [
        {
            'type': 'video_uploaded',
            'title': f'{handle} uploaded a video: {video["title"]}',
            'updated': video.get('published') or _channel_updated(data),
            'author_handle': handle,
            'author_name': channel['channel_name'],
            'author_channel_id': channel['channel_id'],
            'video': video,
        }
        for video in videos
    ]
    total_results = min(
        EVENT_RESULTS,
        parse_count(channel.get('video_count'), default=0)
        or (start_index - 1 + len(events) + (1 if has_more else 0)),
    )
    base_url = _base_url()
    return _atom_response(
        'api/feed.xml.j2',
        feed_id=f'{base_url}/feeds/api/events',
        title=f'Activity for {channel["channel_name"]}',
        kind='userEvent',
        entry_kind='event',
        entries=events,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=_channel_updated(data),
        links=_feed_links(
            self_url=request.url,
            next_url=_next_url(
                start_index,
                max_results,
                total_results,
            ) if max_results else '',
        ),
        author_name=handle,
        author_display_name=channel['channel_name'],
        author_uri=f'{base_url}/feeds/api/users/{handle}',
        author_user_id=channel['channel_id'],
    )
