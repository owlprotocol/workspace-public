# \IERC721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC721MintableAutoIdMint**](IERC721MintableAutoIdApi.md#InterfacesIERC721MintableAutoIdMint) | **Post** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
[**InterfacesIERC721MintableAutoIdMintBatch**](IERC721MintableAutoIdApi.md#InterfacesIERC721MintableAutoIdMintBatch) | **Post** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
[**InterfacesIERC721MintableAutoIdSafeMint**](IERC721MintableAutoIdApi.md#InterfacesIERC721MintableAutoIdSafeMint) | **Post** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
[**InterfacesIERC721MintableAutoIdSafeMintBatch**](IERC721MintableAutoIdApi.md#InterfacesIERC721MintableAutoIdSafeMintBatch) | **Post** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch



## InterfacesIERC721MintableAutoIdMint

> InterfacesIERC721MintableAutoIdMint200Response InterfacesIERC721MintableAutoIdMint(ctx, networkId, address).InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest).Execute()

IERC721MintableAutoId.mint



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
    interfacesIERC721MintableAutoIdMintRequest := *openapiclient.NewInterfacesIERC721MintableAutoIdMintRequest(*openapiclient.NewInterfacesIERC721MintableAutoIdMintRequestContractParams()) // InterfacesIERC721MintableAutoIdMintRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMint(context.Background(), networkId, address).InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableAutoIdMint`: InterfacesIERC721MintableAutoIdMint200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableAutoIdMintRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableAutoIdMintBatch

> InterfacesIERC721MintableAutoIdMintBatch200Response InterfacesIERC721MintableAutoIdMintBatch(ctx, networkId, address).InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest).Execute()

IERC721MintableAutoId.mintBatch



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
    interfacesIERC721MintableAutoIdMintBatchRequest := *openapiclient.NewInterfacesIERC721MintableAutoIdMintBatchRequest(*openapiclient.NewInterfacesIERC721MintableAutoIdMintBatchRequestContractParams()) // InterfacesIERC721MintableAutoIdMintBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintBatch(context.Background(), networkId, address).InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableAutoIdMintBatch`: InterfacesIERC721MintableAutoIdMintBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableAutoIdMintBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableAutoIdSafeMint

> InterfacesIERC721MintableAutoIdMint200Response InterfacesIERC721MintableAutoIdSafeMint(ctx, networkId, address).InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest).Execute()

IERC721MintableAutoId.safeMint



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
    interfacesIERC721MintableAutoIdMintRequest := *openapiclient.NewInterfacesIERC721MintableAutoIdMintRequest(*openapiclient.NewInterfacesIERC721MintableAutoIdMintRequestContractParams()) // InterfacesIERC721MintableAutoIdMintRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMint(context.Background(), networkId, address).InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableAutoIdSafeMint`: InterfacesIERC721MintableAutoIdMint200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableAutoIdSafeMintRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableAutoIdSafeMintBatch

> InterfacesIERC721MintableAutoIdMintBatch200Response InterfacesIERC721MintableAutoIdSafeMintBatch(ctx, networkId, address).InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest).Execute()

IERC721MintableAutoId.safeMintBatch



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
    interfacesIERC721MintableAutoIdMintBatchRequest := *openapiclient.NewInterfacesIERC721MintableAutoIdMintBatchRequest(*openapiclient.NewInterfacesIERC721MintableAutoIdMintBatchRequestContractParams()) // InterfacesIERC721MintableAutoIdMintBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintBatch(context.Background(), networkId, address).InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableAutoIdSafeMintBatch`: InterfacesIERC721MintableAutoIdMintBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableAutoIdSafeMintBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

