from typing import Annotated, List, Sequence, Optional

from fastapi import Depends

from app.chain.models import (
    Chain,
    ChainCompletionHistoryPublic,
    ChainsPublic,
    ChainPublic,
)
from app.chain.repositories.chain_repository import ChainRepository
from app.chain.services.chain_stats_service import ChainStatsService
from app.user.models import User


class ChainService:
    def __init__(
        self,
        chain_repository: Annotated[ChainRepository, Depends(ChainRepository)],
        chain_stats_service: Annotated[
            ChainStatsService, Depends(ChainStatsService)
        ],
    ):
        self.chain_repository: ChainRepository = chain_repository
        self.chain_stats_service: ChainStatsService = chain_stats_service

    async def chains(
        self,
        user: Optional[User] = None,
        chain_id: Optional[int] = None,
        with_history: bool = True,
    ) -> ChainsPublic:
        """get chains"""
        data: List[ChainPublic] = []
        chains: Sequence[Chain] = await self.chain_repository.get_chains(
            user, chain_id, with_history
        )

        for chain in chains:
            data.append(
                ChainPublic(
                    **chain.model_dump(
                        exclude={
                            "user_id",
                            "chain_completion_history",
                        }
                    ),
                    chain_completion_history=[
                        ChainCompletionHistoryPublic(**h.model_dump())
                        for h in chain.chain_completion_history
                    ]
                    if with_history
                    else None,
                    **self.chain_stats_service.compute(
                        chain,
                    )
                    if with_history
                    else {}
                )
            )

        return ChainsPublic(data=data)

    async def update_chain(
        self,
    ):
        """update chain"""
        pass

    async def delete_chain(
        self,
    ):
        """delete chain"""
        pass
