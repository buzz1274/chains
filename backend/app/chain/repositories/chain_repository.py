from typing import Optional

from sqlalchemy import Sequence, Select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import selectinload

from app.chain.models import Chain
from app.core.repository import Repository
from app.user.models import User
from sqlmodel import select, col


class ChainRepository(Repository):
    async def get_chains(
        self,
        user: User,
        chain_id: Optional[int] = None,
    ) -> Sequence[Chain]:
        """get all chains for supplied user"""
        query: Select = (select(Chain).where(Chain.user_id == user.id)).options(
            selectinload(Chain.chain_completion_history)
        )

        if chain_id:
            query = query.where(col(Chain.id) == chain_id)

        chains: Sequence[Chain] = (
            (await self.execute_query(query)).scalars().all()
        )

        if not chains:
            raise NoResultFound

        return chains
