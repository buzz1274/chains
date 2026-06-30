#!/usr/bin/env bash

if [ "$ENVIRONMENT" == "development" ] ; then
  uv run uvicorn app.main:app --host=0.0.0.0 --port=8002 --reload --no-access-log --log-level warning
else
  sleep infinity
  #uv run uvicorn app.main:app --host=0.0.0.0 --port=8002 --no-access-log --log-level warning
fi
