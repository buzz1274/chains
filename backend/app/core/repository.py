from sqlalchemy import Select, Delete, Update
from sqlmodel import Session

from typing import Annotated

from fastapi import Depends

from app.core.database_manager import database_manager


class Repository:
    def __init__(
        self, session: Annotated[Session, Depends(database_manager.get_session)]
    ):
        self.session: Session = session

    def execute_query(self, query: Select | Delete | Update):
        return self.session.exec(query)  # ty: ignore[no-matching-overload]

    def delete(self, model: object, commit: bool = True) -> None:
        """delete a model instance"""
        self.session.delete(model)

        if commit:
            self.commit()

    def add(self, model: object, commit: bool = True) -> object:
        """insert/update a model instance"""
        self.session.add(model)

        if commit:
            self.commit()

        return model

    def commit(self):
        """commit session"""
        self.session.commit()
