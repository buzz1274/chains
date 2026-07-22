from enum import StrEnum


class ChainCompletionStatus(StrEnum):
    HOLIDAY = "HOLIDAY"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"


class ChainFrequency(StrEnum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
