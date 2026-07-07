from app.core.container import container
from app.core.config.settings import Settings
from structlog import BoundLogger
from app.scripts.utilities.file_storage import FileStorage, S3FileStorage
from app.scripts import log


@container.provider(scope="transient")
def bound_logger_provider() -> BoundLogger:
    return log


@container.provider(scope="transient")
def file_storage_provider(settings: Settings) -> FileStorage:
    return S3FileStorage(
        settings.AWS_S3_BUCKET_NAME, settings.AWS_S3_BACKUP_PATH
    )
