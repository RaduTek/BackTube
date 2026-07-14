from urllib.parse import quote_plus
from flask import request, render_template

from . import get_preferred_template
from ..helpers.innertube.search import get_search_results_page


def results_page():
    search_query = request.args.get('search_query', '') or request.args.get('q', '')
    search_query_url = quote_plus(search_query)

    page = {}
    page['current'] = int(request.args.get('page', 1))

    search_results = get_search_results_page(search_query, page_number=page['current'])

    if not search_results:
        return 'no search results found'

    # Estimated, some pages contain more items
    per_page_count = 20

    window_size = 7
    half_window = window_size // 2

    # Only an estimated total
    page['total'] = (search_results['estimated_results']) // per_page_count
    page['start'] = max(1, page['current'] - half_window)
    page['end'] = page['start'] + min(page['total'], window_size) - 1
    page['range'] = range(page['start'], page['end'] + 1)
    page['next'] = page['current'] + 1 if page['current'] < page['total'] else None
    page['prev'] = page['current'] - 1 if page['current'] > 1 else None

    return render_template(
        get_preferred_template('results'),
        search_query=search_query,
        search_query_url=search_query_url,
        search_results=search_results,
        search_page=page,
    )
