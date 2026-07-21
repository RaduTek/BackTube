import os
from dataclasses import dataclass

from utils import is_boolean_string


@dataclass(frozen=True, slots=True)
class Config:
    debug: bool = is_boolean_string(os.getenv('BACKTUBE_DEBUG', 'False'))
    cache_dir: str = os.getenv('BACKTUBE_CACHE_DIR', 'cache')
    enable_proxy: bool = is_boolean_string(os.getenv('BACKTUBE_ENABLE_PROXY', 'True'))
    allowed_proxy_hosts: str = os.getenv('BACKTUBE_ALLOWED_PROXY_HOSTS', 'youtube.com,ytimg.com,example.com')


config = Config()