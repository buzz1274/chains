from app.chain.routers.chains_routes import router
from app.chain.routers.chain_completion_history_routes import (
    chain_completion_history_router,
    all_chain_completion_history_router,
)

router.include_router(all_chain_completion_history_router)
router.include_router(chain_completion_history_router)
