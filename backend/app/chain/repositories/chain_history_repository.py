from sqlalchemy.exc import IntegrityError, DBAPIError

from app.chain.exceptions import (
    DuplicateChainHistoryError,
    InvalidChainHistoryDataError,
)
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
)
from app.core.repository import Repository


class ChainHistoryRepository(Repository):
    async def add_chain_history(self, chain_history: ChainCompletionHistory):
        """add a new chain history"""
        try:
            await self.add(chain_history)
        except IntegrityError as e:
            raise DuplicateChainHistoryError(chain_history) from e
        except DBAPIError as e:
            raise InvalidChainHistoryDataError(chain_history) from e

        return chain_history
