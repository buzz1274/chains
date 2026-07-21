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
        user: Optional[User] = None,
        chain_id: Optional[int] = None,
        with_history: bool = True,
    ) -> Sequence[Chain]:
        """get all chains for supplied user"""
        query: Select = select(Chain).where(col(Chain.deleted) == False)

        if user:
            query = query.where(col(Chain.user_id) == user.id)

        if chain_id:
            query = query.where(col(Chain.id) == chain_id)

        if with_history:
            query = query.options(selectinload(Chain.chain_completion_history))

        chains: Sequence[Chain] = (
            (await self.execute_query(query)).scalars().all()
        )

        if not chains:
            raise NoResultFound

        return chains
