from abc import abstractmethod, ABC
from typing import Optional

from fastapi import status


class AppException(ABC, Exception):
    status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR

    @property
    @abstractmethod
    def message(self) -> str:
        pass

    def __init__(self, message: Optional[str] = None):
        super().__init__(message or self.message)


class DBConnectionError(AppException):
    message: str = "A error occurred when attempting to connect to database"

class DBGenericError(AppException):
    message: str = "An unexpected error occurred"
