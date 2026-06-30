from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.middleware.request_id_middleware import RequestIdMiddleware
from app.core.middleware.logging_middleware import (
    LoggingMiddleware,
)
from app.core.config.config import settings

"""Middleware runs in LIFO order — last added executes first."""


def register_middleware(app: FastAPI):
    # noinspection PyTypeChecker
    app.add_middleware(LoggingMiddleware)  # ty: ignore[invalid-argument-type]

    # noinspection PyTypeChecker
    app.add_middleware(RequestIdMiddleware)  # ty: ignore[invalid-argument-type]

    # noinspection PyTypeChecker
    app.add_middleware(
        CORSMiddleware,  # ty: ignore[invalid-argument-type]
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
