from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

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
    return {
        "player": "Karl-Anthony Towns",
        "market": "points",
        "line": 20,
        "side": "yes",
        "price_cents": 68,
        "confidence": 0.91
    }
