import os
from flask import Flask, render_template, request, send_from_directory

from config import config
from pages import home, search, watch, channel, get_preferred_template
from helpers import player
from helpers.formats import get_all_formatters

app = Flask(__name__)

app.register_blueprint(channel.bp)

@app.errorhandler(404)
def page_not_found(e):
    return render_template(get_preferred_template('404')), 404

@app.context_processor
def formatters():
    return get_all_formatters()

@app.get("/")
def home_route():
    return home.home_page()

@app.get("/results")
def search_route():
    return search.results_page()

@app.get("/watch")
def watch_route():
    return watch.watch_page()

@app.get("/all_comments")
def all_comments_route():
    return watch.all_comments_page()

@app.get("/related_ajax")
def related_ajax_route():
    if request.args.get('action_more_related_videos', '') == '1':
        return watch.related_ajax()

    return "Invalid request", 400

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