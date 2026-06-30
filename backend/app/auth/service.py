from typing import Annotated
from fastapi.security import HTTPAuthorizationCredentials
from fastapi import Depends
from jose import jwt, JWTError
import datetime

from pydantic import ValidationError

from app.auth.models import AuthUserInfo
from app.user.repository import UserRepository
from app.user.models import User
from app.user.service import UserService
from app.core.config.config import settings
from app.auth.auth_exception import AuthException
from app.auth.providers.provider_factory import ProviderFactory


class AuthService:
    INVALID_CREDENTIAL_ERROR: str = "Invalid credentials"
    SESSION_TIMEOUT_ERROR: str = "Session timeout"
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
        try:
            user_info: AuthUserInfo = await self.provider_factory.get_provider(
                provider
            ).get_user_info(code)
        except ValidationError as e:
            raise AuthException(detail=str(e))

        user = await self.user_service.get_or_create(user_info)

        return self._create_access_token(user.id)

    async def get_authenticated_user(
        self, token: HTTPAuthorizationCredentials
    ) -> User:
        """get authenticated user from jwt token"""
        try:
            jwt_payload = jwt.decode(
                token.credentials,
                settings.SESSION_SECRET,
                algorithms=[self.JWT_ALGORITHM],
                options={"leeway": 20},
            )
        except (
            JWTError,
            KeyError,
        ) as e:
            raise AuthException(detail=str(e))

        if self._has_token_expired(jwt_payload["exp"]):
            raise AuthException(
                status_code=401, detail=self.INVALID_CREDENTIAL_ERROR
            )

        user = await self.user_repository.get_user(
            user_id=jwt_payload["user_id"]
        )

        if not user:
            raise AuthException(detail=self.SESSION_TIMEOUT_ERROR)

        return user

    def _has_token_expired(self, expiry_timestamp: int) -> bool:
        """check if token has expired"""
        return datetime.datetime.now(
            datetime.UTC
        ) > datetime.datetime.fromtimestamp(expiry_timestamp, datetime.UTC)

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
