from flask import Flask, render_template
from .pages import search, watch
from .helpers.formats import get_all_formatters

app = Flask(__name__)

@app.context_processor
def formatters():
    return get_all_formatters()

@app.route("/")
def home_route():
    return render_template("2012/home.html.j2", homepage=True)

@app.route("/results")
def search_route():
    return search.results_page()

@app.route("/watch")
def watch_route():
    return watch.watch_page()

@app.route("/share_ajax")
def share_ajax_route():
    return { 'share_html': '<h4>Share HTML goes here...</h4>' }