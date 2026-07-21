from typing import Optional

from pydantic import EmailStr
from sqlmodel import Field, SQLModel
from pydantic import BaseModel, ConfigDict
from datetime import date

from app.auth.models import AuthProvider


class User(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    provider_id: str = Field(nullable=False, index=True)
    provider: AuthProvider = Field(nullable=False)
    email: EmailStr = Field(unique=True, index=True)
    name: str = Field(max_length=255)
    registered_date: date = Field(default_factory=date.today, nullable=False)
    image: Optional[str] = Field(default=None)


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    registered_date: date
    image: str
