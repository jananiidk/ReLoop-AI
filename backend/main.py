from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.prediction import router as prediction_router
from routes.recommendation import router as recommendation_router
from routes.analyze import router as analyze_router
from routes.device import router as device_router

app = FastAPI(title="ReLoop AI")

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)
app.include_router(recommendation_router)
app.include_router(analyze_router)
app.include_router(device_router)


@app.get("/")
def home():
    return {"message": "ReLoop AI Backend Running"}