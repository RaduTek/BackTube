from flask import Blueprint, render_template, request
from werkzeug.exceptions import NotFound

from . import get_preferred_template
from helpers import links, player
from helpers.innertube import FeedCollection
from helpers.innertube.channel import ChannelPageData, get_channel_data, resolve_channel_handle


bp = Blueprint('channel', __name__)


def channel_horizontal_menu_items(base_url: str, selected: str = 'featured') -> list[dict]:
    if selected not in ['featured', 'feed', 'videos']:
        selected = 'featured'
    
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


def _get_channel_data(channel_id: str | None = None, user_id: str | None = None) -> tuple[str, ChannelPageData, dict]:
    try:
        if user_id:
            channel_id = resolve_channel_handle(user_id)

        if not channel_id:
            raise NotFound("Channel not found")

        data = get_channel_data(channel_id)
        base_url = links.user_url(data['channel']['channel_handle'])
        
        selected_menu_item = request.path.split('/')[-1] or 'featured'
        horiz_menu = channel_horizontal_menu_items(base_url, selected=selected_menu_item)

        common_context = {
            'channel_id': data['channel_id'],
            'channel': data['channel'],
            'base_url': base_url,
            'horiz_menu': horiz_menu,
        }

        return channel_id, data, common_context
    except:
        raise NotFound("Channel not found")


@bp.get('/channel/<channel_id>')
@bp.get('/channel/<channel_id>/')
@bp.get('/channel/<channel_id>/featured')
@bp.get('/user/<user_id>')
@bp.get('/user/<user_id>/')
@bp.get('/user/<user_id>/featured')
def channel_featured_page(channel_id: str | None = None, user_id: str | None = None):
    channel_id, data, common_context = _get_channel_data(channel_id=channel_id, user_id=user_id)

    videos_feed = find_feed(data['feeds'], 'feed_type', 'videos')

    featured_video = (find_feed(data['feeds'], 'feed_type', 'featured_video') or {}).get('items', [None])[0]
    featured_player = player.get_player_data(featured_video['id'], autoplay=False, player_args={'el': 'profilepage'}) if featured_video else None

    return render_template(
        get_preferred_template('channel/featured'),
        **common_context,
        videos_feed=videos_feed,
        featured_video=featured_video,
        featured_player=featured_player
    )


@bp.get('/channel/<channel_id>/feed')
@bp.get('/user/<user_id>/feed')
def channel_feed_page(channel_id: str | None = None, user_id: str | None = None):
    channel_id, data, common_context = _get_channel_data(channel_id=channel_id, user_id=user_id)

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
        **common_context,
        activity_feeds=feeds,
        selected_feed=feed_index
    )



@bp.get('/channel/<channel_id>/videos')
@bp.get('/user/<user_id>/videos')
def channel_videos_page(channel_id: str | None = None, user_id: str | None = None):
    channel_id, data, common_context = _get_channel_data(channel_id=channel_id, user_id=user_id)

    return render_template(
        get_preferred_template('channel/videos'),
        **common_context
    )
