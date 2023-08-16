# \IChainlinkAnyApiConsumerApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIChainlinkAnyApiConsumerFulfill**](IChainlinkAnyApiConsumerApi.md#InterfacesIChainlinkAnyApiConsumerFulfill) | **Post** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill



## InterfacesIChainlinkAnyApiConsumerFulfill

> InterfacesIChainlinkAnyApiConsumerFulfill200Response InterfacesIChainlinkAnyApiConsumerFulfill(ctx, networkId, address).InterfacesIChainlinkAnyApiConsumerFulfillRequest(interfacesIChainlinkAnyApiConsumerFulfillRequest).Execute()

IChainlinkAnyApiConsumer.fulfill



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
    interfacesIChainlinkAnyApiConsumerFulfillRequest := *openapiclient.NewInterfacesIChainlinkAnyApiConsumerFulfillRequest(*openapiclient.NewInterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams()) // InterfacesIChainlinkAnyApiConsumerFulfillRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiConsumerApi.InterfacesIChainlinkAnyApiConsumerFulfill(context.Background(), networkId, address).InterfacesIChainlinkAnyApiConsumerFulfillRequest(interfacesIChainlinkAnyApiConsumerFulfillRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiConsumerApi.InterfacesIChainlinkAnyApiConsumerFulfill``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiConsumerFulfill`: InterfacesIChainlinkAnyApiConsumerFulfill200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiConsumerApi.InterfacesIChainlinkAnyApiConsumerFulfill`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiConsumerFulfillRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIChainlinkAnyApiConsumerFulfillRequest** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiConsumerFulfill200Response**](InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

