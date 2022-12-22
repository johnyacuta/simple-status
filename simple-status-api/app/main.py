from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from .config import settings, default_service
import requests
import kubernetes.client
from kubernetes.client.rest import ApiException
from pprint import pprint

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
        # Call the K8s API to get requested services
        return get_namespaced_custom_object()
    except:
        # Otherwise use the default service which is self
        return [
                {
                    "name": default_service.name,
                    "url": default_service.url,
                    "category": default_service.category,
                    "description": default_service.description
                }
            ]


# TODO: Place this in a location like app/internal/get_namespaced_custom_object.py
def get_namespaced_custom_object():
    configuration = kubernetes.client.Configuration()
    # Configure API key authorization: BearerToken
    configuration.api_key['authorization'] = 'YOUR_API_KEY'
    # Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
    # configuration.api_key_prefix['authorization'] = 'Bearer'

    # Defining host is optional and default to http://localhost
    configuration.host = "http://localhost"

    # Enter a context with an instance of the API kubernetes.client
    with kubernetes.client.ApiClient(configuration) as api_client:
        # Create an instance of the API class
        api_instance = kubernetes.client.CustomObjectsApi(api_client)
        group = 'group_example' # str | the custom resource's group
        version = 'version_example' # str | the custom resource's version
        namespace = 'namespace_example' # str | The custom resource's namespace
        plural = 'plural_example' # str | the custom resource's plural name. For TPRs this would be lowercase plural kind.
        name = 'name_example' # str | the custom object's name

    try:
        api_response = api_instance.get_namespaced_custom_object(group, version, namespace, plural, name)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling CustomObjectsApi->get_namespaced_custom_object: %s\n" % e)


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
            print("INFO      Service response:", service_status)
            services_statuses.append(service_status)
        return {"Services": services_statuses}

    except:
        raise HTTPException(status_code=404, message="A service or services not found")


# TODO: Place this in a location like app/routers/healthz.py
# Health check
@app.get("/healthz")
def healthz():
    return {"Status": "OK"}
