from flask import Blueprint, render_template, request

from . import get_preferred_template
from ..helpers import links
from ..helpers.innertube.channel import get_channel_data, resolve_channel_handle


bp = Blueprint('channel', __name__)


def channel_horizontal_menu_items(base_url: str, selected: str = 'featured') -> list[dict]:
    return [
        {
            'id': 'featured',
            'url': f'{base_url}/featured',
            'label': 'Featured',
            'selected': selected == 'featured'
        },
        {
            'id': 'feed',
            'url': f'{base_url}/feed',
            'label': 'Feed',
            'selected': selected == 'feed'
        },
        {
            'id': 'videos',
            'url': f'{base_url}/videos',
            'label': 'Videos',
            'selected': selected == 'videos'
        }
    ]


def find_feed(feeds: list[dict], key: str, value: str) -> dict | None:
    for feed in feeds:
        if feed.get(key) == value:
            return feed
    return None


@bp.get('/channel/<channel_id>')
@bp.get('/channel/<channel_id>/')
@bp.get('/channel/<channel_id>/featured')
@bp.get('/user/<user_id>')
@bp.get('/user/<user_id>/')
@bp.get('/user/<user_id>/featured')
def channel_featured_page(channel_id: str | None = None, user_id: str | None = None):
    if user_id:
        channel_id = resolve_channel_handle(user_id)

    if not channel_id:
        return "Channel not found", 404

    data = get_channel_data(channel_id)

    base_url = links.user_url(user_id) if user_id else links.channel_url(channel_id)
    horiz_menu = channel_horizontal_menu_items(base_url, selected='featured')

    return render_template(
        get_preferred_template('channel/featured'),
        channel_id=channel_id,
        base_url=base_url,
        channel=data['channel'],
        horiz_menu=horiz_menu,
        feeds=data['feeds'],
        find_feed=find_feed
    )


@bp.get('/channel/<channel_id>/feed')
@bp.get('/user/<user_id>/feed')
def channel_feed_page(channel_id: str | None = None, user_id: str | None = None):
    if user_id:
        channel_id = resolve_channel_handle(user_id)

    if not channel_id:
        return "Channel not found", 404

    data = get_channel_data(channel_id)

    base_url = links.user_url(user_id) if user_id else links.channel_url(channel_id)
    horiz_menu = channel_horizontal_menu_items(base_url, selected='feed')

    feeds = [
        {
            'title': 'Posts',
            'items': (find_feed(data['feeds'], 'feed_type', 'posts') or {}).get('items', [])
        },
        {
            'title': 'Videos',
            'items': (find_feed(data['feeds'], 'feed_type', 'videos') or {}).get('items', [])
        }
    ]

    default_feed = next((i for i in range(len(feeds)) if len(feeds[i]['items']) > 0), 0) + 1
    feed_index = int(request.args.get('filter', default_feed)) - 1

    return render_template(
        get_preferred_template('channel/feed'),
        channel_id=channel_id,
        base_url=base_url,
        channel=data['channel'],
        horiz_menu=horiz_menu,
        activity_feeds=feeds,
        selected_feed=feed_index
    )



@bp.get('/channel/<channel_id>/videos')
@bp.get('/user/<user_id>/videos')
def channel_videos_page(channel_id: str | None = None, user_id: str | None = None):
    if user_id:
        channel_id = resolve_channel_handle(user_id)

    if not channel_id:
        return "Channel not found", 404

    data = get_channel_data(channel_id)

    base_url = links.user_url(user_id) if user_id else links.channel_url(channel_id)
    horiz_menu = channel_horizontal_menu_items(base_url, selected='videos')

    return render_template(
        get_preferred_template('channel/videos'),
        channel_id=channel_id,
        base_url=base_url,
        channel=data['channel'],
        horiz_menu=horiz_menu,
        feeds=data['feeds'],
        find_feed=find_feed
    )
