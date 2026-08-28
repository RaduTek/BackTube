from flask import Response, request, render_template

from . import get_preferred_template
from helpers.pager import create_pager_props
from helpers.player import get_player_data
from helpers.innertube.channel import get_channel_data
from helpers.innertube.playlist import (
    get_playlist_hud_data,
    get_playlist_video_info,
)
from helpers.innertube.watch import get_watch_comments, get_watch_data, get_watch_related, WatchPageData


def _get_pager_for_comments(data: WatchPageData, page: int = 1):
    video = data['video']
    video_id = video['video_id']

    total_comments = int(video['comments_count_text']) if video['comments_count_text'].isdecimal() else -1

    per_page_count = 20
    window_size = 7

    def _get_all_comments_link(p):
        return f'/all_comments?v={video_id}&p={p}' if p > 1 else f'/all_comments?v={video_id}'
    
    total = total_comments // per_page_count if total_comments >= 0 else page + window_size

    return create_pager_props(page, total, _get_all_comments_link, window_size=window_size)


def _xml_ajax_response(html_content: str) -> Response:
    cdata = html_content.replace(']]>', ']]]]><![CDATA[>')
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<root>'
        '<return_code>0</return_code>'
        f'<html_content><![CDATA[{cdata}]]></html_content>'
        '</root>'
    )
    return Response(body, content_type='text/xml; charset=utf-8')


def watch_page():
    video_id = request.args.get("v", '')
    playlist_id = request.args.get('list', '').strip()
    playlist_index = request.args.get('index', type=int)
    nocache = request.args.get('nocache', 'x') != 'x'
    
    data = get_watch_data(video_id, nocache=nocache)
    related = get_watch_related(video_id)
    comments = get_watch_comments(video_id, page=1)
    comments_pager = _get_pager_for_comments(data, page=1)

    playlist_hud = None
    if playlist_id:
        try:
            playlist_hud = get_playlist_hud_data(
                playlist_id,
                video_id,
                requested_index=playlist_index,
            )
        except (IndexError, ValueError):
            playlist_hud = None

    player_args = None
    if playlist_hud:
        player_args = {
            'list': playlist_id,
            'playlist_id': playlist_id,
            'index': str(playlist_hud['current_position'] - 1),
        }

    player = get_player_data(
        video_id,
        watch_data=data,
        related_videos=related['related'],
        player_args=player_args,
    )

    return render_template(
        get_preferred_template('watch'), 
        video_id=video_id, 
        data=data,
        related=related,
        comments=comments,
        comments_pager=comments_pager,
        player=player,
        playlist_hud=playlist_hud,
    )


def related_ajax():
    video_id = request.args.get("video_id", '')

    data = get_watch_related(video_id, page=2)

    return { 
        'html': render_template(
            get_preferred_template('related_ajax'), 
            video_id=video_id, 
            data=data,
        ) 
    }


def channel_videos_ajax():
    channel_id = request.args.get('user_id', '').strip()
    current_video_id = request.args.get('video_id', '').strip()
    if not channel_id:
        return {'html_content': ''}, 400

    data = get_channel_data(channel_id)
    videos_feed = next(
        (
            feed
            for feed in data['feeds']
            if feed['feed_type'] == 'videos'
        ),
        None,
    )
    videos = [
        video
        for video in (videos_feed or {}).get('items', [])
        if video['type'] == 'video'
        and video['id'] != current_video_id
    ][:30]
    videos_per_slide = 5
    video_slides = [
        videos[index:index + videos_per_slide]
        for index in range(0, len(videos), videos_per_slide)
    ] or [[]]

    return _xml_ajax_response(
        render_template(
            get_preferred_template('watch_ajax'),
            channel=data['channel'],
            video_slides=video_slides,
        )
    )


def playlist_video_info_ajax():
    video_ids = [
        video_id
        for video_id in request.form.get('video_ids', '').split(',')
        if video_id
    ][:300]
    return {'data': get_playlist_video_info(video_ids)}


def all_comments_page():
    video_id = request.args.get('v', '')
    page = request.args.get('p', 1, type=int)
    nocache = request.args.get('nocache', 'x') != 'x'

    data = get_watch_data(video_id, nocache=nocache)
    comments = get_watch_comments(video_id, page)
    pager = _get_pager_for_comments(data, page)

    return render_template(
        get_preferred_template('all_comments'), 
        video_id=video_id, 
        data=data,
        comments=comments,
        pager=pager,
    )
