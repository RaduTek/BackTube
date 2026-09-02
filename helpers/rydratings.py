from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import timedelta
from typing import Iterable, TypedDict

import requests

from logger import logger

from .cache import CacheData, CacheManager


class RydRatings(TypedDict):
    """Rating data from Return YouTube Dislikes API."""
    id: str
    dateCreated: str
    likes: int
    rawDislikes: int
    rawLikes: int
    dislikes: int
    rating: float
    viewCount: int
    deleted: bool


_RYD_WORKERS = 8


def _empty_ratings(video_id: str) -> RydRatings:
    return {
        'id': video_id,
        'dateCreated': '',
        'likes': 0,
        'rawDislikes': 0,
        'rawLikes': 0,
        'dislikes': 0,
        'rating': 0.0,
        'viewCount': 0,
        'deleted': True,
    }


def _normalize_ratings(video_id: str, payload: dict) -> RydRatings:
    return {
        'id': str(payload.get('id') or video_id),
        'dateCreated': str(payload.get('dateCreated') or ''),
        'likes': int(payload.get('likes') or 0),
        'rawDislikes': int(payload.get('rawDislikes') or 0),
        'rawLikes': int(payload.get('rawLikes') or 0),
        'dislikes': int(payload.get('dislikes') or 0),
        'rating': float(payload.get('rating') or 0),
        'viewCount': int(payload.get('viewCount') or 0),
        'deleted': bool(payload.get('deleted', False)),
    }


def _fetch_ratings(video_id: str) -> RydRatings:
    """Fetch rating data from Return YouTube Dislikes."""

    url = f'https://returnyoutubedislikeapi.com/votes?videoId={video_id}'
    logger.debug(f'Fetching RYD ratings for {video_id}')
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 404:
            return _empty_ratings(video_id)
        response.raise_for_status()
        payload = response.json()
        if not isinstance(payload, dict):
            return _empty_ratings(video_id)
        return _normalize_ratings(video_id, payload)
    except (requests.RequestException, ValueError, TypeError):
        return _empty_ratings(video_id)


cache = CacheManager('watch', ttl=timedelta(minutes=30))
ratings_cache = CacheData[RydRatings](
    cache,
    'ryd_ratings',
    ttl=timedelta(minutes=30),
    default_gen=_fetch_ratings,
)


def get_ratings(video_id: str, nocache: bool = False) -> RydRatings:
    """Fetch rating data from Return YouTube Dislikes."""

    if not video_id:
        return _empty_ratings(video_id)

    if nocache:
        ratings = _fetch_ratings(video_id)
        ratings_cache.set(video_id, ratings)
        return ratings

    return ratings_cache.get_default(video_id)


def get_ratings_for_videos(video_ids: Iterable[str]) -> dict[str, RydRatings]:
    """Load RYD ratings for many videos in parallel."""

    unique_ids = list(dict.fromkeys(video_id for video_id in video_ids if video_id))
    if not unique_ids:
        return {}

    results: dict[str, RydRatings] = {}
    workers = min(_RYD_WORKERS, len(unique_ids))
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {
            pool.submit(get_ratings, video_id): video_id
            for video_id in unique_ids
        }
        for future in as_completed(futures):
            video_id = futures[future]
            results[video_id] = future.result()

    return results
