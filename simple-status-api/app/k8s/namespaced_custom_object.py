from pprint import pprint
from kubernetes import client, config

def get_namespaced_custom_object():
    config.load_kube_config()

    api = client.CustomObjectsApi()

    resource = api.get_namespaced_custom_object(
        group="stable.example.com",
        version="v1",
        name="my-new-cron-object",
        namespace="default",
        plural="crontabs",
    )
    print("Resource details:")
    pprint(resource)
