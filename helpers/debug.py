from datetime import datetime
import json
from pathlib import Path
from config import config

def debug_dump(source: str, value, tag: str = "response"):
    """Save data into a JSON file for debugging purposes"""

    if not config.debug_dump_responses:
        return

    timestamp = int(datetime.now().timestamp())
    target_fn = Path(config.cache_dir) / "debug_dump" / source / f"{tag}_{timestamp}.json"

    target_fn.parent.mkdir(parents=True, exist_ok=True)

    with open(target_fn, 'w') as f:
        json.dump(value, f, indent=4)