from typing import TypedDict
from flask import request

from utils import is_boolean_string


COOKIE_PREFIX = 'backtube_'

class Flags(TypedDict):
    """User experience settings flags."""
    
    preferred_version: str


DEFAULT_FLAGS = Flags(
    preferred_version='2012'
)

def get_flags() -> Flags:
    """Return the user's experience settings flags from their cookies."""
    
    flags = {}
    flags.update(DEFAULT_FLAGS)

    # Load flags from cookies
    for key in flags.keys():
        cookie_name = COOKIE_PREFIX + key
        cookie_value = request.cookies.get(cookie_name)
        if cookie_value is not None:
            flags[key] = cookie_value
    
    return Flags(**flags)


def get_flag(key: str, default: str = '') -> str:
    """Return the value of a specific flag."""

    cookie_name = COOKIE_PREFIX + key
    cookie_value = request.cookies.get(cookie_name)

    if cookie_value is not None:
        return cookie_value
    
    return DEFAULT_FLAGS.get(key, default)


def get_flag_bool(key: str, default: bool = False) -> bool:
    """Return the boolean value of a specific flag."""

    value = get_flag(key, str(default).lower())
    return is_boolean_string(value)


def get_flag_int(key: str, default: int = 0) -> int:
    """Return the integer value of a specific flag."""

    value = get_flag(key, str(default))
    try:
        return int(value)
    except ValueError:
        return default