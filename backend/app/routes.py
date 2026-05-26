from fastapi import APIRouter
from app.auth import routes as auth_routes
from app.user import routes as user_routes

router = APIRouter()
router.include_router(auth_routes.router)
router.include_router(user_routes.router)
