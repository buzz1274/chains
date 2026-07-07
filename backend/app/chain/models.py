from typing import Optional

from sqlmodel import Field, SQLModel
from pydantic import BaseModel
from datetime import date
from enum import StrEnum


class ChainStatus(StrEnum):
    HOLIDAY = "HOLIDAY"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"


class Chain(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    user_id: int = Field(foreign_key="user.id", nullable=False)
    start_date: date = Field(default_factory=date.today, nullable=False)
    name: str = Field(max_length=255)
    description: str = Field(max_length=255)
    amount_per_week: int = Field(default=1, nullable=False, ge=1, le=7)
    icon: str = Field(nullable=False)


class ChainCompletion(SQLModel, table=True):
    __tablename__ = "chain_completion"

    id: Optional[int] = Field(primary_key=True, index=True)
    chain_id: int = Field(foreign_key="chain.id", nullable=False)
    completion_date: date = Field(default_factory=date.today, nullable=False)
    status: ChainStatus = Field(nullable=True)


class ChainPublic(BaseModel):
    pass
