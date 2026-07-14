import requests
from typing import TypedDict


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


def get_ratings(video_id: str) -> RydRatings:
    """Fetch rating data from Return YouTube Dislikes API."""
    url = f"https://returnyoutubedislikeapi.com/Votes?videoId={video_id}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.RequestException:
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