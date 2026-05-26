#!/usr/bin/env bash

ACTION=$1

if [ "$ACTION" == "connect-frontend" ]; then
  docker exec -it chains-frontend sh
elif [ "$ACTION" == "alembic-upgrade" ]; then
  docker exec -it chains-backend bash -c "uv run alembic upgrade head"
elif [ "$ACTION" == "alembic-autogenerate" ]; then
  docker exec -it chains-backend bash -c "uv run alembic revision --autogenerate"
fi
