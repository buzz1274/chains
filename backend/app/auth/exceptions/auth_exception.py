from abc import ABC
from string import Template

from app.auth.models import AuthProvider
from app.core.app_exception import AppException
from fastapi import status


class GenericAuthExceptionError(AppException, ABC):
    status_code: int = status.HTTP_401_UNAUTHORIZED

    def __init__(self):
        super().__init__(self.message)


class AuthException(GenericAuthExceptionError):
    message: str = "Invalid Credentials"


class AuthTimeoutException(GenericAuthExceptionError):
    message: str = "Session timeout"


class AuthInvalidUserException(GenericAuthExceptionError):
    message: str = "Invalid user details"


class AuthConnectionTimeoutError(GenericAuthExceptionError):
    message: str = "Connection timed out when connecting to $provider"

    def __init__(self, provider: AuthProvider):
        self.message = Template(self.message).substitute(provider=provider)

        super().__init__()
