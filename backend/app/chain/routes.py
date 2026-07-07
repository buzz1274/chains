from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv

from app.user.models import UserPublic
from app.user.models import User
from app.core.authentication import get_current_user

router = APIRouter(prefix="/chains", tags=["chains"])


@cbv(router)
class UserRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
    ):
        self.user = user

    @router.get("/", response_model=UserPublic)
    def chains(self) -> User:
        """get all chains for authenticated user"""
        pass
