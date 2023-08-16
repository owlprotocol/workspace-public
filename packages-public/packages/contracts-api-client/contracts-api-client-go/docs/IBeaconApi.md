# \IBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIBeaconImplementation**](IBeaconApi.md#InterfacesIBeaconImplementation) | **Post** /{networkId}/interface/IBeacon/read/{address}/implementation | IBeacon.implementation



## InterfacesIBeaconImplementation

> InterfacesIBeaconImplementation200Response InterfacesIBeaconImplementation(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IBeacon.implementation



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
    resp, r, err := apiClient.IBeaconApi.InterfacesIBeaconImplementation(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IBeaconApi.InterfacesIBeaconImplementation``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIBeaconImplementation`: InterfacesIBeaconImplementation200Response
    fmt.Fprintf(os.Stdout, "Response from `IBeaconApi.InterfacesIBeaconImplementation`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIBeaconImplementationRequest struct via the builder pattern


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

