# \IERC2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC2981SetterSetDefaultRoyalty**](IERC2981SetterApi.md#InterfacesIERC2981SetterSetDefaultRoyalty) | **Post** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
[**InterfacesIERC2981SetterSetTokenRoyalty**](IERC2981SetterApi.md#InterfacesIERC2981SetterSetTokenRoyalty) | **Post** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty



## InterfacesIERC2981SetterSetDefaultRoyalty

> InterfacesIERC2981SetterSetDefaultRoyalty200Response InterfacesIERC2981SetterSetDefaultRoyalty(ctx, networkId, address).InterfacesIERC2981SetterSetDefaultRoyaltyRequest(interfacesIERC2981SetterSetDefaultRoyaltyRequest).Execute()

IERC2981Setter.setDefaultRoyalty



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
    interfacesIERC2981SetterSetDefaultRoyaltyRequest := *openapiclient.NewInterfacesIERC2981SetterSetDefaultRoyaltyRequest(*openapiclient.NewInterfacesIERC2981SetterSetDefaultRoyaltyRequestContractParams()) // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC2981SetterApi.InterfacesIERC2981SetterSetDefaultRoyalty(context.Background(), networkId, address).InterfacesIERC2981SetterSetDefaultRoyaltyRequest(interfacesIERC2981SetterSetDefaultRoyaltyRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC2981SetterApi.InterfacesIERC2981SetterSetDefaultRoyalty``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC2981SetterSetDefaultRoyalty`: InterfacesIERC2981SetterSetDefaultRoyalty200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC2981SetterApi.InterfacesIERC2981SetterSetDefaultRoyalty`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC2981SetterSetDefaultRoyaltyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md) |  | 

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC2981SetterSetTokenRoyalty

> InterfacesIERC2981SetterSetTokenRoyalty200Response InterfacesIERC2981SetterSetTokenRoyalty(ctx, networkId, address).InterfacesIERC2981SetterSetTokenRoyaltyRequest(interfacesIERC2981SetterSetTokenRoyaltyRequest).Execute()

IERC2981Setter.setTokenRoyalty



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
    interfacesIERC2981SetterSetTokenRoyaltyRequest := *openapiclient.NewInterfacesIERC2981SetterSetTokenRoyaltyRequest(*openapiclient.NewInterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams()) // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC2981SetterApi.InterfacesIERC2981SetterSetTokenRoyalty(context.Background(), networkId, address).InterfacesIERC2981SetterSetTokenRoyaltyRequest(interfacesIERC2981SetterSetTokenRoyaltyRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC2981SetterApi.InterfacesIERC2981SetterSetTokenRoyalty``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC2981SetterSetTokenRoyalty`: InterfacesIERC2981SetterSetTokenRoyalty200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC2981SetterApi.InterfacesIERC2981SetterSetTokenRoyalty`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC2981SetterSetTokenRoyaltyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md) |  | 

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

