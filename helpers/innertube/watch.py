from typing import TypedDict
from . import client
from .utils import get_text


class WatchPageVideo(TypedDict):
    video_id: str
    title: str
    description: str
    channel_name: str
    channel_id: str
    view_count: int
    like_count: int
    dislike_count: int
    published_date: str


class WatchPageData(TypedDict):
    video: WatchPageVideo


def parse_video_primary_info(response: dict) -> WatchPageVideo:

    video_primary_info = response.get('contents', {}) \
        .get('twoColumnWatchNextResults', {}) \
        .get('results', {}) \
        .get('results', {}) \
        .get('contents', [])[0] \
        .get('videoPrimaryInfoRenderer', {})
    
    video_id = video_primary_info.get('videoId', '')
    title = get_text(video_primary_info.get('title', {}))
    description = get_text(video_primary_info.get('description', {}))
    channel_name = get_text(video_primary_info.get('owner', {}).get('videoOwnerRenderer', {}).get('title', {}))
    channel_id = video_primary_info.get('owner', {}).get('videoOwnerRenderer', {}).get('navigationEndpoint', {}).get('browseEndpoint', {}).get('browseId', '')
    view_count = int(get_text(video_primary_info.get('viewCount', {}).get('videoViewCountRenderer', {}).get('viewCount', {})).replace(',', '').replace('.', '').split(' ')[0])
    like_count = int(video_primary_info.get('likeCount', 0))
    dislike_count = int(video_primary_info.get('dislikeCount', 0))
    published_date = get_text(video_primary_info.get('publishedTimeText', {}))

    return {
        'video_id': video_id,
        'title': title,
        'description': description,
        'channel_name': channel_name,
        'channel_id': channel_id,
        'view_count': view_count,
        'like_count': like_count,
        'dislike_count': dislike_count,
        'published_date': published_date,
    }


def get_watch_data_innertube(video_id: str) -> WatchPageData:
    response = client.next(video_id)

    return {
        'video': parse_video_primary_info(response),
    }