import gzip
import hashlib
import mimetypes
import zlib
from urllib import parse

import requests
from flask import Response, request
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound

from config import config
from helpers.cache import CacheBlob, CacheData, CacheManager
from logger import logger

cache_mgr = CacheManager(collection='proxy_data')
body_cache = CacheBlob(cache_mgr, name='body', ext='', raw=True, ttl=None)
meta_cache = CacheData[dict](cache_mgr, 'headers', ttl=None)

WAYBACK_DATETIME_LENGTH = 14  # YYYYMMDDHHMMSS
REQUEST_TIMEOUT = 30
DEFAULT_USER_AGENT = (
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 '
    '(KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7'
)
HOP_BY_HOP_REQUEST_HEADERS = {
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'host',
    'content-length',
    'cookie',
    'accept-encoding',
}
PASSTHROUGH_RESPONSE_HEADERS = (
    'cache-control',
    'etag',
    'last-modified',
    'expires',
    'accept-ranges',
    'content-range',
    'content-disposition',
)


def _is_allowed_proxy_host(hostname: str | None) -> bool:
    if not hostname:
        return False

    hostname = hostname.lower().rstrip('.')
    allowed_hosts = [
        host.strip().lower().rstrip('.')
        for host in config.allowed_proxy_hosts.split(',')
        if host.strip()
    ]
    return any(
        hostname == allowed or hostname.endswith('.' + allowed)
        for allowed in allowed_hosts
    )


def web_archive_url(url: str, date: str) -> str:
    """Build a Wayback Machine identity URL from a date prefix."""

    digits = ''.join(ch for ch in date if ch.isdigit())
    if not digits:
        raise NotFound('A date is required for web archive proxying.')

    timestamp = digits.ljust(WAYBACK_DATETIME_LENGTH, '0')[:WAYBACK_DATETIME_LENGTH]
    return f'https://web.archive.org/web/{timestamp}id_/{url}'


def _normalize_proxy_url(url: str) -> str:
    url = (url or '').strip()
    if not url:
        raise BadRequest('A URL is required for proxying.')

    # Werkzeug merge_slashes collapses https:// into https:/
    if url.startswith('https:/') and not url.startswith('https://'):
        url = 'https://' + url[len('https:/'):]
    elif url.startswith('http:/') and not url.startswith('http://'):
        url = 'http://' + url[len('http:/'):]

    if url.startswith('//'):
        url = 'https:' + url
    elif '://' not in url:
        url = 'https://' + url

    parsed = parse.urlparse(url)
    if not parsed.scheme or not parsed.hostname:
        raise BadRequest(f'Invalid proxy URL: {url}')
    return url


def _extract_target_url(base_route: str) -> str:
    return _normalize_proxy_url(request.url.split(base_route, 1)[-1])


def _upstream_headers() -> dict[str, str]:
    headers: dict[str, str] = {}
    for key, value in request.headers:
        if key.lower() in HOP_BY_HOP_REQUEST_HEADERS:
            continue
        headers[key] = value
    headers['User-Agent'] = DEFAULT_USER_AGENT
    return headers


def _decompress_body(body: bytes, content_encoding: str | None = None) -> bytes:
    """Decompress a proxied body before caching or returning it."""

    if not body:
        return body

    if body.startswith(b'\x1f\x8b'):
        try:
            return gzip.decompress(body)
        except gzip.BadGzipFile:
            logger.warning('Failed to gzip-decompress proxied body')

    encodings = [
        part.strip().lower()
        for part in (content_encoding or '').split(',')
        if part.strip() and part.strip().lower() != 'identity'
    ]
    result = body
    for encoding in reversed(encodings):
        try:
            if encoding in {'gzip', 'x-gzip'}:
                if result.startswith(b'\x1f\x8b'):
                    result = gzip.decompress(result)
            elif encoding == 'deflate':
                try:
                    result = zlib.decompress(result)
                except zlib.error:
                    result = zlib.decompress(result, -zlib.MAX_WBITS)
            elif encoding in {'br', 'brotli'}:
                brotli = __import__('brotli')
                result = brotli.decompress(result)
        except Exception as exc:
            logger.warning(f'Failed to decompress {encoding} proxied body: {exc}')
            break
    return result


def _looks_like_html(body: bytes) -> bool:
    return body.lstrip()[:64].lower().startswith((b'<!doctype', b'<html', b'<head'))


def _guess_content_type(url: str, fallback: str | None = None) -> str:
    path = parse.urlparse(url).path
    guessed, _encoding = mimetypes.guess_type(path)
    return guessed or fallback or 'application/octet-stream'


def _filter_response_headers(source: dict) -> dict[str, str]:
    headers: dict[str, str] = {}
    for name in PASSTHROUGH_RESPONSE_HEADERS:
        value = source.get(name) or source.get(name.title())
        if value:
            headers[name] = value
    return headers


def _cached_response(url_hash: str, url: str) -> Response | None:
    body = body_cache.get(url_hash)
    if body is None:
        return None

    meta = meta_cache.get(url_hash) or {}
    content_type = meta.get('content_type') or _guess_content_type(url)
    body = _decompress_body(body, (meta.get('headers') or {}).get('content-encoding'))
    if 'html' in content_type.lower() and not _looks_like_html(body):
        return None

    return Response(
        body,
        status=int(meta.get('status') or 200),
        content_type=content_type,
        headers=_filter_response_headers(meta.get('headers') or {}),
    )


def _store_response(url_hash: str, url: str, body: bytes, status: int, content_type: str, headers: dict) -> None:
    body_cache.set(url_hash, body)
    meta_cache.set(url_hash, {
        'url': url,
        'status': status,
        'content_type': content_type,
        'headers': _filter_response_headers(headers),
    })


def proxy_handler(
    base_route: str,
    use_cache: bool = True,
    archive_date: str | None = None,
):
    """
    Proxy handler for fetching content from a given URL.
    If cache is True, the response will be cached for future requests.
    """
    if not config.enable_proxy:
        raise BadRequest("Proxy module is disabled.")

    url = _extract_target_url(base_route)
    method = request.method
    url_hostname = parse.urlparse(url).hostname

    logger.info(f"Proxy request {method} \"{url}\" to host: {url_hostname}")

    if not _is_allowed_proxy_host(url_hostname):
        logger.warning(f"Host '{url_hostname}' is not allowed for proxying.")
        raise BadRequest(f"Host '{url_hostname}' is not allowed for proxying.")

    fetch_url = web_archive_url(url, archive_date) if archive_date else url
    url_hash = hashlib.md5(fetch_url.encode()).hexdigest()

    if use_cache:
        cached = _cached_response(url_hash, fetch_url)
        if cached is not None:
            return cached

    try:
        upstream = requests.request(
            method,
            fetch_url,
            data=None if method in {'GET', 'HEAD'} else request.get_data(),
            headers=_upstream_headers(),
            timeout=REQUEST_TIMEOUT,
            allow_redirects=True,
        )
    except requests.RequestException as e:
        logger.error(f"Failed to fetch content from {fetch_url}: {str(e)}")
        raise InternalServerError(
            f"Failed to fetch content from {fetch_url}: {str(e)}"
        )

    content_type = (
        upstream.headers.get('Content-Type')
        or _guess_content_type(fetch_url)
    )
    body = _decompress_body(upstream.content, upstream.headers.get('Content-Encoding'))

    if use_cache and upstream.ok:
        _store_response(
            url_hash,
            url,
            body,
            upstream.status_code,
            content_type,
            dict(upstream.headers),
        )

    return Response(
        body,
        status=upstream.status_code,
        content_type=content_type,
        headers=_filter_response_headers(dict(upstream.headers)),
    )
