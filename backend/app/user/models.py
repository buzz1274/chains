from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel
from typing import Optional
from pydantic import BaseModel, ConfigDict
from datetime import date


class User(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    provider_id: str = Field(nullable=False, index=True)
    provider: str = Field(nullable=False)
    email: str = Field(unique=True, index=True)
    name: Optional[str] = Field(default=None, max_length=255)
    registered_date: date = Field(default=date.today(), nullable=True)

    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        return EmailStr.validate(value)


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    registered_date: date
