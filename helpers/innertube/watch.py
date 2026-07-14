from datetime import datetime
from typing import cast, TypedDict
from . import client, FeedItem
from .. import links, cache
from ..formats import format_duration
from .search import parse_innertube_search_item
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

    view_count: str
    like_count: str
    dislike_count: str
    published_date: str
    duration: str


class WatchPageData(TypedDict):
    video_id: str
    fetched_at: int
    video: WatchPageVideo
    related: list[FeedItem]
    related_token: str


class WatchPageRelated(TypedDict):
    video_id: str
    fetched_at: int
    related: list[FeedItem]
    related_token: str


class WatchPageCache(TypedDict):
    video_id: str
    fetched_at: int
    updated_at: int
    data: WatchPageData
    related: list[WatchPageRelated]


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


def _get_suggestion_result_items(response: dict) -> list[dict]:
    if secondary_results := (
        response.get('contents', {})
        .get('twoColumnWatchNextResults', {})
        .get('secondaryResults', {})
        .get('secondaryResults', {})
        .get('results', [])
    ):
        return secondary_results

    items: list[dict] = []
    for endpoint in response.get('onResponseReceivedEndpoints', []):
        if action := endpoint.get('appendContinuationItemsAction'):
            items.extend(action.get('continuationItems', []))
    for command in response.get('onResponseReceivedCommands', []):
        if action := command.get('appendContinuationItemsAction'):
            items.extend(action.get('continuationItems', []))
    return items


def _get_suggestion_continuation_token(items: list[dict]) -> str:
    for item in items:
        if continuation := item.get('continuationItemRenderer'):
            return (
                continuation.get('continuationEndpoint', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
    return ''


def parse_watch_suggestions(response: dict) -> tuple[list[FeedItem], str]:
    """Parse watch page suggestions from an initial or continuation next response."""

    items = _get_suggestion_result_items(response)
    suggestions: list[FeedItem] = []
    for item in items:
        if entry := parse_innertube_search_item(item):
            suggestions.append(entry)

    return suggestions, _get_suggestion_continuation_token(items)


def _parse_view_count(video_primary_info: dict) -> str:
    view_count_text = get_text(
        video_primary_info.get('viewCount', {})
        .get('videoViewCountRenderer', {})
        .get('viewCount', {})
    )
    return view_count_text.split()[0] if view_count_text else ''


def _parse_like_dislike_counts(video_actions: dict) -> tuple[str, str]:
    like_count = ''
    dislike_count = ''

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

    # Ignore values if not numeric (for videos with hidden ratings)
    if len(like_count) > 0 and not like_count[0].isdigit():
        like_count = ''
    
    if len(dislike_count) > 0 and not dislike_count[0].isdigit():
        dislike_count = ''
    
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
        raw_view_count = video_details.get('viewCount', '')
        view_count = str(raw_view_count) if raw_view_count else ''

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


def get_watch_suggestions_innertube(
    video_id: str,
    continuation_token: str | None = None,
) -> tuple[list[FeedItem], str]:
    """Fetch watch page suggestions from the innertube next API."""

    response = (
        client.next(video_id, continuation=continuation_token)
        if continuation_token
        else client.next(video_id)
    )
    return parse_watch_suggestions(response)


def get_watch_data_innertube(video_id: str) -> WatchPageData:
    """Fetch watch page data from the innertube next API."""
    response = client.next(video_id)
    player_response = client.player(video_id)
    suggestions, suggestions_continuation_token = parse_watch_suggestions(response)

    return WatchPageData(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        video=parse_watch_page_video(video_id, response, player_response),
        related=suggestions,
        related_token=suggestions_continuation_token,
    )


def get_watch_suggestions_continuation_innertube(
    video_id: str,
    continuation_token: str,
) -> WatchPageRelated:
    """Fetch watch page suggestions continuation from the innertube next API."""

    response = client.next(video_id, continuation=continuation_token)
    related, related_token = parse_watch_suggestions(response)

    return WatchPageRelated(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        related=related,
        related_token=related_token,
    )


def get_watch_data(video_id: str, nocache: bool = False) -> WatchPageData:
    """Fetch watch page data from the innertube next API, with caching."""

    cached = cache.get_cache_data('watch', video_id)

    if cached and not nocache:
        return cast(WatchPageData, cached['data'])

    data = get_watch_data_innertube(video_id)
    
    to_cache = WatchPageCache(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        updated_at=int(datetime.now().timestamp()),
        data=data,
        related=[],
    )
    cache.save_cache_data('watch', video_id, dict(to_cache))

    return data


def get_watch_related(
    video_id: str,
    index: int = -1,
) -> WatchPageRelated:
    """Fetch watch page related continuation from the innertube next API, with caching."""

    cached = cache.get_cache_data('watch', video_id)

    if not cached:
        raise ValueError(f"No cached watch data for video_id: {video_id}. Get watch data must be fetched first.")

    cached = cast(WatchPageCache, cached)

    # Negative index means counting from end of list
    if index < 0:
        index = len(cached['related']) + index
    
    # Check if already cached
    if 0 <= index <= len(cached['related']):
        return cached['related'][index]

    # Fetch missing continuations until we reach the requested index
    missing = len(cached['related']) - index

    for _ in range(missing):
        continuation_token = (
            cached['data']['related_token']
            if not len(cached['related']) > 0
            else cached['related'][-1]['related_token']
        )
        continuation_data = get_watch_suggestions_continuation_innertube(video_id, continuation_token)
        cached['related'].append(continuation_data)
    
    cached['updated_at'] = int(datetime.now().timestamp())
    cache.save_cache_data('watch_suggestions', video_id, dict(cached))

    return cached['related'][-1]
    