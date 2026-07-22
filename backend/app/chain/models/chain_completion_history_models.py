from typing import Optional, TYPE_CHECKING

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel
from datetime import date
from app.chain.models.constants import ChainCompletionStatus

if TYPE_CHECKING:
    from app.chain.models.chain_models import Chain


class ChainCompletionHistoryBase(SQLModel):
    completion_date: date = Field(default_factory=date.today, nullable=False)
    status: Optional[ChainCompletionStatus] = Field(nullable=True)


class ChainCompletionHistory(ChainCompletionHistoryBase, table=True):
    __tablename__ = "chain_completion_history"
    __table_args__ = (
        UniqueConstraint(
            "chain_id", "completion_date", name="uq_chain_completion_date"
        ),
    )

    id: Optional[int] = Field(primary_key=True, index=True)
    chain: "Chain" = Relationship(back_populates="chain_completion_history")
    chain_id: int = Field(foreign_key="chain.id", nullable=False)


class ChainCompletionHistoryPublic(ChainCompletionHistoryBase):
    pass
