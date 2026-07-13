from flask import Flask, render_template, request
from .helpers import ythelper
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
    search_query = request.args.get("search_query", "") or request.args.get("q", "")

    search_results = ythelper.get_search_results(search_query)

    return render_template("2012/results.html.j2", search_query=search_query, search_results=search_results)

@app.route("/watch")
def watch():
    return render_template("2012/watch.html.j2")
