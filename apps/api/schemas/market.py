import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, field_validator


class MarketExtraction(BaseModel):
    player: str
    market: Literal["points", "rebounds", "assists", "threes"]
    line: float
    side: Literal["yes", "no"] | None = None
    price_cents: int | None = None

    model_config = ConfigDict(extra="forbid")

    @field_validator("market", "side", mode="before")
    @classmethod
    def normalize_lowercase(cls, value: str) -> str:
        return value.lower() if isinstance(value, str) else value

    @field_validator("line", mode="before")
    @classmethod
    def parse_line(cls, value: str | float | int) -> str | float | int:
        if isinstance(value, str):
            match = re.search(r"\d+(?:\.\d+)?", value)
            if match:
                return match.group(0)
        return value

    @field_validator("price_cents", mode="before")
    @classmethod
    def parse_price_cents(cls, value: str | int | None) -> str | int | None:
        if value is None:
            return value
        if isinstance(value, str):
            match = re.search(r"\d+", value)
            if match:
                return match.group(0)
        return value


class MarketStatsPayload(MarketExtraction):
    implied_probability: float
    last_10_hit_rate: float
    last_20_hit_rate: float
    edge_signal: float
    risk_label: str

    model_config = ConfigDict(extra="forbid")


class MarketSummary(BaseModel):
    summary: str
