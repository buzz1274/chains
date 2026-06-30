from app.core.app_exception import AppException
from fastapi import status


class AuthException(AppException):
    STATUS_CODE: int = status.HTTP_401_UNAUTHORIZED
    DETAIL: str = "Invalid credentials"
