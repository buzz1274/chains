from datetime import date, timedelta
from typing import Annotated, Optional, Sequence, List

from app.chain.models import (
    ChainsPublic,
    Chain,
    ChainCompletionHistory,
    ChainPublic,
    CurrentStreak,
    MaxStreak,
    ChainCompletionHistoryPublic,
    ChainFrequency,
    ChainCompletionStatus,
)
from app.chain.repositories.chain_repository import ChainRepository
from fastapi import Depends

from app.user.models import User


class ChainWithStatsService:
    def __init__(
        self,
        chain_repository: Annotated[ChainRepository, Depends(ChainRepository)],
    ):
        self.chain_repository = chain_repository

    async def chains(
        self,
        user: User,
        chain_id: Optional[int] = None,
    ) -> ChainsPublic:
        """decorate chains model with stats"""
        chains_public: List[ChainPublic] = []
        chains: Sequence[Chain] = await self.chain_repository.get_chains(
            user, chain_id
        )

        for chain in chains:
            chains_public.append(
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
                    ],
                    completed_this_week=self._completed_this_week(
                        chain.chain_completion_history
                    ),
                    consistency=self._consistency(
                        chain.chain_completion_history
                    ),
                    max_streak=self._max_streak(chain.chain_completion_history),
                    current_streak=self._current_streak(
                        chain.frequency,
                        chain.frequency_per_week,
                        chain.chain_completion_history,
                    )
                )
            )

        return ChainsPublic(data=chains_public)

    def _completed_this_week(
        self, history: List[ChainCompletionHistory]
    ) -> int:
        """determine how many times a chain has been completed this week"""
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)

        return sum(
            1
            for h in history
            if h.status == ChainCompletionStatus.SUCCESS
            and week_start <= h.completion_date <= week_end
        )

    def _consistency(self, history: List[ChainCompletionHistory]) -> int:
        """determine percentage of successful chains"""

        """
        completed_per_week = Counter(
            (h.completion_date.isocalendar().year, h.completion_date.isocalendar().week)
            for h in histories
            if h.status == ChainCompletionStatus.COMPLETED
        )
        #return sum(count >= 4 for count in completed_per_week.values())
        """

        return 83

    def _max_streak(self, history: List[ChainCompletionHistory]) -> MaxStreak:
        """determine max streak for chain completions"""
        return MaxStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )

    def _current_streak(
        self,
        frequency: ChainFrequency,
        frequency_per_week: int,
        history: List[ChainCompletionHistory],
    ) -> CurrentStreak:
        """determine current streak of chain completions"""
        # history.reverse()

        # for h in history:
        #    print(h)

        return CurrentStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )
