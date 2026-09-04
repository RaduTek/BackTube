import re
from functools import cache
from pathlib import Path
from typing import TypedDict
from xml.etree import ElementTree

from .homepage import (
    CATEGORY_DISPLAY_NAMES,
    HOMEPAGE_CONTENT_PATH,
    category_slug,
    load_homepage_content,
)
from .innertube import FeedItem
from .parsers import parse_count


CATEGORIES_PATH = (
    Path(__file__).resolve().parent.parent
    / 'static'
    / 'schemas'
    / '2007'
    / 'categories.cat'
)
CATEGORY_FEED_PREFIXES = (
    'most_viewed',
    'most_discussed',
    'top_rated',
    'top_favorites',
    'most_popular',
)


class StandardFeedData(TypedDict):
    title: str
    fetched_at: int
    entries: list[FeedItem]


class StandardFeedCategory(TypedDict):
    label: str
    slug: str


def _lookup_key(value: str) -> str:
    return re.sub(r'[^a-z0-9]+', '', value.casefold())


def _category_slug(term: str, label: str) -> str:
    for slug, display_name in CATEGORY_DISPLAY_NAMES.items():
        if label.casefold() == display_name.casefold():
            return slug
    return category_slug(term)


@cache
def get_standard_feed_categories() -> dict[str, StandardFeedCategory]:
    root = ElementTree.parse(CATEGORIES_PATH).getroot()
    category_tag = '{http://www.w3.org/2005/Atom}category'
    categories: dict[str, StandardFeedCategory] = {}

    for element in root.findall(category_tag):
        term = element.get('term', '').strip()
        label = element.get('label', term).strip()
        if not term:
            continue

        category = StandardFeedCategory(
            label=label,
            slug=_category_slug(term, label),
        )
        for name in (term, label, category['slug']):
            categories[_lookup_key(name)] = category

    return categories


def _resolve_feed_name(
    feed_name: str,
    user_agent: str,
) -> tuple[str, StandardFeedCategory | None] | None:
    normalized = feed_name.strip().lower().replace('-', '_')

    for prefix in CATEGORY_FEED_PREFIXES:
        marker = f'{prefix}_'
        if normalized.startswith(marker):
            category = get_standard_feed_categories().get(
                _lookup_key(feed_name[len(marker):])
            )
            return (prefix, category) if category else None

    if normalized == 'featured':
        return 'recently_featured', None
    if normalized in {'recently_featured', 'most_popular'}:
        return normalized, None

    if 'Android-YouTube/1.1' in user_agent:
        if normalized in {'most_viewed', 'top_rated'}:
            return 'most_popular', None
        if normalized in {'most_discussed', 'most_recent'}:
            return 'recently_featured', None
    if normalized == 'most_discussed' and '/4.1' in user_agent:
        return 'recently_featured', None
    return None


def _view_count(entry: FeedItem) -> int:
    value = entry.get('view_count')
    if isinstance(value, int):
        return value
    return parse_count(entry.get('viewcount_text'), default=0)


def get_standard_feed(
    feed_name: str,
    *,
    user_agent: str = '',
) -> StandardFeedData | None:
    resolved = _resolve_feed_name(feed_name, user_agent)
    if resolved is None:
        return None
    feed_type, category = resolved

    entries = load_homepage_content()
    if category:
        entries = [
            entry
            for entry in entries
            if category_slug(str(entry.get('category') or ''))
            == category['slug']
        ]
    if feed_type == 'most_popular':
        entries.sort(key=_view_count, reverse=True)

    title = feed_type.replace('_', ' ').title()
    if category:
        title = f'{title}: {category["label"]}'

    return StandardFeedData(
        title=title,
        fetched_at=int(HOMEPAGE_CONTENT_PATH.stat().st_mtime),
        entries=entries,
    )
