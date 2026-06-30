from pydantic import BaseModel, EmailStr
from enum import StrEnum


class AuthProvider(StrEnum):
    GOOGLE = "GOOGLE"


class AuthRequest(BaseModel):
    code: str
    provider: str


class AuthResponse(BaseModel):
    token: str
    request_id: str


class AuthUserInfo(BaseModel):
    provider_id: str
    provider: AuthProvider
    email: EmailStr
    name: str
    email_verified: bool
    image: str
