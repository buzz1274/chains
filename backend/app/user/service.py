from typing import Annotated
from fastapi import Depends

from app.user.models import User
from app.user.repository import UserRepository
from app.auth.models import AuthUserInfo


class UserService:
    def __init__(
        self,
        user_repository: Annotated[UserRepository, Depends(UserRepository)],
    ):
        self.user_repository = user_repository

    async def get_or_create(self, user_info: AuthUserInfo) -> User:
        """get or create a new user"""
        if user := await self.user_repository.get_user(
            provider_id=user_info.provider_id,
            provider=user_info.provider,
        ):
            return user

        return self.user_repository.create_user(user_info)
