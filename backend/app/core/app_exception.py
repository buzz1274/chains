from typing import Optional
from fastapi import status


class AppException(Exception):
    STATUS_CODE: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    DETAIL: str = "An error occurred"

    def __init__(
        self,
        *,
        detail: Optional[str] = None,
        status_code: Optional[int] = None,
    ):
        self.detail = detail or self.DETAIL
        self.status_code = status_code or self.STATUS_CODE

        super().__init__(self.detail)
