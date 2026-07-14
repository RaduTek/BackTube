from urllib.parse import quote_plus
from flask import request, render_template
from ..helpers.innertube.search import get_search_results_innertube


def results_page():
    search_query = request.args.get('search_query', '') or request.args.get('q', '')
    search_query_url = quote_plus(search_query)

    search_results = get_search_results_innertube(search_query)

    per_page_count = len(search_results['entries'])

    window_size = 7
    half_window = window_size // 2

    page = {}
    page['current'] = int(request.args.get('page', 1))
    page['total'] = (search_results['estimated_results']) // per_page_count if per_page_count > 0 else 1
    page['start'] = max(1, page['current'] - half_window)
    page['end'] = page['start'] + min(page['total'], window_size) - 1
    page['range'] = range(page['start'], page['end'] + 1)
    page['next'] = page['current'] + 1 if page['current'] < page['total'] else None
    page['prev'] = page['current'] - 1 if page['current'] > 1 else None

    return render_template(
        '2012/results.html.j2',
        search_query=search_query,
        search_query_url=search_query_url,
        search_results=search_results,
        search_page=page,
    )
