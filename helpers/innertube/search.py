import hashlib
from datetime import datetime
from typing import TypedDict
from . import client, FeedItem
from .utils import get_text, get_first_run, get_channel_from_byline, get_thumbnail_url
from ..cache import save_cache_data, get_cache_data


class SearchResultsCache(TypedDict):
    hash: str
    created_at: int
    updated_at: int
    search_query: str
    pages: list['SearchResultsPage']


class SearchResultsPage(TypedDict):
    fetched_at: int
    search_query: str
    estimated_results: int
    continuation_token: str
    entries: list['FeedItem']


def _channel_url(channel_id: str) -> str:
    if len(channel_id) == 0:
        return ''
    
    return f'/channel/{channel_id}'


def _video_url(video_id: str, playlist_id: str | None = None) -> str:
    if playlist_id:
        return f'/watch?v={video_id}&list={playlist_id}'

    return f'/watch?v={video_id}'


def _video_thumbnail_url(video_id: str) -> str:
    return f'https://i.ytimg.com/vi/{video_id}/default.jpg'


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
        url=_video_url(video_id, playlist_id),

        thumbnail_url=_video_thumbnail_url(video_id),
        length_text=length_text,

        channel_name=channel_name,
        channel_id=channel_id,
        channel_url=f'/channel/{channel_id}',
    )


def _parse_playlist_preview_entries(
    metadata_rows: list[dict],
    playlist_id: str,
    channel_name: str,
    channel_id: str,
) -> list[FeedItem]:
    entries: list[FeedItem] = []
    for row in metadata_rows:
        if row.get('isSpacerRow'):
            continue
        for part in row.get('metadataParts', []):
            text_obj = part.get('text', {})
            if preview := _parse_playlist_preview_entry(
                text_obj, playlist_id, channel_name, channel_id
            ):
                entries.append(preview)
    return entries


def parse_innertube_video_renderer(video_renderer: dict) -> FeedItem:
    """Parse a videoRenderer object from the innertube API into a SearchResultEntry."""

    video_id = video_renderer.get('videoId', '')
    channel_name, channel_id = get_channel_from_byline(video_renderer.get('longBylineText'))

    return FeedItem(
        type='video',
        id=video_id,
        title=get_first_run(video_renderer.get('title')).get('text', ''),
        url=f'/watch?v={video_id}',
        thumbnail_url=_video_thumbnail_url(video_id),

        channel_name=channel_name,
        channel_id=channel_id,
        channel_url=_channel_url(channel_id),

        published_text=get_text(video_renderer.get('publishedTimeText')),
        description=_video_description(video_renderer),
        length_text=get_text(video_renderer.get('lengthText')),
        viewcount_text=get_text(video_renderer.get('viewCountText')),
    )


def parse_innertube_channel_renderer(channel_renderer: dict) -> FeedItem:
    """Parse a channelRenderer object from the innertube API into a SearchResultEntry."""

    channel_id = channel_renderer.get('channelId', '')
    title = get_text(channel_renderer.get('title'))

    return FeedItem(
        type='channel',
        id=channel_id,
        title=title,
        url=_channel_url(channel_id),
        
        channel_name=title,
        channel_id=channel_id,
        channel_url=_channel_url(channel_id),

        description=get_text(channel_renderer.get('descriptionSnippet')),
        video_count=get_text(channel_renderer.get('videoCountText')),
        thumbnail_url=get_thumbnail_url(channel_renderer.get('thumbnail', {}).get('thumbnails', [])),
    )


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

    return FeedItem(
        type='playlist',
        id=playlist_id,
        url=f'/playlist?list={playlist_id}',
        title=get_text(lockup_metadata.get('title')),

        channel_name=channel_name,
        channel_id=channel_id,
        channel_url=_channel_url(channel_id),
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
            metadata_rows, playlist_id, channel_name, channel_id
        ),
    )


def parse_innertube_search_item(item: dict) -> FeedItem | None:
    if video := item.get('videoRenderer'):
        return parse_innertube_video_renderer(video)
    if channel := item.get('channelRenderer'):
        return parse_innertube_channel_renderer(channel)
    if lockup := item.get('lockupViewModel'):
        return parse_innertube_playlist_lockup_renderer(lockup)
    return None


def get_search_results_innertube(
    search_query: str,
    continuation_token: str | None = None,
) -> SearchResultsPage:
    """Get search results from YouTube using the innertube API."""

    data = client.search(search_query, continuation=continuation_token)

    entries: list[FeedItem] = []
    for item in _get_item_section_contents(data):
        if entry := parse_innertube_search_item(item):
            entries.append(entry)

    return {
        'fetched_at': int(datetime.now().timestamp()),
        'search_query': search_query,
        'estimated_results': int(data.get('estimatedResults', '')),
        'continuation_token': _get_continuation_token(data),
        'entries': entries,
    }


def search_query_hash(search_query: str) -> str:
    """Generate a hash for a search query to use as a cache key."""
    search_query = search_query.strip().lower()

    return hashlib.md5(search_query.encode('utf-8')).hexdigest()


def get_search_results_page(
    search_query: str,
    page_number: int = 1,
) -> SearchResultsPage | None:
    """Get a specific page of search results from YouTube using the innertube API."""

    if page_number < 1:
        raise ValueError("Page number must be greater than or equal to 1.")

    query_hash = search_query_hash(search_query)
    cached = get_cache_data('search_results', query_hash)
    created_at = int(cached.get('created_at', 0)) if cached else int(datetime.now().timestamp())

    pages: list[SearchResultsPage] = cached.get('pages', []) if cached else []

    if 1 <= page_number <= len(pages):
        # Page already cached
        return pages[page_number - 1]

    # Page not cached already, fetch missing pages
    missing_pages = page_number - len(pages)

    for _ in range(missing_pages):
        continuation_token = None
        if pages:
            continuation_token = pages[-1].get('continuation_token')

        results_page = get_search_results_innertube(search_query, continuation_token)
        pages.append(results_page)
    
    # Save the updated cache
    new_cache: SearchResultsCache = {
        'created_at': created_at,
        'updated_at': int(datetime.now().timestamp()),
        'hash': query_hash,
        'search_query': search_query,
        'pages': pages
    }
    save_cache_data('search_results', query_hash, dict(new_cache))

    return pages[-1]  # Return the last page, which is the requested page

