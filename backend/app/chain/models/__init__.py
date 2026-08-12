from app.chain.models.chain_models import (
    ChainPublic,
    ChainsPublic,
    ChainInternalWithStats,
    ChainsInternalWithStats,
)
from app.chain.models.chain_history_models import (
    ChainHistory,
    ChainHistoryPublic,
)

ChainPublic.model_rebuild()
ChainsPublic.model_rebuild()
ChainInternalWithStats.model_rebuild()
ChainsInternalWithStats.model_rebuild()
ChainHistory.model_rebuild()
ChainHistoryPublic.model_rebuild()
