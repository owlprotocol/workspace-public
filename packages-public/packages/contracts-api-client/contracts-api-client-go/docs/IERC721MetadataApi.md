# \IERC721MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC721MetadataApprove**](IERC721MetadataApi.md#InterfacesIERC721MetadataApprove) | **Post** /{networkId}/interface/IERC721Metadata/write/{address}/approve | IERC721Metadata.approve
[**InterfacesIERC721MetadataBalanceOf**](IERC721MetadataApi.md#InterfacesIERC721MetadataBalanceOf) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/balanceOf | IERC721Metadata.balanceOf
[**InterfacesIERC721MetadataGetApproved**](IERC721MetadataApi.md#InterfacesIERC721MetadataGetApproved) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/getApproved | IERC721Metadata.getApproved
[**InterfacesIERC721MetadataIsApprovedForAll**](IERC721MetadataApi.md#InterfacesIERC721MetadataIsApprovedForAll) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/isApprovedForAll | IERC721Metadata.isApprovedForAll
[**InterfacesIERC721MetadataName**](IERC721MetadataApi.md#InterfacesIERC721MetadataName) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/name | IERC721Metadata.name
[**InterfacesIERC721MetadataOwnerOf**](IERC721MetadataApi.md#InterfacesIERC721MetadataOwnerOf) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/ownerOf | IERC721Metadata.ownerOf
[**InterfacesIERC721MetadataSafeTransferFrom**](IERC721MetadataApi.md#InterfacesIERC721MetadataSafeTransferFrom) | **Post** /{networkId}/interface/IERC721Metadata/write/{address}/safeTransferFrom | IERC721Metadata.safeTransferFrom
[**InterfacesIERC721MetadataSetApprovalForAll**](IERC721MetadataApi.md#InterfacesIERC721MetadataSetApprovalForAll) | **Post** /{networkId}/interface/IERC721Metadata/write/{address}/setApprovalForAll | IERC721Metadata.setApprovalForAll
[**InterfacesIERC721MetadataSupportsInterface**](IERC721MetadataApi.md#InterfacesIERC721MetadataSupportsInterface) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/supportsInterface | IERC721Metadata.supportsInterface
[**InterfacesIERC721MetadataSymbol**](IERC721MetadataApi.md#InterfacesIERC721MetadataSymbol) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/symbol | IERC721Metadata.symbol
[**InterfacesIERC721MetadataTokenURI**](IERC721MetadataApi.md#InterfacesIERC721MetadataTokenURI) | **Post** /{networkId}/interface/IERC721Metadata/read/{address}/tokenURI | IERC721Metadata.tokenURI
[**InterfacesIERC721MetadataTransferFrom**](IERC721MetadataApi.md#InterfacesIERC721MetadataTransferFrom) | **Post** /{networkId}/interface/IERC721Metadata/write/{address}/transferFrom | IERC721Metadata.transferFrom



## InterfacesIERC721MetadataApprove

> InterfacesIERC721Approve200Response InterfacesIERC721MetadataApprove(ctx, networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()

IERC721Metadata.approve



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataApprove(context.Background(), networkId, address).InterfacesIERC721ApproveRequest(interfacesIERC721ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataApprove``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataApprove`: InterfacesIERC721Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataApprove`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataApproveRequest struct via the builder pattern


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


## InterfacesIERC721MetadataBalanceOf

> InterfacesIERC721BalanceOf200Response InterfacesIERC721MetadataBalanceOf(ctx, networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()

IERC721Metadata.balanceOf



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataBalanceOf(context.Background(), networkId, address).InterfacesIERC721BalanceOfRequest(interfacesIERC721BalanceOfRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataBalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataBalanceOf`: InterfacesIERC721BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataBalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataBalanceOfRequest struct via the builder pattern


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


## InterfacesIERC721MetadataGetApproved

> InterfacesIERC721GetApproved200Response InterfacesIERC721MetadataGetApproved(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721Metadata.getApproved



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataGetApproved(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataGetApproved``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataGetApproved`: InterfacesIERC721GetApproved200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataGetApproved`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataGetApprovedRequest struct via the builder pattern


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


## InterfacesIERC721MetadataIsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response InterfacesIERC721MetadataIsApprovedForAll(ctx, networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()

IERC721Metadata.isApprovedForAll



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataIsApprovedForAll(context.Background(), networkId, address).InterfacesIERC721IsApprovedForAllRequest(interfacesIERC721IsApprovedForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataIsApprovedForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataIsApprovedForAll`: InterfacesIERC721IsApprovedForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataIsApprovedForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataIsApprovedForAllRequest struct via the builder pattern


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


## InterfacesIERC721MetadataName

> InterfacesIContractURIContractURI200Response InterfacesIERC721MetadataName(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC721Metadata.name



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataName(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataName``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataName`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataName`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataNameRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MetadataOwnerOf

> InterfacesIERC721OwnerOf200Response InterfacesIERC721MetadataOwnerOf(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721Metadata.ownerOf



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataOwnerOf(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataOwnerOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataOwnerOf`: InterfacesIERC721OwnerOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataOwnerOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataOwnerOfRequest struct via the builder pattern


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


## InterfacesIERC721MetadataSafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response InterfacesIERC721MetadataSafeTransferFrom(ctx, networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()

IERC721Metadata.safeTransferFrom



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataSafeTransferFrom(context.Background(), networkId, address).InterfacesIERC721SafeTransferFromRequest(interfacesIERC721SafeTransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataSafeTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataSafeTransferFrom`: InterfacesIERC721SafeTransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataSafeTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataSafeTransferFromRequest struct via the builder pattern


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


## InterfacesIERC721MetadataSetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response InterfacesIERC721MetadataSetApprovalForAll(ctx, networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()

IERC721Metadata.setApprovalForAll



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataSetApprovalForAll(context.Background(), networkId, address).InterfacesIERC721SetApprovalForAllRequest(interfacesIERC721SetApprovalForAllRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataSetApprovalForAll``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataSetApprovalForAll`: InterfacesIERC721SetApprovalForAll200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataSetApprovalForAll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataSetApprovalForAllRequest struct via the builder pattern


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


## InterfacesIERC721MetadataSupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC721MetadataSupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC721Metadata.supportsInterface



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataSupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataSupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataSupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataSupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataSupportsInterfaceRequest struct via the builder pattern


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


## InterfacesIERC721MetadataSymbol

> InterfacesIContractURIContractURI200Response InterfacesIERC721MetadataSymbol(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC721Metadata.symbol



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataSymbol(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataSymbol``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataSymbol`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataSymbol`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataSymbolRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MetadataTokenURI

> InterfacesIERC721MetadataTokenURI200Response InterfacesIERC721MetadataTokenURI(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

IERC721Metadata.tokenURI



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataTokenURI(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataTokenURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataTokenURI`: InterfacesIERC721MetadataTokenURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataTokenURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataTokenURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC721MetadataTransferFrom

> InterfacesIERC721TransferFrom200Response InterfacesIERC721MetadataTransferFrom(ctx, networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()

IERC721Metadata.transferFrom



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
    resp, r, err := apiClient.IERC721MetadataApi.InterfacesIERC721MetadataTransferFrom(context.Background(), networkId, address).InterfacesIERC721TransferFromRequest(interfacesIERC721TransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC721MetadataApi.InterfacesIERC721MetadataTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC721MetadataTransferFrom`: InterfacesIERC721TransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC721MetadataApi.InterfacesIERC721MetadataTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC721MetadataTransferFromRequest struct via the builder pattern


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

