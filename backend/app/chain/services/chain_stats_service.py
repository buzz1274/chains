from datetime import date, timedelta
from typing import Optional

from app.chain.models.chain_models import (
    Chain,
    CurrentStreak,
    MaxStreak,
)
from app.chain.models.constants import ChainHistoryStatus


class ChainStatsService:
    def __init__(self):
        self.chain: Optional[Chain] = None

    def compute(self, chain: Chain):
        self.chain = chain

        return {
            "completed_this_week": self._completed_this_week(),
            "consistency": self._consistency(),
            "max_streak": self._max_streak(),
            "current_streak": self._current_streak(),
        }

    def _completed_this_week(self) -> int:
        """determine how many times a chain has been completed this week"""
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        week_end = week_start + timedelta(days=6)

        return sum(
            1
            for h in self.chain.chain_history
            if h.status == ChainHistoryStatus.SUCCESS
            and week_start <= h.completion_date <= week_end
        )

    def _consistency(self) -> int:
        """determine percentage of successful chains"""

        """
        completed_per_week = Counter(
            (h.completion_date.isocalendar().year,
            h.completion_date.isocalendar().week)
            for h in histories
            if h.status == ChainCompletionStatus.COMPLETED
        )
        #return sum(count >= 4 for count in completed_per_week.values())
        """

        return 83

    def _max_streak(self) -> MaxStreak:
        """determine max streak for chain completions"""
        return MaxStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )

    def _current_streak(self) -> CurrentStreak:
        """determine current streak of chain completions"""
        # history.reverse()

        # for h in history:
        #    print(h)

        return CurrentStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )
