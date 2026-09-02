from flask import Blueprint, render_template

backtube_pages = Blueprint("backtube", __name__, url_prefix="/backtube")

@backtube_pages.get("/")
def home_page():
    return render_template('backtube/home.html.j2')

