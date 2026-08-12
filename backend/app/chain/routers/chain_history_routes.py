from typing import Annotated

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi_utils.cbv import cbv

from app.chain.exceptions.chain_history_exceptions import (
    ChainHistoryNotFound,
    ChainHistoryNoOutstandingChains,
    ChainHistoryAlreadyUpdated,
)
from app.chain.models import ChainHistoryPublic
from app.chain.models.chain_history_models import (
    ChainsHistoryPublic,
    ChainHistoryPatch,
    ChainHistoryInternal,
    ChainsHistoryInternal,
)
from app.user.models import User
from app.auth.dependencies import get_current_user
from app.chain.services.chain_history_service import (
    ChainHistoryService,
)


all_chain_history_router = APIRouter(
    prefix="/history", tags=["all-chain-history"]
)
chain_history_router = APIRouter(
    prefix="/{chain_id}/history", tags=["chain-history"]
)


@cbv(all_chain_history_router)
class AllChainHistoryRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_history_service: Annotated[
            ChainHistoryService,
            Depends(ChainHistoryService),
        ],
    ):
        self.user = user
        self.chain_history_service = chain_history_service

    @all_chain_history_router.get("/", response_model=ChainsHistoryPublic)
    async def history(self):
        """get all incomplete chain histories for authenticated user"""
        try:
            history: (
                ChainsHistoryInternal
            ) = await self.chain_history_service.get_outstanding_chain_history(
                self.user
            )

            return ChainsHistoryPublic(
                data=[ChainHistoryPublic.model_validate(h) for h in history]
            )
        except ChainHistoryNoOutstandingChains:
            return ChainsHistoryPublic(data=[])


@cbv(chain_history_router)
class ChainHistoryRouter:
    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_history_service: Annotated[
            ChainHistoryService,
            Depends(ChainHistoryService),
        ],
    ):
        self.user = user
        self.chain_history_service = chain_history_service

    @chain_history_router.patch(
        "/{chain_history_id}", response_model=ChainHistoryPublic
    )
    async def update(
        self,
        chain_id: int,
        chain_history_id: int,
        chain_completion_history_patch: ChainHistoryPatch,
    ) -> ChainHistoryPublic:
        """get all chains for authenticated user"""
        try:
            chain_history: (
                ChainHistoryInternal
            ) = await self.chain_history_service.update_chain_history(
                self.user,
                chain_id,
                chain_history_id,
                chain_completion_history_patch,
            )

            return ChainHistoryPublic.model_validate(chain_history)
        except ChainHistoryNotFound as e:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=e.message
            ) from None
        except ChainHistoryAlreadyUpdated as e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail=e.message
            ) from None
