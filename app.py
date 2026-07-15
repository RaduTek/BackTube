from flask import Flask, render_template, request
from .pages import home, search, watch, channel, get_preferred_template
from .helpers.formats import get_all_formatters

app = Flask(__name__)

app.register_blueprint(channel.bp)

@app.errorhandler(404)
def page_not_found(e):
    return render_template(get_preferred_template('404')), 404

@app.context_processor
def formatters():
    return get_all_formatters()

@app.route("/")
def home_route():
    return home.home_page()

@app.route("/results")
def search_route():
    return search.results_page()

@app.route("/watch")
def watch_route():
    return watch.watch_page()

@app.route("/all_comments")
def all_comments_route():
    return watch.all_comments_page()

@app.route("/related_ajax")
def related_ajax_route():
    if request.args.get('action_more_related_videos', '') == '1':
        return watch.related_ajax()

    return "Invalid request", 400

@app.route("/share_ajax")
def share_ajax_route():
    return { 'share_html': '<h4>Share HTML goes here...</h4>' }