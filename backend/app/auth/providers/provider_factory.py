from app.auth.models import AuthProvider
from app.auth.providers.google import Google


class ProviderFactory:
    PROVIDER_MAP = {
        AuthProvider.GOOGLE: Google,
    }

    def get_provider(self, provider: AuthProvider):
        """get appropriate provider class based on provider name"""
        provider = AuthProvider(provider)

        try:
            return self.PROVIDER_MAP[provider](provider)
        except KeyError:
            raise ValueError(f"Invalid provider({provider})")
