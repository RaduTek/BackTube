import os
from datetime import datetime, time
from flask import request, redirect
from typing import TypedDict
from urllib.parse import urlencode, quote
from yt_dlp import YoutubeDL

from . import cache, formats
from .innertube.watch import WatchPageData


QUALITY_TAGS = ['hd1080', 'hd720', 'highres', 'large', 'medium', 'small', 'light']


QUALITY_FORMAT_MAP: dict[str, list[int]] = {
    'hd1080': [137, 140],
    'hd720': [136, 140],
    'large': [135, 140],
    'medium': [134, 140],
    'small': [133, 139],
    'light': [160, 139],
}


class StreamFormat(TypedDict):
    url: str
    type: str
    quality: str
    itag: int


class PlayerConfig(TypedDict):
    assets: dict


def build_stream_map(formats: list[StreamFormat]) -> str:
    streams = []

    for fmt in formats:
        params = dict(fmt)

        stream = urlencode(
            params,
            quote_via=quote
        )

        streams.append(stream)

    return ",".join(streams)


def download_video(video_id, format, out_file):
    ytdl = YoutubeDL({
        'quiet': True,
        'no_warnings': True,
        'format': format,
        'outtmpl': out_file + ".%(ext)s"
    })

    ytdl.download(f"https://youtube.com/watch?v={video_id}")


def get_video_available_formats(video_id):
    cached = cache.get_cache_data(f'media/{video_id}', 'formats', { 'formats': [], 'saved_at': 0 })

    if len(cached['formats']) > 0:
        return cached['formats']

    ytdl = YoutubeDL({
        'quiet': True,
        'no_warnings': True,
    })

    info = ytdl.extract_info(f"https://youtube.com/watch?v={video_id}", download=False)

    formats = []

    for format in info.get('formats', []) or []:
        try:
            formats.append(int(format['format_id']))
        except (ValueError, TypeError):
            continue

    cache.save_cache_data(f'media/{video_id}', 'formats', { 
        'formats': formats,
        'saved_at': int(datetime.now().timestamp())
    })

    return formats


def get_video_available_stream_formats(video_id: str) -> list[StreamFormat]:
    formats = get_video_available_formats(video_id)

    stream_formats = []

    for quality, itags in QUALITY_FORMAT_MAP.items():
        if not all(itag in formats for itag in itags):
            continue

        stream_formats.append({
            'url': f"/get_video?v={video_id}&q={quality}",
            'type': 'video/mp4',
            'quality': quality,
            'itag': itags,
        })
    
    return stream_formats


def get_video():
    video_id = request.args.get('v')
    quality = request.args.get('q', 'medium').strip()

    if quality not in QUALITY_TAGS:
        return f'Unknown quality: "{quality}"', 400

    saved = cache.get_cache_data(f'media/{video_id}', 'saved')

    formats = QUALITY_FORMAT_MAP[quality]
    file = saved.get(quality, {}).get('file')

    if not file:
        available_formats = get_video_available_formats(video_id)

        missing_formats = [f for f in formats if f not in available_formats]

        if len(missing_formats) > 0:
            return f"Missing formats for quality {quality}: {', '.join([str(f) for f in missing_formats])}", 400

        out_file = f"media/{video_id}/video_{quality}"
        out_file_full = os.path.join(cache.config.cache_dir, out_file)
        download_video(video_id, '+'.join(str(f) for f in formats), out_file_full)

        saved[quality] = {
            'file': f"{out_file}.mp4",
            'type': 'video/mp4',
            'quality': quality,
            'itags': formats,
            'saved_at': int(datetime.now().timestamp())
        }
        cache.save_cache_data(f'media/{video_id}', 'saved', saved)

        file = saved[quality]['file']
    
    return redirect(f"/{file}", code=302)


def get_player_data(video_id: str, watch_data: WatchPageData | dict = {}) -> dict:
    
    config_vars = {
        'VIDEO_ID': video_id,
        'VIDEO_USERNAME': watch_data.get('video', {}).get('channel_name', ''),
        'WIDE_PLAYER_STYLES': ['watch-wide-mode'],
    }

    length_seconds = formats.duration_to_seconds(watch_data.get('video', {}).get('duration', "0:0"))
    url_encoded_fmt_stream_map = build_stream_map(get_video_available_stream_formats(video_id))
    timestamp = int(datetime.now().timestamp())

    player_config = {
        'assets': {
            'html': '/html5_player_template',
            'css': 'https://s.ytimg.com/yt/cssbin/www-player-vfl0xKiwZ.css',
            'js': 'https://s.ytimg.com/yt/jsbin/html5player-vflJXrXGC.js',
        },
        'url': 'https://s.ytimg.com/yt/swfbin/watch_as3-vflqsO0OE.swf',
        'url_v8': 'https://s.ytimg.com/yt/swfbin/cps-vflMfscHD.swf',
        'url_v9as2': 'https://s.ytimg.com/yt/swfbin/cps-vflMfscHD.swf',
        'min_version': '8.0.0',
        'args': {
            # 'ttsurl': '',
            # 'fexp': '906717,919701,911613',
            'enablecsi': '1',
            'allow_embed': 1,
            # 'rvs': '',
            # 'is_doubleclick_tracked': '1',
            # 'rmktEnabled': False,
            'account_playback_token': '',
            'autohide': '2',
            'csi_page_type': 'watch5',
            'keywords': '',
            'cr': 'US',
            'cc3_module': 'https://s.ytimg.com/yt/swfbin/subtitles3_module-vflGQbvIG.swf',
            'p_s': '',
            'focEnabled': False,
            # 'fmt_list': ''
            'length_seconds': length_seconds,
            # 'feature': 'topics',
            'enablejsapi': '1',
            'theme': 'tlb',
            # 'tk': '',
            # 'plid': '',
            'cc_font': 'Arial Unicode MS, arial, verdana, _sans',
            # 'sdetail': 'f:topics, p:/topic/topic_id',
            'url_encoded_fmt_stream_map': url_encoded_fmt_stream_map,
            'sourceid': 'y',
            'timestamp': timestamp,
            'cc_asr': 1,
            'ssl': 1,
            'showpopout': 1,
            'hl': 'en_US',
            'tmi': '1',
            'no_get_video_log': '1',
            'cc_module': 'https://s.ytimg.com/yt/swfbin/subtitle_module-vfl_ihIUi.swf',
            'endscreen_module': 'https://s.ytimg.com/yt/swfbin/endscreen-vflm8ac_r.swf',
            'supersizefeatured': '1',
            'vq': 'auto',
            'referrer': f'https://www.youtube.com/watch?v={video_id}',
            'video_id': video_id,
            # 'sendtmp': '1',
            # 'sk': '',
            # 't': '',
        },
        'params': {
            'allowscriptaccess': 'always',
            'allowfullscreen': 'true',
            'bgcolor': '#000000',
        },
        'attrs': {
            'width': 640,
            'height': 390,
            'id': 'movie_player',
        },
        'html5': True,
        'disable': {
            'html5': False,
            'flash': False,
        }
    }

    return {
        'video_id': video_id,
        'config_vars': config_vars,
        # 'stream_map': build_stream_map(get_video_available_stream_formats(video_id)),
        'player_config': player_config,
    }