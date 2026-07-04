from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "MiniMe backend is running"
    }