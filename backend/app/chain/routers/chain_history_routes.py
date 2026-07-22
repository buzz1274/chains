from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_utils.cbv import cbv
from sqlalchemy.exc import NoResultFound

from app.chain.services.chain_service import ChainService
from app.user.models import User
from app.chain.models.chain_models import ChainsPublic
from app.auth.dependencies import get_current_user


router = APIRouter(prefix="/chains", tags=["chains"])


@cbv(router)
class ChainHistoryRouter:
    ERROR_MESSAGE_404: str = "Chain not found"

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
            return await self.chain_service.chains(self.user)
        except NoResultFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.ERROR_MESSAGE_404,
            )
