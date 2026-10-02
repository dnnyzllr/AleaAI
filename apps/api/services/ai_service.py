import base64
import json
from typing import Any

import openai
from fastapi import HTTPException
from pydantic import ValidationError

from config import OPENAI_CHEAP_MODEL, OPENAI_STRONG_MODEL, require_openai_api_key
from schemas.market import MarketExtraction


ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}
REQUIRED_EXTRACTION_FIELDS = {"player", "market", "line"}
FORBIDDEN_SUMMARY_PHRASES = (
    "guaranteed",
    "lock",
    "will hit",
    "free money",
    "true probability is",
)


def _client() -> openai.AsyncOpenAI:
    return openai.AsyncOpenAI(api_key=require_openai_api_key(), timeout=30.0)


def _parse_extraction(content: str | None) -> MarketExtraction:
    if not content:
        raise ValueError("OpenAI returned an empty extraction response")

    data = json.loads(content)
    missing = REQUIRED_EXTRACTION_FIELDS - set(data)
    empty = {
        field
        for field in REQUIRED_EXTRACTION_FIELDS
        if field in data and (data[field] is None or data[field] == "")
    }
    missing = missing | empty
    if missing:
        raise ValueError(
            "Extraction missing required visible fields: "
            f"{', '.join(sorted(missing))}. "
            "Use a screenshot that shows the player and market line."
        )

    return MarketExtraction.model_validate(data)


async def _extract_with_model(
    image_bytes: bytes,
    content_type: str,
    model: str,
) -> MarketExtraction:
    b64 = base64.b64encode(image_bytes).decode("utf-8")
    response = await _client().chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    "Extract only what is visible in the Kalshi NBA market screenshot. "
                    "Return JSON with exactly these keys: player, market, line, side, price_cents. "
                    "Do not guess or invent values. market must be one of: points, rebounds, assists, threes. "
                    "line should be numeric, so 20+ should be returned as 20. "
                    "The screenshot may be a Kalshi order, market, or already-bought position view with multiple text lines. "
                    "For position views, use the visible contract side from labels like Yes, No, Bought Yes, Bought No, Position, or the contract text. "
                    "For position views, use the visible price paid, average price, fill price, or entry price when shown. "
                    "Kalshi market prices are often shown on buttons or rows labeled Yes, No, Buy Yes, or Buy No. "
                    "If a visible Yes price is shown, use side yes and set price_cents to that Yes price. "
                    "If only a visible No price is shown, use side no and set price_cents to that No price. "
                    "price_cents must be the visible price in cents as an integer, such as 68 for 68 cents. "
                    "If side or price is not visible, return null for that field instead of guessing; the user will fill it on the verify screen. "
                    "Do not return confidence, scores, recommendations, probabilities, or advice."
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{content_type};base64,{b64}"
                        },
                    },
                    {
                        "type": "text",
                        "text": "Extract the visible player, market, line, side, and price from this Kalshi NBA screenshot. Pay close attention to bought-position details, order details, Yes/No labels, and any visible price paid.",
                    },
                ],
            },
        ],
        response_format={"type": "json_object"},
        max_tokens=200,
    )
    return _parse_extraction(response.choices[0].message.content)


async def extract_market(image_bytes: bytes, content_type: str) -> MarketExtraction:
    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Invalid image format. Use PNG, JPG, or WebP.")

    if not image_bytes:
        raise HTTPException(status_code=400, detail="Image upload is empty")

    try:
        return await _extract_with_model(image_bytes, content_type, OPENAI_STRONG_MODEL)
    except (json.JSONDecodeError, ValidationError, ValueError):
        try:
            return await _extract_with_model(image_bytes, content_type, OPENAI_STRONG_MODEL)
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Extraction failed: {str(e)}") from e
    except openai.OpenAIError as e:
        raise HTTPException(status_code=422, detail=f"OpenAI extraction failed: {str(e)}") from e


async def generate_summary(stats_payload: dict[str, Any]) -> str:
    try:
        response = await _client().chat.completions.create(
            model=OPENAI_CHEAP_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Write a concise plain-English risk summary for an NBA Kalshi market using only the stats provided. "
                        "Do not invent numbers, probabilities, hit rates, edge signals, risk labels, or recommendations. "
                        "Do not tell the user to buy, sell, trade, or bet. "
                        "Use phrases like Historical hit rate, Market-implied probability, Based on available data, "
                        "and underpriced or overpriced relative to historical results. "
                        "Never use guaranteed, lock, will hit, free money, or true probability is."
                    ),
                },
                {
                    "role": "user",
                    "content": json.dumps(stats_payload),
                },
            ],
            max_tokens=180,
        )
        summary = response.choices[0].message.content
        if not summary:
            raise ValueError("OpenAI returned an empty summary response")
        if any(phrase in summary.lower() for phrase in FORBIDDEN_SUMMARY_PHRASES):
            raise ValueError("Summary used unsupported certainty language")
        return summary
    except openai.OpenAIError as e:
        raise HTTPException(status_code=422, detail=f"OpenAI summary failed: {str(e)}") from e
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Summary generation failed: {str(e)}") from e
