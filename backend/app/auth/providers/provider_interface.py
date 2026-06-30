from abc import abstractmethod, ABCMeta
from string import Template

from app.auth.models import AuthUserInfo


class ProviderInterface(metaclass=ABCMeta):
    INVALID_CREDENTIAL_ERROR: str = "Invalid credentials"
    COMMUNICATION_ERROR: Template = Template("Communication error $provider")

    def __init__(self, provider: str):
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
