from app.core.lifespan import lifespan
from app.routes import router
from app.core.config.config import settings
from fastapi import FastAPI
from app.core.middleware.register_middleware import register_middleware

app = FastAPI(
    lifespan=lifespan,
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    debug=settings.DEBUG,
)

register_middleware(app)

app.include_router(
    router,
    prefix=settings.API_V1_STR,
)
