import base64
import json
import os

import openai
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AleaAI API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/extract-market")
async def extract_market(image: UploadFile = File(...)):
    try:
        image_bytes = await image.read()
        b64 = base64.b64encode(image_bytes).decode("utf-8")
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "Extract only what is visible in the image. Return JSON with exactly these keys: player, market, line, side, price_cents. Do not guess or invent values. market should be one of: points, rebounds, assists, threes."
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{image.content_type};base64,{b64}"
                            }
                        },
                        {
                            "type": "text",
                            "text": "Extract the market details from this Kalshi screenshot."
                        }
                    ]
                }
            ],
            response_format={"type": "json_object"},
            max_tokens=200
        )
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail=f"Extraction failed: {str(e)}")
