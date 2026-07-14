from typing import TypedDict


class PagerProps(TypedDict):
    current: int
    total: int

    links: list[tuple[int, str]]
    prev_link: str | None
    next_link: str | None


def create_pager_props(current: int, total: int, get_page_url, window_size: int = 7) -> PagerProps:
    half_window = window_size // 2

    start = max(1, current - half_window)
    end = start + min(total, window_size) - 1

    return PagerProps(
        current=current,
        total=total,
        links=[(page, get_page_url(page)) for page in range(start, end + 1)],
        prev_link=get_page_url(current - 1) if current > 1 else None,
        next_link=get_page_url(current + 1) if current < total else None,
    )
