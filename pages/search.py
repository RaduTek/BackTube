from urllib.parse import quote_plus
from flask import request, render_template

from . import get_preferred_template
from helpers.pager import create_pager_props
from helpers.innertube.search import get_search_results_page


def results_page():
    search_query = request.args.get('search_query', '')
    search_query_url = quote_plus(search_query)

    search_page = int(request.args.get('page', 1))

    search_results = get_search_results_page(search_query, page_number=search_page)

    if not search_results:
        return 'no search results found'

    # Estimated, some pages contain more items
    per_page_count = 20
    total = (search_results['estimated_results']) // per_page_count

    def get_page_url(page_number):
        if page_number == 1:
            return f'/results?search_query={search_query_url}'
        return f'/results?search_query={search_query_url}&page={page_number}'

    pager = create_pager_props(search_page, total, get_page_url)

    return render_template(
        get_preferred_template('results'),
        search_query=search_query,
        search_query_url=search_query_url,
        search_page=search_page,
        search_results=search_results,
        pager=pager,
    )
