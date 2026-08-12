from typing import Optional, TYPE_CHECKING, List

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel
from datetime import date
from app.chain.models.constants import ChainHistoryStatus

if TYPE_CHECKING:
    from app.chain.models.chain_models import Chain


class ChainHistoryBase(SQLModel):
    completion_date: date = Field(default_factory=date.today, nullable=False)
    status: Optional[ChainHistoryStatus] = Field(nullable=True)


class ChainHistory(ChainHistoryBase, table=True):
    __tablename__ = "chain_history"
    __table_args__ = (
        UniqueConstraint(
            "chain_id", "completion_date", name="uq_chain_completion_date"
        ),
    )

    id: Optional[int] = Field(primary_key=True, index=True, default=None)
    chain: "Chain" = Relationship(back_populates="chain_history")
    chain_id: int = Field(foreign_key="chain.id", nullable=False)


class ChainHistoryInternal(ChainHistoryBase):
    id: int
    chain_id: int


class ChainHistoryPublic(ChainHistoryBase):
    id: int
    chain_id: int


class ChainsHistoryInternal(SQLModel):
    data: List[ChainHistoryInternal]


class ChainsHistoryPublic(SQLModel):
    data: List[ChainHistoryPublic]


class ChainHistoryPatch(SQLModel):
    status: ChainHistoryStatus
