

def get_text(value: dict | None, bold: bool = False) -> str:
    if not value:
        return ''
    if simple := value.get('simpleText'):
        return simple
    if content := value.get('content'):
        return content
    
    def run_get_text(run: dict) -> str:
        if bold and 'bold' in run and run['bold']:
            return f"<strong>{run.get('text', '')}</strong>"
        
        return run.get('text', '')

    return ''.join(run_get_text(run) for run in value.get('runs', []))


def get_first_run(value: dict | None) -> dict:
    if not value:
        return {}
    runs = value.get('runs')
    if runs:
        return runs[0]
    return {}


def get_channel_from_byline(byline: dict | None) -> tuple[str, str]:
    run = get_first_run(byline)
    channel_name = run.get('text', '')
    channel_id = (
        run.get('navigationEndpoint', {})
        .get('browseEndpoint', {})
        .get('browseId', '')
    )
    return channel_name, channel_id


def get_thumbnail_url(thumbnails: list[dict]) -> str:
    if not thumbnails:
        return ''

    url = max(thumbnails, key=lambda thumb: thumb.get('width', 0)).get('url', '')
    if url.startswith('//'):
        return f'https:{url}'
    return url
