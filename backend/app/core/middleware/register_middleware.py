from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.middleware.request_id_middleware import RequestIdMiddleware
from app.core.middleware.logging_middleware import (
    LoggingMiddleware,
)
from app.core.config import settings

"""Middleware runs in LIFO order — last added executes first."""


def register_middleware(app: FastAPI):
    # noinspection PyTypeChecker
    app.add_middleware(LoggingMiddleware)

    # noinspection PyTypeChecker
    app.add_middleware(RequestIdMiddleware)

    # noinspection PyTypeChecker
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
