import os

from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_CHEAP_MODEL = os.getenv("OPENAI_CHEAP_MODEL", "gpt-4o-mini")
OPENAI_STRONG_MODEL = os.getenv("OPENAI_STRONG_MODEL", "gpt-4o")


def require_openai_api_key() -> str:
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured")
    return OPENAI_API_KEY
