# \IERC1155Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC1155BalanceOf**](IERC1155Api.md#InterfacesIERC1155BalanceOf) | **Post** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf
[**InterfacesIERC1155BalanceOfBatch**](IERC1155Api.md#InterfacesIERC1155BalanceOfBatch) | **Post** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch
[**InterfacesIERC1155IsApprovedForAll**](IERC1155Api.md#InterfacesIERC1155IsApprovedForAll) | **Post** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll
[**InterfacesIERC1155SafeBatchTransferFrom**](IERC1155Api.md#InterfacesIERC1155SafeBatchTransferFrom) | **Post** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom
[**InterfacesIERC1155SafeTransferFrom**](IERC1155Api.md#InterfacesIERC1155SafeTransferFrom) | **Post** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom
[**InterfacesIERC1155SetApprovalForAll**](IERC1155Api.md#InterfacesIERC1155SetApprovalForAll) | **Post** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll
[**InterfacesIERC1155SupportsInterface**](IERC1155Api.md#InterfacesIERC1155SupportsInterface) | **Post** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface



## InterfacesIERC1155BalanceOf

> InterfacesIERC1155BalanceOf200Response InterfacesIERC1155BalanceOf(ctx, networkId, address).InterfacesIERC1155BalanceOfRequest(interfacesIERC1155BalanceOfRequest).Execute()

IERC1155.balanceOf



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155BalanceOf(context.Background(), networkId, address).InterfacesIERC1155BalanceOfRequest(interfacesIERC1155BalanceOfRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155BalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155BalanceOf`: InterfacesIERC1155BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155BalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155BalanceOfRequest struct via the builder pattern


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


## InterfacesIERC1155BalanceOfBatch

> InterfacesIERC1155BalanceOfBatch200Response InterfacesIERC1155BalanceOfBatch(ctx, networkId, address).InterfacesIERC1155BalanceOfBatchRequest(interfacesIERC1155BalanceOfBatchRequest).Execute()

IERC1155.balanceOfBatch



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155BalanceOfBatch(context.Background(), networkId, address).InterfacesIERC1155BalanceOfBatchRequest(interfacesIERC1155BalanceOfBatchRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155BalanceOfBatch``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155BalanceOfBatch`: InterfacesIERC1155BalanceOfBatch200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155BalanceOfBatch`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155BalanceOfBatchRequest struct via the builder pattern


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


## InterfacesIERC1155IsApprovedForAll

> InterfacesIERC1155IsApprovedForAll200Response InterfacesIERC1155IsApprovedForAll(ctx, networkId, address).InterfacesIERC1155IsApprovedForAllRequest(interfacesIERC1155IsApprovedForAllRequest).Execute()

IERC1155.isApprovedForAll



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155IsApprovedForAll(context.Background(), networkId, address).InterfacesIERC1155IsApprovedForAllRequest(interfacesIERC1155IsApprovedForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155IsApprovedForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155IsApprovedForAll`: InterfacesIERC1155IsApprovedForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155IsApprovedForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155IsApprovedForAllRequest struct via the builder pattern


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


## InterfacesIERC1155SafeBatchTransferFrom

> InterfacesIERC1155SafeBatchTransferFrom200Response InterfacesIERC1155SafeBatchTransferFrom(ctx, networkId, address).InterfacesIERC1155SafeBatchTransferFromRequest(interfacesIERC1155SafeBatchTransferFromRequest).Execute()

IERC1155.safeBatchTransferFrom



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155SafeBatchTransferFrom(context.Background(), networkId, address).InterfacesIERC1155SafeBatchTransferFromRequest(interfacesIERC1155SafeBatchTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155SafeBatchTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155SafeBatchTransferFrom`: InterfacesIERC1155SafeBatchTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155SafeBatchTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155SafeBatchTransferFromRequest struct via the builder pattern


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


## InterfacesIERC1155SafeTransferFrom

> InterfacesIERC1155SafeTransferFrom200Response InterfacesIERC1155SafeTransferFrom(ctx, networkId, address).InterfacesIERC1155SafeTransferFromRequest(interfacesIERC1155SafeTransferFromRequest).Execute()

IERC1155.safeTransferFrom



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155SafeTransferFrom(context.Background(), networkId, address).InterfacesIERC1155SafeTransferFromRequest(interfacesIERC1155SafeTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155SafeTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155SafeTransferFrom`: InterfacesIERC1155SafeTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155SafeTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155SafeTransferFromRequest struct via the builder pattern


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


## InterfacesIERC1155SetApprovalForAll

> InterfacesIERC1155SetApprovalForAll200Response InterfacesIERC1155SetApprovalForAll(ctx, networkId, address).InterfacesIERC1155SetApprovalForAllRequest(interfacesIERC1155SetApprovalForAllRequest).Execute()

IERC1155.setApprovalForAll



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155SetApprovalForAll(context.Background(), networkId, address).InterfacesIERC1155SetApprovalForAllRequest(interfacesIERC1155SetApprovalForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155SetApprovalForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155SetApprovalForAll`: InterfacesIERC1155SetApprovalForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155SetApprovalForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155SetApprovalForAllRequest struct via the builder pattern


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


## InterfacesIERC1155SupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC1155SupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC1155.supportsInterface



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
    resp, r, err := apiClient.IERC1155Api.InterfacesIERC1155SupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC1155Api.InterfacesIERC1155SupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC1155SupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC1155Api.InterfacesIERC1155SupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC1155SupportsInterfaceRequest struct via the builder pattern


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

