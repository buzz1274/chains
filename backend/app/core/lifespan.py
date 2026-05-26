from fastapi import FastAPI
from app.core.database_manager import database_manager


async def lifespan(app: FastAPI):
    database_manager.startup()

    yield

    database_manager.shutdown()
