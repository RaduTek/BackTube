import base64
import hashlib
from datetime import datetime, timedelta
from typing import TypedDict

from . import client, FeedItem
from .. import links
from .utils import get_text, get_first_run, get_channel_from_byline, get_thumbnail_url
from ..cache import CacheDataList, CacheManager
from ..rydratings import get_ratings_for_videos

from logger import logger

class SearchResultsPage(TypedDict):
    search_query: str
    search_params: str
    fetched_at: int
    estimated_results: int
    continuation_token: str
    entries: list['FeedItem']


class SearchFilters(TypedDict, total=False):
    search_type: str
    search_sort: str
    uploaded: str
    search_duration: str
    search_category: str
    closed_captions: bool
    high_definition: bool
    partner: bool
    rental: bool
    webm: bool
    creative_commons: bool
    three_d: bool


SEARCH_TYPE_PROTO = {
    'videos': 1,
    'search_videos': 1,
    'search_users': 2,
    'search_playlists': 3,
}
SEARCH_SORT_PROTO = {
    'video_avg_rating': 1,
    'video_date_uploaded': 2,
    'video_view_count': 3,
}
SEARCH_UPLOADED_PROTO = {
    'h': 1,
    'd': 2,
    'w': 3,
    'm': 4,
    'y': 5,
}
SEARCH_DURATION_PROTO = {
    'short': 1,
    'long': 2,
    'medium': 3,
}
CATEGORY_QUERY_TERMS = {
    '1': 'Film Animation',
    '2': 'Autos Vehicles',
    '10': 'Music',
    '15': 'Pets Animals',
    '17': 'Sports',
    '19': 'Travel Events',
    '20': 'Gaming',
    '22': 'People Blogs',
    '23': 'Comedy',
    '24': 'Entertainment',
    '25': 'News Politics',
    '26': 'Howto Style',
    '27': 'Education',
    '28': 'Science Technology',
    '29': 'Nonprofits Activism',
}


def _encode_varint(value: int) -> bytes:
    parts = bytearray()
    while value > 0x7F:
        parts.append((value & 0x7F) | 0x80)
        value >>= 7
    parts.append(value)
    return bytes(parts)


def _encode_key(field: int, wire_type: int) -> bytes:
    return _encode_varint((field << 3) | wire_type)


def _encode_varint_field(field: int, value: int) -> bytes:
    return _encode_key(field, 0) + _encode_varint(value)


def _encode_bool_field(field: int, value: bool) -> bytes:
    if not value:
        return b''
    return _encode_varint_field(field, 1)


def _encode_message_field(field: int, payload: bytes) -> bytes:
    if not payload:
        return b''
    return _encode_key(field, 2) + _encode_varint(len(payload)) + payload


def encode_search_params(filters: SearchFilters | None = None) -> str:
    """Encode YouTube Innertube search filters as a protobuf `params` string."""

    filters = filters or {}
    filter_bytes = b''.join((
        _encode_varint_field(1, SEARCH_UPLOADED_PROTO[uploaded])
        if (uploaded := filters.get('uploaded', '')) in SEARCH_UPLOADED_PROTO
        else b'',
        _encode_varint_field(2, SEARCH_TYPE_PROTO[search_type])
        if (search_type := filters.get('search_type', '')) in SEARCH_TYPE_PROTO
        else b'',
        _encode_varint_field(3, SEARCH_DURATION_PROTO[duration])
        if (duration := filters.get('search_duration', '')) in SEARCH_DURATION_PROTO
        else b'',
        _encode_bool_field(4, bool(filters.get('high_definition'))),
        _encode_bool_field(5, bool(filters.get('closed_captions'))),
        _encode_bool_field(6, bool(filters.get('creative_commons'))),
        _encode_bool_field(7, bool(filters.get('three_d'))),
        _encode_bool_field(9, bool(filters.get('rental'))),
    ))

    payload = b''.join((
        _encode_varint_field(1, SEARCH_SORT_PROTO[sort])
        if (sort := filters.get('search_sort', '')) in SEARCH_SORT_PROTO
        else b'',
        _encode_message_field(2, filter_bytes),
    ))
    if not payload:
        return ''

    return base64.b64encode(payload).decode('ascii')


def apply_category_query(query: str, category: str | None = None) -> str:
    """Append a category keyword when Innertube has no category filter."""

    term = CATEGORY_QUERY_TERMS.get((category or '').strip(), '')
    if not term:
        raw = (category or '').strip()
        if '}' in raw:
            raw = raw.rsplit('}', 1)[-1]
        lowered = raw.lower().replace('&', ' ')
        for category_id, label in CATEGORY_QUERY_TERMS.items():
            if lowered in {label.lower(), category_id}:
                term = label
                break
        if not term and raw and not raw.isdigit():
            term = raw
    if term and term.lower() not in query.lower():
        return f'{query} {term}'.strip()
    return query


cache = CacheManager('search_results', ttl=timedelta(minutes=30))

def results_cache_item_gen(key: str, previous_item: SearchResultsPage | None) -> SearchResultsPage:
    if not previous_item:
        raise ValueError("Previous item is required for generating the next page of search results.")
    
    return get_search_results_innertube(
        previous_item.get('search_query'),
        previous_item.get('continuation_token'),
        search_params=previous_item.get('search_params'),
    )

results_cache = CacheDataList[SearchResultsPage](cache, 'results_pages', item_gen=results_cache_item_gen, depends_on_previous=True)


def _channel_handle_from_browse_endpoint(browse_endpoint: dict) -> str:
    canonical = browse_endpoint.get('canonicalBaseUrl', '')
    if '/@' in canonical:
        return canonical.rsplit('/@', 1)[-1].strip('/')
    return ''


def _channel_handle_from_byline(byline: dict | None) -> str:
    run = get_first_run(byline)
    return _channel_handle_from_browse_endpoint(
        run.get('navigationEndpoint', {})
        .get('browseEndpoint', {})
    )


def _channel_handle_from_command_text(text_obj: dict) -> str:
    for run in text_obj.get('commandRuns', []):
        if handle := _channel_handle_from_browse_endpoint(
            run.get('onTap', {})
            .get('innertubeCommand', {})
            .get('browseEndpoint', {})
        ):
            return handle
    return ''


def _prefer_channel_url(channel_id: str, channel_handle: str = '') -> str:
    if channel_handle:
        return links.user_url(channel_handle)
    return links.channel_url(channel_id)


def _video_description(video_renderer: dict) -> str:
    snippets = video_renderer.get('detailedMetadataSnippets') or []
    if not snippets:
        return ''
    return get_text(snippets[0].get('snippetText'), bold=True)


def _get_search_result_items(data: dict) -> list[dict]:
    """Get search result container items from an initial or continuation response."""

    if contents := (
        data.get('contents', {})
        .get('twoColumnSearchResultsRenderer', {})
        .get('primaryContents', {})
        .get('sectionListRenderer', {})
        .get('contents', [])
    ):
        return contents

    items: list[dict] = []
    for command in data.get('onResponseReceivedCommands', []):
        if action := command.get('appendContinuationItemsAction'):
            items.extend(action.get('continuationItems', []))
    return items


def _get_item_section_contents(data: dict) -> list[dict]:
    for item in _get_search_result_items(data):
        if item_section := item.get('itemSectionRenderer'):
            return item_section.get('contents', [])
    return []


def _get_continuation_token(data: dict) -> str:
    for item in _get_search_result_items(data):
        if continuation := item.get('continuationItemRenderer'):
            return (
                continuation.get('continuationEndpoint', {})
                .get('continuationCommand', {})
                .get('token', '')
            )
    return ''


def _playlist_video_count(lockup_renderer: dict) -> str:
    overlays = (
        lockup_renderer.get('contentImage', {})
        .get('collectionThumbnailViewModel', {})
        .get('primaryThumbnail', {})
        .get('thumbnailViewModel', {})
        .get('overlays', [])
    )
    for overlay in overlays:
        badge_overlay = overlay.get('thumbnailOverlayBadgeViewModel', {})
        for badge in badge_overlay.get('thumbnailBadges', []):
            text = badge.get('thumbnailBadgeViewModel', {}).get('text', '')
            if text:
                return text
    return ''


def _channel_id_from_command_text(text_obj: dict) -> str:
    for run in text_obj.get('commandRuns', []):
        browse_id = (
            run.get('onTap', {})
            .get('innertubeCommand', {})
            .get('browseEndpoint', {})
            .get('browseId', '')
        )
        if browse_id:
            return browse_id
    return ''


def _parse_playlist_preview_entry(
    text_obj: dict,
    playlist_id: str,
    channel_name: str,
    channel_id: str,
    channel_handle: str = '',
) -> FeedItem | None:
    content = text_obj.get('content', '')
    if not content or content in {'View full playlist', 'Playlist'}:
        return None

    title = content
    length_text = ''
    if ' · ' in content:
        title, length_text = content.rsplit(' · ', 1)

    video_id = ''
    for run in text_obj.get('commandRuns', []):
        video_id = (
            run.get('onTap', {})
            .get('innertubeCommand', {})
            .get('watchEndpoint', {})
            .get('videoId', '')
        )
        if video_id:
            break

    if not video_id:
        return None

    return FeedItem(
        type='video',
        id=video_id,
        title=title,
        url=links.video_url(video_id, playlist_id),

        thumbnail_url=links.video_thumbnail_url(video_id),
        length_text=length_text,

        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),
    )


def _parse_playlist_preview_entries(
    metadata_rows: list[dict],
    playlist_id: str,
    channel_name: str,
    channel_id: str,
    channel_handle: str = '',
) -> list[FeedItem]:
    entries: list[FeedItem] = []
    for row in metadata_rows:
        if row.get('isSpacerRow'):
            continue
        for part in row.get('metadataParts', []):
            text_obj = part.get('text', {})
            if preview := _parse_playlist_preview_entry(
                text_obj, playlist_id, channel_name, channel_id, channel_handle
            ):
                entries.append(preview)
    return entries


def parse_innertube_video_renderer(video_renderer: dict) -> FeedItem:
    """Parse a videoRenderer object from the innertube API into a SearchResultEntry."""

    video_id = video_renderer.get('videoId', '')
    channel_name, channel_id = get_channel_from_byline(video_renderer.get('longBylineText'))
    channel_handle = _channel_handle_from_byline(video_renderer.get('longBylineText'))

    return FeedItem(
        type='video',
        id=video_id,
        title=get_first_run(video_renderer.get('title')).get('text', ''),
        url=links.video_url(video_id),
        thumbnail_url=links.video_thumbnail_url(video_id),

        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),

        published_text=get_text(video_renderer.get('publishedTimeText')),
        description=_video_description(video_renderer),
        length_text=get_text(video_renderer.get('lengthText')),
        viewcount_text=get_text(video_renderer.get('viewCountText')),
    )


def parse_innertube_channel_renderer(channel_renderer: dict) -> FeedItem:
    """Parse a channelRenderer object from the innertube API into a SearchResultEntry."""

    channel_id = channel_renderer.get('channelId', '')
    title = get_text(channel_renderer.get('title'))
    channel_handle = _channel_handle_from_browse_endpoint(
        channel_renderer.get('navigationEndpoint', {})
        .get('browseEndpoint', {})
    )

    return FeedItem(
        type='channel',
        id=channel_id,
        title=title,
        url=_prefer_channel_url(channel_id, channel_handle),

        channel_name=title,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),

        description=get_text(channel_renderer.get('descriptionSnippet')),
        video_count=get_text(channel_renderer.get('videoCountText')),
        thumbnail_url=get_thumbnail_url(channel_renderer.get('thumbnail', {}).get('thumbnails', [])),
    )


def _lockup_metadata_rows(lockup_metadata: dict) -> list[dict]:
    return (
        lockup_metadata.get('metadata', {})
        .get('contentMetadataViewModel', {})
        .get('metadataRows', [])
    )


def _lockup_metadata_texts(metadata_rows: list[dict]) -> list[str]:
    texts: list[str] = []
    for row in metadata_rows:
        for part in row.get('metadataParts', []):
            content = part.get('text', {}).get('content', '')
            if content:
                texts.append(content)
    return texts


def _looks_like_viewcount_text(text: str) -> bool:
    return 'view' in text.lower()


def _looks_like_published_text(text: str) -> bool:
    lower_text = text.lower()
    return any(marker in lower_text for marker in ('ago', 'streamed', 'premiered'))


def _channel_name_from_lockup_avatar(lockup_metadata: dict) -> str:
    a11y_label = (
        lockup_metadata.get('image', {})
        .get('decoratedAvatarViewModel', {})
        .get('a11yLabel', '')
    )
    prefix = 'go to channel '
    if a11y_label.lower().startswith(prefix):
        return a11y_label[len(prefix):].strip()
    return ''


def _channel_from_video_lockup_metadata(lockup_metadata: dict) -> tuple[str, str, str]:
    metadata_rows = _lockup_metadata_rows(lockup_metadata)
    texts = _lockup_metadata_texts(metadata_rows)

    browse_endpoint = (
        lockup_metadata.get('image', {})
        .get('decoratedAvatarViewModel', {})
        .get('rendererContext', {})
        .get('commandContext', {})
        .get('onTap', {})
        .get('innertubeCommand', {})
        .get('browseEndpoint', {})
    )
    channel_id = browse_endpoint.get('browseId', '')
    channel_handle = _channel_handle_from_browse_endpoint(browse_endpoint)

    channel_name = ''
    for text in texts:
        if not _looks_like_viewcount_text(text) and not _looks_like_published_text(text):
            channel_name = text
            break

    if not channel_name:
        channel_name = _channel_name_from_lockup_avatar(lockup_metadata)

    return channel_name, channel_id, channel_handle


def _video_lockup_length_text(lockup_renderer: dict) -> str:
    overlays = (
        lockup_renderer.get('contentImage', {})
        .get('thumbnailViewModel', {})
        .get('overlays', [])
    )
    for overlay in overlays:
        for badge in overlay.get('thumbnailBottomOverlayViewModel', {}).get('badges', []):
            text = badge.get('thumbnailBadgeViewModel', {}).get('text', '')
            if text:
                return text
    return ''


def parse_innertube_video_lockup_renderer(lockup_renderer: dict) -> FeedItem:
    """Parse a video lockupViewModel from the innertube API into a FeedItem."""

    video_id = lockup_renderer.get('contentId', '')
    lockup_metadata = lockup_renderer.get('metadata', {}).get('lockupMetadataViewModel', {})
    metadata_rows = _lockup_metadata_rows(lockup_metadata)
    channel_name, channel_id, channel_handle = _channel_from_video_lockup_metadata(lockup_metadata)

    viewcount_text = ''
    published_text = ''
    for text in _lockup_metadata_texts(metadata_rows):
        if _looks_like_viewcount_text(text):
            viewcount_text = text
        elif _looks_like_published_text(text):
            published_text = text

    return FeedItem(
        type='video',
        id=video_id,
        title=get_text(lockup_metadata.get('title')),
        url=links.video_url(video_id),
        thumbnail_url=links.video_thumbnail_url(video_id),
        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),
        viewcount_text=viewcount_text,
        published_text=published_text,
        length_text=_video_lockup_length_text(lockup_renderer),
    )


def parse_innertube_compact_video_renderer(compact_renderer: dict) -> FeedItem:
    """Parse a compactVideoRenderer object from the innertube API into a FeedItem."""

    video_id = compact_renderer.get('videoId', '')
    channel_name, channel_id = get_channel_from_byline(compact_renderer.get('shortBylineText'))
    channel_handle = _channel_handle_from_byline(compact_renderer.get('shortBylineText'))

    return FeedItem(
        type='video',
        id=video_id,
        title=get_text(compact_renderer.get('title')),
        url=links.video_url(video_id),
        thumbnail_url=links.video_thumbnail_url(video_id),
        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),
        published_text=get_text(compact_renderer.get('publishedTimeText')),
        length_text=get_text(compact_renderer.get('lengthText')),
        viewcount_text=get_text(compact_renderer.get('viewCountText')),
    )


def parse_innertube_compact_playlist_renderer(compact_renderer: dict) -> FeedItem:
    """Parse a compactPlaylistRenderer object from the innertube API into a FeedItem."""

    playlist_id = compact_renderer.get('playlistId', '')
    channel_name, channel_id = get_channel_from_byline(compact_renderer.get('shortBylineText'))
    channel_handle = _channel_handle_from_byline(compact_renderer.get('shortBylineText'))

    return FeedItem(
        type='playlist',
        id=playlist_id,
        title=get_text(compact_renderer.get('title')),
        url=f'/playlist?list={playlist_id}',
        thumbnail_url=get_thumbnail_url(compact_renderer.get('thumbnail', {}).get('thumbnails', [])),
        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),
        video_count=get_text(compact_renderer.get('videoCountText')),
    )


def _parse_lockup_renderer(lockup_renderer: dict) -> FeedItem:
    content_type = lockup_renderer.get('contentType', '')
    if content_type == 'LOCKUP_CONTENT_TYPE_PLAYLIST':
        return parse_innertube_playlist_lockup_renderer(lockup_renderer)
    if lockup_renderer.get('contentImage', {}).get('collectionThumbnailViewModel'):
        return parse_innertube_playlist_lockup_renderer(lockup_renderer)
    return parse_innertube_video_lockup_renderer(lockup_renderer)


def parse_innertube_playlist_lockup_renderer(lockup_renderer: dict) -> FeedItem:
    """Parse a lockupViewModel object from the innertube API into a SearchResultEntry."""

    playlist_id = lockup_renderer.get('contentId', '')
    lockup_metadata = lockup_renderer.get('metadata', {}).get('lockupMetadataViewModel', {})
    content_metadata = lockup_metadata.get('metadata', {}).get('contentMetadataViewModel', {})
    metadata_rows = content_metadata.get('metadataRows', [])

    owner_text = {}
    if metadata_rows:
        first_row_parts = metadata_rows[0].get('metadataParts', [])
        if first_row_parts:
            owner_text = first_row_parts[0].get('text', {})

    channel_name = owner_text.get('content', '')
    channel_id = _channel_id_from_command_text(owner_text)
    channel_handle = _channel_handle_from_command_text(owner_text)

    return FeedItem(
        type='playlist',
        id=playlist_id,
        url=f'/playlist?list={playlist_id}',
        title=get_text(lockup_metadata.get('title')),

        channel_name=channel_name,
        channel_id=channel_id,
        channel_handle=channel_handle,
        channel_url=_prefer_channel_url(channel_id, channel_handle),
        video_count=_playlist_video_count(lockup_renderer),

        thumbnail_url=get_thumbnail_url(
            lockup_renderer.get('contentImage', {})
            .get('collectionThumbnailViewModel', {})
            .get('primaryThumbnail', {})
            .get('thumbnailViewModel', {})
            .get('image', {})
            .get('sources', [])
        ),

        playlist_items=_parse_playlist_preview_entries(
            metadata_rows, playlist_id, channel_name, channel_id, channel_handle
        ),
    )


def parse_innertube_search_item(item: dict) -> FeedItem | None:
    if video := item.get('videoRenderer'):
        return parse_innertube_video_renderer(video)
    if compact_video := item.get('compactVideoRenderer'):
        return parse_innertube_compact_video_renderer(compact_video)
    if channel := item.get('channelRenderer'):
        return parse_innertube_channel_renderer(channel)
    if compact_playlist := item.get('compactPlaylistRenderer'):
        return parse_innertube_compact_playlist_renderer(compact_playlist)
    if lockup := item.get('lockupViewModel'):
        return _parse_lockup_renderer(lockup)
    return None


def get_search_results_innertube(
    search_query: str,
    continuation_token: str | None = None,
    search_params: str | None = None,
) -> SearchResultsPage:
    """Get search results from YouTube using the innertube API."""

    logger.debug(f"Get search results for query \"{search_query}\" from innertube...")
    if search_params:
        logger.debug(f"Using search params {search_params}")
    if continuation_token:
        logger.debug(f"Using continuation token {continuation_token}")

    data = client.search(
        search_query,
        params=search_params,
        continuation=continuation_token,
    )

    entries: list[FeedItem] = []
    for item in _get_item_section_contents(data):
        if entry := parse_innertube_search_item(item):
            entries.append(entry)

    return {
        'search_query': search_query,
        'search_params': search_params or '',
        'fetched_at': int(datetime.now().timestamp()),
        'estimated_results': int(data.get('estimatedResults') or 0),
        'continuation_token': _get_continuation_token(data),
        'entries': entries,
    }


def search_query_hash(
    search_query: str,
    search_params: str | None = None,
) -> str:
    """Generate a hash for a search query to use as a cache key."""
    search_query = search_query.strip().lower()
    if search_params:
        search_query = f'{search_query}\0{search_params}'

    return hashlib.md5(search_query.encode('utf-8')).hexdigest()


def _attach_ryd_ratings(page: SearchResultsPage | None) -> SearchResultsPage | None:
    if not page:
        return page

    entries = page.get('entries') or []
    video_ids = [
        entry['id']
        for entry in entries
        if entry.get('type') == 'video' and entry.get('id')
    ]
    if not video_ids:
        return page

    ratings = get_ratings_for_videos(video_ids)
    for entry in entries:
        if entry.get('type') != 'video':
            continue
        if ryd := ratings.get(entry.get('id', '')):
            entry['rydratings'] = ryd
    return page


def get_search_results_page(
    search_query: str,
    page_number: int = 1,
    search_params: str | None = None,
) -> SearchResultsPage | None:
    """Get a specific page of search results from YouTube using the innertube API."""

    query_hash = search_query_hash(search_query, search_params)

    logger.debug(f"Retrieving search results page {page_number} for query {search_query} hash {query_hash}")

    if results_cache.is_empty(query_hash):
        first_page = get_search_results_innertube(
            search_query,
            search_params=search_params,
        )
        results_cache.append(query_hash, first_page)
        return _attach_ryd_ratings(first_page)

    return _attach_ryd_ratings(
        results_cache.get_item_default(query_hash, page_number - 1)
    )