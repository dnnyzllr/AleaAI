from typing import Literal

from pydantic import BaseModel, ConfigDict, field_validator


class MarketExtraction(BaseModel):
    player: str
    market: Literal["points", "rebounds", "assists", "threes"]
    line: float
    side: Literal["yes", "no"]
    price_cents: int

    model_config = ConfigDict(extra="forbid")

    @field_validator("market", "side", mode="before")
    @classmethod
    def normalize_lowercase(cls, value: str) -> str:
        return value.lower() if isinstance(value, str) else value


class MarketStatsPayload(MarketExtraction):
    implied_probability: float
    last_10_hit_rate: float
    last_20_hit_rate: float
    edge_signal: float
    risk_label: str

    model_config = ConfigDict(extra="forbid")


class MarketSummary(BaseModel):
    summary: str
