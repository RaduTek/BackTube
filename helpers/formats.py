from . import links

def format_string_limit_words(string: str, limit: int = 10) -> str:
    """
    Limit the number of words in a string to the specified limit.
    If the string has more words than the limit, it will be truncated and "..." will be added at the end.
    """
    words = string.split()
    if len(words) > limit:
        return ' '.join(words[:limit]) + '...'
    return string


def format_string_multiline(string: str) -> str:
    return string.replace("\n", "<br>")


def format_number(number: int):
    return f"{number:,d}"


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


def duration_to_seconds(duration_str):
    """
    Convert a duration string in the format "HH:MM:SS" or "MM:SS" to total seconds.
    For example, "1:30" becomes 90, "1:00:00" becomes 3600, etc.
    """
    parts = duration_str.split(':')
    parts = [int(part) for part in parts]
    
    if len(parts) == 3:
        hours, minutes, seconds = parts
    elif len(parts) == 2:
        hours = 0
        minutes, seconds = parts
    else:
        raise ValueError("Invalid duration format. Expected 'HH:MM:SS' or 'MM:SS'.")
    
    return hours * 3600 + minutes * 60 + seconds


def format_remove_prefix(string: str, prefix_index: int = 1) -> str:
    """
    Remove the prefix from a string based on the given index.
    For example, if the string is "Hello World" and the prefix_index is 1,
    it will return "World".
    """
    return ' '.join(string.split(' ')[prefix_index:])


def format_remove_suffix(string: str, suffix_index: int = 1) -> str:
    """
    Remove the suffix from a string based on the given index.
    For example, if the string is "Hello World" and the suffix_index is 1,
    it will return "Hello".
    """
    return ' '.join(string.split(' ')[:-suffix_index])


def get_domain(url: str) -> str:
    """
    Extract the domain from a given URL.
    For example, if the URL is "https://www.example.com/path", it will return "example.com".
    """
    from urllib.parse import urlparse

    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    # Remove 'www.' prefix if present
    if domain.startswith('www.'):
        domain = domain[4:]
    return domain


def get_all_formatters():
    """
    Return a dictionary of all available formatters.
    """

    return {
        'format_string_limit_words': format_string_limit_words,
        'format_string_multiline': format_string_multiline,
        'format_view_count': format_view_count,
        'format_duration': format_duration,
        'format_number': format_number,
        'format_remove_prefix': format_remove_prefix,
        'format_remove_suffix': format_remove_suffix,
        'get_domain': get_domain,
        'video_thumbnail_url': links.video_thumbnail_url,
    }