from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Add origins to allow requests
origins = [
    "http://localhost",
    "http://localhost:3000"
]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Default request body
default_service = [
    { 
        "name": "Simple Status",
        "url": "http://localhost:8000/healthz",
        "category": "API",
        "description": "A simple status page."
    }
]


# The base class for a service
class Service(BaseModel):
    name: str
    url: str
    category: str
    description: str = Optional[None]


# The derived class for a service and its status
class ServiceStatus(Service):
    status: int


# Get the status for services
@app.post("/status")
def status(services: List[Service] = default_service):
    try:
        services_statuses = []
        for s in services:
            print("INFO      Requested service:", s)
            r = requests.get(s.url)
            service_status = ServiceStatus(
                name=s.name,
                url=s.url,
                category=s.category,
                description=s.description,
                status=r.status_code
            )
            print("INFO      Service info:", service_status)
            services_statuses.append(service_status)
        return {"Services": services_statuses}

    except Exception as e:
        print(e)


# Health check
@app.get("/healthz")
def healthz():
    return {"Status": "OK"}
