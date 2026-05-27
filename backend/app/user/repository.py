from typing import Optional

from app.core.repository import Repository
from app.user.models import User
from app.auth.models import AuthUserInfo
from sqlmodel import select


class UserRepository(Repository):
    INVALID_USER_QUERY: str = "invalid user query"

    def create_user(self, user_info: AuthUserInfo):
        """create a new user"""
        return self.add(
            User(
                email=user_info.email,
                name=user_info.name,
                provider=user_info.provider,
                provider_id=user_info.provider_id,
                image=user_info.image,
            )
        )

    def get_user(
        self,
        *,
        user_id: Optional[int] = None,
        email: Optional[str] = None,
        provider: Optional[str] = None,
        provider_id: Optional[str] = None,
    ):
        """retrieve a user"""
        if not user_id and not email and not provider and not provider_id:
            raise RuntimeError(self.INVALID_USER_QUERY)

        query = select(User)

        if provider and provider_id:
            query = query.where(User.provider == provider).where(
                User.provider_id == provider_id
            )

        if user_id:
            query = query.where(User.id == user_id)

        if email:
            query = query.where(User.email == email)

        return self.execute_query(query).one_or_none()
