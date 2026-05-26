from typing import Annotated
from fastapi.security import HTTPAuthorizationCredentials
from fastapi import Depends
from jose import jwt, JWTError
import datetime

from app.auth.models import AuthUserInfo
from app.user.repository import UserRepository
from app.user.models import User
from app.user.service import UserService
from app.core.config.config import settings
from app.auth.providers.provider_factory import ProviderFactory


class AuthService:
    INVALID_CREDENTIAL_ERROR: str = "Invalid credentials"
    TOKEN_EXPIRY_MINUTES: int = 15
    JWT_ALGORITHM: str = "HS256"

    def __init__(
        self,
        user_service: Annotated[UserService, Depends(UserService)],
        user_repository: Annotated[UserRepository, Depends(UserRepository)],
        provider_factory: Annotated[ProviderFactory, Depends(ProviderFactory)],
    ):
        self.user_service = user_service
        self.user_repository = user_repository
        self.provider_factory = provider_factory

    async def authenticate(self, code: str, provider: str) -> str:
        """authenticate user with google id token"""
        user_info: AuthUserInfo = await self.provider_factory.get_provider(
            provider
        ).get_user_info(code)

        user = self.user_service.get_or_create(user_info)

        return self._create_access_token(user.id)

    def get_authenticated_user(
        self, token: HTTPAuthorizationCredentials
    ) -> User:
        """get authenticated user from jwt token"""
        try:
            jwt_payload = jwt.decode(
                token.credentials,
                settings.SESSION_SECRET,
                algorithms=[self.JWT_ALGORITHM],
            )
        except (
            JWTError,
            KeyError,
        ):
            raise RuntimeError(self.INVALID_CREDENTIAL_ERROR)

        user = self.user_repository.get_user(user_id=jwt_payload["user_id"])

        if not user:
            raise RuntimeError(self.INVALID_CREDENTIAL_ERROR)

        return user

    def _create_access_token(self, user_id: int) -> str:
        """create jwt access token for user"""
        payload: dict = {
            "user_id": user_id,
            "exp": self._calculate_token_expiry(),
        }

        return jwt.encode(
            payload, settings.SESSION_SECRET, algorithm=self.JWT_ALGORITHM
        )

    def _calculate_token_expiry(self) -> datetime.datetime:
        """calculate token expiry time"""
        return datetime.datetime.now(datetime.UTC) + datetime.timedelta(
            minutes=self.TOKEN_EXPIRY_MINUTES
        )
