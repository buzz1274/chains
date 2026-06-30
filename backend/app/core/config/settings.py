from pydantic import PostgresDsn, computed_field
from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    DEVELOPMENT: bool = False
    PROJECT_NAME: str = "Chains"
    API_V1_STR: str = "/api"

    POSTGRES_SERVER: str = os.environ.get("DB_HOST", "")
    POSTGRES_PORT: int = int(os.environ.get("POSTGRES_PORT", 5432))
    POSTGRES_USER: str = os.environ.get("DB_USERNAME", "")
    POSTGRES_PASSWORD: str = os.environ.get("DB_PASSWORD", "")
    POSTGRES_DB: str = os.environ.get("DB_NAME", "")
    DEBUG: bool = False

    #AWS_SECRET_ACCESS_KEY: str = os.environ.get("AWS_SECRET_ACCESS_KEY", "")
    #AWS_ACCESS_KEY_ID: str = os.environ.get("AWS_ACCESS_KEY_ID", "")
    #AWS_S3_BUCKET_NAME: str = os.environ.get(
    #    "TREADMILL_TRACKER_S3_BUCKET", ""
    #).strip()
    #AWS_S3_BACKUP_PATH: str = "backups/treadmilltracker/"

    #DAYS_BACKUPS_TO_KEEP: int = 7

    CORS_ORIGINS: list[str] = ["https://chains.zz50.co.uk"]
    SESSION_SECRET: str = os.environ.get("FAST_API_SECRET_KEY", "")
    SESSION_COOKIE_SECURE: bool = True
    SESSION_SAME_SITE: str = "none"

    SQL_ALCHEMY_ECHO: bool = False

    GOOGLE_OAUTH2_CLIENT_ID: str = os.environ.get(
        "GOOGLE_OAUTH2_CLIENT_ID", ""
    ).strip()
    GOOGLE_OAUTH2_CLIENT_SECRET: str = os.environ.get(
        ">GOOGLE_OAUTH2_CLIENT_SECRET", ""
    ).strip()

    GOOGLE_OAUTH2_REDIRECT_URI: str = 'https://chains.zz50.co.uk'

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )
