from typing import Optional, Sequence

from sqlalchemy import Select, select
from sqlalchemy.exc import IntegrityError, DBAPIError
from sqlmodel import col

from app.chain.exceptions.chain_completion_history_exceptions import (
    DuplicateChainHistoryError,
    InvalidChainHistoryDataError,
)
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
)
from app.chain.models.chain_models import Chain
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
        query: Select = (
            select(ChainCompletionHistory)
            .where(
                col(Chain.deleted).is_(False),
            )
            .where(col(Chain.user_id) == user.id)
        )

        if chain_id:
            query = query.where(col(Chain.id) == chain_id)

        if incomplete_only:
            query = query.where(col(ChainCompletionHistory.status).is_(None))

        chains: Sequence[ChainCompletionHistory] = (
            (await self.execute_query(query)).scalars().all()
        )

        return chains

    async def add_chain_history(self, chain_history: ChainCompletionHistory):
        """add a new chain history"""
        try:
            await self.add(chain_history)
        except IntegrityError as e:
            raise DuplicateChainHistoryError(chain_history) from e
        except DBAPIError as e:
            raise InvalidChainHistoryDataError(chain_history) from e

        return chain_history
