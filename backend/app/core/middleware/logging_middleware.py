import time
from collections.abc import Callable, Awaitable

from fastapi import Request
from starlette.responses import JSONResponse, Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.app_exception import AppException
from app.core.config.config import settings
from fastapi import status

from structlog.contextvars import clear_contextvars
import structlog


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ):
        clear_contextvars()

        start: float = time.perf_counter()
        logger: structlog.BoundLogger = structlog.get_logger().bind(
            request_id=request.state.request_id,
            method=request.method,
            path=request.url.path,
            client_ip=request.client.host if request.client else None,
        )

        try:
            logger.info("request_received")

            response: Response = await call_next(request)

            logger.info(
                "request_completed",
                duration_s=round(time.perf_counter() - start, 2),
                status_code=response.status_code,
            )
        except Exception as e:
            response = await self._handle_error(e, logger, start)

        return response

    async def _handle_error(
        self,
        e: Exception,
        logger: structlog.BoundLogger,
        start: float,
    ) -> JSONResponse:
        status_code: int = getattr(e, "STATUS_CODE", AppException.STATUS_CODE)

        log_message: dict[str, object] = {
            "message": str(e),
            "duration_s": round(time.perf_counter() - start, 2),
            "status_code": status_code,
        }

        if status_code >= status.HTTP_500_INTERNAL_SERVER_ERROR:
            logger.error("request_failed", **log_message, exc_info=True)
        else:
            logger.warning("request_failed", **log_message)

        return JSONResponse(
            status_code=status_code,
            content={
                "detail": str(e) if settings.DEBUG else AppException.DETAIL
            },
        )
