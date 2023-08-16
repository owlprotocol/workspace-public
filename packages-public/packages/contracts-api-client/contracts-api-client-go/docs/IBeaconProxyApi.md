# \IBeaconProxyApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIBeaconProxyBeacon**](IBeaconProxyApi.md#InterfacesIBeaconProxyBeacon) | **Post** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
[**InterfacesIBeaconProxySetBeacon**](IBeaconProxyApi.md#InterfacesIBeaconProxySetBeacon) | **Post** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon



## InterfacesIBeaconProxyBeacon

> InterfacesIBeaconImplementation200Response InterfacesIBeaconProxyBeacon(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IBeaconProxy.beacon



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
    resp, r, err := apiClient.IBeaconProxyApi.InterfacesIBeaconProxyBeacon(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IBeaconProxyApi.InterfacesIBeaconProxyBeacon``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIBeaconProxyBeacon`: InterfacesIBeaconImplementation200Response
    fmt.Fprintf(os.Stdout, "Response from `IBeaconProxyApi.InterfacesIBeaconProxyBeacon`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIBeaconProxyBeaconRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIBeaconImplementation200Response**](InterfacesIBeaconImplementation200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIBeaconProxySetBeacon

> InterfacesIBeaconProxySetBeacon200Response InterfacesIBeaconProxySetBeacon(ctx, networkId, address).InterfacesIBeaconProxySetBeaconRequest(interfacesIBeaconProxySetBeaconRequest).Execute()

IBeaconProxy.setBeacon



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
    interfacesIBeaconProxySetBeaconRequest := *openapiclient.NewInterfacesIBeaconProxySetBeaconRequest(*openapiclient.NewInterfacesIBeaconProxySetBeaconRequestContractParams()) // InterfacesIBeaconProxySetBeaconRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IBeaconProxyApi.InterfacesIBeaconProxySetBeacon(context.Background(), networkId, address).InterfacesIBeaconProxySetBeaconRequest(interfacesIBeaconProxySetBeaconRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IBeaconProxyApi.InterfacesIBeaconProxySetBeacon``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIBeaconProxySetBeacon`: InterfacesIBeaconProxySetBeacon200Response
    fmt.Fprintf(os.Stdout, "Response from `IBeaconProxyApi.InterfacesIBeaconProxySetBeacon`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIBeaconProxySetBeaconRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconProxySetBeaconRequest** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md) |  | 

### Return type

[**InterfacesIBeaconProxySetBeacon200Response**](InterfacesIBeaconProxySetBeacon200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

