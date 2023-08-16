# \IERC1155MetadataURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC1155MetadataURIBalanceOf**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURIBalanceOf) | **Post** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
[**InterfacesIERC1155MetadataURIBalanceOfBatch**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURIBalanceOfBatch) | **Post** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
[**InterfacesIERC1155MetadataURIIsApprovedForAll**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURIIsApprovedForAll) | **Post** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll
[**InterfacesIERC1155MetadataURISafeBatchTransferFrom**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURISafeBatchTransferFrom) | **Post** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
[**InterfacesIERC1155MetadataURISafeTransferFrom**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURISafeTransferFrom) | **Post** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
[**InterfacesIERC1155MetadataURISetApprovalForAll**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURISetApprovalForAll) | **Post** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
[**InterfacesIERC1155MetadataURISupportsInterface**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURISupportsInterface) | **Post** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
[**InterfacesIERC1155MetadataURIUri**](IERC1155MetadataURIApi.md#InterfacesIERC1155MetadataURIUri) | **Post** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri



## InterfacesIERC1155MetadataURIBalanceOf

> InterfacesIERC1155BalanceOf200Response InterfacesIERC1155MetadataURIBalanceOf(ctx, networkId, address).InterfacesIERC1155BalanceOfRequest(interfacesIERC1155BalanceOfRequest).Execute()

IERC1155MetadataURI.balanceOf



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
    interfacesIERC1155BalanceOfRequest := *openapiclient.NewInterfacesIERC1155BalanceOfRequest(*openapiclient.NewInterfacesIERC1155BalanceOfRequestContractParams()) // InterfacesIERC1155BalanceOfRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOf(context.Background(), networkId, address).InterfacesIERC1155BalanceOfRequest(interfacesIERC1155BalanceOfRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURIBalanceOf`: InterfacesIERC1155BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURIBalanceOfRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md) |  | 

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURIBalanceOfBatch

> InterfacesIERC1155BalanceOfBatch200Response InterfacesIERC1155MetadataURIBalanceOfBatch(ctx, networkId, address).InterfacesIERC1155BalanceOfBatchRequest(interfacesIERC1155BalanceOfBatchRequest).Execute()

IERC1155MetadataURI.balanceOfBatch



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
    interfacesIERC1155BalanceOfBatchRequest := *openapiclient.NewInterfacesIERC1155BalanceOfBatchRequest(*openapiclient.NewInterfacesIERC1155BalanceOfBatchRequestContractParams()) // InterfacesIERC1155BalanceOfBatchRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOfBatch(context.Background(), networkId, address).InterfacesIERC1155BalanceOfBatchRequest(interfacesIERC1155BalanceOfBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOfBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURIBalanceOfBatch`: InterfacesIERC1155BalanceOfBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOfBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURIBalanceOfBatchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md) |  | 

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURIIsApprovedForAll

> InterfacesIERC1155IsApprovedForAll200Response InterfacesIERC1155MetadataURIIsApprovedForAll(ctx, networkId, address).InterfacesIERC1155IsApprovedForAllRequest(interfacesIERC1155IsApprovedForAllRequest).Execute()

IERC1155MetadataURI.isApprovedForAll



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
    interfacesIERC1155IsApprovedForAllRequest := *openapiclient.NewInterfacesIERC1155IsApprovedForAllRequest(*openapiclient.NewInterfacesIERC1155IsApprovedForAllRequestContractParams()) // InterfacesIERC1155IsApprovedForAllRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIIsApprovedForAll(context.Background(), networkId, address).InterfacesIERC1155IsApprovedForAllRequest(interfacesIERC1155IsApprovedForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIIsApprovedForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURIIsApprovedForAll`: InterfacesIERC1155IsApprovedForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIIsApprovedForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURIIsApprovedForAllRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md) |  | 

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURISafeBatchTransferFrom

> InterfacesIERC1155SafeBatchTransferFrom200Response InterfacesIERC1155MetadataURISafeBatchTransferFrom(ctx, networkId, address).InterfacesIERC1155SafeBatchTransferFromRequest(interfacesIERC1155SafeBatchTransferFromRequest).Execute()

IERC1155MetadataURI.safeBatchTransferFrom



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
    interfacesIERC1155SafeBatchTransferFromRequest := *openapiclient.NewInterfacesIERC1155SafeBatchTransferFromRequest(*openapiclient.NewInterfacesIERC1155SafeBatchTransferFromRequestContractParams()) // InterfacesIERC1155SafeBatchTransferFromRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeBatchTransferFrom(context.Background(), networkId, address).InterfacesIERC1155SafeBatchTransferFromRequest(interfacesIERC1155SafeBatchTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeBatchTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURISafeBatchTransferFrom`: InterfacesIERC1155SafeBatchTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeBatchTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURISafeBatchTransferFromRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURISafeTransferFrom

> InterfacesIERC1155SafeTransferFrom200Response InterfacesIERC1155MetadataURISafeTransferFrom(ctx, networkId, address).InterfacesIERC1155SafeTransferFromRequest(interfacesIERC1155SafeTransferFromRequest).Execute()

IERC1155MetadataURI.safeTransferFrom



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
    interfacesIERC1155SafeTransferFromRequest := *openapiclient.NewInterfacesIERC1155SafeTransferFromRequest(*openapiclient.NewInterfacesIERC1155SafeTransferFromRequestContractParams()) // InterfacesIERC1155SafeTransferFromRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeTransferFrom(context.Background(), networkId, address).InterfacesIERC1155SafeTransferFromRequest(interfacesIERC1155SafeTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURISafeTransferFrom`: InterfacesIERC1155SafeTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURISafeTransferFromRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURISetApprovalForAll

> InterfacesIERC1155SetApprovalForAll200Response InterfacesIERC1155MetadataURISetApprovalForAll(ctx, networkId, address).InterfacesIERC1155SetApprovalForAllRequest(interfacesIERC1155SetApprovalForAllRequest).Execute()

IERC1155MetadataURI.setApprovalForAll



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
    interfacesIERC1155SetApprovalForAllRequest := *openapiclient.NewInterfacesIERC1155SetApprovalForAllRequest(*openapiclient.NewInterfacesIERC1155SetApprovalForAllRequestContractParams()) // InterfacesIERC1155SetApprovalForAllRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISetApprovalForAll(context.Background(), networkId, address).InterfacesIERC1155SetApprovalForAllRequest(interfacesIERC1155SetApprovalForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISetApprovalForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURISetApprovalForAll`: InterfacesIERC1155SetApprovalForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISetApprovalForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURISetApprovalForAllRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md) |  | 

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURISupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC1155MetadataURISupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC1155MetadataURI.supportsInterface



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
    interfacesIERC165SupportsInterfaceRequest := *openapiclient.NewInterfacesIERC165SupportsInterfaceRequest(*openapiclient.NewInterfacesIERC165SupportsInterfaceRequestContractParams()) // InterfacesIERC165SupportsInterfaceRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURISupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURISupportsInterfaceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC1155MetadataURIUri

> InterfacesIERC1155MetadataURIUri200Response InterfacesIERC1155MetadataURIUri(ctx, networkId, address).InterfacesIERC1155MetadataURIUriRequest(interfacesIERC1155MetadataURIUriRequest).Execute()

IERC1155MetadataURI.uri



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
    interfacesIERC1155MetadataURIUriRequest := *openapiclient.NewInterfacesIERC1155MetadataURIUriRequest(*openapiclient.NewInterfacesIERC1155MetadataURIUriRequestContractParams()) // InterfacesIERC1155MetadataURIUriRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIUri(context.Background(), networkId, address).InterfacesIERC1155MetadataURIUriRequest(interfacesIERC1155MetadataURIUriRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIUri``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155MetadataURIUri`: InterfacesIERC1155MetadataURIUri200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIUri`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155MetadataURIUriRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1155MetadataURIUriRequest** | [**InterfacesIERC1155MetadataURIUriRequest**](InterfacesIERC1155MetadataURIUriRequest.md) |  | 

### Return type

[**InterfacesIERC1155MetadataURIUri200Response**](InterfacesIERC1155MetadataURIUri200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

