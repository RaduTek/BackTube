
def channel_url(channel_id: str) -> str:
    if len(channel_id) == 0:
        return ''
    
    return f'/channel/{channel_id}'


def video_url(video_id: str, playlist_id: str | None = None) -> str:
    if playlist_id:
        return f'/watch?v={video_id}&list={playlist_id}'

    return f'/watch?v={video_id}'


def video_thumbnail_url(video_id: str) -> str:
    return f'https://i.ytimg.com/vi/{video_id}/default.jpg'
