from urllib.parse import quote_plus

from flask import render_template, request
from werkzeug.exceptions import NotFound

from helpers.innertube.playlist import get_playlist_page
from helpers.pager import create_pager_props

from . import get_preferred_template


def playlist_page():
    playlist_id = request.args.get('list', '').strip()
    if not playlist_id:
        raise NotFound("Playlist not found")

    try:
        page_number = max(1, int(request.args.get('page', 1)))
    except (TypeError, ValueError):
        page_number = 1

    try:
        first_page = get_playlist_page(playlist_id)
        data = (
            first_page
            if page_number == 1
            else get_playlist_page(playlist_id, page_number)
        )
        total_pages = page_number + int(bool(data['continuation_token']))
    except (IndexError, ValueError):
        raise NotFound("Playlist not found")

    encoded_playlist_id = quote_plus(playlist_id)

    def get_page_url(page: int) -> str:
        page_param = f'&page={page}' if page > 1 else ''
        return f'/playlist?list={encoded_playlist_id}{page_param}'

    pager = create_pager_props(page_number, total_pages, get_page_url)
    return render_template(
        get_preferred_template('playlist'),
        data=data,
        pager=pager,
    )
