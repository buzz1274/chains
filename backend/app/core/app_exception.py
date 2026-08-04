from abc import abstractmethod, ABC
from fastapi import status


class AppException(ABC, Exception):
    @property
    def status(self) -> int:
        return self.status or status.HTTP_500_INTERNAL_SERVER_ERROR

    @property
    @abstractmethod
    def message(self) -> str:
        pass

    def __init__(self, message: str):
        super().__init__(message)
