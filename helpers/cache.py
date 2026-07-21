import json
import os
from datetime import datetime, timedelta
from typing import IO, Any, Callable, Generic, TypeVar, TypedDict
from config import config

T = TypeVar("T")


class CacheObject(Generic[T]):

    manager: "CacheManager"
    name: str
    ext: str
    ttl: timedelta | None
    inherit_expiration_time: bool
    default_gen: Callable[[str], T] | None = None

    def __init__(
        self,
        manager: "CacheManager",
        name: str,
        ext: str,
        raw: bool,
        ttl: timedelta | None = None,
        inherit_expiration_time: bool = True,
        default_gen: Callable[[str], T] | None = None,
    ) -> None:
        self.name = name
        self.ext = ext
        self.raw = raw
        self.ttl = ttl
        self.inherit_expiration_time = inherit_expiration_time
        self.default_gen = default_gen
        self.manager = manager.register(self)

    def path(self, key: str) -> str:
        return self.manager.abs_path(key, self.name, self.ext)

    def exists(self, key: str) -> bool:
        return os.path.exists(self.path(key))

    def open(self, key: str, mode: str = "r") -> IO[Any]:
        path = self.path(key)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        return open(path, mode, encoding=None if "b" in mode else "utf-8")

    def valid(self, key: str) -> bool:
        raise NotImplementedError("Subclasses must implement the valid method.")

    def get(self, key: str) -> T | None:
        raise NotImplementedError("Subclasses must implement the get method.")

    def set(self, key: str, value: T) -> None:
        raise NotImplementedError("Subclasses must implement the set method.")

    def get_default(self, key: str, default: T | None = None) -> T:
        used_gen = False
        if default is None:
            if self.default_gen is None:
                raise ValueError("No default value provided.")
            default = self.default_gen(key)
            used_gen = True

        value = self.get(key)

        if value is None:
            if used_gen:
                self.set(key, default)

            return default

        return value


class CacheDataContainer(TypedDict, Generic[T]):
    created_at: int
    updated_at: int
    data: T


class CacheData(CacheObject[T]):

    compare_by_updated_at: bool = False
    pretty_json: bool = True

    def __init__(
        self,
        manager: "CacheManager",
        name: str,
        ttl: timedelta | None = None,
        inherit_expiration_time: bool = False,
        default_gen: Callable[[str], T] | None = None,
        compare_by_updated_at: bool = False,
        pretty_json: bool = True,
    ):
        super().__init__(
            manager,
            name,
            ext=".json",
            raw=False,
            ttl=ttl,
            inherit_expiration_time=inherit_expiration_time,
            default_gen=default_gen,
        )
        self.compare_by_updated_at = compare_by_updated_at
        self.pretty_json = pretty_json

    def _open_and_validate(self, key: str) -> CacheDataContainer:
        if not self.exists(key):
            raise FileNotFoundError(f"Cache file for key '{key}' does not exist.")

        with self.open(key, "r") as f:
            data: CacheDataContainer = json.load(f)

            expiration_time = (
                datetime.fromtimestamp(data.get("created_at", 0)) + self.ttl
                if self.ttl
                else None
            )

            if expiration_time and datetime.now() > expiration_time:
                raise ValueError(f"Cache file for key '{key}' has expired.")

            return data

    def valid(self, key: str) -> bool:
        try:
            self._open_and_validate(key)
            return True
        except (FileNotFoundError, ValueError):
            return False

    def get(self, key: str) -> T | None:
        try:
            return self._open_and_validate(key)["data"]  # type: ignore
        except (FileNotFoundError, ValueError):
            return None

    def _set_or_update(self, key: str, value: T, update: bool) -> None:
        existing_data = {}
        if self.exists(key):
            try:
                existing_data = self._open_and_validate(key)
            except (FileNotFoundError, ValueError):
                pass

        if update:
            if not "data" in existing_data:
                raise ValueError(
                    f"Cannot update non-existing cache data for key '{key}'."
                )

            if not isinstance(existing_data["data"], dict) or not isinstance(
                value, dict
            ):
                raise ValueError(
                    f"Cannot update cache data for key '{key}' because existing data is not a dictionary."
                )

            temp = existing_data["data"]
            temp.update(value)  # type: ignore
            value = temp  # type: ignore

        data: CacheDataContainer = {
            "created_at": existing_data.get(
                "created_at", int(datetime.now().timestamp())
            ),
            "updated_at": int(datetime.now().timestamp()),
            "data": value,
        }

        with self.open(key, "w") as f:
            json.dump(data, f, ensure_ascii=False, indent=4, default=str)

    def set(self, key: str, value: T) -> None:
        self._set_or_update(key, value, update=False)

    def update(self, key: str, value: T) -> None:
        self._set_or_update(key, value, update=True)


class CacheDataListItem(TypedDict, Generic[T]):
    created_at: int
    updated_at: int
    data: T


class CacheDataList(CacheData[list[CacheDataListItem[T]]]):

    item_gen: Callable[[str, T | None], T] | None = None
    depends_on_previous: bool

    def __init__(
        self,
        manager: "CacheManager",
        name: str,
        ttl: timedelta | None = None,
        inherit_expiration_time: bool = False,
        item_gen: Callable[[str, T | None], T] | None = None,
        depends_on_previous: bool = True,
    ):
        super().__init__(
            manager,
            name,
            ttl=ttl,
            inherit_expiration_time=inherit_expiration_time,
            default_gen=lambda key: [],
        )
        self.item_gen = item_gen
        self.depends_on_previous = depends_on_previous


    def append(self, key: str, value: T) -> None:
        existing_data = self.get(key) or []

        new_item = CacheDataListItem(
            created_at=int(datetime.now().timestamp()),
            updated_at=int(datetime.now().timestamp()),
            data=value,
        )

        existing_data.append(new_item)
        self.set(key, existing_data)
    

    def len(self, key: str) -> int:
        existing_data = self.get(key) or []
        return len(existing_data)


    def clear(self, key: str) -> None:
        self.set(key, [])

    
    def is_empty(self, key: str) -> bool:
        existing_data = self.get(key) or []
        return len(existing_data) == 0


    def get_item(self, key: str, index: int) -> T | None:
        existing_data = self.get(key) or []
        if index < 0 or index >= len(existing_data):
            return None
        
        return existing_data[index].get("data")


    def get_item_default(self, key: str, index: int, default: T | None = None) -> T:
        item = self.get_item(key, index)
        
        if item:
            return item
    
        if default is not None:
            return default

        if self.item_gen is not None:
            previous_item = self.get_item_default(key, index - 1) if self.depends_on_previous and index > 0 else None
            generated_item = self.item_gen(key, previous_item)
            self.append(key, generated_item)
            return generated_item
        
        raise ValueError("No default value or item generator provided.")
    

    def set_item(self, key: str, index: int, value: T) -> None:
        existing_data = self.get(key) or []

        if index < 0 or index >= len(existing_data):
            raise IndexError(f"Index {index} is out of bounds for cache data list with key '{key}'.")
        
        existing_data[index]["data"] = value
        existing_data[index]["updated_at"] = int(datetime.now().timestamp())
        
        self.set(key, existing_data)


class CacheBlob(CacheObject[bytes]):
    def valid(self, key: str) -> bool:
        if not self.exists(key):
            return False

        if self.ttl is None:
            return True

        file_path = self.path(key)
        file_mtime = datetime.fromtimestamp(os.path.getmtime(file_path))
        expiration_time = file_mtime + self.ttl
        return datetime.now() < expiration_time

    def get(self, key: str) -> bytes | None:
        if not self.valid(key):
            return None

        with self.open(key, "rb") as f:
            return f.read()

    def set(self, key: str, value: bytes) -> None:
        with self.open(key, "wb") as f:
            f.write(value)


class CacheManager:
    """
    A class to manage caching of data for different collections and keys.
    """

    class ItemProps(TypedDict):
        ext: str
        raw: bool
        ttl: timedelta | None

    cache_dir: str
    collection: str
    ttl: timedelta | None = None
    object_types: dict[str, CacheObject] = {}

    def __init__(
        self,
        collection: str,
        cache_dir: str | None = None,
        ttl: timedelta | None = None,
    ) -> None:
        self.collection = collection
        self.cache_dir = cache_dir if cache_dir is not None else config.cache_dir
        self.ttl = ttl

    def rel_path(self, key: str, item: str, ext: str = "") -> str:
        ext = ext if ext is not None else ".json"

        if len(item) == 0:
            return f"{key}{ext}"

        return os.path.join(self.collection, key, f"{item}{ext}")

    def abs_path(self, key: str, item: str, ext: str = "") -> str:
        rel_path = self.rel_path(key, item, ext)
        return os.path.join(self.cache_dir, rel_path)

    def register(self, obj: CacheObject) -> "CacheManager":
        self.object_types[obj.name] = obj
        return self

