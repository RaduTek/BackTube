from flask import Flask, render_template, request
from .pages import search
from .helpers.formats import get_all_formatters

app = Flask(__name__)

@app.context_processor
def formatters():
    return get_all_formatters()

@app.route("/")
def home():
    return render_template("2012/home.html.j2", homepage=True)

@app.route("/results")
def results():
    return search.results_page()

@app.route("/watch")
def watch():
    return render_template("2012/watch.html.j2")
