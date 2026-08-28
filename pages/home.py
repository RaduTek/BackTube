from flask import render_template, request

from . import get_preferred_template
from helpers.flags import get_flag
from helpers.homepage import get_homepage_categories, get_homepage_videos


def _home_2012():
    """Render the 2012 version of the home page"""
    
    system_feeds = [
        {
            'feed_id': 'trending',
            'feed_type': 'system',
            'display_name': 'Trending',
        },
        {
            'feed_id': 'popular',
            'feed_type': 'system',
            'display_name': 'Popular',
        },
    ]
    system_feeds.extend({
        **category,
        'feed_type': 'system',
    } for category in get_homepage_categories())

    return render_template(
        get_preferred_template('home'), 
        homepage=True,
        feeds=system_feeds,
        feed_name='youtube',
        feed_display_name='From YouTube',
        videos=get_homepage_videos(),
    )


def home_page():
    """Home page handler"""

    match get_flag('preferred_version'):
        case '2012':
            return _home_2012()
        case _:
            return "No available template"


def guide_ajax():
    feed_name = request.args.get('feed_name', 'trending').strip().lower()
    display_names = {
        'youtube': 'From YouTube',
        'trending': 'Trending',
        'popular': 'Popular',
    }
    display_names.update({
        category['feed_id']: category['display_name']
        for category in get_homepage_categories()
    })
    display_name = display_names.get(
        feed_name,
        feed_name.replace('-', ' ').title(),
    )
    feed_html = render_template(
        get_preferred_template('home_feed'),
        feed_name=feed_name,
        feed_display_name=display_name,
        videos=get_homepage_videos(feed_name),
    )
    return {
        'paging': None,
        'feed_html': feed_html,
    }