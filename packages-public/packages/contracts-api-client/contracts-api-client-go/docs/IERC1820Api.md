# \IERC1820Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC1820GetInterfaceImplementer**](IERC1820Api.md#InterfacesIERC1820GetInterfaceImplementer) | **Post** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer
[**InterfacesIERC1820GetManager**](IERC1820Api.md#InterfacesIERC1820GetManager) | **Post** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager
[**InterfacesIERC1820ImplementsERC165Interface**](IERC1820Api.md#InterfacesIERC1820ImplementsERC165Interface) | **Post** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface
[**InterfacesIERC1820ImplementsERC165InterfaceNoCache**](IERC1820Api.md#InterfacesIERC1820ImplementsERC165InterfaceNoCache) | **Post** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache
[**InterfacesIERC1820InterfaceHash**](IERC1820Api.md#InterfacesIERC1820InterfaceHash) | **Post** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash
[**InterfacesIERC1820SetInterfaceImplementer**](IERC1820Api.md#InterfacesIERC1820SetInterfaceImplementer) | **Post** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer
[**InterfacesIERC1820SetManager**](IERC1820Api.md#InterfacesIERC1820SetManager) | **Post** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager
[**InterfacesIERC1820UpdateERC165Cache**](IERC1820Api.md#InterfacesIERC1820UpdateERC165Cache) | **Post** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache



## InterfacesIERC1820GetInterfaceImplementer

> InterfacesIERC1820GetInterfaceImplementer200Response InterfacesIERC1820GetInterfaceImplementer(ctx, networkId, address).InterfacesIERC1820GetInterfaceImplementerRequest(interfacesIERC1820GetInterfaceImplementerRequest).Execute()

IERC1820.getInterfaceImplementer



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820GetInterfaceImplementerRequest := *openapiclient.NewInterfacesIERC1820GetInterfaceImplementerRequest(*openapiclient.NewInterfacesIERC1820GetInterfaceImplementerRequestContractParams()) // InterfacesIERC1820GetInterfaceImplementerRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820GetInterfaceImplementer(context.Background(), networkId, address).InterfacesIERC1820GetInterfaceImplementerRequest(interfacesIERC1820GetInterfaceImplementerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820GetInterfaceImplementer``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820GetInterfaceImplementer`: InterfacesIERC1820GetInterfaceImplementer200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820GetInterfaceImplementer`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820GetInterfaceImplementerRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820GetInterfaceImplementerRequest** | [**InterfacesIERC1820GetInterfaceImplementerRequest**](InterfacesIERC1820GetInterfaceImplementerRequest.md) |  | 

### Return type

[**InterfacesIERC1820GetInterfaceImplementer200Response**](InterfacesIERC1820GetInterfaceImplementer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820GetManager

> InterfacesIERC1820GetManager200Response InterfacesIERC1820GetManager(ctx, networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()

IERC1820.getManager



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820GetManagerRequest := *openapiclient.NewInterfacesIERC1820GetManagerRequest(*openapiclient.NewInterfacesIERC1820GetManagerRequestContractParams()) // InterfacesIERC1820GetManagerRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820GetManager(context.Background(), networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820GetManager``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820GetManager`: InterfacesIERC1820GetManager200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820GetManager`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820GetManagerRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md) |  | 

### Return type

[**InterfacesIERC1820GetManager200Response**](InterfacesIERC1820GetManager200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820ImplementsERC165Interface

> InterfacesIERC1820ImplementsERC165Interface200Response InterfacesIERC1820ImplementsERC165Interface(ctx, networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()

IERC1820.implementsERC165Interface



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820ImplementsERC165InterfaceRequest := *openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequest(*openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams()) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820ImplementsERC165Interface(context.Background(), networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820ImplementsERC165Interface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820ImplementsERC165Interface`: InterfacesIERC1820ImplementsERC165Interface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820ImplementsERC165Interface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820ImplementsERC165InterfaceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820ImplementsERC165InterfaceNoCache

> InterfacesIERC1820ImplementsERC165Interface200Response InterfacesIERC1820ImplementsERC165InterfaceNoCache(ctx, networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()

IERC1820.implementsERC165InterfaceNoCache



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820ImplementsERC165InterfaceRequest := *openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequest(*openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams()) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceNoCache(context.Background(), networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceNoCache``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820ImplementsERC165InterfaceNoCache`: InterfacesIERC1820ImplementsERC165Interface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceNoCache`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820ImplementsERC165InterfaceNoCacheRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820InterfaceHash

> InterfacesIERC1820InterfaceHash200Response InterfacesIERC1820InterfaceHash(ctx, networkId, address).InterfacesIERC1820InterfaceHashRequest(interfacesIERC1820InterfaceHashRequest).Execute()

IERC1820.interfaceHash



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820InterfaceHashRequest := *openapiclient.NewInterfacesIERC1820InterfaceHashRequest(*openapiclient.NewInterfacesIERC1820InterfaceHashRequestContractParams()) // InterfacesIERC1820InterfaceHashRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820InterfaceHash(context.Background(), networkId, address).InterfacesIERC1820InterfaceHashRequest(interfacesIERC1820InterfaceHashRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820InterfaceHash``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820InterfaceHash`: InterfacesIERC1820InterfaceHash200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820InterfaceHash`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820InterfaceHashRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820InterfaceHashRequest** | [**InterfacesIERC1820InterfaceHashRequest**](InterfacesIERC1820InterfaceHashRequest.md) |  | 

### Return type

[**InterfacesIERC1820InterfaceHash200Response**](InterfacesIERC1820InterfaceHash200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820SetInterfaceImplementer

> InterfacesIERC1820SetInterfaceImplementer200Response InterfacesIERC1820SetInterfaceImplementer(ctx, networkId, address).InterfacesIERC1820SetInterfaceImplementerRequest(interfacesIERC1820SetInterfaceImplementerRequest).Execute()

IERC1820.setInterfaceImplementer



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820SetInterfaceImplementerRequest := *openapiclient.NewInterfacesIERC1820SetInterfaceImplementerRequest(*openapiclient.NewInterfacesIERC1820SetInterfaceImplementerRequestContractParams()) // InterfacesIERC1820SetInterfaceImplementerRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820SetInterfaceImplementer(context.Background(), networkId, address).InterfacesIERC1820SetInterfaceImplementerRequest(interfacesIERC1820SetInterfaceImplementerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820SetInterfaceImplementer``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820SetInterfaceImplementer`: InterfacesIERC1820SetInterfaceImplementer200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820SetInterfaceImplementer`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820SetInterfaceImplementerRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820SetInterfaceImplementerRequest** | [**InterfacesIERC1820SetInterfaceImplementerRequest**](InterfacesIERC1820SetInterfaceImplementerRequest.md) |  | 

### Return type

[**InterfacesIERC1820SetInterfaceImplementer200Response**](InterfacesIERC1820SetInterfaceImplementer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820SetManager

> InterfacesIERC1820SetManager200Response InterfacesIERC1820SetManager(ctx, networkId, address).InterfacesIERC1820SetManagerRequest(interfacesIERC1820SetManagerRequest).Execute()

IERC1820.setManager



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820SetManagerRequest := *openapiclient.NewInterfacesIERC1820SetManagerRequest(*openapiclient.NewInterfacesIERC1820SetManagerRequestContractParams()) // InterfacesIERC1820SetManagerRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820SetManager(context.Background(), networkId, address).InterfacesIERC1820SetManagerRequest(interfacesIERC1820SetManagerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820SetManager``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820SetManager`: InterfacesIERC1820SetManager200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820SetManager`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820SetManagerRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820SetManagerRequest** | [**InterfacesIERC1820SetManagerRequest**](InterfacesIERC1820SetManagerRequest.md) |  | 

### Return type

[**InterfacesIERC1820SetManager200Response**](InterfacesIERC1820SetManager200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1820UpdateERC165Cache

> InterfacesIERC1820UpdateERC165Cache200Response InterfacesIERC1820UpdateERC165Cache(ctx, networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()

IERC1820.updateERC165Cache



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    address := "address_example" // string | An ethereum address
    interfacesIERC1820ImplementsERC165InterfaceRequest := *openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequest(*openapiclient.NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams()) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1820Api.InterfacesIERC1820UpdateERC165Cache(context.Background(), networkId, address).InterfacesIERC1820ImplementsERC165InterfaceRequest(interfacesIERC1820ImplementsERC165InterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1820Api.InterfacesIERC1820UpdateERC165Cache``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1820UpdateERC165Cache`: InterfacesIERC1820UpdateERC165Cache200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1820Api.InterfacesIERC1820UpdateERC165Cache`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1820UpdateERC165CacheRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820UpdateERC165Cache200Response**](InterfacesIERC1820UpdateERC165Cache200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

