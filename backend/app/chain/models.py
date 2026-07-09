from typing import Optional, TYPE_CHECKING, List

from sqlalchemy import Column, Integer, CheckConstraint
from sqlalchemy.orm import Mapped
from sqlmodel import Field, Relationship, SQLModel
from datetime import date
from pydantic import computed_field, BaseModel
from enum import StrEnum


class ChainCompletionStatus(StrEnum):
    HOLIDAY = "HOLIDAY"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"


class ChainFrequency(StrEnum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"


class Streak(BaseModel):
    streak: int
    start_date: date
    end_date: date


class CurrentStreak(Streak):
    pass


class MaxStreak(Streak):
    pass


class ChainBase(SQLModel):
    name: str
    description: str
    frequency: ChainFrequency = Field(default=ChainFrequency.WEEKLY)
    frequency_per_week: int = Field(
        default=1,
        ge=1,
        le=7,
        sa_column=Column(
            Integer,
            CheckConstraint(
                "amount_per_week BETWEEN 1 AND 7",
                name="ck_chain_amount_per_week_range",
            ),
            nullable=False,
        ),
    )
    start_date: date = Field(default_factory=date.today)
    icon: str


class Chain(ChainBase, table=True):
    id: Optional[int] = Field(primary_key=True, default=None)
    user_id: int = Field(foreign_key="user.id")
    chain_completion_history: Mapped[
        list["ChainCompletionHistory"]
    ] = Relationship(back_populates="chain")


class ChainCompletionHistoryBase(SQLModel):
    completion_date: date = Field(default_factory=date.today, nullable=False)
    status: ChainCompletionStatus = Field(nullable=True)


class ChainCompletionHistory(ChainCompletionHistoryBase, table=True):
    __tablename__ = "chain_completion_history"

    id: Optional[int] = Field(primary_key=True, index=True)
    chain: "Chain" = Relationship(back_populates="chain_completion_history")
    chain_id: int = Field(foreign_key="chain.id", nullable=False)


class ChainCompletionHistoryPublic(ChainCompletionHistoryBase):
    pass


class ChainPublic(ChainBase):
    id: int
    chain_completion_history: list[ChainCompletionHistoryPublic] = Field(
        default_factory=list
    )

    @computed_field
    @property
    def current_streak(self) -> CurrentStreak:
        return CurrentStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )

    @computed_field
    @property
    def max_streak(self) -> MaxStreak:
        return MaxStreak(
            streak=10, start_date=date.today(), end_date=date.today()
        )

    @computed_field
    @property
    def consistency(self) -> int:
        return 86

    @computed_field
    @property
    def completed_this_week(self) -> int:
        return 5


class ChainsPublic(SQLModel):
    data: List[ChainPublic]
