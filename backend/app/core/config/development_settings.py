from app.core.config.settings import Settings


class DevelopmentSettings(Settings):
    DEVELOPMENT: bool = True
    DEBUG: bool = True

    CORS_ORIGINS: list[str] = [
        "https://dev.chains.zz50.co.uk:5125",
        "https://dev.chains.zz50.co.uk",
    ]
    SESSION_SAME_SITE: str = "lax"

    SQL_ALCHEMY_ECHO: bool = False

    GOOGLE_OAUTH2_REDIRECT_URI: str = 'https://dev.chains.zz50.co.uk:5125'
