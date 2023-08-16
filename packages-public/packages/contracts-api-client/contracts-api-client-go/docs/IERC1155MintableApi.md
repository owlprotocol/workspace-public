# \IERC1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC1155MintableMint**](IERC1155MintableApi.md#InterfacesIERC1155MintableMint) | **Post** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
[**InterfacesIERC1155MintableMintBatch**](IERC1155MintableApi.md#InterfacesIERC1155MintableMintBatch) | **Post** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch



## InterfacesIERC1155MintableMint

> InterfacesIERC1155MintableMint200Response InterfacesIERC1155MintableMint(ctx, networkId, address).InterfacesIERC1155MintableMintRequest(interfacesIERC1155MintableMintRequest).Execute()

IERC1155Mintable.mint



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
    interfacesIERC1155MintableMintRequest := *openapiclient.NewInterfacesIERC1155MintableMintRequest(*openapiclient.NewInterfacesIERC1155MintableMintRequestContractParams()) // InterfacesIERC1155MintableMintRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MintableApi.InterfacesIERC1155MintableMint(context.Background(), networkId, address).InterfacesIERC1155MintableMintRequest(interfacesIERC1155MintableMintRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MintableApi.InterfacesIERC1155MintableMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MintableMint`: InterfacesIERC1155MintableMint200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MintableApi.InterfacesIERC1155MintableMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MintableMintRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md) |  | 

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MintableMintBatch

> InterfacesIERC1155MintableMintBatch200Response InterfacesIERC1155MintableMintBatch(ctx, networkId, address).InterfacesIERC1155MintableMintBatchRequest(interfacesIERC1155MintableMintBatchRequest).Execute()

IERC1155Mintable.mintBatch



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
    interfacesIERC1155MintableMintBatchRequest := *openapiclient.NewInterfacesIERC1155MintableMintBatchRequest(*openapiclient.NewInterfacesIERC1155MintableMintBatchRequestContractParams()) // InterfacesIERC1155MintableMintBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MintableApi.InterfacesIERC1155MintableMintBatch(context.Background(), networkId, address).InterfacesIERC1155MintableMintBatchRequest(interfacesIERC1155MintableMintBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MintableApi.InterfacesIERC1155MintableMintBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MintableMintBatch`: InterfacesIERC1155MintableMintBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MintableApi.InterfacesIERC1155MintableMintBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MintableMintBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

