from fastapi import FastAPI
from pydantic import BaseModel
from model_runner import analyze_text

app = FastAPI()

class ReviewRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze_review(request: ReviewRequest):
    return analyze_text(request.text)
#    python -m uvicorn app:app --port 8000