from types import AsyncGeneratorType

from app.chain.repositories.chain_completion_history_repository import (
    ChainCompletionHistoryRepository,
)
from app.chain.repositories.chain_repository import ChainRepository
from app.chain.services.chain_completion_history_service import (
    ChainCompletionHistoryService,
)
from app.chain.services.chain_service import ChainService
from app.chain.services.chain_stats_service import ChainStatsService
from structlog import BoundLogger

from app.core.database_manager import database_manager, DatabaseManager
from app.scripts.utilities.file_storage import FileStorage, S3FileStorage
from app.scripts import log
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.config.settings import Settings
from anydi import Container

container = Container()

container.register(Settings, lambda: get_settings(), scope="singleton")


@container.provider(scope="transient")
def bound_logger_provider() -> BoundLogger:
    return log


@container.provider(scope="transient")
def file_storage_provider(settings: Settings) -> FileStorage:
    return S3FileStorage(
        settings.AWS_S3_BUCKET_NAME, settings.AWS_S3_BACKUP_PATH
    )


@container.provider(scope="singleton")
async def database_manager_provider() -> AsyncGeneratorType:
    database_manager.startup()
    yield database_manager
    await database_manager.shutdown()


@container.provider(scope="request")
async def session_provider(db: DatabaseManager) -> AsyncGeneratorType:
    async for session in db.get_session():
        yield session


@container.provider(scope="transient")
def chain_repository_provider(session: AsyncSession) -> ChainRepository:
    return ChainRepository(session=session)


@container.provider(scope="transient")
def chain_history_repository_provider(
    session: AsyncSession,
) -> ChainCompletionHistoryRepository:
    return ChainCompletionHistoryRepository(session=session)


@container.provider(scope="transient")
def chain_service_provider(chain_repository: ChainRepository) -> ChainService:
    return ChainService(
        chain_repository=chain_repository,
        chain_stats_service=ChainStatsService(),
    )


@container.provider(scope="transient")
def chain_history_service_provider(
    chain_history_repository: ChainCompletionHistoryRepository,
) -> ChainCompletionHistoryService:
    return ChainCompletionHistoryService(
        chain_history_repository=chain_history_repository,
    )
