from typing import TypedDict, Literal
from typing_extensions import NotRequired

from innertube.clients import InnerTube

client = InnerTube("WEB")


class FeedItem(TypedDict):
    type: Literal['video', 'channel', 'playlist', 'unknown']
    id: str
    title: str
    url: str
    thumbnail_url: str # video, channel, playlist

    published_text: NotRequired[str] # video
    viewcount_text: NotRequired[str] # video
    length_text: NotRequired[str] # video
    description: NotRequired[str] # video, channel
    like_count: NotRequired[str] # video
    comment_count: NotRequired[str] # video
    duration_text: NotRequired[str] # video
    published_date_text: NotRequired[str] # video

    channel_id: NotRequired[str]
    channel_handle: NotRequired[str]
    channel_name: NotRequired[str]
    channel_url: NotRequired[str]
    
    playlist_id: NotRequired[str]
    playlist_items: NotRequired[list['FeedItem']]
    playlist_url: NotRequired[str]
    video_count: NotRequired[str]


class FeedCollection(TypedDict):
    feed_id: str
    feed_type: str
    title: str
    items: list[FeedItem]
    next_continuation: NotRequired[str]