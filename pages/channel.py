import math
import re
from typing import cast

from flask import Blueprint, render_template, request
from werkzeug.exceptions import NotFound

from . import get_preferred_template
from helpers import links, player
from helpers.innertube import FeedCollection
from helpers.innertube.channel import (
    CHANNEL_VIDEOS_PAGE_SIZE,
    ChannelPageData,
    ChannelVideosSort,
    get_channel_data,
    get_channel_videos_page,
    resolve_channel_handle,
)
from helpers.pager import create_pager_props


bp = Blueprint('channel', __name__)

CHANNEL_VIDEO_SORT_LABELS: dict[ChannelVideosSort, str] = {
    'p': 'Most popular',
    'dd': 'Date added (newest - oldest)',
    'da': 'Date added (oldest - newest)',
}


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


def _parse_channel_video_count(video_count_text: str) -> int:
    digits = re.sub(r'\D', '', video_count_text)
    return int(digits) if digits else 0


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

    requested_sort = request.args.get('sort', 'dd')
    video_sort = (
        cast(ChannelVideosSort, requested_sort)
        if requested_sort in CHANNEL_VIDEO_SORT_LABELS
        else 'dd'
    )

    try:
        page_number = max(1, int(request.args.get('page', 1)))
    except (TypeError, ValueError):
        page_number = 1

    total_videos = _parse_channel_video_count(data['channel']['video_count'])
    total_pages = (
        math.ceil(total_videos / CHANNEL_VIDEOS_PAGE_SIZE)
        if total_videos
        else 0
    )
    if total_pages and page_number > total_pages:
        raise NotFound("Channel videos page not found")

    videos_page = get_channel_videos_page(
        channel_id,
        sort=video_sort,
        page_number=page_number,
    )

    if not total_pages:
        total_pages = page_number + (
            1 if videos_page['continuation_token'] else 0
        )
    total_pages = max(1, total_pages)

    def get_page_url(page: int) -> str:
        page_param = f'&page={page}' if page > 1 else ''
        return f"{common_context['base_url']}/videos?sort={video_sort}&view=u{page_param}"

    pager = create_pager_props(page_number, total_pages, get_page_url)

    return render_template(
        get_preferred_template('channel/videos'),
        **common_context,
        videos_page=videos_page,
        video_sort=video_sort,
        video_sort_label=CHANNEL_VIDEO_SORT_LABELS[video_sort],
        pager=pager,
    )
