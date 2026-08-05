from abc import abstractmethod, ABCMeta

from app.auth.models import AuthUserInfo, AuthProvider


class ProviderInterface(metaclass=ABCMeta):
    def __init__(self, provider: AuthProvider):
        self.provider = provider
        self.user_info: dict = {}

    @abstractmethod
    async def get_user_info(self, code: str) -> AuthUserInfo:
        pass

    @abstractmethod
    def _validate_user_info(self) -> bool:
        pass

    @abstractmethod
    async def _check_code(self, code) -> dict:
        pass
