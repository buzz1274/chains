#!/usr/bin/env bash

if [ "$ENVIRONMENT" == "development" ] ; then
  uv run uvicorn src.main:app --host=0.0.0.0 --port=8002 --reload --log-level=debug
else
  uv run uvicorn src.main:app --host=0.0.0.0 --port=8002 --log-level=warning
fi

