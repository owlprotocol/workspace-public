# \ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesITokenDnaGetDna**](ITokenDnaApi.md#InterfacesITokenDnaGetDna) | **Post** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
[**InterfacesITokenDnaGetDnaBatch**](ITokenDnaApi.md#InterfacesITokenDnaGetDnaBatch) | **Post** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
[**InterfacesITokenDnaSetDna**](ITokenDnaApi.md#InterfacesITokenDnaSetDna) | **Post** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
[**InterfacesITokenDnaSetDnaBatch**](ITokenDnaApi.md#InterfacesITokenDnaSetDnaBatch) | **Post** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch



## InterfacesITokenDnaGetDna

> InterfacesITokenDnaGetDna200Response InterfacesITokenDnaGetDna(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

ITokenDna.getDna



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
    interfacesIERC721GetApprovedRequest := *openapiclient.NewInterfacesIERC721GetApprovedRequest(*openapiclient.NewInterfacesIERC721GetApprovedRequestContractParams()) // InterfacesIERC721GetApprovedRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenDnaApi.InterfacesITokenDnaGetDna(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenDnaApi.InterfacesITokenDnaGetDna``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenDnaGetDna`: InterfacesITokenDnaGetDna200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenDnaApi.InterfacesITokenDnaGetDna`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenDnaGetDnaRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesITokenDnaGetDnaBatch

> InterfacesITokenDnaGetDnaBatch200Response InterfacesITokenDnaGetDnaBatch(ctx, networkId, address).InterfacesITokenDnaGetDnaBatchRequest(interfacesITokenDnaGetDnaBatchRequest).Execute()

ITokenDna.getDnaBatch



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
    interfacesITokenDnaGetDnaBatchRequest := *openapiclient.NewInterfacesITokenDnaGetDnaBatchRequest(*openapiclient.NewInterfacesITokenDnaGetDnaBatchRequestContractParams()) // InterfacesITokenDnaGetDnaBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenDnaApi.InterfacesITokenDnaGetDnaBatch(context.Background(), networkId, address).InterfacesITokenDnaGetDnaBatchRequest(interfacesITokenDnaGetDnaBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenDnaApi.InterfacesITokenDnaGetDnaBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenDnaGetDnaBatch`: InterfacesITokenDnaGetDnaBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenDnaApi.InterfacesITokenDnaGetDnaBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenDnaGetDnaBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md) |  | 

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesITokenDnaSetDna

> InterfacesITokenDnaSetDna200Response InterfacesITokenDnaSetDna(ctx, networkId, address).InterfacesITokenDnaSetDnaRequest(interfacesITokenDnaSetDnaRequest).Execute()

ITokenDna.setDna



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
    interfacesITokenDnaSetDnaRequest := *openapiclient.NewInterfacesITokenDnaSetDnaRequest(*openapiclient.NewInterfacesITokenDnaSetDnaRequestContractParams()) // InterfacesITokenDnaSetDnaRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenDnaApi.InterfacesITokenDnaSetDna(context.Background(), networkId, address).InterfacesITokenDnaSetDnaRequest(interfacesITokenDnaSetDnaRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenDnaApi.InterfacesITokenDnaSetDna``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenDnaSetDna`: InterfacesITokenDnaSetDna200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenDnaApi.InterfacesITokenDnaSetDna`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenDnaSetDnaRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md) |  | 

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesITokenDnaSetDnaBatch

> InterfacesITokenDnaSetDnaBatch200Response InterfacesITokenDnaSetDnaBatch(ctx, networkId, address).InterfacesITokenDnaSetDnaBatchRequest(interfacesITokenDnaSetDnaBatchRequest).Execute()

ITokenDna.setDnaBatch



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
    interfacesITokenDnaSetDnaBatchRequest := *openapiclient.NewInterfacesITokenDnaSetDnaBatchRequest(*openapiclient.NewInterfacesITokenDnaSetDnaBatchRequestContractParams()) // InterfacesITokenDnaSetDnaBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ITokenDnaApi.InterfacesITokenDnaSetDnaBatch(context.Background(), networkId, address).InterfacesITokenDnaSetDnaBatchRequest(interfacesITokenDnaSetDnaBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenDnaApi.InterfacesITokenDnaSetDnaBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenDnaSetDnaBatch`: InterfacesITokenDnaSetDnaBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenDnaApi.InterfacesITokenDnaSetDnaBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenDnaSetDnaBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md) |  | 

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

