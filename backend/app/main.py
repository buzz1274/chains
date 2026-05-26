from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.config.config import settings

from app.core.lifespan import lifespan
from app.routes import router

app = FastAPI(
    lifespan=lifespan,
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

app.include_router(
    router,
    prefix=settings.API_V1_STR,
)

# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,  # ty: ignore[invalid-argument-type]
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
