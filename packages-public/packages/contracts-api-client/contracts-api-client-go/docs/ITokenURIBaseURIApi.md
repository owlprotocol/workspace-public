# \ITokenURIBaseURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesITokenURIBaseURIBaseURI**](ITokenURIBaseURIApi.md#InterfacesITokenURIBaseURIBaseURI) | **Post** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI
[**InterfacesITokenURIBaseURISetTokenURIBaseURI**](ITokenURIBaseURIApi.md#InterfacesITokenURIBaseURISetTokenURIBaseURI) | **Post** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI



## InterfacesITokenURIBaseURIBaseURI

> InterfacesIContractURIContractURI200Response InterfacesITokenURIBaseURIBaseURI(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

ITokenURIBaseURI.baseURI



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
    interfacesIBeaconImplementationRequest := *openapiclient.NewInterfacesIBeaconImplementationRequest(map[string]interface{}(123)) // InterfacesIBeaconImplementationRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenURIBaseURIBaseURI`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenURIBaseURIBaseURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesITokenURIBaseURISetTokenURIBaseURI

> InterfacesIContractURISetContractURI200Response InterfacesITokenURIBaseURISetTokenURIBaseURI(ctx, networkId, address).InterfacesIContractURISetContractURIRequest(interfacesIContractURISetContractURIRequest).Execute()

ITokenURIBaseURI.setTokenURIBaseURI



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
    interfacesIContractURISetContractURIRequest := *openapiclient.NewInterfacesIContractURISetContractURIRequest(*openapiclient.NewInterfacesIContractURISetContractURIRequestContractParams()) // InterfacesIContractURISetContractURIRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI(context.Background(), networkId, address).InterfacesIContractURISetContractURIRequest(interfacesIContractURISetContractURIRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenURIBaseURISetTokenURIBaseURI`: InterfacesIContractURISetContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenURIBaseURISetTokenURIBaseURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  | 

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

