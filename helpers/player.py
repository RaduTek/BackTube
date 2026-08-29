import os
from datetime import datetime
from flask import request, redirect
from typing import TypedDict
from urllib.parse import urlencode, quote
from yt_dlp import YoutubeDL

from . import formats
from .innertube import FeedItem
from .innertube.watch import WatchPageData
from .cache import CacheData, CacheManager
from logger import logger


QUALITY_TAGS = ['hd1080', 'hd720', 'highres', 'large', 'medium', 'small', 'light']


QUALITY_FORMAT_MAP: dict[str, list[str]] = {
    'hd1080': ['137', '140'],
    'hd720': ['136', '140'],
    'large': ['135', '140'],
    'medium': ['134', '140'],
    'small': ['133', '139'],
    'light': ['160', '139'],
}


class StreamFormat(TypedDict):
    url: str
    type: str
    quality: str
    itag: str


class PlayerConfig(TypedDict):
    assets: dict


cache = CacheManager('media')

def ytdlinfo_generator(video_id: str) -> dict:
    ytdl = YoutubeDL()

    logger.info(f"Getting info for video_id: {video_id} with yt_dlp")
    info = ytdl.extract_info(f"https://youtube.com/watch?v={video_id}", download=False)
    return dict(info)

ytdlinfo_cache = CacheData[dict](cache, 'ytdl_info', default_gen=ytdlinfo_generator, ttl=None, inherit_expiration_time=True)

def format_generator(video_id: str) -> list[str]:
    info = ytdlinfo_cache.get_default(video_id)

    formats = []

    for format in info.get('formats', []) or []:
        try:
            formats.append(str(format['format_id']))
        except (ValueError, TypeError):
            continue

    return formats

format_cache = CacheData[list[str]](cache, 'formats', default_gen=format_generator, ttl=None, inherit_expiration_time=True)

saved_cache = CacheData[dict](cache, 'saved', ttl=None, default_gen=lambda key: {}, inherit_expiration_time=True)


def _resolve_format_id(
        requested_id: str,
        available_ids: list[str],
        info: dict,
    ) -> str | None:
    """Resolve an itag to its original-audio variant, when necessary."""

    if requested_id in available_ids:
        return requested_id

    variant_prefix = f'{requested_id}-'
    variant_ids = {
        format_id
        for format_id in available_ids
        if format_id.startswith(variant_prefix)
        and format_id[len(variant_prefix):].isdigit()
    }
    if not variant_ids:
        return None

    original_variants = []
    for format_info in info.get('formats', []) or []:
        format_id = str(format_info.get('format_id', ''))
        if format_id not in variant_ids:
            continue

        format_note = str(format_info.get('format_note', '')).lower()
        language_preference = format_info.get('language_preference')
        is_preferred_language = (
            isinstance(language_preference, (int, float))
            and language_preference >= 0
        )

        if is_preferred_language or 'original' in format_note:
            original_variants.append(format_info)

    if not original_variants:
        return None

    original = max(
        original_variants,
        key=lambda format_info: (
            format_info.get('language_preference')
            if isinstance(format_info.get('language_preference'), (int, float))
            else -1,
            '(default)' in str(format_info.get('format_note', '')).lower(),
        ),
    )
    return str(original['format_id'])


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


def _duration_to_seconds(duration: str | None) -> int:
    if not duration:
        return 0
    try:
        return formats.duration_to_seconds(duration)
    except (TypeError, ValueError):
        return 0


def build_related_video_map(videos: list[FeedItem]) -> str:
    """Build the legacy player `rvs` argument used by the endscreen."""

    related_videos: list[str] = []
    for video in videos:
        if video.get('type') != 'video' or not video.get('id'):
            continue

        parsed_view_count = video.get('view_count')
        view_count = (
            f'{parsed_view_count:,}'
            if parsed_view_count is not None
            else video.get('viewcount_text', '')
        )
        if view_count.lower().endswith(' views'):
            view_count = view_count[:-6].strip()

        params: dict[str, str | int] = {
            'view_count': view_count,
            'author': video.get('channel_name', ''),
            'length_seconds': _duration_to_seconds(
                video.get('length_text', '')
            ),
            'id': video['id'],
            'title': video.get('title', ''),
        }
        if not related_videos:
            params['feature_type'] = 'fvw'
            params['featured'] = 1

        related_videos.append(urlencode(params))

    return ','.join(related_videos)


def download_video(video_id, format, out_file):
    out_file = os.path.splitext(out_file)[0]

    ytdl = YoutubeDL({
        'format': format,
        'outtmpl': out_file + ".%(ext)s"
    })

    ytdl.download(f"https://youtube.com/watch?v={video_id}")


def get_video_available_stream_formats(video_id: str) -> list[StreamFormat]:
    available_formats = format_cache.get_default(video_id)
    info = ytdlinfo_cache.get_default(video_id)

    stream_formats = []

    for quality, itags in QUALITY_FORMAT_MAP.items():
        if not all(
            _resolve_format_id(itag, available_formats, info)
            for itag in itags
        ):
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

    if not video_id:
        return "Missing video ID", 400

    if quality not in QUALITY_TAGS:
        logger.warning(f"Unknown quality: {quality}, accepted values: {QUALITY_TAGS}")
        return f'Unknown quality: "{quality}", accepted values: {QUALITY_TAGS}', 400

    saved = saved_cache.get_default(video_id)

    requested_formats = QUALITY_FORMAT_MAP[quality]
    logger.debug(f"Quality tag {quality} mapped to formats {requested_formats}")
    file_name = saved.get(quality, {}).get('file')

    if file_name:
        logger.info(f"Video {video_id} in quality {quality} available in cache ({file_name})")
    else:
        available_formats = format_cache.get_default(video_id)
        info = ytdlinfo_cache.get_default(video_id)

        selected_formats = []
        missing_formats = []
        for requested_format in requested_formats:
            selected_format = _resolve_format_id(
                requested_format,
                available_formats,
                info,
            )
            if selected_format:
                selected_formats.append(selected_format)
            else:
                missing_formats.append(requested_format)

        logger.debug(f"Available formats for video {video_id}: {available_formats}, Missing formats: {missing_formats}")

        if len(missing_formats) > 0:
            logger.warning(f"Missing formats for quality {quality}: {missing_formats}")
            return f"Missing formats for quality {quality}: {missing_formats}", 400

        out_file_name = f"video_{quality}.mp4"
        out_file_full = cache.abs_path(video_id, f"video_{quality}", ".mp4")
        
        logger.info(f"Downloading video {video_id} in quality {quality}...")
        download_video(video_id, '+'.join(selected_formats), str(out_file_full))

        saved[quality] = {
            'file': out_file_name,
            'type': 'video/mp4',
            'quality': quality,
            'itags': selected_formats,
            'saved_at': int(datetime.now().timestamp())
        }
        saved_cache.set(video_id, saved)

        file_name = saved[quality]['file']

        logger.info(f"Downloaded video {video_id} in quality {quality} ({file_name})")

    file = cache.rel_path(video_id, file_name).as_posix()

    return redirect(f"/{file}", code=302)


def get_player_data(
        video_id: str, 
        autoplay: bool = True,
        watch_data: WatchPageData | dict = {},
        related_videos: list[FeedItem] | None = None,
        config_vars: dict | None = None,
        player_config: dict | None = None,
        player_args: dict | None = None,
    ) -> dict:
    
    config_vars_final = {
        'VIDEO_ID': video_id,
        'VIDEO_USERNAME': watch_data.get('video', {}).get('channel_name', ''),
        'WIDE_PLAYER_STYLES': ['watch-wide-mode'],
    }
    config_vars_final.update(config_vars or {})

    length_seconds = _duration_to_seconds(
        watch_data.get('video', {}).get('duration', '0:0')
    )
    url_encoded_fmt_stream_map = build_stream_map(get_video_available_stream_formats(video_id))
    timestamp = int(datetime.now().timestamp())
    related_video_map = build_related_video_map(related_videos or [])

    player_config_final = {
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
            'autoplay': '1' if autoplay else '0',
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
    if related_video_map:
        player_config_final['args']['rvs'] = related_video_map

    player_config_final.update(player_config or {})
    if player_args:
        player_config_final['args'].update(player_args)

    return {
        'video_id': video_id,
        'config_vars': config_vars_final,
        'player_config': player_config_final,
    }