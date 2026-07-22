from app.chain.models.chain_models import ChainPublic, ChainsPublic
from app.chain.models.chain_completion_history_models import (
    ChainCompletionHistory,
    ChainCompletionHistoryPublic,
)

ChainPublic.model_rebuild()
ChainsPublic.model_rebuild()
ChainCompletionHistory.model_rebuild()
ChainCompletionHistoryPublic.model_rebuild()
