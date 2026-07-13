
def format_view_count(view_count):
    """
    Format the view count to a more readable format.
    For example, 1500 becomes "1.5K", 2000000 becomes "2M", etc.
    """
    if view_count >= 1_000_000:
        return f"{view_count / 1_000_000:.1f}M"
    elif view_count >= 1_000:
        return f"{view_count / 1_000:.1f}K"
    else:
        return str(view_count)


def format_duration(duration):
    """
    Format the duration in seconds to a more readable format.
    For example, 3600 becomes "1:00:00", 90 becomes "1:30", etc.
    """
    hours, remainder = divmod(duration, 3600)
    minutes, seconds = divmod(remainder, 60)
    if hours > 0:
        return f"{hours}:{minutes:02}:{seconds:02}"
    else:
        return f"{minutes}:{seconds:02}"


def get_all_formatters():
    """
    Return a dictionary of all available formatters.
    """

    return {
        'format_view_count': format_view_count,
        'format_duration': format_duration,
    }