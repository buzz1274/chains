import logging
import structlog
from structlog.contextvars import merge_contextvars
from structlog.stdlib import LoggerFactory
from structlog.processors import (
    TimeStamper,
    add_log_level,
    format_exc_info,
    JSONRenderer,
)


def configure_logging(debug: bool = False) -> None:
    logging.basicConfig(
        format="%(message)s",
        stream=None,
        level=logging.INFO,
    )

    logging.getLogger("uvicorn.access").disabled = True
    logging.getLogger("uvicorn.error").disabled = True

    structlog.configure(
        processors=[
            merge_contextvars,
            add_log_level,
            TimeStamper(fmt="iso"),
            format_exc_info,
            JSONRenderer() if not debug else structlog.dev.ConsoleRenderer(),
        ],
        logger_factory=LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
