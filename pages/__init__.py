from ..helpers.flags import get_flag

def get_preferred_template(template: str) -> str:
    """Return the user's preferred template"""

    # Here the preferred version should be retrieved
    preferred_version = get_flag('preferred_version')

    return f"/{preferred_version}/{template}.html.j2"