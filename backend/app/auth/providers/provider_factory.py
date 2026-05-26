from app.auth.providers.google import Google


class ProviderFactory:
    PROVIDER_MAP = {
        "GOOGLE": Google,
    }

    def get_provider(self, provider: str):
        try:
            return self.PROVIDER_MAP[provider.upper()](provider)
        except KeyError:
            raise ValueError(f"Invalid provider({provider})")
