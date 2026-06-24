from fastapi import APIRouter, File, UploadFile

from schemas.market import MarketExtraction, MarketStatsPayload, MarketSummary
from services.ai_service import extract_market as extract_market_from_image
from services.ai_service import generate_summary

router = APIRouter()


@router.post("/extract-market", response_model=MarketExtraction)
async def extract_market(image: UploadFile = File(...)) -> MarketExtraction:
    image_bytes = await image.read()
    return await extract_market_from_image(image_bytes, image.content_type or "")


@router.post("/analyze-market", response_model=MarketSummary)
async def analyze_market(stats: MarketStatsPayload) -> MarketSummary:
    summary = await generate_summary(stats.model_dump())
    return MarketSummary(summary=summary)
