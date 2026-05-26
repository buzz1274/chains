import os

if os.environ.get("ENVIRONMENT", "DEVELOPMENT").upper() == "DEVELOPMENT":
    from app.core.config.development_settings import DevelopmentSettings as Settings
else:
    from app.core.config.settings import Settings

settings = Settings()