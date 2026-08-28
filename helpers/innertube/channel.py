import re
from datetime import datetime
from typing import cast, Literal, TypedDict
from typing_extensions import NotRequired
from innertube.errors import RequestError

from . import client, FeedItem, FeedCollection
from helpers import links
from helpers.cache import CacheData, CacheDataList, CacheManager
from .search import parse_innertube_search_item
from .utils import get_text, get_thumbnail_url
from .watch import _parse_channel_badges, _clean_tracked_url, _extract_tracked_url


CHANNEL_ABOUT_PARAMS = 'EgVhYm91dPIGBgoCMgBKAA%3D%3D'
CHANNEL_VIDEOS_PAGE_SIZE = 30
CHANNEL_PLAYLISTS_PAGE_SIZE = 10

ChannelVideosSort = Literal['p', 'dd', 'da']
ChannelPlaylistsSort = Literal['pn', 'lad']


class ChannelSocial(TypedDict):
    platform: str
    url: str
    display_url: NotRequired[str]


class ChannelPageChannel(TypedDict):
    channel_id: str
    channel_handle: str
    channel_name: str
    channel_url: str
    user_url: str
    thumbnail_url: str
    description: str
    subscriber_count: str
    video_count: str
    view_count: str
    join_date: str
    country: str
    is_verified: bool
    is_creator: bool
    featured_socials: list[ChannelSocial]


class ChannelPageData(TypedDict):
    channel_id: str
    fetched_at: int
    channel: ChannelPageChannel
    feeds: list[FeedCollection]


class ChannelVideosPage(TypedDict):
    channel_id: str
    fetched_at: int
    sort: ChannelVideosSort
    continuation_token: str
    entries: list[FeedItem]


class ChannelPlaylist(TypedDict):
    id: str
    title: str
    url: str
    play_all_url: str
    description: str
    video_count: str
    thumbnail_urls: list[str]


class ChannelPlaylistsPage(TypedDict):
    channel_id: str
    fetched_at: int
    sort: ChannelPlaylistsSort
    page_number: int
    total_pages: int
    total_entries: int
    entries: list[ChannelPlaylist]


_channel_handle_map: dict[str, str] | None = None

cache = CacheManager(collection='channel')
data_cache = CacheData[ChannelPageData](cache, 'page_data', ttl=None)
handle_map_cache = CacheData[dict[str, str]](cache, 'handle_map', ttl=None)


def _channel_videos_cache_item_gen(
    sort: ChannelVideosSort,
    channel_id: str,
    previous_item: ChannelVideosPage | None,
) -> ChannelVideosPage:
    if previous_item and not previous_item['continuation_token']:
        return ChannelVideosPage(
            channel_id=channel_id,
            fetched_at=int(datetime.now().timestamp()),
            sort=sort,
            continuation_token='',
            entries=[],
        )

    return get_channel_videos_innertube(
        channel_id,
        sort=sort,
        continuation_token=(
            previous_item['continuation_token'] if previous_item else None
        ),
    )


videos_caches: dict[ChannelVideosSort, CacheDataList[ChannelVideosPage]] = {
    sort: CacheDataList[ChannelVideosPage](
        cache,
        f'videos_{sort}',
        ttl=None,
        item_gen=lambda key, previous, sort=sort: _channel_videos_cache_item_gen(
            sort, key, previous
        ),
        depends_on_previous=True,
    )
    for sort in ('p', 'dd', 'da')
}
playlists_caches: dict[
    ChannelPlaylistsSort,
    CacheDataList[ChannelPlaylistsPage],
] = {
    sort: CacheDataList[ChannelPlaylistsPage](
        cache,
        f'playlists_{sort}',
        ttl=None,
        depends_on_previous=False,
    )
    for sort in ('pn', 'lad')
}


def _feed_id(title: str, index: int) -> str:
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    return slug or f'feed-{index}'


def _playlist_id_from_shelf(shelf: dict) -> str:
    endpoint = shelf.get('endpoint', {})
    url = (
        endpoint.get('commandMetadata', {})
        .get('webCommandMetadata', {})
        .get('url', '')
    )
    if 'list=' in url:
        return url.split('list=', 1)[1].split('&')[0]

    browse_id = endpoint.get('browseEndpoint', {}).get('browseId', '')
    if browse_id.startswith('VL'):
        return browse_id[2:]

    return ''


def _shelf_feed_id(shelf: dict, title: str, index: int) -> str:
    if playlist_id := _playlist_id_from_shelf(shelf):
        return playlist_id
    return _feed_id(title, index)


def _get_browse_tabs(response: dict) -> list[dict]:
    return (
        response.get('contents', {})
        .get('twoColumnBrowseResultsRenderer', {})
        .get('tabs', [])
    )


def _get_tab_params(response: dict, tab_title: str) -> str:
    for tab in _get_browse_tabs(response):
        tab_renderer = tab.get('tabRenderer', {})
        if tab_renderer.get('title') == tab_title:
            return (
                tab_renderer.get('endpoint', {})
                .get('browseEndpoint', {})
                .get('params', '')
            )
    return ''


def _get_tab_sections(response: dict, tab_title: str | None = None) -> list[dict]:
    tabs = _get_browse_tabs(response)
    fallback_sections: list[dict] = []

    for tab in tabs:
        tab_renderer = tab.get('tabRenderer', {})
        content = tab_renderer.get('content', {})
        if section_list := content.get('sectionListRenderer'):
            sections = section_list.get('contents', [])
            if not tab_title or tab_renderer.get('title') == tab_title:
                return sections
            if not fallback_sections:
                fallback_sections = sections
        if rich_grid := content.get('richGridRenderer'):
            sections = [{'richGridRenderer': rich_grid}]
            if not tab_title or tab_renderer.get('title') == tab_title:
                return sections
            if not fallback_sections:
                fallback_sections = sections

    return fallback_sections


def _get_rich_grid(response: dict, tab_title: str = 'Videos') -> dict:
    for section in _get_tab_sections(response, tab_title):
        if rich_grid := section.get('richGridRenderer'):
            return rich_grid
    return {}


def _get_channel_video_sort_endpoint(
    videos_response: dict,
    sort: ChannelVideosSort,
) -> tuple[str, str]:
    labels: dict[ChannelVideosSort, str] = {
        'p': 'Popular',
        'dd': 'Latest',
        'da': 'Oldest',
    }
    expected_label = labels[sort]
    header = _get_rich_grid(videos_response).get('header', {})

    chips = header.get('chipBarViewModel', {}).get('chips', [])
    for chip in chips:
        chip_view = chip.get('chipViewModel', {})
        if chip_view.get('text') != expected_label:
            continue
        token = (
            chip_view.get('tapCommand', {})
            .get('innertubeCommand', {})
            .get('continuationCommand', {})
            .get('token', '')
        )
        return token, ''

    legacy_chips = (
        header.get('feedFilterChipBarRenderer', {})
        .get('contents', [])
    )
    for chip in legacy_chips:
        chip_renderer = chip.get('chipCloudChipRenderer', {})
        if get_text(chip_renderer.get('text')) != expected_label:
            continue
        endpoint = chip_renderer.get('navigationEndpoint', {})
        return (
            endpoint.get('continuationCommand', {}).get('token', ''),
            endpoint.get('browseEndpoint', {}).get('params', ''),
        )

    return '', ''


def _get_channel_video_items(response: dict) -> list[dict]:
    if rich_grid := _get_rich_grid(response):
        return rich_grid.get('contents', [])

    items: list[dict] = []
    for response_key in (
        'onResponseReceivedActions',
        'onResponseReceivedCommands',
        'onResponseReceivedEndpoints',
    ):
        for command in response.get(response_key, []):
            for action_key in (
                'appendContinuationItemsAction',
                'reloadContinuationItemsCommand',
            ):
                if action := command.get(action_key):
                    items.extend(action.get('continuationItems', []))
    return items


def _get_continuation_token(items: list[dict]) -> str:
    for item in items:
        if continuation := item.get('continuationItemRenderer'):
            return (
                continuation.get('continuationEndpoint', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
    return ''


def _parse_channel_video_items(items: list[dict]) -> list[FeedItem]:
    entries: list[FeedItem] = []
    for item in items:
        content = item.get('richItemRenderer', {}).get('content', item)
        if entry := parse_innertube_search_item(content):
            if entry['type'] == 'video':
                entries.append(entry)
    return entries


def _get_channel_playlist_sort_params(
    playlists_response: dict,
    sort: ChannelPlaylistsSort,
) -> str:
    if sort == 'pn':
        return ''

    for tab in _get_browse_tabs(playlists_response):
        tab_renderer = tab.get('tabRenderer', {})
        if not tab_renderer.get('selected'):
            continue
        submenu_items = (
            tab_renderer.get('content', {})
            .get('sectionListRenderer', {})
            .get('subMenu', {})
            .get('channelSubMenuRenderer', {})
            .get('sortSetting', {})
            .get('sortFilterSubMenuRenderer', {})
            .get('subMenuItems', [])
        )
        for item in submenu_items:
            endpoint = item.get('navigationEndpoint', {})
            url = (
                endpoint.get('commandMetadata', {})
                .get('webCommandMetadata', {})
                .get('url', '')
            )
            if 'sort=lad' in url or item.get('title') == 'Last video added':
                return endpoint.get('browseEndpoint', {}).get('params', '')
    return ''


def _get_channel_playlist_items(response: dict) -> list[dict]:
    items: list[dict] = []
    for section in _get_tab_sections(response, 'Playlists'):
        for content in section.get('itemSectionRenderer', {}).get('contents', []):
            if grid := content.get('gridRenderer'):
                items.extend(grid.get('items', []))

    if items:
        return items

    for response_key in (
        'onResponseReceivedActions',
        'onResponseReceivedCommands',
        'onResponseReceivedEndpoints',
    ):
        for command in response.get(response_key, []):
            for action_key in (
                'appendContinuationItemsAction',
                'reloadContinuationItemsCommand',
            ):
                if action := command.get(action_key):
                    items.extend(action.get('continuationItems', []))
    return items


def _parse_channel_playlist(item: dict) -> ChannelPlaylist | None:
    parsed = parse_innertube_search_item(item)
    if not parsed or parsed['type'] != 'playlist':
        return None

    lockup = item.get('lockupViewModel', {})
    watch_endpoint = (
        lockup.get('rendererContext', {})
        .get('commandContext', {})
        .get('onTap', {})
        .get('innertubeCommand', {})
        .get('watchEndpoint', {})
    )
    first_video_id = watch_endpoint.get('videoId', '')

    thumbnail_urls = [
        preview['thumbnail_url']
        for preview in parsed.get('playlist_items', [])[:5]
        if preview.get('thumbnail_url')
    ]
    if not thumbnail_urls and parsed.get('thumbnail_url'):
        thumbnail_urls.append(parsed['thumbnail_url'])

    playlist_id = parsed['id']
    play_all_url = (
        links.video_url(first_video_id, playlist_id)
        if first_video_id
        else parsed['url']
    )
    return ChannelPlaylist(
        id=playlist_id,
        title=parsed['title'],
        url=parsed['url'],
        play_all_url=play_all_url,
        description=parsed.get('description', ''),
        video_count=parsed.get('video_count', ''),
        thumbnail_urls=thumbnail_urls,
    )


def _parse_legacy_channel_playlist(item: dict) -> ChannelPlaylist | None:
    renderer = item.get('gridPlaylistRenderer', {})
    playlist_id = renderer.get('playlistId', '')
    if not playlist_id:
        return None

    watch_endpoint = (
        renderer.get('navigationEndpoint', {})
        .get('watchEndpoint', {})
    )
    first_video_id = watch_endpoint.get('videoId', '')
    thumbnail_url = get_thumbnail_url(
        renderer.get('thumbnail', {}).get('thumbnails', [])
    )
    return ChannelPlaylist(
        id=playlist_id,
        title=get_text(renderer.get('title')),
        url=f'/playlist?list={playlist_id}',
        play_all_url=(
            links.video_url(first_video_id, playlist_id)
            if first_video_id
            else f'/playlist?list={playlist_id}'
        ),
        description=get_text(renderer.get('descriptionText')),
        video_count=get_text(renderer.get('videoCountText')),
        thumbnail_urls=[thumbnail_url] if thumbnail_url else [],
    )


def _parse_channel_playlist_items(items: list[dict]) -> list[ChannelPlaylist]:
    entries: list[ChannelPlaylist] = []
    for item in items:
        playlist = (
            _parse_channel_playlist(item)
            or _parse_legacy_channel_playlist(item)
        )
        if playlist:
            entries.append(playlist)
    return entries


def _parse_header_verification(page_header_view_model: dict) -> tuple[bool, bool]:
    is_verified = False
    is_creator = False

    accessibility_label = (
        page_header_view_model.get('title', {})
        .get('dynamicTextViewModel', {})
        .get('rendererContext', {})
        .get('accessibilityContext', {})
        .get('label', '')
    )
    if 'official artist channel' in accessibility_label.lower():
        is_creator = True
        is_verified = True

    text_obj = (
        page_header_view_model.get('title', {})
        .get('dynamicTextViewModel', {})
        .get('text', {})
    )
    for attachment in text_obj.get('attachmentRuns', []):
        image_name = (
            attachment.get('element', {})
            .get('type', {})
            .get('imageType', {})
            .get('image', {})
            .get('sources', [{}])[0]
            .get('clientResource', {})
            .get('imageName', '')
        )
        if image_name == 'AUDIO_BADGE':
            is_creator = True
            is_verified = True
        elif image_name in {'CHECK_CIRCLE_THICK', 'CHECK'}:
            is_verified = True

    return is_verified, is_creator


def _parse_metadata_texts(metadata_rows: list[dict]) -> list[str]:
    texts: list[str] = []
    for row in metadata_rows:
        for part in row.get('metadataParts', []):
            content = part.get('text', {}).get('content', '')
            if content:
                texts.append(content)
    return texts


def _parse_channel_handle_from_url(owner_url: str) -> str:
    if '/@' in owner_url:
        return owner_url.rsplit('/@', 1)[-1].strip('/')
    return ''


def _normalize_handle_cache_key(handle: str) -> str:
    handle = handle.strip()
    if '/@' in handle:
        handle = handle.rsplit('/@', 1)[-1]
    return handle.lstrip('@').strip('/').lower()


def _get_channel_handle_map() -> dict[str, str]:
    global _channel_handle_map

    if _channel_handle_map is None:
        _channel_handle_map = handle_map_cache.get_default('_default', {})

    return _channel_handle_map or {}


def _save_channel_handle_map(handles: dict[str, str]) -> None:
    handle_map_cache.set('_default', handles)


def _channel_handle_to_url(handle: str) -> str:
    handle = handle.strip()
    if not handle:
        raise ValueError('Channel handle is required.')

    if handle.startswith(('http://', 'https://')):
        return handle.rstrip('/')

    if handle.startswith(('youtube.com/', 'www.youtube.com/')):
        return f'https://{handle.rstrip("/")}'

    if handle.startswith('/@'):
        return f'https://www.youtube.com{handle.rstrip("/")}'

    if handle.startswith('@'):
        return f'https://www.youtube.com/@{handle.lstrip("@")}'

    return f'https://www.youtube.com/@{handle}'


def resolve_channel_handle(handle: str) -> str:
    """Resolve a @handle or channel vanity URL to a channel ID."""

    handle = handle.strip()
    if handle.startswith('UC') and '@' not in handle and '/' not in handle:
        return handle

    cache_key = _normalize_handle_cache_key(handle)
    handle_map = _get_channel_handle_map()
    if cached_channel_id := handle_map.get(cache_key):
        return cached_channel_id

    url = _channel_handle_to_url(handle)

    try:
        response = client('navigation/resolve_url', body={'url': url})
    except RequestError as exc:
        raise ValueError(f'Could not resolve channel handle: {handle}') from exc

    channel_id = (
        response.get('endpoint', {})
        .get('browseEndpoint', {})
        .get('browseId', '')
    )
    if not channel_id:
        raise ValueError(f'Could not resolve channel handle: {handle}')

    handle_map[cache_key] = channel_id
    _save_channel_handle_map(handle_map)

    return channel_id


def _get_about_channel_view_model(about_response: dict) -> dict:
    for endpoint in about_response.get('onResponseReceivedEndpoints', []):
        panel = endpoint.get('showEngagementPanelEndpoint', {}).get('engagementPanel', {})
        sections = (
            panel.get('engagementPanelSectionListRenderer', {})
            .get('content', {})
            .get('sectionListRenderer', {})
            .get('contents', [])
        )
        for section in sections:
            for item in section.get('itemSectionRenderer', {}).get('contents', []):
                if about := item.get('aboutChannelRenderer'):
                    return about.get('metadata', {}).get('aboutChannelViewModel', {})

    return {}


def _parse_channel_social(link_view_model: dict) -> ChannelSocial | None:
    platform = link_view_model.get('title', {}).get('content', '')
    link_obj = link_view_model.get('link', {})
    display_url = link_obj.get('content', '')
    tracked_url = ''

    for run in link_obj.get('commandRuns', []):
        tracked_url = _extract_tracked_url(
            run.get('onTap', {}).get('innertubeCommand', {})
        )
        if tracked_url:
            break

    url = _clean_tracked_url(tracked_url) or display_url
    if not platform or not url:
        return None

    social: ChannelSocial = {
        'platform': platform,
        'url': url,
    }
    if display_url and display_url != url:
        social['display_url'] = display_url
    return social


def _parse_channel_video_player(renderer: dict) -> FeedItem:
    video_id = renderer.get('videoId', '')
    return FeedItem(
        type='video',
        id=video_id,
        title=get_text(renderer.get('title')),
        url=links.video_url(video_id),
        thumbnail_url=links.video_thumbnail_url(video_id),
        description=get_text(renderer.get('description')),
    )


def _parse_shorts_lockup(shorts: dict) -> FeedItem | None:
    video_id = (
        shorts.get('onTap', {})
        .get('innertubeCommand', {})
        .get('watchEndpoint', {})
        .get('videoId', '')
    )
    if not video_id:
        entity_id = shorts.get('entityId', '')
        if entity_id.startswith('shorts-shelf-item-'):
            video_id = entity_id.removeprefix('shorts-shelf-item-')

    if not video_id:
        return None

    title = shorts.get('overlayMetadata', {}).get('primaryText', {}).get('content', '')
    if not title:
        title = shorts.get('accessibilityText', '')

    return FeedItem(
        type='video',
        id=video_id,
        title=title,
        url=links.video_url(video_id),
        thumbnail_url=get_thumbnail_url(
            shorts.get('thumbnailViewModel', {})
            .get('image', {})
            .get('sources', [])
        ),
        length_text=shorts.get('overlayMetadata', {}).get('secondaryText', {}).get('content', ''),
    )


def _parse_backstage_post(thread: dict) -> FeedItem | None:
    post = thread.get('post', {}).get('backstagePostRenderer', {})
    post_id = post.get('postId', '')
    if not post_id:
        return None

    content = get_text(post.get('contentText'))
    return FeedItem(
        type='unknown',
        id=post_id,
        title=content.split('\n', 1)[0][:120] if content else 'Post',
        url=links.channel_url(
            post.get('authorEndpoint', {})
            .get('browseEndpoint', {})
            .get('browseId', '')
        ),
        description=content,
        published_text=get_text(post.get('publishedTimeText')),
        thumbnail_url=get_thumbnail_url(post.get('authorThumbnail', {}).get('thumbnails', [])),
    )


def _parse_shelf_items(shelf: dict) -> list[FeedItem]:
    items: list[FeedItem] = []
    content = shelf.get('content', {})

    for container_key in ('horizontalListRenderer', 'gridRenderer', 'expandedShelfContentsRenderer'):
        if container := content.get(container_key):
            for item in container.get('items', []):
                if entry := parse_innertube_search_item(item):
                    items.append(entry)
                elif rich := item.get('richItemRenderer', {}).get('content', {}):
                    if entry := parse_innertube_search_item(rich):
                        items.append(entry)

    return items


def _infer_shelf_feed_type(shelf: dict, items: list[FeedItem]) -> str:
    if _playlist_id_from_shelf(shelf):
        return 'playlist'
    title = get_text(shelf.get('title')).lower()
    if 'short' in title:
        return 'shorts'
    if any(item['type'] == 'playlist' for item in items):
        return 'playlists'
    if any(item['type'] == 'channel' for item in items):
        return 'channels'
    if any(item['type'] == 'video' for item in items):
        return 'videos'
    return 'shelf'


def _parse_home_feed_collections(home_response: dict) -> list[FeedCollection]:
    feeds: list[FeedCollection] = []

    for index, section in enumerate(_get_tab_sections(home_response, 'Home')):
        for item in section.get('itemSectionRenderer', {}).get('contents', []):
            if featured := item.get('channelVideoPlayerRenderer'):
                video_id = featured.get('videoId', '')
                feeds.append(FeedCollection(
                    feed_id=f'featured-video-{video_id}' if video_id else f'featured-video-{index}',
                    feed_type='featured_video',
                    title='Featured video',
                    items=[_parse_channel_video_player(featured)],
                ))
                continue

            if shelf := item.get('shelfRenderer'):
                title = get_text(shelf.get('title')) or 'Videos'
                items = _parse_shelf_items(shelf)
                if not items:
                    continue
                feeds.append(FeedCollection(
                    feed_id=_shelf_feed_id(shelf, title, index),
                    feed_type=_infer_shelf_feed_type(shelf, items),
                    title=title,
                    items=items,
                ))
                continue

            if reel := item.get('reelShelfRenderer'):
                title = get_text(reel.get('title')) or 'Shorts'
                items: list[FeedItem] = []
                for reel_item in reel.get('items', []):
                    if shorts := reel_item.get('shortsLockupViewModel'):
                        if entry := _parse_shorts_lockup(shorts):
                            items.append(entry)
                if items:
                    feeds.append(FeedCollection(
                        feed_id=_feed_id(title, index),
                        feed_type='shorts',
                        title=title,
                        items=items,
                    ))

    return feeds


def _parse_posts_feed_collection(posts_response: dict) -> FeedCollection | None:
    items: list[FeedItem] = []
    for section in _get_tab_sections(posts_response, 'Posts'):
        for item in section.get('itemSectionRenderer', {}).get('contents', []):
            if thread := item.get('backstagePostThreadRenderer'):
                if entry := _parse_backstage_post(thread):
                    items.append(entry)

    if not items:
        return None

    return FeedCollection(
        feed_id='posts',
        feed_type='posts',
        title='Posts',
        items=items,
    )


def _parse_latest_videos_feed_collection(videos_response: dict) -> FeedCollection | None:
    items: list[FeedItem] = []

    for section in _get_tab_sections(videos_response, 'Videos'):
        if rich_grid := section.get('richGridRenderer'):
            for item in rich_grid.get('contents', []):
                content = item.get('richItemRenderer', {}).get('content', {})
                if entry := parse_innertube_search_item(content):
                    items.append(entry)

    if not items:
        return None

    return FeedCollection(
        feed_id='latest-videos',
        feed_type='videos',
        title='Latest videos',
        items=items,
    )


def parse_channel_page_channel(
    channel_id: str,
    browse_response: dict,
    about_response: dict | None = None,
) -> ChannelPageChannel:
    metadata = browse_response.get('metadata', {}).get('channelMetadataRenderer', {})
    about_view = _get_about_channel_view_model(about_response or {})

    page_header = browse_response.get('header', {}).get('pageHeaderRenderer', {})
    page_header_view_model = page_header.get('content', {}).get('pageHeaderViewModel', {})
    metadata_rows = (
        page_header_view_model.get('metadata', {})
        .get('contentMetadataViewModel', {})
        .get('metadataRows', [])
    )
    header_texts = _parse_metadata_texts(metadata_rows)

    channel_name = (
        page_header.get('pageTitle', '')
        or metadata.get('title', '')
        or header_texts[0].lstrip('@')
    )
    channel_handle = ''
    if header_texts and header_texts[0].startswith('@'):
        channel_handle = header_texts[0].lstrip('@')
    if not channel_handle and metadata.get('ownerUrls'):
        channel_handle = _parse_channel_handle_from_url(metadata['ownerUrls'][0])

    subscriber_count = about_view.get('subscriberCountText', '')
    video_count = about_view.get('videoCountText', '')
    for text in header_texts:
        lower_text = text.lower()
        if 'subscriber' in lower_text and not subscriber_count:
            subscriber_count = text
        if 'video' in lower_text and not video_count:
            video_count = text

    is_verified, is_creator = _parse_header_verification(page_header_view_model)
    if not is_verified and not is_creator:
        is_verified, is_creator = _parse_channel_badges(
            page_header_view_model.get('badges', [])
        )

    featured_socials: list[ChannelSocial] = []
    for link in about_view.get('links', []):
        if social := _parse_channel_social(link.get('channelExternalLinkViewModel', {})):
            featured_socials.append(social)

    return ChannelPageChannel(
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_name=channel_name,
        channel_url=links.channel_url(channel_id),
        user_url=links.user_url(channel_handle),
        thumbnail_url=get_thumbnail_url(metadata.get('avatar', {}).get('thumbnails', [])),
        description=about_view.get('description') or metadata.get('description', ''),
        subscriber_count=subscriber_count,
        video_count=video_count,
        view_count=about_view.get('viewCountText', ''),
        join_date=about_view.get('joinedDateText', {}).get('content', ''),
        country=about_view.get('country', ''),
        is_verified=is_verified,
        is_creator=is_creator,
        featured_socials=featured_socials,
    )


def get_channel_data_innertube(channel_id: str) -> ChannelPageData:
    """Fetch channel page data from the innertube browse API."""

    browse_response = client.browse(browse_id=channel_id)
    home_params = _get_tab_params(browse_response, 'Home')
    about_params = _get_tab_params(browse_response, 'About') or CHANNEL_ABOUT_PARAMS
    posts_params = _get_tab_params(browse_response, 'Posts')
    videos_params = _get_tab_params(browse_response, 'Videos')

    about_response = client.browse(browse_id=channel_id, params=about_params)
    home_response = (
        client.browse(browse_id=channel_id, params=home_params)
        if home_params
        else browse_response
    )
    posts_response = (
        client.browse(browse_id=channel_id, params=posts_params)
        if posts_params
        else None
    )
    videos_response = (
        client.browse(browse_id=channel_id, params=videos_params)
        if videos_params
        else None
    )

    feeds = _parse_home_feed_collections(home_response)
    if posts_response:
        if posts_feed := _parse_posts_feed_collection(posts_response):
            feeds.append(posts_feed)
    if videos_response:
        if videos_feed := _parse_latest_videos_feed_collection(videos_response):
            feeds.append(videos_feed)

    return ChannelPageData(
        channel_id=channel_id,
        fetched_at=int(datetime.now().timestamp()),
        channel=parse_channel_page_channel(channel_id, browse_response, about_response),
        feeds=feeds,
    )


def get_channel_data(channel_id: str, nocache: bool = False) -> ChannelPageData:
    """Fetch channel page data from the innertube browse API, with caching."""

    cached = data_cache.get(channel_id)

    if cached and not nocache:
        return cached

    data = get_channel_data_innertube(channel_id)

    data_cache.set(channel_id, data)

    return data


def get_channel_videos_innertube(
    channel_id: str,
    sort: ChannelVideosSort = 'dd',
    continuation_token: str | None = None,
) -> ChannelVideosPage:
    """Fetch one sorted page of channel videos from the innertube browse API."""

    if sort not in videos_caches:
        raise ValueError(f'Unsupported channel video sort: {sort}')

    if continuation_token:
        videos_response = client.browse(continuation=continuation_token)
    else:
        channel_response = client.browse(browse_id=channel_id)
        videos_params = _get_tab_params(channel_response, 'Videos')
        if not videos_params:
            return ChannelVideosPage(
                channel_id=channel_id,
                fetched_at=int(datetime.now().timestamp()),
                sort=sort,
                continuation_token='',
                entries=[],
            )

        videos_response = client.browse(
            browse_id=channel_id,
            params=videos_params,
        )
        if sort != 'dd':
            sort_token, sort_params = _get_channel_video_sort_endpoint(
                videos_response,
                sort,
            )
            if sort_token:
                videos_response = client.browse(continuation=sort_token)
            elif sort_params:
                videos_response = client.browse(
                    browse_id=channel_id,
                    params=sort_params,
                )

    items = _get_channel_video_items(videos_response)
    return ChannelVideosPage(
        channel_id=channel_id,
        fetched_at=int(datetime.now().timestamp()),
        sort=sort,
        continuation_token=_get_continuation_token(items),
        entries=_parse_channel_video_items(items),
    )


def get_channel_videos_page(
    channel_id: str,
    sort: ChannelVideosSort = 'dd',
    page_number: int = 1,
) -> ChannelVideosPage:
    """Get a sorted channel video page, persisting each API page in the cache."""

    if sort not in videos_caches:
        raise ValueError(f'Unsupported channel video sort: {sort}')
    if page_number < 1:
        raise ValueError('Page number must be at least 1.')

    return videos_caches[sort].get_item_default(channel_id, page_number - 1)


def get_channel_playlists_innertube(
    channel_id: str,
    sort: ChannelPlaylistsSort = 'pn',
) -> list[ChannelPlaylist]:
    """Fetch all channel playlists in the requested order from innertube."""

    if sort not in playlists_caches:
        raise ValueError(f'Unsupported channel playlist sort: {sort}')

    channel_response = client.browse(browse_id=channel_id)
    playlists_params = _get_tab_params(channel_response, 'Playlists')
    if not playlists_params:
        return []

    playlists_response = client.browse(
        browse_id=channel_id,
        params=playlists_params,
    )
    if sort == 'lad':
        sort_params = _get_channel_playlist_sort_params(
            playlists_response,
            sort,
        )
        if sort_params:
            playlists_response = client.browse(
                browse_id=channel_id,
                params=sort_params,
            )

    entries: list[ChannelPlaylist] = []
    seen_tokens: set[str] = set()
    while True:
        items = _get_channel_playlist_items(playlists_response)
        entries.extend(_parse_channel_playlist_items(items))

        continuation_token = _get_continuation_token(items)
        if not continuation_token or continuation_token in seen_tokens:
            break
        seen_tokens.add(continuation_token)
        playlists_response = client.browse(continuation=continuation_token)

    if sort == 'pn':
        entries.sort(key=lambda playlist: playlist['title'].casefold())

    return entries


def _populate_channel_playlists_cache(
    channel_id: str,
    sort: ChannelPlaylistsSort,
) -> None:
    entries = get_channel_playlists_innertube(channel_id, sort)
    total_entries = len(entries)
    total_pages = max(
        1,
        (
            total_entries + CHANNEL_PLAYLISTS_PAGE_SIZE - 1
        ) // CHANNEL_PLAYLISTS_PAGE_SIZE,
    )

    playlists_cache = playlists_caches[sort]
    playlists_cache.clear(channel_id)
    for page_index in range(total_pages):
        start = page_index * CHANNEL_PLAYLISTS_PAGE_SIZE
        end = start + CHANNEL_PLAYLISTS_PAGE_SIZE
        playlists_cache.append(
            channel_id,
            ChannelPlaylistsPage(
                channel_id=channel_id,
                fetched_at=int(datetime.now().timestamp()),
                sort=sort,
                page_number=page_index + 1,
                total_pages=total_pages,
                total_entries=total_entries,
                entries=entries[start:end],
            ),
        )


def get_channel_playlists_page(
    channel_id: str,
    sort: ChannelPlaylistsSort = 'pn',
    page_number: int = 1,
) -> ChannelPlaylistsPage:
    """Get a cached page of channel playlists in the requested order."""

    if sort not in playlists_caches:
        raise ValueError(f'Unsupported channel playlist sort: {sort}')
    if page_number < 1:
        raise ValueError('Page number must be at least 1.')

    playlists_cache = playlists_caches[sort]
    if playlists_cache.is_empty(channel_id):
        _populate_channel_playlists_cache(channel_id, sort)

    page = playlists_cache.get_item(channel_id, page_number - 1)
    if page is None:
        raise IndexError(
            f'Playlist page {page_number} does not exist for channel {channel_id}.'
        )
    return page
