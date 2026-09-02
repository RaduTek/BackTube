import re
from datetime import datetime, timedelta, timezone
from typing import overload


def truthy(value: str | None) -> bool:
    return (value or '').strip().lower() in {'1', 'true', 'yes'}


def parse_int(
    value: str | int | None,
    default: int = 0,
    *,
    minimum: int | None = None,
    maximum: int | None = None,
) -> int:
    try:
        parsed = int(value) if value is not None else default
    except (TypeError, ValueError):
        parsed = default

    if minimum is not None:
        parsed = max(minimum, parsed)
    if maximum is not None:
        parsed = min(maximum, parsed)
    return parsed


def parse_duration_seconds(value: str | None, default: int = 0) -> int:
    if not value:
        return default

    try:
        parts = [int(part) for part in value.split(':')]
    except (TypeError, ValueError):
        return default

    if len(parts) == 3:
        hours, minutes, seconds = parts
    elif len(parts) == 2:
        hours = 0
        minutes, seconds = parts
    else:
        return default

    return hours * 3600 + minutes * 60 + seconds


@overload
def parse_count(value: str | None, default: int = 0) -> int:
    ...


@overload
def parse_count(value: str | None, default: None) -> int | None:
    ...


def parse_count(
    value: str | None,
    default: int | None = 0,
) -> int | None:
    if not value:
        return default

    normalized = value.lower().replace(',', '').strip()
    if 'no views' in normalized:
        return 0

    match = re.search(
        r'(\d+(?:\.\d+)?)\s*(thousand|million|billion|[kmb])?',
        normalized,
    )
    if not match:
        return default

    multipliers = {
        'k': 1_000,
        'thousand': 1_000,
        'm': 1_000_000,
        'million': 1_000_000,
        'b': 1_000_000_000,
        'billion': 1_000_000_000,
    }
    return int(
        float(match.group(1))
        * multipliers.get(match.group(2) or '', 1)
    )


def looks_like_view_count(value: str) -> bool:
    normalized = value.lower().strip()
    return (
        'view' in normalized
        or 'watching' in normalized
        or bool(re.fullmatch(r'\d[\d,.]*\s*[kmb]?', normalized))
    )


def parse_published_at(
    value: str,
    now: datetime | None = None,
) -> datetime | None:
    normalized = value.lower().strip()
    normalized = re.sub(r'^(streamed|premiered)\s+', '', normalized)
    now = now or datetime.now()

    if normalized == 'today':
        return now
    if normalized == 'yesterday':
        return now - timedelta(days=1)

    match = re.search(
        r'(\d+)\s*'
        r'(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|'
        r'days?|d|weeks?|wks?|w|months?|mos?|years?|yrs?|y)'
        r'\s+ago',
        normalized,
    )
    if match:
        amount = int(match.group(1))
        unit = match.group(2)
        if unit.startswith(('second', 'sec')) or unit == 's':
            return now - timedelta(seconds=amount)
        if unit.startswith(('minute', 'min')) or unit == 'm':
            return now - timedelta(minutes=amount)
        if unit.startswith(('hour', 'hr')) or unit == 'h':
            return now - timedelta(hours=amount)
        if unit.startswith('day') or unit == 'd':
            return now - timedelta(days=amount)
        if unit.startswith(('week', 'wk')):
            return now - timedelta(weeks=amount)
        if unit.startswith(('month', 'mo')):
            return now - timedelta(days=amount * 30)
        if unit.startswith(('year', 'yr')) or unit == 'y':
            return now - timedelta(days=amount * 365)

    for date_format in ('%b %d, %Y', '%B %d, %Y', '%Y-%m-%d'):
        try:
            return datetime.strptime(value.strip(), date_format)
        except ValueError:
            continue
    return None


def datetime_to_iso8601(value: datetime | None) -> str:
    if value is None:
        return ''
    if value.tzinfo is None:
        value = value.astimezone()
    return (
        value.astimezone(timezone.utc)
        .isoformat(timespec='milliseconds')
        .replace('+00:00', 'Z')
    )


def timestamp_to_iso8601(timestamp: int | float) -> str:
    return datetime_to_iso8601(
        datetime.fromtimestamp(timestamp, timezone.utc)
    )
