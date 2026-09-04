import os
from flask import Flask, render_template, request, Response, send_from_directory
from werkzeug.exceptions import HTTPException

from config import config
from pages import api, home, search, watch, channel, playlist, get_preferred_template
from pages.backtube import backtube_pages
from helpers import player
from helpers.formats import get_all_formatters
from helpers.proxy import proxy_handler

app = Flask('backtube')

app.register_blueprint(backtube_pages)
app.register_blueprint(api.bp)
app.register_blueprint(channel.bp)

def _custom_error_message(error: HTTPException) -> str:
    description = (error.description or '').strip()
    default_description = getattr(type(error), 'description', '')
    if not description or description == default_description:
        return ''
    return description


@app.errorhandler(HTTPException)
def http_error(error: HTTPException):
    return render_template(
        get_preferred_template('404'),
        error_code=error.code or 500,
        error_name=error.name or 'Error',
        error_message=_custom_error_message(error),
    ), error.code or 500

@app.context_processor
def formatters():
    return get_all_formatters()

@app.get("/")
def home_route():
    return home.home_page()

@app.route("/backtube_test")
def backtube_test():
    return Response(f"BackTube v{config.version}", status=200, content_type="text/plain")

@app.get("/guide_ajax")
def guide_ajax_route():
    if request.args.get('action_load_system_feed', '') == '1':
        return home.guide_ajax()

    return "Invalid request", 400

@app.get("/results")
def search_route():
    return search.results_page()

@app.get("/watch")
def watch_route():
    return watch.watch_page()

@app.get("/playlist")
def playlist_route():
    return playlist.playlist_page()

@app.get("/all_comments")
def all_comments_route():
    return watch.all_comments_page()

@app.get("/related_ajax")
def related_ajax_route():
    if request.args.get('action_more_related_videos', '') == '1':
        return watch.related_ajax()

    return "Invalid request", 400

@app.get("/watch_ajax")
def watch_ajax_route():
    if request.args.get('action_channel_videos', '') == '1':
        return watch.channel_videos_ajax()

    return "Invalid request", 400

@app.post("/video_info_ajax")
def playlist_video_info_ajax_route():
    return watch.playlist_video_info_ajax()

@app.get("/share_ajax")
def share_ajax_route():
    return { 'share_html': '<h4>Share HTML goes here...</h4>' }

@app.get("/html5_player_template")
def html5_player_template_route():
    return render_template(get_preferred_template('html5_player_template'))

@app.get("/get_video")
def get_video_route():
    return player.get_video()

@app.get("/media/<path:filename>")
def media(filename):
    media_dir = os.path.join(config.cache_dir, 'media')
    return send_from_directory(media_dir, filename)

@app.route("/proxy/<path:url>", merge_slashes=False)
def proxy_route(url):
    return proxy_handler(base_route="/proxy/", use_cache=True)

@app.route("/proxy_nocache/<path:url>", merge_slashes=False)
def proxy_nocache_route(url):
    return proxy_handler(base_route="/proxy_nocache/", use_cache=False)

@app.route("/proxy_wa/<date>/<path:url>", merge_slashes=False)
def proxy_wa_route(date, url):
    return proxy_handler(
        base_route=f"/proxy_wa/{date}/",
        use_cache=True,
        archive_date=date,
    )

