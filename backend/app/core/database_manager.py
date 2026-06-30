from contextlib import asynccontextmanager
from typing import AsyncGenerator

from app.core.config.config import settings
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    AsyncEngine,
    create_async_engine,
    async_sessionmaker,
)


class DatabaseManager:
    def __init__(self) -> None:
        self.engine: AsyncEngine | None = None
        self.session_factory: async_sessionmaker[AsyncSession] | None = None

    def startup(self) -> None:
        """Initialize the database engine"""
        if self.engine:
            return

        self.engine = create_async_engine(
            str(settings.SQLALCHEMY_DATABASE_URI),
            pool_size=10,
            max_overflow=5,
            pool_pre_ping=True,
            pool_recycle=1800,
            echo=settings.SQL_ALCHEMY_ECHO,
        )

        self.session_factory = async_sessionmaker(
            self.engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

    async def shutdown(self) -> None:
        """Shutdown the database engine"""
        if self.engine:
            await self.engine.dispose()

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """get database session"""
        if not self.engine or not self.session_factory:
            raise RuntimeError("Database engine not initialized")

        async with self.session_factory() as session:
            yield session

    @asynccontextmanager
    async def get_session_context(self) -> AsyncGenerator[AsyncSession, None]:
        if not self.engine or not self.session_factory:
            raise RuntimeError("Database engine not initialized")

        async with self.session_factory() as session:
            try:
                yield session
                await session.commit()
            except Exception:
                await session.rollback()
                raise


database_manager = DatabaseManager()
