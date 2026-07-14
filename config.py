import os
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Config:
    cache_dir: str = os.getenv('BACKTUBE_CACHE_DIR', 'cache')


config = Config()