from typing import Annotated, Optional
from fastapi import Depends
from app.chain.models.constants import ChainCompletionStatus
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
)
from app.chain.repositories.chain_completion_history_repository import (
    ChainCompletionHistoryRepository,
)
from datetime import date


class ChainCompletionHistoryService:
    def __init__(
        self,
        chain_history_repository: Annotated[
            ChainCompletionHistoryRepository,
            Depends(ChainCompletionHistoryRepository),
        ],
    ):
        self.chain_completion_history_repository: (
            ChainCompletionHistoryRepository
        ) = chain_history_repository

    async def get_chain_history(self):
        pass

    async def add_chain_history(
        self,
        chain_id: int,
        completion_date: date,
        status: Optional[ChainCompletionStatus] = None,
    ):
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
    ):
        """update chain"""
        pass
