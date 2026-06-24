from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.market import router as market_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market_router)


@app.get("/")
async def root():
    return {"message": "AleaAI API is running"}


@app.get("/health")
async def health():
    return {"status": "ok"}
