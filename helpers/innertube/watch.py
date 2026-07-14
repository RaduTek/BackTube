from typing import TypedDict
from . import client
from .. import links
from ..formats import format_duration
from .utils import get_text, get_channel_from_byline


class WatchPageVideo(TypedDict):
    video_id: str
    url: str
    title: str
    description: str

    channel_name: str
    channel_id: str
    channel_url: str
    subscriber_count: str

    view_count: int
    like_count: int
    dislike_count: int
    published_date: str
    duration: str


class WatchPageData(TypedDict):
    video: WatchPageVideo


def _get_watch_result_contents(response: dict) -> list[dict]:
    return (
        response.get('contents', {})
        .get('twoColumnWatchNextResults', {})
        .get('results', {})
        .get('results', {})
        .get('contents', [])
    )


def _find_renderer(contents: list[dict], renderer_key: str) -> dict:
    for item in contents:
        if renderer := item.get(renderer_key):
            return renderer
    return {}


def _parse_view_count(video_primary_info: dict) -> str:
    view_count_text = get_text(
        video_primary_info.get('viewCount', {})
        .get('videoViewCountRenderer', {})
        .get('viewCount', {})
    )
    return view_count_text.split()[0] if view_count_text else ''


def _parse_like_dislike_counts(video_actions: dict) -> tuple[str, str]:
    like_count = 0
    dislike_count = 0

    def walk(obj: object) -> None:
        nonlocal like_count, dislike_count
        if isinstance(obj, dict):
            button = obj.get('buttonViewModel', {})
            icon_name = button.get('iconName')
            if icon_name == 'LIKE' and not like_count:
                like_count = button.get('title', '')
            elif icon_name == 'DISLIKE' and not dislike_count:
                dislike_count = button.get('title', '')
            for value in obj.values():
                walk(value)
        elif isinstance(obj, list):
            for value in obj:
                walk(value)

    walk(video_actions)
    return like_count, dislike_count


def parse_watch_page_video(
    video_id: str,
    response: dict,
    player_response: dict | None = None,
) -> WatchPageVideo:
    contents = _get_watch_result_contents(response)
    video_primary_info = _find_renderer(contents, 'videoPrimaryInfoRenderer')
    video_secondary_info = _find_renderer(contents, 'videoSecondaryInfoRenderer')

    owner_renderer = video_secondary_info.get('owner', {}).get('videoOwnerRenderer', {})
    channel_name, channel_id = get_channel_from_byline(owner_renderer.get('title'))
    if not channel_id:
        channel_id = (
            owner_renderer.get('navigationEndpoint', {})
            .get('browseEndpoint', {})
            .get('browseId', '')
        )

    description = video_secondary_info.get('attributedDescription', {}).get('content', '')
    view_count = _parse_view_count(video_primary_info)
    like_count, dislike_count = _parse_like_dislike_counts(
        video_primary_info.get('videoActions', {})
    )
    published_date = get_text(video_primary_info.get('dateText'))

    video_details = (player_response or {}).get('videoDetails', {})
    if not description:
        description = video_details.get('shortDescription', '')
    if not view_count:
        view_count = int(video_details.get('viewCount', 0) or 0)

    length_seconds = int(video_details.get('lengthSeconds', 0) or 0)
    duration = format_duration(length_seconds) if length_seconds else ''

    return WatchPageVideo(
        video_id=video_id,
        url=links.video_url(video_id),
        title=get_text(video_primary_info.get('title')),
        description=description,
        channel_name=channel_name,
        channel_id=channel_id,
        channel_url=links.channel_url(channel_id),
        subscriber_count=get_text(owner_renderer.get('subscriberCountText')),
        view_count=view_count,
        like_count=like_count,
        dislike_count=dislike_count,
        published_date=published_date,
        duration=duration,
    )


def get_watch_data_innertube(video_id: str) -> WatchPageData:
    response = client.next(video_id)
    player_response = client.player(video_id)

    return WatchPageData(
        video=parse_watch_page_video(video_id, response, player_response),
    )
