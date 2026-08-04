from abc import ABC
from app.core.app_exception import AppException

from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
)


class GenericChainCompletionHistoryError(AppException, ABC):
    def __init__(self, chain_completion_history: ChainCompletionHistory):
        super().__init__(
            f"{self.message} "
            f"chain_id={chain_completion_history.chain_id} "
            f"on={chain_completion_history.completion_date} "
            f"status={chain_completion_history.status}"
        )


class DuplicateChainHistoryError(GenericChainCompletionHistoryError):
    message: str = "History already exists for"


class InvalidChainHistoryDataError(GenericChainCompletionHistoryError):
    message: str = "Invalid chain completion history data sent to database"


class NoChainHistoryCompletionFound(GenericChainCompletionHistoryError):
    message: str = "No chain history chain completion found"
