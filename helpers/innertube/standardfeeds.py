from datetime import datetime, timedelta
from typing import TypedDict

from helpers.cache import CacheData, CacheManager

from . import FeedItem, client
from .search import parse_innertube_search_item


RECENTLY_FEATURED_BROWSE_ID = 'FEtrending'


class StandardFeedData(TypedDict):
    feed_id: str
    fetched_at: int
    entries: list[FeedItem]


def _extract_feed_items(value: object) -> list[FeedItem]:
    entries: list[FeedItem] = []
    seen_ids: set[str] = set()

    def visit(item: object) -> None:
        if isinstance(item, list):
            for child in item:
                visit(child)
            return
        if not isinstance(item, dict):
            return

        parsed = parse_innertube_search_item(item)
        if parsed is not None:
            item_id = parsed.get('id', '')
            if (
                parsed.get('type') == 'video'
                and item_id
                and item_id not in seen_ids
            ):
                seen_ids.add(item_id)
                entries.append(parsed)
            return

        for child in item.values():
            visit(child)

    visit(value)
    return entries


def get_recently_featured_innertube() -> StandardFeedData:
    response = client.browse(browse_id=RECENTLY_FEATURED_BROWSE_ID)
    return StandardFeedData(
        feed_id='recently_featured',
        fetched_at=int(datetime.now().timestamp()),
        entries=_extract_feed_items(response),
    )


cache = CacheManager(collection='standardfeeds', ttl=timedelta(minutes=30))
recently_featured_cache = CacheData[StandardFeedData](
    cache,
    'recently_featured',
    ttl=timedelta(minutes=30),
    default_gen=lambda _key: get_recently_featured_innertube(),
)


def get_recently_featured() -> StandardFeedData:
    return recently_featured_cache.get_default(RECENTLY_FEATURED_BROWSE_ID)
