from urllib.parse import quote_plus, urlencode

from flask import request, render_template

from . import get_preferred_template
from helpers.pager import create_pager_props
from helpers.parsers import parse_int
from helpers.innertube.search import (
    apply_category_query,
    encode_search_params,
    get_search_results_page,
)


SEARCH_TYPES = ('', 'videos', 'search_videos', 'search_users', 'search_playlists')
SEARCH_SORTS = ('', 'video_date_uploaded', 'video_view_count', 'video_avg_rating')
SEARCH_UPLOADED = ('', 'd', 'w', 'm')
SEARCH_DURATIONS = ('', 'short', 'long')
SEARCH_CATEGORIES = ('', '27', '22', '10', '17', '23')
FEATURE_FLAGS = (
    'closed_captions',
    'high_definition',
    'partner',
    'rental',
    'webm',
)
VIDEO_ONLY_KEYS = {
    'search_sort',
    'uploaded',
    'search_duration',
    'search_category',
    *FEATURE_FLAGS,
}

FILTER_GROUPS = (
    {
        'label': 'Result type',
        'param': 'search_type',
        'options': (
            ('', 'All'),
            ('videos', 'Videos'),
            ('search_users', 'Channels'),
            ('search_playlists', 'Playlists'),
        ),
    },
    {
        'label': 'Sort by',
        'param': 'search_sort',
        'video_only': True,
        'options': (
            ('', 'Relevance'),
            ('video_date_uploaded', 'Upload date'),
            ('video_view_count', 'View count'),
            ('video_avg_rating', 'Rating'),
        ),
    },
    {
        'label': 'Upload date',
        'param': 'uploaded',
        'video_only': True,
        'options': (
            ('', 'Anytime'),
            ('d', 'Today'),
            ('w', 'This week'),
            ('m', 'This month'),
        ),
    },
    {
        'label': 'Categories',
        'param': 'search_category',
        'video_only': True,
        'options': (
            ('', 'All'),
            ('27', 'Education'),
            ('22', 'People & Blogs'),
            ('10', 'Music'),
            ('17', 'Sports'),
            ('23', 'Comedy'),
        ),
    },
    {
        'label': 'Duration',
        'param': 'search_duration',
        'video_only': True,
        'options': (
            ('', 'All'),
            ('short', 'Short (~4 minutes)'),
            ('long', 'Long (20~ minutes)'),
        ),
    },
    {
        'label': 'Features',
        'video_only': True,
        'options': (
            ('', 'All'),
            ('closed_captions', 'Closed captions'),
            ('high_definition', 'HD (high definition)'),
            ('partner', 'Partner videos'),
            ('rental', 'Rental'),
            ('webm', 'WebM'),
        ),
    },
)


def _choice(value: str | None, allowed: tuple[str, ...]) -> str:
    return value if value in allowed else ''


def parse_search_filters() -> dict:
    filters = {
        'search_query': request.args.get('search_query', ''),
        'search_type': _choice(request.args.get('search_type', ''), SEARCH_TYPES),
        'search_sort': _choice(request.args.get('search_sort', ''), SEARCH_SORTS),
        'uploaded': _choice(request.args.get('uploaded', ''), SEARCH_UPLOADED),
        'search_duration': _choice(request.args.get('search_duration', ''), SEARCH_DURATIONS),
        'search_category': _choice(request.args.get('search_category', ''), SEARCH_CATEGORIES),
        'search': request.args.get('search', ''),
    }
    for flag in FEATURE_FLAGS:
        filters[flag] = request.args.get(flag) == '1'
    return filters


def _has_video_filters(filters: dict) -> bool:
    return any((
        filters.get('search_sort'),
        filters.get('uploaded'),
        filters.get('search_duration'),
        filters.get('search_category'),
        *(filters.get(flag) for flag in FEATURE_FLAGS),
    ))


def _filters_active(filters: dict) -> bool:
    return bool(filters.get('search_type')) or _has_video_filters(filters)


def _query_pairs(filters: dict, page: int = 1) -> list[tuple[str, str]]:
    pairs: list[tuple[str, str]] = []
    search_query = filters.get('search_query', '')
    if search_query:
        pairs.append(('search_query', search_query))

    search_type = filters.get('search_type', '')
    if search_type:
        pairs.append(('search_type', search_type))
    if filters.get('search'):
        pairs.append(('search', str(filters['search'])))
    if filters.get('search_sort'):
        pairs.append(('search_sort', filters['search_sort']))
    if filters.get('uploaded'):
        pairs.append(('uploaded', filters['uploaded']))
    if filters.get('search_duration'):
        pairs.append(('search_duration', filters['search_duration']))
    if filters.get('search_category'):
        pairs.append(('search_category', filters['search_category']))
    for flag in FEATURE_FLAGS:
        if filters.get(flag):
            pairs.append((flag, '1'))
    if page > 1:
        pairs.append(('page', str(page)))
    return pairs


def results_url(filters: dict, page: int = 1, **overrides) -> str:
    next_filters = dict(filters)
    next_filters.update(overrides)

    changing_type = overrides.get('search_type')
    if 'search_type' in overrides and changing_type in {
        '', 'search_users', 'search_playlists',
    }:
        next_filters['search_sort'] = ''
        next_filters['uploaded'] = ''
        next_filters['search_duration'] = ''
        next_filters['search_category'] = ''
        for flag in FEATURE_FLAGS:
            next_filters[flag] = False
    elif any(key in overrides for key in VIDEO_ONLY_KEYS):
        if next_filters.get('search_type') in {'', 'search_users', 'search_playlists'}:
            next_filters['search_type'] = 'videos'

    return '/results?' + urlencode(_query_pairs(next_filters, page=page))


def _feature_selected(filters: dict, value: str) -> bool:
    if not value:
        return not any(filters.get(flag) for flag in FEATURE_FLAGS)
    return bool(filters.get(value))


def _option_overrides(group: dict, value: str) -> dict:
    if group.get('param'):
        return {group['param']: value}

    overrides = {flag: False for flag in FEATURE_FLAGS}
    if value:
        overrides[value] = True
    return overrides


def build_filter_groups(filters: dict) -> list[dict]:
    groups = []
    for group in FILTER_GROUPS:
        options = []
        for value, label in group['options']:
            selected = (
                _feature_selected(filters, value)
                if not group.get('param')
                else filters.get(group['param'], '') == value
            )
            options.append({
                'label': label,
                'selected': selected,
                'url': None if selected else results_url(
                    filters,
                    **_option_overrides(group, value),
                ),
            })
        groups.append({
            'label': group['label'],
            'options': options,
        })
    return groups


def results_page():
    filters = parse_search_filters()
    search_query = filters['search_query']
    search_query_url = quote_plus(search_query)
    search_page = parse_int(request.args.get('page'), 1, minimum=1)
    search_params = encode_search_params(filters)

    search_results = get_search_results_page(
        apply_category_query(search_query, filters.get('search_category')),
        page_number=search_page,
        search_params=search_params,
    )

    if not search_results:
        return 'no search results found'

    # Estimated, some pages contain more items
    per_page_count = 20
    total = (search_results['estimated_results']) // per_page_count

    def get_page_url(page_number):
        return results_url(filters, page=page_number)

    pager = create_pager_props(search_page, total, get_page_url)

    return render_template(
        get_preferred_template('results'),
        search_query=search_query,
        search_query_url=search_query_url,
        search_page=search_page,
        search_results=search_results,
        search_filters=filters,
        search_filter_groups=build_filter_groups(filters),
        search_filters_active=_filters_active(filters),
        pager=pager,
    )
