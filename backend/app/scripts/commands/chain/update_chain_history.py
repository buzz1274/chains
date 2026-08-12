from anydi import transient
from structlog import BoundLogger

from app.chain.exceptions.chain_history_exceptions import (
    DuplicateChainHistoryError,
    InvalidChainHistoryDataError,
)
from app.chain.models.chain_models import (
    ChainsInternal,
    ChainsInternalWithStats,
)
from datetime import date
from app.chain.services.chain_history_service import (
    ChainHistoryService,
)
from app.chain.services.chain_service import ChainService


@transient()
class UpdateChainHistory:
    def __init__(
        self,
        logger: BoundLogger,
        chain_service: ChainService,
        chain_history_service: ChainHistoryService,
    ):
        self.logger: BoundLogger = logger
        self.chain_service: ChainService = chain_service
        self.chain_history_service: (
            ChainHistoryService
        ) = chain_history_service

    async def update_chain_history(self):
        """script to add new chain completion entry for day of execution"""
        chains: ChainsInternal | ChainsInternalWithStats = (
            await self.chain_service.chains(with_history=False)
        )
        today: date = date.today()

        self.logger.info("Starting chain history completion daily update")

        for chain in chains.data:
            try:
                await self.chain_history_service.add_chain_history(
                    chain.id, today
                )
            except (
                DuplicateChainHistoryError,
                InvalidChainHistoryDataError,
            ) as e:
                self.logger.error(
                    str(e),
                    chain_id=chain.id,
                    completion_date=today,
                )
            except Exception as e:
                self.logger.exception(
                    "an unexpected error occurred when adding a chain "
                    "history completion",
                    error=str(e),
                )

        self.logger.info("Completed chain history completion daily update")
