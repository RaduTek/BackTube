import hashlib
import requests
from urllib import parse
from flask import request
from werkzeug.exceptions import NotFound

from config import config
from helpers.cache import CacheBlob, CacheManager


cache_mgr = CacheManager(collection='proxy_data')
cache = CacheBlob(cache_mgr, name='', ext='', raw=True, ttl=None)


def proxy_handler(base_route: str, use_cache: bool = True):
    """
    Proxy handler for fetching content from a given URL.
    If cache is True, the response will be cached for future requests.
    """
    if not config.enable_proxy:
        raise NotFound("Proxy module is disabled.")

    try:
        url = request.url.split(base_route, 1)[-1]
        method = request.method

        url_parsed = parse.urlparse(url)
        url_hostname = url_parsed.hostname
        url_hash = hashlib.md5(url.encode()).hexdigest()
        print(url_parsed.hostname)

        if url_hostname not in config.allowed_proxy_hosts.split(','):
            raise NotFound(f"Host '{url_hostname}' is not allowed for proxying.")
        
        if use_cache and cache.exists(url_hash):
            with cache.open(url_hash, 'rb') as f:
                return f.read()

        response = requests.request(method, url, params=request.args, data=request.form, headers=dict(request.headers))
        response.raise_for_status()
        
        if use_cache:
            with cache.open(url_hash, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
        
        return response.content
    except requests.RequestException as e:
        raise NotFound(f"Failed to fetch content from {url}: {str(e)}")