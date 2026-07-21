#!/bin/sh

bind=$BACKTUBE_BIND:$BACKTUBE_PORT
workers=$BACKTUBE_WORKERS

cd /app

gunicorn --bind ${bind} --workers ${workers} app:app