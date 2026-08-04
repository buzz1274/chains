from app.core.app_exception import AppException
from fastapi import status


class AuthException(AppException):
    status: int = status.HTTP_401_UNAUTHORIZED
    message: str = "Invalid Credentials"
