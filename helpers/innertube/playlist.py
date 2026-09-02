from datetime import datetime
from typing import TypedDict

from helpers import links
from helpers.cache import CacheData, CacheDataList, CacheManager
from helpers.parsers import parse_count

from . import client
from .search import parse_innertube_search_item
from .utils import get_first_run, get_text, get_thumbnail_url


PLAYLIST_PAGE_SIZE = 100


class PlaylistMetadata(TypedDict):
    playlist_id: str
    title: str
    description: str
    video_count: int
    video_count_text: str
    view_count_text: str
    first_video_id: str
    play_all_url: str
    owner_name: str
    owner_channel_id: str
    owner_url: str
    owner_thumbnail_url: str


class PlaylistVideo(TypedDict):
    video_id: str
    title: str
    url: str
    thumbnail_url: str
    length_text: str
    viewcount_text: str
    channel_name: str
    channel_id: str
    channel_url: str
    index: int


class PlaylistPageData(TypedDict):
    playlist_id: str
    fetched_at: int
    page_number: int
    continuation_token: str
    playlist: PlaylistMetadata
    entries: list[PlaylistVideo]


class PlaylistHudData(TypedDict):
    playlist_id: str
    list_id: str
    list_type: str
    title: str
    owner_name: str
    owner_url: str
    owner_thumbnail_url: str
    list_length: int
    current_position: int
    playing_index: int
    index_offset: int
    video_ids: list[str]
    entries: list[PlaylistVideo]


cache = CacheManager(collection='playlist')
video_data_cache = CacheData[dict[str, PlaylistVideo]](
    cache,
    'video_data',
    ttl=None,
)


def _playlist_cache_item_gen(
    playlist_id: str,
    previous_page: PlaylistPageData | None,
) -> PlaylistPageData:
    if previous_page and not previous_page['continuation_token']:
        raise IndexError(f'Playlist {playlist_id} has no next page.')

    return get_playlist_page_innertube(
        playlist_id,
        continuation_token=(
            previous_page['continuation_token'] if previous_page else None
        ),
        playlist=previous_page['playlist'] if previous_page else None,
        page_number=previous_page['page_number'] + 1 if previous_page else 1,
    )


pages_cache = CacheDataList[PlaylistPageData](
    cache,
    'pages',
    ttl=None,
    item_gen=_playlist_cache_item_gen,
    depends_on_previous=True,
)


def _channel_url_from_endpoint(endpoint: dict) -> str:
    browse = endpoint.get('browseEndpoint', {})
    canonical_url = browse.get('canonicalBaseUrl', '')
    if canonical_url.startswith('/@'):
        return links.user_url(canonical_url.removeprefix('/@').strip('/'))
    return links.channel_url(browse.get('browseId', ''))


def _get_playlist_sidebar_renderers(response: dict) -> tuple[dict, dict]:
    primary: dict = {}
    secondary: dict = {}
    sidebar_items = (
        response.get('sidebar', {})
        .get('playlistSidebarRenderer', {})
        .get('items', [])
    )
    for item in sidebar_items:
        if renderer := item.get('playlistSidebarPrimaryInfoRenderer'):
            primary = renderer
        if renderer := item.get('playlistSidebarSecondaryInfoRenderer'):
            secondary = renderer
    return primary, secondary


def _find_stat(stats: list[dict], marker: str) -> str:
    marker = marker.lower()
    for stat in stats:
        text = get_text(stat)
        if marker in text.lower():
            return text
    return ''


def _get_first_video_id(header: dict, primary: dict) -> str:
    video_id = (
        header.get('playButton', {})
        .get('buttonRenderer', {})
        .get('navigationEndpoint', {})
        .get('watchEndpoint', {})
        .get('videoId', '')
    )
    if video_id:
        return video_id

    for run in primary.get('title', {}).get('runs', []):
        video_id = (
            run.get('navigationEndpoint', {})
            .get('watchEndpoint', {})
            .get('videoId', '')
        )
        if video_id:
            return video_id
    return ''


def _parse_playlist_metadata(
    playlist_id: str,
    response: dict,
) -> PlaylistMetadata:
    header = response.get('header', {}).get('playlistHeaderRenderer', {})
    primary, secondary = _get_playlist_sidebar_renderers(response)

    title = get_text(header.get('title')) or get_text(primary.get('title'))
    if not title:
        title = (
            response.get('metadata', {})
            .get('playlistMetadataRenderer', {})
            .get('title', '')
        )

    stats = header.get('stats', []) or primary.get('stats', [])
    video_count_text = (
        get_text(header.get('numVideosText'))
        or _find_stat(stats, 'video')
    )
    view_count_text = (
        get_text(header.get('viewCountText'))
        or _find_stat(stats, 'view')
    )

    owner_name = ''
    owner_channel_id = ''
    owner_url = ''
    owner_thumbnail_url = ''

    owner_run = get_first_run(header.get('ownerText'))
    if owner_run:
        owner_name = owner_run.get('text', '')
        owner_endpoint = owner_run.get('navigationEndpoint', {})
        owner_channel_id = (
            owner_endpoint.get('browseEndpoint', {}).get('browseId', '')
        )
        owner_url = _channel_url_from_endpoint(owner_endpoint)

    video_owner = (
        secondary.get('videoOwner', {})
        .get('videoOwnerRenderer', {})
    )
    if video_owner:
        owner_run = get_first_run(video_owner.get('title'))
        owner_name = owner_name or owner_run.get('text', '')
        owner_endpoint = video_owner.get('navigationEndpoint', {})
        owner_channel_id = (
            owner_channel_id
            or owner_endpoint.get('browseEndpoint', {}).get('browseId', '')
        )
        owner_url = owner_url or _channel_url_from_endpoint(owner_endpoint)
        owner_thumbnail_url = get_thumbnail_url(
            video_owner.get('thumbnail', {}).get('thumbnails', [])
        )

    if not owner_url:
        owner_url = links.channel_url(owner_channel_id)

    first_video_id = _get_first_video_id(header, primary)
    return PlaylistMetadata(
        playlist_id=playlist_id,
        title=title,
        description=get_text(primary.get('description')),
        video_count=parse_count(video_count_text),
        video_count_text=video_count_text,
        view_count_text=view_count_text,
        first_video_id=first_video_id,
        play_all_url=(
            links.video_url(first_video_id, playlist_id)
            if first_video_id
            else f'/playlist?list={playlist_id}'
        ),
        owner_name=owner_name,
        owner_channel_id=owner_channel_id,
        owner_url=owner_url,
        owner_thumbnail_url=owner_thumbnail_url,
    )


def _get_playlist_items(response: dict) -> list[dict]:
    items: list[dict] = []
    tabs = (
        response.get('contents', {})
        .get('twoColumnBrowseResultsRenderer', {})
        .get('tabs', [])
    )
    for tab in tabs:
        tab_renderer = tab.get('tabRenderer', {})
        if not tab_renderer.get('selected'):
            continue
        sections = (
            tab_renderer.get('content', {})
            .get('sectionListRenderer', {})
            .get('contents', [])
        )
        for section in sections:
            contents = (
                section.get('itemSectionRenderer', {})
                .get('contents', [])
            )
            for content in contents:
                if video_list := content.get('playlistVideoListRenderer'):
                    items.extend(video_list.get('contents', []))
                else:
                    items.append(content)

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


def _get_continuation_token(items: list[dict]) -> str:
    for item in items:
        if continuation := item.get('continuationItemRenderer'):
            return (
                continuation.get('continuationEndpoint', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
    return ''


def _parse_playlist_video_lockup(
    item: dict,
    playlist_id: str,
    fallback_index: int,
) -> PlaylistVideo | None:
    lockup = item.get('lockupViewModel', {})
    if lockup.get('contentType') != 'LOCKUP_CONTENT_TYPE_VIDEO':
        return None

    parsed = parse_innertube_search_item(item)
    if not parsed or parsed['type'] != 'video':
        return None

    watch_endpoint = (
        lockup.get('rendererContext', {})
        .get('commandContext', {})
        .get('onTap', {})
        .get('innertubeCommand', {})
        .get('watchEndpoint', {})
    )
    endpoint_index = watch_endpoint.get('index')
    index = (
        int(endpoint_index) + 1
        if endpoint_index is not None
        else fallback_index
    )
    video_id = parsed['id']
    return PlaylistVideo(
        video_id=video_id,
        title=parsed['title'],
        url=f'/watch?v={video_id}&list={playlist_id}&index={index}',
        thumbnail_url=parsed['thumbnail_url'],
        length_text=parsed.get('length_text', ''),
        viewcount_text=parsed.get('viewcount_text', ''),
        channel_name=parsed.get('channel_name', ''),
        channel_id=parsed.get('channel_id', ''),
        channel_url=parsed.get('channel_url', ''),
        index=index,
    )


def _parse_legacy_playlist_video(
    item: dict,
    playlist_id: str,
    fallback_index: int,
) -> PlaylistVideo | None:
    renderer = item.get('playlistVideoRenderer', {})
    video_id = renderer.get('videoId', '')
    if not video_id:
        return None

    index = parse_count(get_text(renderer.get('index'))) or fallback_index
    owner_run = get_first_run(renderer.get('shortBylineText'))
    owner_endpoint = owner_run.get('navigationEndpoint', {})
    return PlaylistVideo(
        video_id=video_id,
        title=get_text(renderer.get('title')),
        url=f'/watch?v={video_id}&list={playlist_id}&index={index}',
        thumbnail_url=get_thumbnail_url(
            renderer.get('thumbnail', {}).get('thumbnails', [])
        ),
        length_text=get_text(renderer.get('lengthText')),
        viewcount_text=get_text(renderer.get('videoInfo')),
        channel_name=owner_run.get('text', ''),
        channel_id=(
            owner_endpoint.get('browseEndpoint', {}).get('browseId', '')
        ),
        channel_url=_channel_url_from_endpoint(owner_endpoint),
        index=index,
    )


def _parse_playlist_videos(
    items: list[dict],
    playlist_id: str,
    page_number: int,
) -> list[PlaylistVideo]:
    entries: list[PlaylistVideo] = []
    page_offset = (page_number - 1) * PLAYLIST_PAGE_SIZE
    for item in items:
        fallback_index = page_offset + len(entries) + 1
        entry = (
            _parse_playlist_video_lockup(item, playlist_id, fallback_index)
            or _parse_legacy_playlist_video(item, playlist_id, fallback_index)
        )
        if entry:
            entries.append(entry)
    return entries


def get_playlist_page_innertube(
    playlist_id: str,
    continuation_token: str | None = None,
    playlist: PlaylistMetadata | None = None,
    page_number: int = 1,
) -> PlaylistPageData:
    """Fetch one page of a playlist from the innertube browse API."""

    if continuation_token:
        response = client.browse(continuation=continuation_token)
    else:
        response = client.browse(browse_id=f'VL{playlist_id}')

    if playlist is None:
        playlist = _parse_playlist_metadata(playlist_id, response)
        if not playlist['title']:
            raise ValueError(f'Playlist not found: {playlist_id}')

    items = _get_playlist_items(response)
    return PlaylistPageData(
        playlist_id=playlist_id,
        fetched_at=int(datetime.now().timestamp()),
        page_number=page_number,
        continuation_token=_get_continuation_token(items),
        playlist=playlist,
        entries=_parse_playlist_videos(items, playlist_id, page_number),
    )


def get_playlist_page(
    playlist_id: str,
    page_number: int = 1,
) -> PlaylistPageData:
    """Get a playlist page, persisting API continuations in the cache."""

    if not playlist_id:
        raise ValueError('Playlist ID is required.')
    if page_number < 1:
        raise ValueError('Page number must be at least 1.')

    cached_page = pages_cache.get_item(playlist_id, page_number - 1)
    if cached_page is not None:
        if page_number > 1 and not cached_page['entries']:
            raise IndexError(f'Playlist {playlist_id} has no page {page_number}.')
        return cached_page

    if page_number > 1:
        previous_page = get_playlist_page(playlist_id, page_number - 1)
        if not previous_page['continuation_token']:
            raise IndexError(f'Playlist {playlist_id} has no page {page_number}.')

    return pages_cache.get_item_default(playlist_id, page_number - 1)


def get_playlist_hud_data(
    playlist_id: str,
    video_id: str,
    requested_index: int | None = None,
) -> PlaylistHudData:
    """Get playlist entries surrounding the currently playing video."""

    first_page = get_playlist_page(playlist_id)
    playlist = first_page['playlist']
    current_page_number = 1
    if requested_index and requested_index > 0:
        current_page_number = (
            (requested_index - 1) // PLAYLIST_PAGE_SIZE
        ) + 1

    current_page = (
        first_page
        if current_page_number == 1
        else get_playlist_page(playlist_id, current_page_number)
    )
    current_entry = next(
        (
            entry
            for entry in current_page['entries']
            if entry['video_id'] == video_id
            and (
                not requested_index
                or entry['index'] == requested_index
            )
        ),
        None,
    )
    if current_entry is None:
        current_entry = next(
            (
                entry
                for entry in current_page['entries']
                if entry['video_id'] == video_id
            ),
            None,
        )

    if current_entry is None and current_page_number != 1:
        current_entry = next(
            (
                entry
                for entry in first_page['entries']
                if entry['video_id'] == video_id
            ),
            None,
        )
        if current_entry:
            current_page_number = 1
            current_page = first_page

    if current_entry is None:
        page = first_page
        page_number = 1
        while page['continuation_token']:
            page_number += 1
            if page_number == current_page_number:
                page = current_page
                continue
            page = get_playlist_page(playlist_id, page_number)
            current_entry = next(
                (
                    entry
                    for entry in page['entries']
                    if entry['video_id'] == video_id
                ),
                None,
            )
            if current_entry:
                current_page_number = page_number
                current_page = page
                break

    if current_entry is None:
        raise ValueError(
            f'Video {video_id} was not found near the requested playlist position.'
        )

    start_page = max(1, current_page_number - 1)
    end_page = current_page_number + int(
        bool(current_page['continuation_token'])
    )
    entries: list[PlaylistVideo] = []
    for page_number in range(start_page, end_page + 1):
        page = (
            first_page
            if page_number == 1
            else get_playlist_page(playlist_id, page_number)
        )
        entries.extend(page['entries'])

    current_list_index = next(
        index
        for index, entry in enumerate(entries)
        if entry['video_id'] == video_id
        and entry['index'] == current_entry['index']
    )
    index_offset = entries[0]['index'] - 1 if entries else 0
    list_type = playlist_id[:2] if len(playlist_id) >= 2 else 'PL'
    list_id = playlist_id[2:] if len(playlist_id) >= 2 else playlist_id
    cached_video_data = video_data_cache.get_default('_hud', {})
    cached_video_data.update({
        entry['video_id']: entry
        for entry in entries
    })
    video_data_cache.set('_hud', cached_video_data)

    return PlaylistHudData(
        playlist_id=playlist_id,
        list_id=list_id,
        list_type=list_type,
        title=playlist['title'],
        owner_name=playlist['owner_name'],
        owner_url=playlist['owner_url'],
        owner_thumbnail_url=playlist['owner_thumbnail_url'],
        list_length=playlist['video_count'],
        current_position=current_entry['index'],
        playing_index=current_list_index,
        index_offset=index_offset,
        video_ids=[entry['video_id'] for entry in entries],
        entries=entries,
    )


def get_playlist_video_info(video_ids: list[str]) -> dict[str, dict[str, str]]:
    """Return the legacy playlist HUD metadata for cached playlist videos."""

    cached_video_data = video_data_cache.get_default('_hud', {})
    return {
        video_id: {
            'id': video_id,
            'title': cached_video_data[video_id]['title'],
            'display_name': cached_video_data[video_id]['channel_name'],
            'thumb_url': cached_video_data[video_id]['thumbnail_url'],
        }
        for video_id in video_ids
        if video_id in cached_video_data
    }
