from abc import abstractmethod, ABC

from app.chain.models import ChainCompletionHistory

class GenericChainHistoryError(Exception, ABC):

    @property
    @abstractmethod
    def message(self) -> str:
        pass

    def __init__(self, chain_completion_history: ChainCompletionHistory):
        super().__init__(
            f"{self.message} "
            f"chain_id={chain_completion_history.chain_id} "
            f"on={chain_completion_history.completion_date} "
            f"status={chain_completion_history.status}"
        )

class DuplicateChainHistoryError(GenericChainHistoryError):
    message: str = "History already exists for"

class InvalidChainHistoryDataError(GenericChainHistoryError):
    message: str = "Invalid chain completion history data sent to database"