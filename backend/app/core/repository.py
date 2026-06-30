from typing import TypeVar
from sqlalchemy import Select, Delete, Update
from sqlalchemy.ext.asyncio import AsyncSession

from typing import Annotated

from fastapi import Depends

from app.core.database_manager import database_manager

T = TypeVar("T")


class Repository:
    def __init__(
        self,
        session: Annotated[AsyncSession, Depends(database_manager.get_session)],
    ):
        self.session: AsyncSession = session

    async def execute_query(self, query: Select | Delete | Update):
        """execute a query"""
        return await self.session.execute(
            query
        )  # ty: ignore[no-matching-overload]

    async def delete(self, model: object, commit: bool = True) -> None:
        """delete a model instance"""
        await self.session.delete(model)

        if commit:
            await self.commit()

    async def add(self, model: T, commit: bool = True) -> T:
        """insert/update a model instance"""
        self.session.add(model)

        if commit:
            await self.commit()
            await self.session.refresh(model)

        return model

    async def commit(self):
        """commit session"""
        try:
            await self.session.flush()
            await self.session.commit()
        except Exception:
            await self.session.rollback()
            raise
