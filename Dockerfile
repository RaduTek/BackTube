FROM python:3.14-alpine

# default env
ENV BACKTUBE_BIND=0.0.0.0
ENV BACKTUBE_PORT=5000
ENV BACKTUBE_WORKERS=2
ENV BACKTUBE_DEBUG=False
ENV BACKTUBE_CACHE_DIR=/cache

# deno runtime for yt-dlp
COPY --from=denoland/deno:bin-2.9.3 /deno /usr/local/bin/deno

WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# script that starts gunicorn
ENTRYPOINT ["/app/entrypoint.sh"]