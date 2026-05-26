from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv

from app.user.models import UserPublic
from app.user.models import User
from app.core.authentication import get_current_user

router = APIRouter(prefix="/users", tags=["user"])


@cbv(router)
class UserRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
    ):
        self.user = user

    @router.get("/me", response_model=UserPublic)
    def get_me(self) -> User:
        """get authenticated user"""
        return self.user
