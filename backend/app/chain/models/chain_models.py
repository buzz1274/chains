from typing import Optional, List, TYPE_CHECKING

from sqlalchemy import (
    Column,
    Integer,
    CheckConstraint,
    Boolean,
    false,
)
from sqlalchemy.orm import Mapped
from sqlmodel import Field, Relationship, SQLModel
from datetime import date
from pydantic import BaseModel

from app.chain.models.constants import ChainFrequency
from app.chain.models.chain_history_models import ChainHistoryInternal


if TYPE_CHECKING:
    from app.chain.models.chain_history_models import (
        ChainHistoryPublic,
        ChainHistory,
    )


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
                "frequency_per_week BETWEEN 1 AND 7",
                name="ck_frequency_per_week_range",
            ),
            nullable=False,
        ),
    )
    start_date: date = Field(default_factory=date.today)
    icon: str


class Chain(ChainBase, table=True):
    id: Optional[int] = Field(primary_key=True, default=None)
    user_id: int = Field(foreign_key="user.id")
    deleted: bool = Field(
        default=False,
        sa_column=Column(Boolean, nullable=False, server_default=false()),
    )
    chain_history: Mapped[List["ChainHistory"]] = Relationship(
        back_populates="chain",
        sa_relationship_kwargs={"lazy": "raise"},
    )


class ChainInternal(ChainBase):
    id: int
    user_id: int
    deleted: int


class ChainsInternal(BaseModel):
    data: List[ChainInternal]


class ChainStats(BaseModel):
    current_streak: CurrentStreak
    max_streak: MaxStreak
    completed_this_week: int
    consistency: int


class ChainInternalWithStats(ChainInternal):
    stats: ChainStats
    chain_history: List["ChainHistoryInternal"] = Field(default_factory=list)


class ChainsInternalWithStats(BaseModel):
    data: List[ChainInternalWithStats]


class ChainPublic(ChainBase):
    id: int
    chain_history: list["ChainHistoryPublic"] = Field(default_factory=list)
    stats: ChainStats


class ChainsPublic(SQLModel):
    data: List[ChainPublic]
