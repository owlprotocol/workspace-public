# \IERC721EnumerableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC721EnumerableApprove**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableApprove) | **Post** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
[**InterfacesIERC721EnumerableBalanceOf**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableBalanceOf) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
[**InterfacesIERC721EnumerableGetApproved**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableGetApproved) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
[**InterfacesIERC721EnumerableIsApprovedForAll**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableIsApprovedForAll) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
[**InterfacesIERC721EnumerableOwnerOf**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableOwnerOf) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
[**InterfacesIERC721EnumerableSafeTransferFrom**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableSafeTransferFrom) | **Post** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
[**InterfacesIERC721EnumerableSetApprovalForAll**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableSetApprovalForAll) | **Post** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
[**InterfacesIERC721EnumerableSupportsInterface**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableSupportsInterface) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
[**InterfacesIERC721EnumerableTokenByIndex**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableTokenByIndex) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
[**InterfacesIERC721EnumerableTokenOfOwnerByIndex**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableTokenOfOwnerByIndex) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
[**InterfacesIERC721EnumerableTotalSupply**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableTotalSupply) | **Post** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
[**InterfacesIERC721EnumerableTransferFrom**](IERC721EnumerableApi.md#InterfacesIERC721EnumerableTransferFrom) | **Post** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom



## InterfacesIERC721EnumerableApprove

> InterfacesIERC721Approve200Response InterfacesIERC721EnumerableApprove(ctx, networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()

IERC721Enumerable.approve



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableApprove(context.Background(), networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableApprove``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableApprove`: InterfacesIERC721Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableApprove`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableApproveRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableBalanceOf

> InterfacesIERC721BalanceOf200Response InterfacesIERC721EnumerableBalanceOf(ctx, networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()

IERC721Enumerable.balanceOf



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableBalanceOf(context.Background(), networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableBalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableBalanceOf`: InterfacesIERC721BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableBalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableBalanceOfRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableGetApproved

> InterfacesIERC721GetApproved200Response InterfacesIERC721EnumerableGetApproved(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721Enumerable.getApproved



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableGetApproved(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableGetApproved``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableGetApproved`: InterfacesIERC721GetApproved200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableGetApproved`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableGetApprovedRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableIsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response InterfacesIERC721EnumerableIsApprovedForAll(ctx, networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()

IERC721Enumerable.isApprovedForAll



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableIsApprovedForAll(context.Background(), networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableIsApprovedForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableIsApprovedForAll`: InterfacesIERC721IsApprovedForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableIsApprovedForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableIsApprovedForAllRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableOwnerOf

> InterfacesIERC721OwnerOf200Response InterfacesIERC721EnumerableOwnerOf(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721Enumerable.ownerOf



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableOwnerOf(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableOwnerOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableOwnerOf`: InterfacesIERC721OwnerOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableOwnerOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableOwnerOfRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableSafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response InterfacesIERC721EnumerableSafeTransferFrom(ctx, networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()

IERC721Enumerable.safeTransferFrom



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableSafeTransferFrom(context.Background(), networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableSafeTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableSafeTransferFrom`: InterfacesIERC721SafeTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableSafeTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableSafeTransferFromRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableSetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response InterfacesIERC721EnumerableSetApprovalForAll(ctx, networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()

IERC721Enumerable.setApprovalForAll



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableSetApprovalForAll(context.Background(), networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableSetApprovalForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableSetApprovalForAll`: InterfacesIERC721SetApprovalForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableSetApprovalForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableSetApprovalForAllRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableSupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC721EnumerableSupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC721Enumerable.supportsInterface



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableSupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableSupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableSupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableSupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableSupportsInterfaceRequest struct via the builder pattern


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


## InterfacesIERC721EnumerableTokenByIndex

> InterfacesIERC721EnumerableTokenByIndex200Response InterfacesIERC721EnumerableTokenByIndex(ctx, networkId, address).InterfacesIERC721EnumerableTokenByIndexRequest(interfacesIERC721EnumerableTokenByIndexRequest).Execute()

IERC721Enumerable.tokenByIndex



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
    interfacesIERC721EnumerableTokenByIndexRequest := *openapiclient.NewInterfacesIERC721EnumerableTokenByIndexRequest(*openapiclient.NewInterfacesIERC721EnumerableTokenByIndexRequestContractParams()) // InterfacesIERC721EnumerableTokenByIndexRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableTokenByIndex(context.Background(), networkId, address).InterfacesIERC721EnumerableTokenByIndexRequest(interfacesIERC721EnumerableTokenByIndexRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableTokenByIndex``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableTokenByIndex`: InterfacesIERC721EnumerableTokenByIndex200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableTokenByIndex`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableTokenByIndexRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721EnumerableTokenByIndexRequest** | [**InterfacesIERC721EnumerableTokenByIndexRequest**](InterfacesIERC721EnumerableTokenByIndexRequest.md) |  | 

### Return type

[**InterfacesIERC721EnumerableTokenByIndex200Response**](InterfacesIERC721EnumerableTokenByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721EnumerableTokenOfOwnerByIndex

> InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response InterfacesIERC721EnumerableTokenOfOwnerByIndex(ctx, networkId, address).InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(interfacesIERC721EnumerableTokenOfOwnerByIndexRequest).Execute()

IERC721Enumerable.tokenOfOwnerByIndex



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
    interfacesIERC721EnumerableTokenOfOwnerByIndexRequest := *openapiclient.NewInterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(*openapiclient.NewInterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams()) // InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableTokenOfOwnerByIndex(context.Background(), networkId, address).InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(interfacesIERC721EnumerableTokenOfOwnerByIndexRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableTokenOfOwnerByIndex``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableTokenOfOwnerByIndex`: InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableTokenOfOwnerByIndex`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableTokenOfOwnerByIndexRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721EnumerableTokenOfOwnerByIndexRequest** | [**InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md) |  | 

### Return type

[**InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response**](InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721EnumerableTotalSupply

> InterfacesIERC20TotalSupply200Response InterfacesIERC721EnumerableTotalSupply(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC721Enumerable.totalSupply



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableTotalSupply(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableTotalSupply``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableTotalSupply`: InterfacesIERC20TotalSupply200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableTotalSupply`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableTotalSupplyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721EnumerableTransferFrom

> InterfacesIERC721TransferFrom200Response InterfacesIERC721EnumerableTransferFrom(ctx, networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()

IERC721Enumerable.transferFrom



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
    resp, r, err := apiClient.IERC721EnumerableApi.InterfacesIERC721EnumerableTransferFrom(context.Background(), networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721EnumerableApi.InterfacesIERC721EnumerableTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721EnumerableTransferFrom`: InterfacesIERC721TransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721EnumerableApi.InterfacesIERC721EnumerableTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721EnumerableTransferFromRequest struct via the builder pattern


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

