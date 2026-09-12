import math
from urllib.parse import quote_plus

from flask import render_template, request
from werkzeug.exceptions import NotFound

from helpers.innertube.playlist import get_playlist_page, PLAYLIST_PAGE_SIZE
from helpers.pager import create_pager_props
from helpers.parsers import parse_int

from . import get_preferred_template


def playlist_page():
    playlist_id = request.args.get('list', '').strip()
    if not playlist_id:
        raise NotFound("Playlist not found")

    page_number = parse_int(request.args.get('page'), 1, minimum=1)
    data = get_playlist_page(playlist_id, page_number)
    total_pages = math.ceil(data['playlist']['video_count'] / PLAYLIST_PAGE_SIZE)

    def get_page_url(page: int) -> str:
        page_param = f'&page={page}' if page > 1 else ''
        return f'/playlist?list={playlist_id}{page_param}'

    pager = create_pager_props(page_number, total_pages, get_page_url)
    return render_template(
        get_preferred_template('playlist'),
        data=data,
        pager=pager,
    )
