from datetime import datetime
from typing import cast, TypedDict
from typing_extensions import NotRequired
from urllib.parse import parse_qs, unquote, urlparse
from . import client, FeedItem
from .. import links, cache
from ..formats import format_duration
from .search import parse_innertube_search_item
from .utils import get_text, get_channel_from_byline
from ..rydratings import get_ratings, RydRatings


class FeaturedMusic(TypedDict):
    track: str
    artist: str
    album: str
    writers: NotRequired[str]


class FeaturedSocial(TypedDict):
    platform: str
    url: str


class WatchPageComment(TypedDict):
    id: str
    text: str
    author_name: str
    author_channel_id: str
    author_channel_url: str
    author_avatar_url: str
    published_text: str
    like_count: str
    reply_count: str
    is_pinned: bool
    is_verified: bool
    is_creator: bool
    pinned_text: NotRequired[str]


class WatchPageComments(TypedDict):
    video_id: str
    fetched_at: int
    comments: list[WatchPageComment]
    comments_token: str


class WatchPageVideo(TypedDict):
    video_id: str
    url: str
    title: str
    description: str

    channel_name: str
    channel_id: str
    channel_url: str
    channel_is_verified: bool
    channel_is_creator: bool
    subscriber_count: str

    view_count: str
    like_count: str
    dislike_count: str
    published_date: str
    duration: str

    comments_enabled: bool
    comments_count_text: str

    featured_music: list[FeaturedMusic]
    featured_socials: list[FeaturedSocial]


class WatchPageData(TypedDict):
    video_id: str
    fetched_at: int
    video: WatchPageVideo
    rydratings: RydRatings
    related: list[FeedItem]
    related_token: str
    comments: list[WatchPageComment]
    comments_token: str


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
    comments: list[WatchPageComments]


COMMENTS_PANEL_TARGET_ID = 'engagement-panel-comments-section'


def _get_engagement_panel(response: dict, target_id: str) -> dict:
    for panel in response.get('engagementPanels', []):
        renderer = panel.get('engagementPanelSectionListRenderer', {})
        if renderer.get('targetId') == target_id:
            return renderer
    return {}


def _get_structured_description_renderer(response: dict) -> dict:
    for panel in response.get('engagementPanels', []):
        content = panel.get('engagementPanelSectionListRenderer', {}).get('content', {})
        if structured := content.get('structuredDescriptionContentRenderer'):
            return structured
    return {}


def _clean_tracked_url(tracked_url: str) -> str:
    if not tracked_url:
        return ''

    parsed = urlparse(tracked_url)
    if parsed.hostname and 'youtube.com' in parsed.hostname and parsed.path == '/redirect':
        redirect_target = parse_qs(parsed.query).get('q', [''])[0]
        if redirect_target:
            return unquote(redirect_target)

    return tracked_url


def _extract_tracked_url(command: dict) -> str:
    metadata_url = (
        command.get('commandMetadata', {})
        .get('webCommandMetadata', {})
        .get('url', '')
    )
    if metadata_url:
        return metadata_url

    return command.get('urlEndpoint', {}).get('url', '')


def _parse_music_credits(video_attribute: dict) -> dict[str, str]:
    credits: dict[str, str] = {}
    dialog_messages = (
        video_attribute.get('overflowMenuOnTap', {})
        .get('innertubeCommand', {})
        .get('confirmDialogEndpoint', {})
        .get('content', {})
        .get('confirmDialogRenderer', {})
        .get('dialogMessages', [])
    )
    if not dialog_messages:
        return credits

    runs = dialog_messages[0].get('runs', [])
    index = 0
    while index < len(runs):
        run = runs[index]
        label_text = run.get('text', '')
        if run.get('bold') and label_text.strip(': \n'):
            label = label_text.strip(': ').lower()
            index += 1
            while index < len(runs) and runs[index].get('bold'):
                index += 1
            if index < len(runs):
                value = runs[index].get('text', '').strip()
                if value and value != '\n\n':
                    credits[label] = value
        index += 1

    return credits


def _parse_featured_music(response: dict) -> list[FeaturedMusic]:
    featured_music: list[FeaturedMusic] = []

    for item in _get_structured_description_renderer(response).get('items', []):
        card_list = item.get('horizontalCardListRenderer', {})
        for card in card_list.get('cards', []):
            video_attribute = card.get('videoAttributeViewModel', {})
            if not video_attribute:
                continue

            credits = _parse_music_credits(video_attribute)
            music_entry: FeaturedMusic = {
                'track': video_attribute.get('title', ''),
                'artist': video_attribute.get('subtitle', ''),
                'album': video_attribute.get('secondarySubtitle', {}).get('content', ''),
            }
            if writers := credits.get('writers'):
                music_entry['writers'] = writers
            featured_music.append(music_entry)

    return featured_music


def _parse_featured_socials(response: dict) -> list[FeaturedSocial]:
    featured_socials: list[FeaturedSocial] = []

    for item in _get_structured_description_renderer(response).get('items', []):
        infocards = item.get('videoDescriptionInfocardsSectionRenderer', {})
        for button in infocards.get('creatorCustomUrlButtons', []):
            button_view = button.get('buttonViewModel', {})
            platform = button_view.get('title', '')
            tracked_url = _extract_tracked_url(
                button_view.get('onTap', {})
                .get('innertubeCommand', {})
            )
            url = _clean_tracked_url(tracked_url)
            if platform and url:
                featured_socials.append({
                    'platform': platform,
                    'url': url,
                })

    return featured_socials


def _parse_channel_badges(badges: list[dict]) -> tuple[bool, bool]:
    channel_is_verified = False
    channel_is_creator = False

    for badge in badges:
        style = badge.get('metadataBadgeRenderer', {}).get('style', '')
        if style == 'BADGE_STYLE_TYPE_VERIFIED':
            channel_is_verified = True
        elif style == 'BADGE_STYLE_TYPE_VERIFIED_ARTIST':
            channel_is_creator = True
            channel_is_verified = True

    return channel_is_verified, channel_is_creator


def _get_comments_continuation_token(comments_panel: dict) -> str:
    for section in (
        comments_panel.get('content', {})
        .get('sectionListRenderer', {})
        .get('contents', [])
    ):
        for item in section.get('itemSectionRenderer', {}).get('contents', []):
            if continuation := item.get('continuationItemRenderer'):
                return (
                    continuation.get('continuationEndpoint', {})
                    .get('continuationCommand', {})
                    .get('token', '')
                )
    return ''


def _parse_comments_info(response: dict) -> tuple[bool, str]:
    comments_panel = _get_engagement_panel(response, COMMENTS_PANEL_TARGET_ID)
    if not comments_panel:
        return False, ''

    header = comments_panel.get('header', {}).get('engagementPanelTitleHeaderRenderer', {})
    comments_count_text = get_text(header.get('contextualInfo'))
    continuation_token = _get_comments_continuation_token(comments_panel)

    for section in (
        comments_panel.get('content', {})
        .get('sectionListRenderer', {})
        .get('contents', [])
    ):
        for item in section.get('itemSectionRenderer', {}).get('contents', []):
            message = item.get('messageRenderer', {})
            message_text = get_text(message.get('text')).lower()
            if 'comment' in message_text and 'turned off' in message_text:
                return False, comments_count_text

    return bool(continuation_token), comments_count_text


def _build_comment_entity_map(response: dict) -> dict[str, dict]:
    entities: dict[str, dict] = {}
    for mutation in (
        response.get('frameworkUpdates', {})
        .get('entityBatchUpdate', {})
        .get('mutations', [])
    ):
        if entity_key := mutation.get('entityKey'):
            entities[entity_key] = mutation.get('payload', {})
    return entities


def _parse_comment_renderer(
    comment_renderer: dict,
    replies_renderer: dict | None = None,
    *,
    is_pinned: bool = False,
    pinned_text: str = '',
) -> WatchPageComment:
    author_channel_id = comment_renderer.get('authorEndpoint', {}).get(
        'browseEndpoint', {}
    ).get('browseId', '')
    if not author_channel_id:
        author_channel_id = comment_renderer.get('authorChannelId', {}).get('simpleText', '')

    reply_count = ''
    if replies_renderer:
        reply_count = get_text(
            replies_renderer.get('viewReplies', {})
            .get('buttonRenderer', {})
            .get('text', {})
        )

    comment: WatchPageComment = {
        'id': comment_renderer.get('commentId', ''),
        'text': get_text(comment_renderer.get('contentText')),
        'author_name': get_text(comment_renderer.get('authorText')).removeprefix('@'),
        'author_channel_id': author_channel_id,
        'author_channel_url': links.channel_url(author_channel_id),
        'author_avatar_url': get_text(comment_renderer.get('authorThumbnail', {})),
        'published_text': get_text(comment_renderer.get('publishedTimeText')),
        'like_count': get_text(comment_renderer.get('voteCount', {})).strip(),
        'reply_count': reply_count,
        'is_pinned': is_pinned,
        'is_verified': False,
        'is_creator': comment_renderer.get('authorIsChannelOwner', False),
    }
    if pinned_text:
        comment['pinned_text'] = pinned_text
    return comment


def _parse_comment_view_model(
    comment_thread: dict,
    entities: dict[str, dict],
) -> WatchPageComment | None:
    view_model = comment_thread.get('commentViewModel', {}).get('commentViewModel', {})
    if not view_model:
        return None

    payload = entities.get(view_model.get('commentKey', ''), {}).get('commentEntityPayload', {})
    if not payload:
        return None

    properties = payload.get('properties', {})
    author = payload.get('author', {})
    toolbar = payload.get('toolbar', {})
    channel_id = author.get('channelId', '')
    pinned_text = view_model.get('pinnedText', '')

    comment: WatchPageComment = {
        'id': properties.get('commentId', view_model.get('commentId', '')),
        'text': properties.get('content', {}).get('content', ''),
        'author_name': author.get('displayName', '').removeprefix('@'),
        'author_channel_id': channel_id,
        'author_channel_url': links.channel_url(channel_id),
        'author_avatar_url': author.get('avatarThumbnailUrl', ''),
        'published_text': properties.get('publishedTime', ''),
        'like_count': (toolbar.get('likeCountNotliked', '') or toolbar.get('likeCountLiked', '')).strip(),
        'reply_count': toolbar.get('replyCount', ''),
        'is_pinned': bool(pinned_text),
        'is_verified': author.get('isVerified', False),
        'is_creator': author.get('isCreator', False),
    }
    if pinned_text:
        comment['pinned_text'] = pinned_text
    return comment


def _parse_comment_thread(comment_thread: dict, entities: dict[str, dict]) -> WatchPageComment | None:
    if comment := _parse_comment_view_model(comment_thread, entities):
        return comment

    comment_renderer = comment_thread.get('comment', {}).get('commentRenderer', {})
    if not comment_renderer:
        return None

    return _parse_comment_renderer(
        comment_renderer,
        comment_thread.get('replies', {}).get('commentRepliesRenderer', {}),
        is_pinned=comment_thread.get('renderingPriority') == 'RENDERING_PRIORITY_PINNED_COMMENT',
    )


def _get_comments_continuation_items(response: dict) -> list[dict]:
    items: list[dict] = []
    for endpoint in response.get('onResponseReceivedEndpoints', []):
        if action := endpoint.get('reloadContinuationItemsCommand'):
            items.extend(action.get('continuationItems', []))
        if action := endpoint.get('appendContinuationItemsAction'):
            items.extend(action.get('continuationItems', []))
    return items


def _get_comments_page_token(items: list[dict]) -> str:
    for item in reversed(items):
        if continuation := item.get('continuationItemRenderer'):
            token = (
                continuation.get('continuationEndpoint', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
            if token:
                return token
            token = (
                continuation.get('button', {})
                .get('buttonRenderer', {})
                .get('command', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
            if token:
                return token
    return ''


def parse_watch_comments(response: dict) -> tuple[list[WatchPageComment], str]:
    """Parse a page of comments from an innertube next continuation response."""

    entities = _build_comment_entity_map(response)
    items = _get_comments_continuation_items(response)
    comments: list[WatchPageComment] = []

    for item in items:
        if comment_thread := item.get('commentThreadRenderer'):
            if comment := _parse_comment_thread(comment_thread, entities):
                comments.append(comment)
        elif comment_renderer := item.get('commentRenderer'):
            comments.append(_parse_comment_renderer(comment_renderer))

    return comments, _get_comments_page_token(items)


def _fetch_initial_comments(response: dict) -> tuple[list[WatchPageComment], str]:
    comments_panel = _get_engagement_panel(response, COMMENTS_PANEL_TARGET_ID)
    initial_token = _get_comments_continuation_token(comments_panel)
    if not initial_token:
        return [], ''

    comments_response = client.next(continuation=initial_token)
    return parse_watch_comments(comments_response)


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
    comments_enabled, comments_count_text = _parse_comments_info(response)
    featured_music = _parse_featured_music(response)
    featured_socials = _parse_featured_socials(response)
    channel_is_verified, channel_is_creator = _parse_channel_badges(
        owner_renderer.get('badges', [])
    )

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
        channel_is_verified=channel_is_verified,
        channel_is_creator=channel_is_creator,
        subscriber_count=get_text(owner_renderer.get('subscriberCountText')),
        view_count=view_count,
        like_count=like_count,
        dislike_count=dislike_count,
        published_date=published_date,
        duration=duration,
        comments_enabled=comments_enabled,
        comments_count_text=comments_count_text,
        featured_music=featured_music,
        featured_socials=featured_socials,
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
    comments_enabled, _ = _parse_comments_info(response)
    comments: list[WatchPageComment] = []
    comments_token = ''
    if comments_enabled:
        comments, comments_token = _fetch_initial_comments(response)

    rydratings = get_ratings(video_id)

    return WatchPageData(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        video=parse_watch_page_video(video_id, response, player_response),
        related=suggestions,
        related_token=suggestions_continuation_token,
        comments=comments,
        comments_token=comments_token,
        rydratings=rydratings,
    )


def get_watch_comments_continuation_innertube(
    video_id: str,
    continuation_token: str,
) -> WatchPageComments:
    """Fetch a continuation page of comments from the innertube next API."""

    response = client.next(continuation=continuation_token)
    comments, comments_token = parse_watch_comments(response)

    return WatchPageComments(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        comments=comments,
        comments_token=comments_token,
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

    if  isinstance(cached.get('data'), dict) and not nocache:
        return cast(WatchPageData, cached['data'])

    data = get_watch_data_innertube(video_id)
    
    to_cache = WatchPageCache(
        video_id=video_id,
        fetched_at=int(datetime.now().timestamp()),
        updated_at=int(datetime.now().timestamp()),
        data=data,
        related=[],
        comments=[],
    )
    cache.save_cache_data('watch', video_id, dict(to_cache))

    return data


def get_watch_related(
    video_id: str,
    index: int = -1,
) -> WatchPageRelated:
    """Fetch watch page related continuation from the innertube next API, with caching."""

    cached = cache.get_cache_data('watch', video_id)

    if not isinstance(cached.get('data'), dict):
        raise ValueError(f"No cached watch data for video_id: {video_id}. Get watch data must be fetched first.")

    cached = cast(WatchPageCache, cached)

    # Negative index means counting from end of list
    if index < 0:
        index = len(cached['related']) + index
    
    # Check if already cached
    if 0 <= index < len(cached['related']):
        return cached['related'][index]

    # Fetch missing continuations until we reach the requested index
    missing = index + 1 - len(cached['related'])
    if missing < 1:
        missing = 1

    for _ in range(missing):
        continuation_token = (
            cached['data']['related_token']
            if not cached['related']
            else cached['related'][-1]['related_token']
        )
        if not continuation_token:
            break
        continuation_data = get_watch_suggestions_continuation_innertube(video_id, continuation_token)
        cached['related'].append(continuation_data)
    
    cached['updated_at'] = int(datetime.now().timestamp())
    cache.save_cache_data('watch', video_id, dict(cached))

    if index >= len(cached['related']):
        raise ValueError(f"No related continuation at index {index}.")

    return cached['related'][index]


def get_watch_comments(
    video_id: str,
    index: int = -1,
) -> WatchPageComments:
    """Fetch watch page comments continuation from the innertube next API, with caching."""

    cached = cache.get_cache_data('watch', video_id)

    if not isinstance(cached.get('data'), dict):
        raise ValueError(
            f"No cached watch data for video_id: {video_id}. Watch data must be fetched first."
        )

    cached = cast(WatchPageCache, cached)

    if not cached['data']['video']['comments_enabled']:
        return WatchPageComments(
            video_id=video_id,
            fetched_at=int(datetime.now().timestamp()),
            comments=[],
            comments_token='',
        )

    if index < 0:
        index = len(cached['comments']) + index

    if 0 <= index < len(cached['comments']):
        return cached['comments'][index]

    missing = index + 1 - len(cached['comments'])
    if missing < 1:
        missing = 1

    for _ in range(missing):
        continuation_token = (
            cached['data']['comments_token']
            if not cached['comments']
            else cached['comments'][-1]['comments_token']
        )
        if not continuation_token:
            break
        continuation_data = get_watch_comments_continuation_innertube(video_id, continuation_token)
        cached['comments'].append(continuation_data)

    cached['updated_at'] = int(datetime.now().timestamp())
    cache.save_cache_data('watch', video_id, dict(cached))

    if index >= len(cached['comments']):
        raise ValueError(f"No comments continuation at index {index}.")

    return cached['comments'][index]
    