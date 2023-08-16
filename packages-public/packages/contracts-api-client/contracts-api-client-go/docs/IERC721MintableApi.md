# \IERC721MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC721MintableMint**](IERC721MintableApi.md#InterfacesIERC721MintableMint) | **Post** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
[**InterfacesIERC721MintableMintBatch**](IERC721MintableApi.md#InterfacesIERC721MintableMintBatch) | **Post** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
[**InterfacesIERC721MintableSafeMint**](IERC721MintableApi.md#InterfacesIERC721MintableSafeMint) | **Post** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
[**InterfacesIERC721MintableSafeMintBatch**](IERC721MintableApi.md#InterfacesIERC721MintableSafeMintBatch) | **Post** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch



## InterfacesIERC721MintableMint

> InterfacesIERC721Approve200Response InterfacesIERC721MintableMint(ctx, networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()

IERC721Mintable.mint



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
    interfacesIERC721ApproveRequest := *openapiclient.NewInterfacesIERC721ApproveRequest(*openapiclient.NewInterfacesIERC721ApproveRequestContractParams()) // InterfacesIERC721ApproveRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableApi.InterfacesIERC721MintableMint(context.Background(), networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableApi.InterfacesIERC721MintableMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableMint`: InterfacesIERC721Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableApi.InterfacesIERC721MintableMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableMintRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md) |  | 

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableMintBatch

> InterfacesIERC721MintableMintBatch200Response InterfacesIERC721MintableMintBatch(ctx, networkId, address).InterfacesIERC721MintableMintBatchRequest(interfacesIERC721MintableMintBatchRequest).Execute()

IERC721Mintable.mintBatch



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
    interfacesIERC721MintableMintBatchRequest := *openapiclient.NewInterfacesIERC721MintableMintBatchRequest(*openapiclient.NewInterfacesIERC721MintableMintBatchRequestContractParams()) // InterfacesIERC721MintableMintBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableApi.InterfacesIERC721MintableMintBatch(context.Background(), networkId, address).InterfacesIERC721MintableMintBatchRequest(interfacesIERC721MintableMintBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableApi.InterfacesIERC721MintableMintBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableMintBatch`: InterfacesIERC721MintableMintBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableApi.InterfacesIERC721MintableMintBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableMintBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableSafeMint

> InterfacesIERC721Approve200Response InterfacesIERC721MintableSafeMint(ctx, networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()

IERC721Mintable.safeMint



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
    interfacesIERC721ApproveRequest := *openapiclient.NewInterfacesIERC721ApproveRequest(*openapiclient.NewInterfacesIERC721ApproveRequestContractParams()) // InterfacesIERC721ApproveRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableApi.InterfacesIERC721MintableSafeMint(context.Background(), networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableApi.InterfacesIERC721MintableSafeMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableSafeMint`: InterfacesIERC721Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableApi.InterfacesIERC721MintableSafeMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableSafeMintRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md) |  | 

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MintableSafeMintBatch

> InterfacesIERC721MintableMintBatch200Response InterfacesIERC721MintableSafeMintBatch(ctx, networkId, address).InterfacesIERC721MintableMintBatchRequest(interfacesIERC721MintableMintBatchRequest).Execute()

IERC721Mintable.safeMintBatch



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
    interfacesIERC721MintableMintBatchRequest := *openapiclient.NewInterfacesIERC721MintableMintBatchRequest(*openapiclient.NewInterfacesIERC721MintableMintBatchRequestContractParams()) // InterfacesIERC721MintableMintBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721MintableApi.InterfacesIERC721MintableSafeMintBatch(context.Background(), networkId, address).InterfacesIERC721MintableMintBatchRequest(interfacesIERC721MintableMintBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MintableApi.InterfacesIERC721MintableSafeMintBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MintableSafeMintBatch`: InterfacesIERC721MintableMintBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MintableApi.InterfacesIERC721MintableSafeMintBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MintableSafeMintBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

