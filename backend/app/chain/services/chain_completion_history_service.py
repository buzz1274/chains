from typing import Annotated, Optional, Sequence
from fastapi import Depends
from app.chain.models.constants import ChainCompletionStatus
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
    ChainCompletionHistoryInternal,
    ChainsCompletionHistoryInternal,
    ChainCompletionHistoryPatch,
)
from app.chain.repositories.chain_completion_history_repository import (
    ChainCompletionHistoryRepository,
)
from datetime import date

from app.user.models import User


class ChainCompletionHistoryService:
    def __init__(
        self,
        chain_completion_history_repository: Annotated[
            ChainCompletionHistoryRepository,
            Depends(ChainCompletionHistoryRepository),
        ],
    ):
        self.chain_completion_history_repository: (
            ChainCompletionHistoryRepository
        ) = chain_completion_history_repository

    async def get_outstanding_chain_history(
        self,
        user: Optional[User] = None,
    ) -> ChainsCompletionHistoryInternal:
        """get outstanding chain history"""
        data: Sequence[
            ChainCompletionHistoryInternal
        ] = await self.chain_completion_history_repository.get_chain_history(
            user=user, chain_id=None, incomplete_only=True
        )

        return ChainsCompletionHistoryInternal(data=data)

    async def add_chain_history(
        self,
        chain_id: int,
        completion_date: date,
        status: Optional[ChainCompletionStatus] = None,
    ) -> ChainCompletionHistoryInternal:
        """add a new chain history"""
        chain_history = ChainCompletionHistory(
            chain_id=chain_id,
            completion_date=completion_date,
            status=status,
        )

        return await self.chain_completion_history_repository.add_chain_history(
            chain_history
        )

    async def update_chain_history(
        self,
        user: User,
        chain_id: int,
        chain_history_id: int,
        chain_completion_history_patch: ChainCompletionHistoryPatch,
    ):
        """update chain"""
        pass
        # get chain
        #
        chain = (
            await self.chain_completion_history_repository.get_chain_history(
                user=user, chain_id=chain_id
            )
        )
