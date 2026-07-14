from flask import request, render_template

from . import get_preferred_template
from ..helpers.innertube.watch import get_watch_data, get_watch_related


def watch_page():
    video_id = request.args.get("v", '')
    nocache = request.args.get("nocache", "false").lower() == "true"
    
    data = get_watch_data(video_id, nocache=nocache)

    return render_template(
        get_preferred_template('watch'), 
        video_id=video_id, 
        data=data,
    )


def related_ajax():
    video_id = request.args.get("video_id", '')

    data = get_watch_related(video_id)

    return { 
        'html': render_template(
            get_preferred_template('related_ajax'), 
            video_id=video_id, 
            data=data,
        ) 
    }