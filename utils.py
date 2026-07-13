
from typing import Optional


def find_nested_key(adict: dict, key: str, default=None) -> Optional[dict]:
    stack = [adict]
    while stack:
        d = stack.pop()
        if key in d:
            return d[key]
        for v in d.values():
            if isinstance(v, dict):
                stack.append(v)
            if isinstance(v, list):
                stack += v
    
    return default
