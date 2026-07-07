from app.core.config import settings
from app.core.logging import configure_logging
import structlog

configure_logging(settings.DEBUG)

log = structlog.get_logger()
