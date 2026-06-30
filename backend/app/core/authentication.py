from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

from app.user.models import User
from app.auth.service import AuthService

security = HTTPBearer()


async def get_current_user(
    token=Depends(security),  # noqa: B008
    authentication_service=Depends(AuthService),  # noqa: B008
) -> User:
    try:
        return await authentication_service.get_authenticated_user(token)
    except RuntimeError as e:
        raise HTTPException(status_code=401, detail=str(e))
