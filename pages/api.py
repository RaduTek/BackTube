from urllib.parse import urlencode

from flask import Response, render_template, request

from helpers.innertube.search import get_search_results_page
from helpers.parsers import (
    parse_count,
    parse_duration_seconds,
    parse_int,
    timestamp_to_iso8601,
)


SEARCH_PAGE_SIZE = 20
MAX_RESULTS = 20
VIDEO_SEARCH_PARAMS = 'EgIQAQ=='


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
    page_number = ((start_index - 1) // SEARCH_PAGE_SIZE) + 1
    page_offset = (start_index - 1) % SEARCH_PAGE_SIZE

    search_results = get_search_results_page(
        search_query,
        page_number=page_number,
        search_params=VIDEO_SEARCH_PARAMS,
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
