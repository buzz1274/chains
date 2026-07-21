from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_utils.cbv import cbv
from sqlalchemy.exc import NoResultFound

from app.chain.services.chain_with_stats_service import ChainWithStatsService
from app.user.models import User
from app.chain.models import ChainsPublic
from app.core.authentication import get_current_user


router = APIRouter(prefix="/chains", tags=["chains"])


@cbv(router)
class ChainRouter:
    ERROR_MESSAGE_404: str = "Chain not found"

    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_with_stats_service: Annotated[
            ChainWithStatsService, Depends(ChainWithStatsService)
        ],
    ):
        self.user = user
        self.chain_with_stats_service = chain_with_stats_service

    @router.get("/", response_model=ChainsPublic)
    async def chains(self) -> ChainsPublic:
        """get all chains for authenticated user"""
        try:
            return await self.chain_with_stats_service.chains(self.user)
        except NoResultFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.ERROR_MESSAGE_404,
            )
