import json
import random
import re
from datetime import datetime
from pathlib import Path

from helpers.innertube import FeedItem

HOMEPAGE_CONTENT_PATH = (
    Path(__file__).resolve().parent.parent
    / 'static'
    / 'site_assets'
    / '2012'
    / 'homepage_content.json'
)

CATEGORY_DISPLAY_NAMES = {
    'animals': 'Pets & Animals',
    'comedy': 'Comedy',
    'entertainment': 'Entertainment',
    'film': 'Film & Animation',
    'gadgets': 'Gaming',
    'music': 'Music',
    'people': 'People & Blogs',
    'travel': 'Travel & Events',
}


def category_slug(category: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', category.lower()).strip('-')


def load_homepage_content() -> list[FeedItem]:
    with HOMEPAGE_CONTENT_PATH.open(encoding='utf-8') as file:
        raw_videos = json.load(file)

    videos: list[FeedItem] = []
    for raw_video in raw_videos:
        try:
            if raw_video['type'] != 'video':
                continue
            published_at = datetime.fromisoformat(raw_video['published_at'])
            category = category_slug(str(raw_video['category']))
            video = FeedItem(
                type='video',
                id=str(raw_video['id']),
                title=str(raw_video['title']),
                url=str(raw_video['url']),
                thumbnail_url=str(raw_video['thumbnail_url']),
                channel_name=str(raw_video['channel_name']),
                channel_url=str(raw_video['channel_url']),
                length_text=str(raw_video['length_text']),
                view_count=int(raw_video['view_count']),
                published_at=published_at,
                category=category,
                category_name=CATEGORY_DISPLAY_NAMES.get(
                    category,
                    category.replace('-', ' ').title(),
                ),
                description=str(raw_video.get('description', '')).strip(),
            )
        except (KeyError, TypeError, ValueError):
            continue
        if video['id'] and video['title']:
            videos.append(video)
    return videos


def get_homepage_categories() -> list[dict[str, str]]:
    categories = sorted({
        video['category']
        for video in load_homepage_content()
    })
    return [
        {
            'feed_id': category,
            'display_name': CATEGORY_DISPLAY_NAMES.get(
                category,
                category.replace('-', ' ').title(),
            ),
        }
        for category in categories
    ]


def get_homepage_videos(
    feed_name: str = 'youtube',
    limit: int = 12,
) -> list[FeedItem]:
    videos = load_homepage_content()
    normalized_feed = category_slug(feed_name)
    if normalized_feed not in {'youtube', 'trending', 'popular'}:
        videos = [
            video
            for video in videos
            if video['category'] == normalized_feed
        ]

    return random.sample(videos, min(limit, len(videos)))
