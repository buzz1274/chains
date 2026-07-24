from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv

from app.chain.services.chain_service import ChainService
from app.user.models import User
from app.chain.models.chain_models import ChainsPublic
from app.auth.dependencies import get_current_user
from app.chain.services.chain_completion_history_service import (
    ChainCompletionHistoryService,
)


all_chain_completion_history_router = APIRouter(
    prefix="/history", tags=["all-chain-history"]
)
chain_completion_history_router = APIRouter(
    prefix="/{chain_id}/history", tags=["chain-history"]
)


@cbv(all_chain_completion_history_router)
class AllChainCompletionHistoryRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_completion_history_service: Annotated[
            ChainCompletionHistoryService,
            Depends(ChainCompletionHistoryService),
        ],
    ):
        self.user = user
        self.chain_completion_history_service = chain_completion_history_service

    @all_chain_completion_history_router.get("/")
    async def history(self):
        """get all incomplete chain histories for authenticated user"""
        try:
            return await self.chain_service.chains(self.user)
        except NoResultFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.ERROR_MESSAGE_404,
            )


@cbv(chain_completion_history_router)
class ChainCompletionHistoryRouter:
    ERROR_MESSAGE_404: str = "Chain not found"

    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_service: Annotated[ChainService, Depends(ChainService)],
    ):
        self.user = user
        self.chain_service = chain_service

    @chain_completion_history_router.patch("/")
    async def update(self) -> ChainsPublic:
        """get all chains for authenticated user"""
        pass
