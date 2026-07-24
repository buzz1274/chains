from typing import Annotated, List, Sequence, Optional

from fastapi import Depends

from app.chain.exceptions.chains_exceptions import ChainNotFoundError
from app.chain.models.chain_models import (
    Chain,
    ChainsInternal,
    ChainsInternalWithStats,
    ChainInternal,
    ChainInternalWithStats,
)
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistoryPublic,
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
    ) -> ChainsInternal | ChainsInternalWithStats:
        """returns API shaped ChainsPublic object"""
        data: List[ChainInternalWithStats | ChainInternal] = []
        chains: Sequence[Chain] = await self.chain_repository.get_chains(
            user, chain_id, with_history
        )

        if chain_id and not chains:
            raise ChainNotFoundError

        model = ChainInternalWithStats if with_history else ChainInternal

        for chain in chains:
            data.append(
                model(
                    **chain.model_dump(
                        exclude={
                            "chain_completion_history",
                        }
                    ),
                    chain_completion_history=[
                        ChainCompletionHistoryPublic(**h.model_dump())
                        for h in chain.chain_completion_history
                    ]
                    if with_history
                    else [],
                    stats={
                        **self.chain_stats_service.compute(
                            chain,
                        )
                    }
                    if with_history
                    else {}
                )
            )

        if with_history:
            return ChainsInternalWithStats(data=data)

        return ChainsInternal(data=data)

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
