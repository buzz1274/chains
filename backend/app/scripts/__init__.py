from app.core.config.config import settings
from app.core.logging import configure_logging

configure_logging(settings.DEBUG)
