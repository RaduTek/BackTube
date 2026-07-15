from flask import render_template

from . import get_preferred_template
from ..helpers.flags import get_flag


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
        {
            'feed_id': 'music',
            'feed_type': 'system',
            'display_name': 'Music',
        },
        {
            'feed_id': 'entertainment',
            'feed_type': 'chart',
            'display_name': 'Entertainment',
        },
        {
            'feed_id': 'sports',
            'feed_type': 'system',
            'display_name': 'Sports',
        },
        {
            'feed_id': 'comedy',
            'feed_type': 'system',
            'display_name': 'Comedy',
        },
        {
            'feed_id': 'film',
            'feed_type': 'system',
            'display_name': 'Film &amp; Animation',
        },
        {
            'feed_id': 'gadgets',
            'feed_type': 'system',
            'display_name': 'Gaming',
        },
    ]

    user_feeds = [
        {
            'feed_id': 'abcdef0123',
            'feed_type': 'user',
            'display_name': 'User Feed 1',
            'thumbnail_url': 'http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif'
        },
        {
            'feed_id': 'abcdef4567',
            'feed_type': 'user',
            'display_name': 'User Feed 2',
            'thumbnail_url': 'http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif'
        },
        {
            'feed_id': 'abcdef8901',
            'feed_type': 'user',
            'display_name': 'User Feed 3',
            'thumbnail_url': 'http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif'
        },
    ]

    return render_template(
        get_preferred_template('home'), 
        homepage=True,
        feeds=system_feeds + user_feeds
    )


def home_page():
    """Home page handler"""

    match get_flag('preferred_version'):
        case '2012':
            return _home_2012()
        case _:
            return "No available template"