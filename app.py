from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/")
def root():
    return {"msg": "Hello from FastAPI on Vercel"}
