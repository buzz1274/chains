import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from collections.abc import Callable, Awaitable

from fastapi import Request
from starlette.responses import Response, JSONResponse


class RequestIdMiddleware(BaseHTTPMiddleware):
    PATH_WHITELIST: list[str] = [
        "/api/auth/login",
    ]

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ):
        request_id: str = request.headers.get("X-Request-ID")

        if not request_id:
            if request.url.path not in self.PATH_WHITELIST:
                return JSONResponse(
                    status_code=400,
                    content={"detail": "X-Request-ID header is required"},
                )

            request_id = str(uuid.uuid4())

        request.state.request_id = request_id

        response: Response = await call_next(request)

        response.headers["X-Request-ID"] = request_id

        return response
