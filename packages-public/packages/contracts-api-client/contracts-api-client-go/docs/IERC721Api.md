# \IERC721Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC721Approve**](IERC721Api.md#InterfacesIERC721Approve) | **Post** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
[**InterfacesIERC721BalanceOf**](IERC721Api.md#InterfacesIERC721BalanceOf) | **Post** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
[**InterfacesIERC721GetApproved**](IERC721Api.md#InterfacesIERC721GetApproved) | **Post** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
[**InterfacesIERC721IsApprovedForAll**](IERC721Api.md#InterfacesIERC721IsApprovedForAll) | **Post** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
[**InterfacesIERC721OwnerOf**](IERC721Api.md#InterfacesIERC721OwnerOf) | **Post** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
[**InterfacesIERC721SafeTransferFrom**](IERC721Api.md#InterfacesIERC721SafeTransferFrom) | **Post** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
[**InterfacesIERC721SetApprovalForAll**](IERC721Api.md#InterfacesIERC721SetApprovalForAll) | **Post** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
[**InterfacesIERC721SupportsInterface**](IERC721Api.md#InterfacesIERC721SupportsInterface) | **Post** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
[**InterfacesIERC721TransferFrom**](IERC721Api.md#InterfacesIERC721TransferFrom) | **Post** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom



## InterfacesIERC721Approve

> InterfacesIERC721Approve200Response InterfacesIERC721Approve(ctx, networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()

IERC721.approve



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
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721Approve(context.Background(), networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721Approve``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721Approve`: InterfacesIERC721Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721Approve`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721ApproveRequest struct via the builder pattern


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


## InterfacesIERC721BalanceOf

> InterfacesIERC721BalanceOf200Response InterfacesIERC721BalanceOf(ctx, networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()

IERC721.balanceOf



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
    interfacesIERC721BalanceOfRequest := *openapiclient.NewInterfacesIERC721BalanceOfRequest(*openapiclient.NewInterfacesIERC721BalanceOfRequestContractParams()) // InterfacesIERC721BalanceOfRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721BalanceOf(context.Background(), networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721BalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721BalanceOf`: InterfacesIERC721BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721BalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721BalanceOfRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721BalanceOfRequest** | [**InterfacesIERC721BalanceOfRequest**](InterfacesIERC721BalanceOfRequest.md) |  | 

### Return type

[**InterfacesIERC721BalanceOf200Response**](InterfacesIERC721BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721GetApproved

> InterfacesIERC721GetApproved200Response InterfacesIERC721GetApproved(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721.getApproved



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
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721GetApproved(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721GetApproved``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721GetApproved`: InterfacesIERC721GetApproved200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721GetApproved`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721GetApprovedRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721GetApproved200Response**](InterfacesIERC721GetApproved200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721IsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response InterfacesIERC721IsApprovedForAll(ctx, networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()

IERC721.isApprovedForAll



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
    interfacesIERC721IsApprovedForAllRequest := *openapiclient.NewInterfacesIERC721IsApprovedForAllRequest(*openapiclient.NewInterfacesIERC721IsApprovedForAllRequestContractParams()) // InterfacesIERC721IsApprovedForAllRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721IsApprovedForAll(context.Background(), networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721IsApprovedForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721IsApprovedForAll`: InterfacesIERC721IsApprovedForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721IsApprovedForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721IsApprovedForAllRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721IsApprovedForAllRequest** | [**InterfacesIERC721IsApprovedForAllRequest**](InterfacesIERC721IsApprovedForAllRequest.md) |  | 

### Return type

[**InterfacesIERC721IsApprovedForAll200Response**](InterfacesIERC721IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721OwnerOf

> InterfacesIERC721OwnerOf200Response InterfacesIERC721OwnerOf(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721.ownerOf



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
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721OwnerOf(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721OwnerOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721OwnerOf`: InterfacesIERC721OwnerOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721OwnerOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721OwnerOfRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721OwnerOf200Response**](InterfacesIERC721OwnerOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721SafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response InterfacesIERC721SafeTransferFrom(ctx, networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()

IERC721.safeTransferFrom



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
    interfacesIERC721SafeTransferFromRequest := *openapiclient.NewInterfacesIERC721SafeTransferFromRequest(*openapiclient.NewInterfacesIERC721SafeTransferFromRequestContractParams()) // InterfacesIERC721SafeTransferFromRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721SafeTransferFrom(context.Background(), networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721SafeTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721SafeTransferFrom`: InterfacesIERC721SafeTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721SafeTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721SafeTransferFromRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721SafeTransferFromRequest** | [**InterfacesIERC721SafeTransferFromRequest**](InterfacesIERC721SafeTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC721SafeTransferFrom200Response**](InterfacesIERC721SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721SetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response InterfacesIERC721SetApprovalForAll(ctx, networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()

IERC721.setApprovalForAll



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
    interfacesIERC721SetApprovalForAllRequest := *openapiclient.NewInterfacesIERC721SetApprovalForAllRequest(*openapiclient.NewInterfacesIERC721SetApprovalForAllRequestContractParams()) // InterfacesIERC721SetApprovalForAllRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721SetApprovalForAll(context.Background(), networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721SetApprovalForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721SetApprovalForAll`: InterfacesIERC721SetApprovalForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721SetApprovalForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721SetApprovalForAllRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721SetApprovalForAllRequest** | [**InterfacesIERC721SetApprovalForAllRequest**](InterfacesIERC721SetApprovalForAllRequest.md) |  | 

### Return type

[**InterfacesIERC721SetApprovalForAll200Response**](InterfacesIERC721SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721SupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC721SupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC721.supportsInterface



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
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721SupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721SupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721SupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721SupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721SupportsInterfaceRequest struct via the builder pattern


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


## InterfacesIERC721TransferFrom

> InterfacesIERC721TransferFrom200Response InterfacesIERC721TransferFrom(ctx, networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()

IERC721.transferFrom



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
    interfacesIERC721TransferFromRequest := *openapiclient.NewInterfacesIERC721TransferFromRequest(*openapiclient.NewInterfacesIERC721TransferFromRequestContractParams()) // InterfacesIERC721TransferFromRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721Api.InterfacesIERC721TransferFrom(context.Background(), networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721Api.InterfacesIERC721TransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721TransferFrom`: InterfacesIERC721TransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721Api.InterfacesIERC721TransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721TransferFromRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721TransferFromRequest** | [**InterfacesIERC721TransferFromRequest**](InterfacesIERC721TransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC721TransferFrom200Response**](InterfacesIERC721TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

