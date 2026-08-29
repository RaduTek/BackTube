import logging

logger = logging.getLogger(__name__)

console = logging.StreamHandler()
console.setLevel(logging.DEBUG)

logger.addHandler(console)
