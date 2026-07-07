from app.core.config import get_settings
from app.core.config.settings import Settings
from anydi import Container

container = Container()

container.register(Settings, lambda: get_settings(), scope="singleton")
