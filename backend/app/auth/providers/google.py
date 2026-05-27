from google.auth.transport import requests
from google.oauth2 import id_token
from app.auth.models import AuthUserInfo
from app.auth.providers.provider_interface import ProviderInterface
from app.core.config.config import settings
import httpx
from httpx import ConnectTimeout


class Google(ProviderInterface):
    GOOGLE_TOKEN_ENDPOINT: str = "https://oauth2.googleapis.com/token"

    async def get_user_info(self, code: str) -> AuthUserInfo:
        code = await self._check_code(code)

        self.user_info = id_token.verify_oauth2_token(
            code.get("id_token"),
            requests.Request(),
            settings.GOOGLE_OAUTH2_CLIENT_ID,
        )

        if not self._validate_user_info():
            raise ValueError(self.INVALID_CREDENTIAL_ERROR)

        return AuthUserInfo(
            provider_id=self.user_info.get("sub"),
            provider=self.provider,
            email=self.user_info.get("email"),
            name=self.user_info.get("given_name"),
            email_verified=self.user_info.get("email_verified"),
            image=self.user_info.get("picture"),
        )

    def _validate_user_info(self) -> bool:
        return (
            self.user_info.get("email")
            and self.user_info.get("sub")
            and self.user_info.get("given_name")
            and self.user_info.get("email_verified")
            and self.user_info.get("picture")
        )

    async def _check_code(self, code) -> dict:
        try:
            response = httpx.post(
                self.GOOGLE_TOKEN_ENDPOINT,
                data={
                    "code": code,
                    "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
                    "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
                    "redirect_uri": settings.GOOGLE_OAUTH2_REDIRECT_URI,
                    "grant_type": "authorization_code",
                },
            )

            return response.json()
        except ValueError:
            raise ValueError(self.INVALID_CREDENTIAL_ERROR)
        except ConnectTimeout:
            raise RuntimeError(
                self.COMMUNICATION_ERROR.substitute(provider=self.provider)
            )
