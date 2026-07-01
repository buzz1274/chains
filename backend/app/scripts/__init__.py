from app.core.config.config import settings
from app.core.logging import configure_logging
from structlog.contextvars import clear_contextvars

configure_logging(settings.DEBUG)
clear_contextvars()
