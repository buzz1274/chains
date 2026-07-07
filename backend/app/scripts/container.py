from app.core.container import container
from app.core.config.settings import Settings
from structlog import BoundLogger
from app.scripts.utilities.file_storage import FileStorage, S3FileStorage
from app.scripts import log


@container.provider(scope="singleton")
def bound_logger_provider() -> BoundLogger:
    return log


@container.provider(scope="singleton")
def file_storage_provider(s3_settings: Settings) -> FileStorage:
    return S3FileStorage(
        s3_settings.AWS_S3_BUCKET_NAME, s3_settings.AWS_S3_BACKUP_PATH
    )
