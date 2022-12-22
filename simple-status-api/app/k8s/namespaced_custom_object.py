import kubernetes.client
from kubernetes.client.rest import ApiException
from pprint import pprint

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
