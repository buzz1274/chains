from contextlib import contextmanager
from typing import Generator

from app.core.config.config import settings
from sqlmodel import create_engine, Session
from sqlalchemy.engine import Engine


class DatabaseManager:
    def __init__(self) -> None:
        self.engine: Engine | None = None

    def startup(self) -> None:
        """Initialize the database engine"""
        self.engine = create_engine(
            str(settings.SQLALCHEMY_DATABASE_URI),
            pool_size=10,
            max_overflow=5,
            pool_pre_ping=True,
            pool_recycle=1800,
            echo=settings.SQL_ALCHEMY_ECHO,
        )

    def shutdown(self) -> None:
        """Shutdown the database engine"""
        if self.engine:
            self.engine.dispose()

    def get_engine(self) -> Engine:
        """get database engine"""
        if not self.engine:
            raise RuntimeError("Database engine not initialized")

        return self.engine

    def get_session(self) -> Generator[Session, None, None]:
        """get database session"""
        session: Session = Session(self.get_engine())

        try:
            yield session
        finally:
            session.close()

    @contextmanager
    def get_session_context(self) -> Generator[Session, None, None]:
        return self.get_session()


database_manager = DatabaseManager()
