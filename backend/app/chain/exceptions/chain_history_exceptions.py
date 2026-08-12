from abc import ABC

from app.core.app_exception import AppException

from app.chain.models.chain_history_models import (
    ChainHistoryInternal, ChainHistory
)


class GenericChainHistoryError(AppException, ABC):
    def __init__(
        self,
        chain_history: ChainHistoryInternal | ChainHistory,
    ):
        super().__init__(
            f"{self.message} "
            f"chain_id={chain_history.chain_id} "
            f"on={chain_history.completion_date} "
            f"status={chain_history.status}"
        )


class DuplicateChainHistoryError(GenericChainHistoryError):
    message: str = "History already exists for"


class InvalidChainHistoryDataError(GenericChainHistoryError):
    message: str = "Invalid chain completion history data sent to database"


class NoChainHistoryFound(GenericChainHistoryError):
    message: str = "No chain history chain completion found"


class ChainHistoryAlreadyUpdated(GenericChainHistoryError):
    message: str = "Chain history already completed"
