import urllib.parse
from yt_dlp import YoutubeDL

YT_SEARCH_FILTERS = {
    'video': 'EgIQAQ==',
    'channel': 'EgIQAg==',
    'playlist': 'EgIQAw==',
}

def get_search_results(search_query, filter_type=None, max_results=10, page_index=1):
    """Get search results from YouTube using yt-dlp."""

    params = {
        'search_query': search_query,
    }

    if filter_type in YT_SEARCH_FILTERS:
        params['sp'] = YT_SEARCH_FILTERS[filter_type]

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

    for entry in entries:
        if '/channel' in entry['url']:
            entry['type'] = 'channel'
        elif '/playlist' in entry['url']:
            entry['type'] = 'playlist'
        elif '/watch' in entry['url']:
            entry['type'] = 'video'
        else:
            entry['type'] = 'unknown'
    
    return entries