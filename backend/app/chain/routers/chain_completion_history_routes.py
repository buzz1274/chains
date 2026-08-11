from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from starlette.responses import JSONResponse

from app.chain.exceptions.chain_completion_history_exceptions import (
    NoChainHistoryCompletionFound,
)
from app.chain.models import ChainCompletionHistoryPublic
from app.chain.models.chain_completion_history_models import (
    ChainsCompletionHistoryPublic,
    ChainCompletionHistoryPatch,
)
from app.chain.services.chain_service import ChainService
from app.user.models import User
from app.chain.models.chain_models import ChainsPublic, ChainPublic
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
            history = await self.chain_completion_history_service.get_outstanding_chain_history(
                self.user
            )

            return ChainsCompletionHistoryPublic(data=history.data)
        except NoChainHistoryCompletionFound:
            return ChainCompletionHistoryPublic(data=[])


@cbv(chain_completion_history_router)
class ChainCompletionHistoryRouter:
    ERROR_MESSAGE_404: str = "Chain history not found"

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

    @chain_completion_history_router.patch("/{chain_history_id}")
    async def update(
        self,
        chain_id: int,
        chain_history_id: int,
        chain_completion_history_patch: ChainCompletionHistoryPatch,
    ) -> ChainCompletionHistoryPublic:
        """get all chains for authenticated user"""
        chain_completion_history = (
            await self.chain_completion_history_service.update_chain_history(
                self.user,
                chain_id,
                chain_history_id,
                chain_completion_history_patch,
            )
        )

        print(chain_completion_history.status)
        print(chain_id)
        print(chain_history_id)
        print("HERE")

        return JSONResponse(content="")
