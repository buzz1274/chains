from typing import Optional

from sqlalchemy.exc import IntegrityError, DBAPIError

from app.chain.exceptions.chain_completion_history_exceptions import (
    DuplicateChainHistoryError,
    InvalidChainHistoryDataError,
)
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
)
from app.core.repository import Repository
from app.user.models import User


class ChainCompletionHistoryRepository(Repository):
    async def get_chain_history(
        self,
        user: User,
        chain_id: Optional[int] = None,
        incomplete_only: Optional[bool] = False,
    ):
        """get chain history for supplied user"""
        pass

    async def add_chain_history(self, chain_history: ChainCompletionHistory):
        """add a new chain history"""
        try:
            await self.add(chain_history)
        except IntegrityError as e:
            raise DuplicateChainHistoryError(chain_history) from e
        except DBAPIError as e:
            raise InvalidChainHistoryDataError(chain_history) from e

        return chain_history
