from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.database_manager import database_manager
from app.core.logging import configure_logging
from app.core.config.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging(settings.DEBUG)
    database_manager.startup()

    yield

    await database_manager.shutdown()
