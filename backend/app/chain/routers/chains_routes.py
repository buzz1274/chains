from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from app.chain.exceptions.chain_exceptions import ChainNotFoundError

from app.chain.services.chain_service import ChainService
from app.user.models import User
from app.chain.models.chain_models import (
    ChainsPublic,
    ChainPublic,
    ChainsInternal,
    ChainsInternalWithStats,
)
from app.auth.dependencies import get_current_user


router = APIRouter(prefix="/chains", tags=["chains"])


@cbv(router)
class ChainRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_service: Annotated[ChainService, Depends(ChainService)],
    ):
        self.user = user
        self.chain_service = chain_service

    @router.get("/", response_model=ChainsPublic)
    async def chains(self) -> ChainsPublic:
        """get all chains for authenticated user"""
        try:
            chains: ChainsInternal | ChainsInternalWithStats = (
                await self.chain_service.chains(self.user)
            )

            return ChainsPublic(
                data=[ChainPublic.model_validate(c) for c in chains.data]
            )
        except ChainNotFoundError:
            return ChainsPublic(data=[])
