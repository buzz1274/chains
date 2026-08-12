from collections.abc import Callable
from typing import Optional, Sequence, Awaitable

from sqlalchemy import Select, select
from sqlalchemy.exc import IntegrityError, DataError
from sqlmodel import col

from app.chain.exceptions.chain_history_exceptions import (
    DuplicateChainHistoryError,
    InvalidChainHistoryDataError,
)
from app.chain.models.chain_history_models import (
    ChainHistory,
)
from app.chain.models.chain_models import Chain
from app.core.repository import Repository
from app.user.models import User


class ChainHistoryRepository(Repository):
    async def get_chain_history(
        self,
        user: Optional[User] = None,
        chain_id: Optional[int] = None,
        incomplete_only: Optional[bool] = False,
        chain_history_id: Optional[int] = None,
    ) -> Sequence[ChainHistory]:
        """get chain history for supplied user"""
        query: Select = (
            select(ChainHistory)
            .join(Chain)
            .where(
                col(Chain.deleted).is_(False),
            )
        )

        if user:
            query = query.where(col(Chain.user_id) == user.id)

        if chain_id:
            query = query.where(col(Chain.id) == chain_id)

        if incomplete_only:
            query = query.where(col(ChainHistory.status).is_(None))

        if chain_history_id:
            query = query.where(col(ChainHistory.id) == chain_history_id)

        chains: Sequence[ChainHistory] = (
            (await self.execute_query(query)).scalars().all()
        )

        return chains

    async def add_chain_history(
        self,
        chain_history: ChainHistory,
    ) -> ChainHistory:
        """add a new chain history"""
        return await self._execute(self.add, chain_history)

    async def update_chain_history(
        self,
        chain_history: ChainHistory,
    ):
        """update a chain history"""
        return await self._execute(self.update, chain_history)

    async def _execute(
        self,
        operation: Callable[[ChainHistory], Awaitable[None]],
        chain_history: ChainHistory,
    ):
        try:
            await operation(chain_history)
        except IntegrityError as e:
            raise DuplicateChainHistoryError(chain_history) from e
        except DataError as e:
            raise InvalidChainHistoryDataError(chain_history) from e

        return chain_history
