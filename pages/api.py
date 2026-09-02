from urllib.parse import urlencode

from flask import Response, render_template, request

from helpers.innertube.search import (
    SEARCH_DURATION_PROTO,
    SEARCH_SORT_PROTO,
    SEARCH_UPLOADED_PROTO,
    SearchFilters,
    apply_category_query,
    encode_search_params,
    get_search_results_page,
)
from helpers.parsers import (
    datetime_to_iso8601,
    parse_count,
    parse_duration_seconds,
    parse_int,
    parse_published_at,
    timestamp_to_iso8601,
    truthy,
)


SEARCH_PAGE_SIZE = 20
MAX_RESULTS = 20

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
    filters = _gdata_search_filters()
    page_number = ((start_index - 1) // SEARCH_PAGE_SIZE) + 1
    page_offset = (start_index - 1) % SEARCH_PAGE_SIZE

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

    videos = []
    for entry in search_results['entries']:
        if entry.get('type') != 'video':
            continue

        video = dict(entry)
        video['duration_seconds'] = parse_duration_seconds(
            entry.get('length_text', '')
        )
        video['view_count'] = parse_count(
            entry.get('viewcount_text', '')
        )
        published_at = entry.get('published_at') or parse_published_at(
            entry.get('published_text', '')
        )
        video['published'] = datetime_to_iso8601(published_at)
        videos.append(video)

    videos = videos[page_offset:page_offset + max_results]
    total_results = search_results['estimated_results']
    updated = timestamp_to_iso8601(search_results['fetched_at'])
    base_url = request.url_root.rstrip('/')

    next_url = ''
    if start_index + max_results <= total_results:
        next_args = request.args.to_dict(flat=False)
        next_args['start-index'] = [str(start_index + max_results)]
        next_args['max-results'] = [str(max_results)]
        next_url = f'{request.base_url}?{urlencode(next_args, doseq=True)}'

    xml = render_template(
        'api/videos.xml.j2',
        base_url=base_url,
        self_url=request.url,
        next_url=next_url,
        search_query=search_query,
        videos=videos,
        total_results=total_results,
        start_index=start_index,
        max_results=max_results,
        updated=updated,
    )
    return Response(
        xml,
        content_type='application/atom+xml; charset=utf-8',
    )
