from pydantic import BaseModel


class AuthRequest(BaseModel):
    code: str
    provider: str


class AuthResponse(BaseModel):
    token: str


class AuthUserInfo(BaseModel):
    provider_id: str
    provider: str
    email: str
    name: str
    email_verified: bool
