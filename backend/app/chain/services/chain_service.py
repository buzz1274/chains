from typing import Annotated, List, Sequence, Optional

from fastapi import Depends

from app.chain.exceptions.chain_exceptions import ChainNotFoundError
from app.chain.models.chain_models import (
    Chain,
    ChainsInternal,
    ChainsInternalWithStats,
    ChainInternal,
    ChainInternalWithStats,
)
from app.chain.models.chain_history_models import (
    ChainHistoryInternal,
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
        chains: Sequence[Chain] = await self.chain_repository.get_chains(
            user, chain_id, with_history
        )

        if chain_id and not chains:
            raise ChainNotFoundError

        if with_history:
            return self._generate_chain_with_history(chains)
        else:
            return self._generate_chain_without_history(chains)

    def _generate_chain_without_history(self, chains: Sequence[Chain]):
        """convert chains to ChainInternal model without history"""
        data: List[ChainInternal] = []

        for chain in chains:
            data.append(
                ChainInternal(
                    **chain.model_dump(
                        exclude={
                            "chain_history",
                        }
                    ),
                )
            )

        return ChainsInternal(data=data)

    def _generate_chain_with_history(self, chains: Sequence[Chain]):
        """add chain history with stats to chain model"""
        data: List[ChainInternalWithStats] = []

        for chain in chains:
            data.append(
                ChainInternalWithStats(
                    **chain.model_dump(
                        exclude={
                            "chain_history",
                        }
                    ),
                    chain_history=[
                        ChainHistoryInternal(**h.model_dump())
                        for h in chain.chain_history
                    ],
                    stats=self.chain_stats_service.compute(
                        chain,
                    ),
                )
            )

        return ChainsInternalWithStats(data=data)

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
