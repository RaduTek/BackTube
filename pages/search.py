from datetime import datetime
from typing import Literal, TypedDict
from flask import request, render_template
from innertube.clients import InnerTube


class SearchResults(TypedDict):
    search_query: str
    estimated_results: int
    continuation_token: str
    entries: list['SearchResultEntry']


class SearchResultEntry(TypedDict):
    id: str
    url: str
    title: str
    channel_name: str
    channel_id: str
    published_text: str
    description: str
    length_text: str
    viewcount_text: str
    video_count: str
    thumbnail_url: str
    playlist_entries: list['SearchResultEntry']
    type: Literal['video', 'channel', 'playlist', 'unknown']


def _empty_entry(
    entry_type: Literal['video', 'channel', 'playlist', 'unknown'] = 'unknown',
    **overrides: str | list['SearchResultEntry'],
) -> SearchResultEntry:
    entry: SearchResultEntry = {
        'id': '',
        'url': '',
        'title': '',
        'channel_name': '',
        'channel_id': '',
        'published_text': '',
        'description': '',
        'length_text': '',
        'viewcount_text': '',
        'video_count': '',
        'thumbnail_url': '',
        'playlist_entries': [],
        'type': entry_type,
    }
    entry.update(overrides)  # type: ignore[typeddict-item]
    return entry


def _text(value: dict | None) -> str:
    if not value:
        return ''
    if simple := value.get('simpleText'):
        return simple
    if content := value.get('content'):
        return content
    return ''.join(run.get('text', '') for run in value.get('runs', []))


def _first_run(value: dict | None) -> dict:
    if not value:
        return {}
    runs = value.get('runs')
    if runs:
        return runs[0]
    return {}


def _channel_from_byline(byline: dict | None) -> tuple[str, str]:
    run = _first_run(byline)
    channel_name = run.get('text', '')
    channel_id = (
        run.get('navigationEndpoint', {})
        .get('browseEndpoint', {})
        .get('browseId', '')
    )
    return channel_name, channel_id


def _thumbnail_url(thumbnails: list[dict]) -> str:
    if not thumbnails:
        return ''

    url = max(thumbnails, key=lambda thumb: thumb.get('width', 0)).get('url', '')
    if url.startswith('//'):
        return f'https:{url}'
    return url


def _video_description(video_renderer: dict) -> str:
    snippets = video_renderer.get('detailedMetadataSnippets') or []
    if not snippets:
        return ''
    return _text(snippets[0].get('snippetText'))


def _get_search_sections(data: dict) -> list[dict]:
    return (
        data.get('contents', {})
        .get('twoColumnSearchResultsRenderer', {})
        .get('primaryContents', {})
        .get('sectionListRenderer', {})
        .get('contents', [])
    )


def _get_item_section_contents(data: dict) -> list[dict]:
    for section in _get_search_sections(data):
        if item_section := section.get('itemSectionRenderer'):
            return item_section.get('contents', [])
    return []


def _get_continuation_token(data: dict) -> str:
    for section in _get_search_sections(data):
        if continuation := section.get('continuationItemRenderer'):
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
) -> SearchResultEntry | None:
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

    return _empty_entry(
        'video',
        id=video_id,
        url=f'https://www.youtube.com/watch?v={video_id}&list={playlist_id}',
        title=title,
        channel_name=channel_name,
        channel_id=channel_id,
        length_text=length_text,
    )


def _parse_playlist_preview_entries(
    metadata_rows: list[dict],
    playlist_id: str,
    channel_name: str,
    channel_id: str,
) -> list[SearchResultEntry]:
    entries: list[SearchResultEntry] = []
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


def parse_innertube_video_renderer(video_renderer: dict) -> SearchResultEntry:
    """Parse a videoRenderer object from the innertube API into a SearchResultEntry."""

    video_id = video_renderer.get('videoId', '')
    channel_name, channel_id = _channel_from_byline(video_renderer.get('longBylineText'))

    return _empty_entry(
        'video',
        id=video_id,
        url=f'https://www.youtube.com/watch?v={video_id}',
        title=_first_run(video_renderer.get('title')).get('text', ''),
        channel_name=channel_name,
        channel_id=channel_id,
        published_text=_text(video_renderer.get('publishedTimeText')),
        description=_video_description(video_renderer),
        length_text=_text(video_renderer.get('lengthText')),
        viewcount_text=_text(video_renderer.get('viewCountText')),
        thumbnail_url=_thumbnail_url(video_renderer.get('thumbnail', {}).get('thumbnails', [])),
    )


def parse_innertube_channel_renderer(channel_renderer: dict) -> SearchResultEntry:
    """Parse a channelRenderer object from the innertube API into a SearchResultEntry."""

    channel_id = channel_renderer.get('channelId', '')
    title = _text(channel_renderer.get('title'))

    return _empty_entry(
        'channel',
        id=channel_id,
        url=f'https://www.youtube.com/channel/{channel_id}',
        title=title,
        channel_name=title,
        channel_id=channel_id,
        description=_text(channel_renderer.get('descriptionSnippet')),
        video_count=_text(channel_renderer.get('videoCountText')),
        thumbnail_url=_thumbnail_url(channel_renderer.get('thumbnail', {}).get('thumbnails', [])),
    )


def parse_innertube_playlist_lockup_renderer(lockup_renderer: dict) -> SearchResultEntry:
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

    return _empty_entry(
        'playlist',
        id=playlist_id,
        url=f'https://www.youtube.com/playlist?list={playlist_id}',
        title=_text(lockup_metadata.get('title')),
        channel_name=channel_name,
        channel_id=channel_id,
        video_count=_playlist_video_count(lockup_renderer),
        thumbnail_url=_thumbnail_url(
            lockup_renderer.get('contentImage', {})
            .get('collectionThumbnailViewModel', {})
            .get('primaryThumbnail', {})
            .get('thumbnailViewModel', {})
            .get('image', {})
            .get('sources', [])
        ),
        playlist_entries=_parse_playlist_preview_entries(
            metadata_rows, playlist_id, channel_name, channel_id
        ),
    )


def parse_innertube_search_item(item: dict) -> SearchResultEntry | None:
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
) -> SearchResults:
    """Get search results from YouTube using the innertube API."""

    client = InnerTube('WEB')
    data = client.search(search_query, continuation=continuation_token)

    entries: list[SearchResultEntry] = []
    for item in _get_item_section_contents(data):
        if entry := parse_innertube_search_item(item):
            entries.append(entry)

    return {
        'timestamp': datetime.now().isoformat(),
        'search_query': search_query,
        'estimated_results': int(data.get('estimatedResults', '')),
        'continuation_token': _get_continuation_token(data),
        'entries': entries,
    }


def results_page():
    search_query = request.args.get('search_query', '') or request.args.get('q', '')

    search_results = get_search_results_innertube(search_query)

    return render_template(
        '2012/results.html.j2',
        search_query=search_query,
        search_results=search_results,
    )
