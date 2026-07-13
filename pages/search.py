import urllib.parse
from typing import TypedDict, Literal
from flask import request, render_template
from innertube.clients import InnerTube
from yt_dlp import YoutubeDL
from ..utils import find_nested_key

class SearchResults(TypedDict):
    search_query: str
    estimated_results: str
    continuation_token: str
    entries: list[SearchResultEntry]

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
    type: Literal['video', 'channel', 'playlist', 'unknown']

def get_search_results_ytdlp(
        search_query: str,
        max_results: int = 10, 
        page_index: int = 1
    ) -> list[SearchResultEntry]:
    """Get search results from YouTube using yt-dlp."""

    params = { 'search_query': search_query }

    url = f"https://www.youtube.com/results?{urllib.parse.urlencode(params)}"

    start = (page_index - 1) * max_results + 1
    end = start + max_results - 1

    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'extract_flat': True,
        'default_search': 'ytsearch',
        'noplaylist': True,
        'max_downloads': max_results,
        'playlist_items': f'{start}-{end}',
    }

    with YoutubeDL(ydl_opts) as ydl: # type: ignore
        search_results = ydl.extract_info(url, download=False)
    
    entries = search_results.get('entries', [])

    results: list[SearchResultEntry] = []

    for entry in entries:
        if '/channel' in entry['url']:
            entry['type'] = 'channel'
        elif '/playlist' in entry['url']:
            entry['type'] = 'playlist'
        elif '/watch' in entry['url']:
            entry['type'] = 'video'
        else:
            entry['type'] = 'unknown'

        results.append(entry)

    return results


def parse_innertube_video_renderer(video_renderer: dict) -> SearchResultEntry:
    """Parse a videoRenderer object from the innertube API into a SearchResultEntry."""

    return {
        'id': video_renderer.get('videoId', ''),
        'url': f"https://www.youtube.com/watch?v={video_renderer.get('videoId', '')}",
        'title': video_renderer.get('title', {}).get('runs', [{}])[0].get('text', ''),
        'channel_name': video_renderer.get('longBylineText', {}).get('runs', [{}])[0].get('text', ''),
        'channel_id': video_renderer.get('longBylineText', {}).get('runs', [{}])[0].get('navigationEndpoint', {}).get('browseEndpoint', {}).get('browseId', ''),
        'published_text': video_renderer.get('publishedTimeText', {}).get('simpleText', ''),
        'description': ''.join([run.get('text', '') for run in video_renderer.get('detailedMetadataSnippets', [{}])[0].get('snippetText', {}).get('runs', [])]),
        'length_text': video_renderer.get('lengthText', {}).get('simpleText', ''),
        'viewcount_text': video_renderer.get('viewCountText', {}).get('simpleText', ''),
        'video_count': '',
        'type': 'video',
    }


def parse_innertube_channel_renderer(channel_renderer: dict) -> SearchResultEntry:
    """Parse a channelRenderer object from the innertube API into a SearchResultEntry."""

    return {
        'id': channel_renderer.get('channelId', ''),
        'url': f"https://www.youtube.com/channel/{channel_renderer.get('channelId', '')}",
        'title': channel_renderer.get('title', {}).get('simpleText', ''),
        'channel_name': channel_renderer.get('title', {}).get('simpleText', ''),
        'channel_id': channel_renderer.get('channelId', ''),
        'published_text': '',
        'description': channel_renderer.get('descriptionSnippet', {}).get('runs', [{}])[0].get('text', ''),
        'length_text': '',
        'viewcount_text': '',
        'video_count': channel_renderer.get('videoCountText', {}).get('runs', [{}])[0].get('text', ''),
        'type': 'channel',
    }


def parse_innertube_playlist_lockup_renderer(lockup_renderer: dict) -> SearchResultEntry:
    """Parse a lockupViewModel object from the innertube API into a SearchResultEntry."""

    lockup_metadata = lockup_renderer.get('metadata', {}).get('lockupMetadataViewModel', {})
    content_metadata = lockup_metadata.get('metadata', {}).get('contentMetadataViewModel', {})
    metadata_rows = content_metadata.get('metadataRows', [])

    first_row_parts = metadata_rows[0].get('metadataParts', []) if metadata_rows else []
    owner_text = first_row_parts[0].get('text', {}) if first_row_parts else {}

    preview_text = ''
    for row in metadata_rows[1:]:
        metadata_parts = row.get('metadataParts', [])
        if metadata_parts:
            content = metadata_parts[0].get('text', {}).get('content', '')
            if content and 'View full playlist' not in content and 'Playlist' not in content:
                preview_text = content
                break

    return {
        'id': lockup_renderer.get('contentId', ''),
        'url': f"https://www.youtube.com/playlist?list={lockup_renderer.get('contentId', '')}",
        'title': lockup_metadata.get('title', {}).get('content', ''),
        'channel_name': owner_text.get('content', ''),
        'channel_id': owner_text.get('commandRuns', [{}])[0].get('onTap', {}).get('innertubeCommand', {}).get('browseEndpoint', {}).get('browseId', ''),
        'published_text': '',
        'description': preview_text,
        'length_text': '',
        'viewcount_text': '',
        'video_count': (find_nested_key(lockup_renderer, 'thumbnailBadgeViewModel') or {}).get('text', ''),
        'type': 'playlist',
    }


def get_search_results_innertube(
        search_query: str, 
        max_results: int = 10, 
        page_index: int = 1
    ) -> SearchResults:
    """Get search results from YouTube using the innertube API."""
    
    client = InnerTube("WEB")

    data = client.search(search_query, continuation=None)

    continuation_item_renderer = find_nested_key(data, 'continuationItemRenderer')
    continuation_token = continuation_item_renderer['continuationEndpoint']['continuationCommand']['token'] if continuation_item_renderer else ''

    entries: list[SearchResultEntry] = []
    item_section_renderer = find_nested_key(data, 'itemSectionRenderer')

    if item_section_renderer:
        for item in item_section_renderer['contents']:
            if 'videoRenderer' in item:
                video = item['videoRenderer']
                entries.append(parse_innertube_video_renderer(video))

            elif 'channelRenderer' in item:
                channel = item['channelRenderer']
                entries.append(parse_innertube_channel_renderer(channel))

            elif 'lockupViewModel' in item:
                lockup = item['lockupViewModel']
                entries.append(parse_innertube_playlist_lockup_renderer(lockup))

    return {
        'search_query': search_query,
        'estimated_results': data.get('estimatedResults', ''),
        'continuation_token': continuation_token,
        'entries': entries,
    }


def get_search_results_cache(
        search_query: str, 
        max_results: int = 10, 
        page_index: int = 1
    ) -> list[SearchResultEntry]:
    """Get search results from cache."""
    # Placeholder for cache implementation

    return []


def get_search_results(
        search_query: str, 
        max_results: int = 10, 
        page_index: int = 1
    ) -> list[SearchResultEntry]:
    """Get search results from YouTube using the preferred method."""
    
    return get_search_results_ytdlp(search_query, max_results, page_index)
    
    # return get_search_results_dataapi(search_query, filter_type, max_results, page_index)


def results_page():
    search_query = request.args.get("search_query", "") or request.args.get("q", "")

    search_results = get_search_results_innertube(search_query)

    return render_template("2012/results.html.j2", search_query=search_query, search_results=search_results)