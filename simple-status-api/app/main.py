from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from .config import settings, default_service
import requests

app = FastAPI()


# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"{settings.UI_ENDPOINT}"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# The base class for a service
class Service(BaseModel):
    name: str
    url: str
    category: str
    description: str = Optional[None]


# The derived class for a service and its status
class ServiceStatus(Service):
    status: int

# TODO: Place this in a location like app/internal/get_services.py
def get_services():
    try:
        # TODO: Call the K8s API to get requested services
        return [
                {
                    "name": "K8s API",
                    "url": "http://localhost:8000/healthz",
                    "category": "API",
                    "description": "A simple status page."
                }
            ]
    except:
        # Otherwise use the default service
        return [
                {
                    "name": default_service.name,
                    "url": default_service.url,
                    "category": default_service.category,
                    "description": default_service.description
                }
            ]


# TODO: Place this in a location like app/routers/status.py
# Get the status for services
@app.get("/status")
def status():
    try:
        services = get_services()

        services_statuses = []
        for s in services:
            print("INFO      Requested service:", s)
            r = requests.get(s["url"])
            service_status = ServiceStatus(
                name=s["name"],
                url=s["url"],
                category=s["category"],
                description=s["description"],
                status=r.status_code
            )
            print("INFO      Service info:", service_status)
            services_statuses.append(service_status)
        return {"Services": services_statuses}

    except:
        raise HTTPException(status_code=404, message="A service or services not found")


# Health check
@app.get("/healthz")
def healthz():
    return {"Status": "OK"}
