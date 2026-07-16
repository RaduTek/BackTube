import json
import os
from ..config import config


def save_cache_data(collection: str, key: str, data: dict) -> None:
    """
    Save data to the cache for a given collection and key.

    Args:
        collection (str): The name of the collection.
        key (str): The key to store data for.
        data (dict): The data to be cached.
    """
    
    collection_path = os.path.join(config.cache_dir, collection)

    os.makedirs(collection_path, exist_ok=True)

    data_file = os.path.join(collection_path, f"{key}.json")

    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def get_cache_data(collection: str, key: str, default: dict = {}) -> dict:
    """
    Get data from the cache for a given collection and key.

    Args:
        collection (str): The name of the collection.
        key (str): The key to retrieve data for.
        default (dict): The default value to return if the key is not found.

    Returns:
        dict: The cached data if found, otherwise the default value.
    """

    collection_path = os.path.join(config.cache_dir, collection)
    data_file = os.path.join(collection_path, f"{key}.json")

    if os.path.exists(data_file):
        with open(data_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    return default