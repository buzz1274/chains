from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_utils.cbv import cbv
from sqlalchemy.exc import NoResultFound

from app.user.models import User
from app.chain.models import ChainsPublic
from app.core.authentication import get_current_user
from app.chain.repositories.chain_repository import ChainRepository

router = APIRouter(prefix="/chains", tags=["chains"])


@cbv(router)
class ChainRouter:
    ERROR_MESSAGE_404: str = "Chain not found"

    def __init__(
        self,
        user: Annotated[User, Depends(get_current_user)],
        chain_repository: Annotated[ChainRepository, Depends(ChainRepository)],
    ):
        self.user = user
        self.chain_repository = chain_repository

    @router.get("/", response_model=ChainsPublic)
    async def chains(self) -> ChainsPublic:
        """get all chains for authenticated user"""
        try:
            return ChainsPublic(
                data=(await self.chain_repository.get_chains(self.user))
            )
        except NoResultFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=self.ERROR_MESSAGE_404,
            )
