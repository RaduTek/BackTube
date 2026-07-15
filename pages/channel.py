from flask import Blueprint, render_template, request
from werkzeug.exceptions import NotFound


from . import get_preferred_template
from ..helpers import links
from ..helpers.innertube import FeedCollection
from ..helpers.innertube.channel import ChannelPageData, get_channel_data, resolve_channel_handle


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


def find_feed(feeds: list[FeedCollection], key: str, value: str) -> FeedCollection | None:
    for feed in feeds:
        if feed.get(key) == value:
            return feed
    return None


def _get_channel_data(channel_id: str | None = None, user_id: str | None = None) -> tuple[str, ChannelPageData]:
    try:
        if user_id:
            channel_id = resolve_channel_handle(user_id)

        if not channel_id:
            raise NotFound("Channel not found")

        return channel_id, get_channel_data(channel_id)
    except:
        raise NotFound("Channel not found")


@bp.get('/channel/<channel_id>')
@bp.get('/channel/<channel_id>/')
@bp.get('/channel/<channel_id>/featured')
@bp.get('/user/<user_id>')
@bp.get('/user/<user_id>/')
@bp.get('/user/<user_id>/featured')
def channel_featured_page(channel_id: str | None = None, user_id: str | None = None):
    channel_id, data = _get_channel_data(channel_id=channel_id, user_id=user_id)

    base_url = links.user_url(user_id) if user_id else links.channel_url(channel_id)
    horiz_menu = channel_horizontal_menu_items(base_url, selected='featured')

    featured_video = (find_feed(data['feeds'], 'feed_type', 'featured_video') or {}).get('items', [None])[0]
    videos_feed = find_feed(data['feeds'], 'feed_type', 'videos')

    return render_template(
        get_preferred_template('channel/featured'),
        channel_id=channel_id,
        base_url=base_url,
        channel=data['channel'],
        horiz_menu=horiz_menu,
        featured_video=featured_video,
        videos_feed=videos_feed
    )


@bp.get('/channel/<channel_id>/feed')
@bp.get('/user/<user_id>/feed')
def channel_feed_page(channel_id: str | None = None, user_id: str | None = None):
    channel_id, data = _get_channel_data(channel_id=channel_id, user_id=user_id)

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
    channel_id, data = _get_channel_data(channel_id=channel_id, user_id=user_id)

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
