#!/usr/bin/env bash

uv run alembic upgrade head

if [ "$ENVIRONMENT" == "development" ] ; then
  uv run uvicorn app.main:app --host=0.0.0.0 --port=8002 --reload --no-access-log --log-level warning
else
  uv run uvicorn app.main:app --host=0.0.0.0 --port=8002 --no-access-log --log-level warning
fi
