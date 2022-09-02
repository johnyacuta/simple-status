from fastapi import FastAPI

app = FastAPI()


@app.get("/healthz")
def healthz():
    return {"Status": "OK"}