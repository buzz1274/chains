from typing import Annotated, Optional, Sequence
from fastapi import Depends

from app.chain.exceptions.chain_history_exceptions import (
    NoChainHistoryFound,
    ChainHistoryAlreadyUpdated,
)
from app.chain.models.constants import ChainHistoryStatus
from app.chain.models.chain_history_models import (
    ChainHistory,
    ChainHistoryInternal,
    ChainsHistoryInternal,
    ChainHistoryPatch,
)
from app.chain.repositories.chain_history_repository import (
    ChainHistoryRepository,
)
from datetime import date

from app.user.models import User


class ChainHistoryService:
    def __init__(
        self,
        chain_history_repository: Annotated[
            ChainHistoryRepository,
            Depends(ChainHistoryRepository),
        ],
    ):
        self.chain_history_repository: (
            ChainHistoryRepository
        ) = chain_history_repository

    async def get_outstanding_chain_history(
        self,
        user: Optional[User] = None,
    ) -> ChainsHistoryInternal:
        """get outstanding chain history"""
        data: Sequence[
            ChainHistoryInternal
        ] = await self.chain_history_repository.get_chain_history(
            user=user, chain_id=None, incomplete_only=True
        )

        return ChainsHistoryInternal(data=data)

    async def add_chain_history(
        self,
        chain_id: int,
        completion_date: date,
        status: Optional[ChainHistoryStatus] = None,
    ) -> ChainHistory:
        """add a new chain history"""
        chain_history: ChainHistory = ChainHistory(
            chain_id=chain_id,
            completion_date=completion_date,
            status=status,
        )

        return await self.chain_history_repository.add_chain_history(
            chain_history
        )

    async def update_chain_history(
        self,
        user: User,
        chain_id: int,
        chain_history_id: int,
        chain_history_patch: ChainHistoryPatch,
    ) -> ChainHistoryInternal:
        """update chain"""
        try:
            chain_history: ChainHistoryInternal = (
                await self.chain_history_repository.get_chain_history(
                    user=user,
                    chain_id=chain_id,
                    chain_history_id=chain_history_id,
                )
            )[0]

            if not chain_history:
                raise NoChainHistoryFound
        except IndexError:
            raise NoChainHistoryFound

        if chain_history.status is not None:
            raise ChainHistoryAlreadyUpdated

        chain_history.status = chain_history_patch.status

        return await self.chain_history_repository.update_chain_history(
            chain_history
        )
