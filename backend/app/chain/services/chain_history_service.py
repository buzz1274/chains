from typing import Annotated, Optional
from fastapi import Depends

from app.chain.models import ChainCompletionHistory, ChainCompletionStatus
from app.chain.repositories.chain_history_repository import (
    ChainHistoryRepository,
)
from datetime import date


class ChainHistoryService:
    def __init__(
        self,
        chain_history_repository: Annotated[
            ChainHistoryRepository, Depends(ChainHistoryRepository)
        ],
    ):
        self.chain_history_repository: ChainHistoryRepository = (
            chain_history_repository
        )

    async def add_chain_history(
        self,
        chain_id: int,
        completion_date: date,
        status: Optional[ChainCompletionStatus] = None
    ):
        """add a new chain history"""
        chain_history = ChainCompletionHistory(
            chain_id=chain_id,
            completion_date=completion_date,
            status=status,
        )

        return await self.chain_history_repository.add_chain_history(
            chain_history
        )


    async def update_chain_history(
        self,
    ):
        """update chain"""
        pass
