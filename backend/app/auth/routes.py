from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from app.auth.service import AuthService
from app.auth.models import AuthRequest, AuthResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@cbv(router)
class AuthRouter:
    def __init__(
        self,
        auth_service: Annotated[AuthService, Depends(AuthService)],
    ):
        self.auth_service = auth_service

    @router.post("/login")
    async def auth(self, payload: AuthRequest):
        """authenticate credentials"""
        return AuthResponse(
            token=await self.auth_service.authenticate(
                payload.code, payload.provider
            )
        )
