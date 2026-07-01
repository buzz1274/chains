from google.auth.transport import requests
from google.auth.exceptions import InvalidValue
from google.oauth2 import id_token
from app.auth.models import AuthUserInfo
from app.auth.providers.provider_interface import ProviderInterface
from app.core.config.config import settings
from app.auth.auth_exception import AuthException
import httpx
from httpx import ConnectTimeout, HTTPStatusError, RequestError


class Google(ProviderInterface):
    GOOGLE_TOKEN_ENDPOINT: str = "https://oauth2.googleapis.com/token"

    async def get_user_info(self, code: str) -> AuthUserInfo:
        """get user info from google id token"""
        code: [str, str] = await self._check_code(code)

        self._set_user_info(code.get("id_token"))

        return AuthUserInfo(
            provider_id=self.user_info.get("sub"),
            provider=self.provider,
            email=self.user_info.get("email"),
            name=self.user_info.get("given_name"),
            email_verified=self.user_info.get("email_verified"),
            image=self.user_info.get("picture"),
        )

    def _set_user_info(self, code: str):
        """verify and set user info from google id token"""
        try:
            self.user_info = id_token.verify_oauth2_token(
                code,
                requests.Request(),
                settings.GOOGLE_OAUTH2_CLIENT_ID,
                clock_skew_in_seconds=10,
            )

            if not self._validate_user_info():
                raise AuthException(detail=self.INVALID_CREDENTIAL_ERROR)
        except InvalidValue as e:
            raise AuthException(detail=str(e))

    def _validate_user_info(self) -> bool:
        """validate all required user details are present in response"""
        return (
            self.user_info.get("email")
            and self.user_info.get("sub")
            and self.user_info.get("given_name")
            and self.user_info.get("email_verified")
            and self.user_info.get("picture")
        )

    async def _check_code(self, code: str) -> dict:
        """check token validity with google"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.GOOGLE_TOKEN_ENDPOINT,
                    data={
                        "code": code,
                        "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
                        "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
                        "redirect_uri": settings.GOOGLE_OAUTH2_REDIRECT_URI,
                        "grant_type": "authorization_code",
                    },
                )

                response.raise_for_status()

            return response.json()
        except (ValueError, HTTPStatusError, RequestError) as e:
            raise AuthException from e
        except ConnectTimeout:
            raise AuthException(
                detail=self.COMMUNICATION_ERROR.substitute(
                    provider=self.provider
                )
            )
