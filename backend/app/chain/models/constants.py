from enum import StrEnum


class ChainHistoryStatus(StrEnum):
    HOLIDAY = "HOLIDAY"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"


class ChainFrequency(StrEnum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
