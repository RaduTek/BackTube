from flask import request, render_template
from ..helpers.innertube.watch import get_watch_data_innertube


def watch_page():
    video_id = request.args.get("v")

    if (not video_id) or (not isinstance(video_id, str)):
        return "404 not found page should be here", 404
    
    watch_data = get_watch_data_innertube(video_id)

    return render_template("2012/watch.html.j2", video_id=video_id, video=watch_data['video'])