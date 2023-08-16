# \IERC20MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC20MetadataAllowance**](IERC20MetadataApi.md#InterfacesIERC20MetadataAllowance) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
[**InterfacesIERC20MetadataApprove**](IERC20MetadataApi.md#InterfacesIERC20MetadataApprove) | **Post** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
[**InterfacesIERC20MetadataBalanceOf**](IERC20MetadataApi.md#InterfacesIERC20MetadataBalanceOf) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
[**InterfacesIERC20MetadataDecimals**](IERC20MetadataApi.md#InterfacesIERC20MetadataDecimals) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
[**InterfacesIERC20MetadataName**](IERC20MetadataApi.md#InterfacesIERC20MetadataName) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
[**InterfacesIERC20MetadataSymbol**](IERC20MetadataApi.md#InterfacesIERC20MetadataSymbol) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
[**InterfacesIERC20MetadataTotalSupply**](IERC20MetadataApi.md#InterfacesIERC20MetadataTotalSupply) | **Post** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
[**InterfacesIERC20MetadataTransfer**](IERC20MetadataApi.md#InterfacesIERC20MetadataTransfer) | **Post** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
[**InterfacesIERC20MetadataTransferFrom**](IERC20MetadataApi.md#InterfacesIERC20MetadataTransferFrom) | **Post** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom



## InterfacesIERC20MetadataAllowance

> InterfacesIERC20Allowance200Response InterfacesIERC20MetadataAllowance(ctx, networkId, address).InterfacesIERC20AllowanceRequest(interfacesIERC20AllowanceRequest).Execute()

IERC20Metadata.allowance



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
    interfacesIERC20AllowanceRequest := *openapiclient.NewInterfacesIERC20AllowanceRequest(*openapiclient.NewInterfacesIERC20AllowanceRequestContractParams()) // InterfacesIERC20AllowanceRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataAllowance(context.Background(), networkId, address).InterfacesIERC20AllowanceRequest(interfacesIERC20AllowanceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataAllowance``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataAllowance`: InterfacesIERC20Allowance200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataAllowance`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataAllowanceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC20AllowanceRequest** | [**InterfacesIERC20AllowanceRequest**](InterfacesIERC20AllowanceRequest.md) |  | 

### Return type

[**InterfacesIERC20Allowance200Response**](InterfacesIERC20Allowance200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC20MetadataApprove

> InterfacesIERC20Approve200Response InterfacesIERC20MetadataApprove(ctx, networkId, address).InterfacesIERC20ApproveRequest(interfacesIERC20ApproveRequest).Execute()

IERC20Metadata.approve



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
    interfacesIERC20ApproveRequest := *openapiclient.NewInterfacesIERC20ApproveRequest(*openapiclient.NewInterfacesIERC20ApproveRequestContractParams()) // InterfacesIERC20ApproveRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataApprove(context.Background(), networkId, address).InterfacesIERC20ApproveRequest(interfacesIERC20ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataApprove``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataApprove`: InterfacesIERC20Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataApprove`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataApproveRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC20ApproveRequest** | [**InterfacesIERC20ApproveRequest**](InterfacesIERC20ApproveRequest.md) |  | 

### Return type

[**InterfacesIERC20Approve200Response**](InterfacesIERC20Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC20MetadataBalanceOf

> InterfacesIERC20BalanceOf200Response InterfacesIERC20MetadataBalanceOf(ctx, networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()

IERC20Metadata.balanceOf



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
    interfacesIERC1820GetManagerRequest := *openapiclient.NewInterfacesIERC1820GetManagerRequest(*openapiclient.NewInterfacesIERC1820GetManagerRequestContractParams()) // InterfacesIERC1820GetManagerRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataBalanceOf(context.Background(), networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataBalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataBalanceOf`: InterfacesIERC20BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataBalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataBalanceOfRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md) |  | 

### Return type

[**InterfacesIERC20BalanceOf200Response**](InterfacesIERC20BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC20MetadataDecimals

> InterfacesIERC20MetadataDecimals200Response InterfacesIERC20MetadataDecimals(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC20Metadata.decimals



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
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataDecimals(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataDecimals``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataDecimals`: InterfacesIERC20MetadataDecimals200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataDecimals`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataDecimalsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIERC20MetadataDecimals200Response**](InterfacesIERC20MetadataDecimals200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC20MetadataName

> InterfacesIContractURIContractURI200Response InterfacesIERC20MetadataName(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC20Metadata.name



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
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataName(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataName``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataName`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataName`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataNameRequest struct via the builder pattern


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


## InterfacesIERC20MetadataSymbol

> InterfacesIContractURIContractURI200Response InterfacesIERC20MetadataSymbol(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC20Metadata.symbol



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
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataSymbol(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataSymbol``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataSymbol`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataSymbol`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataSymbolRequest struct via the builder pattern


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


## InterfacesIERC20MetadataTotalSupply

> InterfacesIERC20TotalSupply200Response InterfacesIERC20MetadataTotalSupply(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC20Metadata.totalSupply



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
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataTotalSupply(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataTotalSupply``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataTotalSupply`: InterfacesIERC20TotalSupply200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataTotalSupply`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataTotalSupplyRequest struct via the builder pattern


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


## InterfacesIERC20MetadataTransfer

> InterfacesIERC20Transfer200Response InterfacesIERC20MetadataTransfer(ctx, networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()

IERC20Metadata.transfer



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
    interfacesIERC20TransferRequest := *openapiclient.NewInterfacesIERC20TransferRequest(*openapiclient.NewInterfacesIERC20TransferRequestContractParams()) // InterfacesIERC20TransferRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataTransfer(context.Background(), networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataTransfer``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataTransfer`: InterfacesIERC20Transfer200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataTransfer`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataTransferRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md) |  | 

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIERC20MetadataTransferFrom

> InterfacesIERC20TransferFrom200Response InterfacesIERC20MetadataTransferFrom(ctx, networkId, address).InterfacesIERC20TransferFromRequest(interfacesIERC20TransferFromRequest).Execute()

IERC20Metadata.transferFrom



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
    interfacesIERC20TransferFromRequest := *openapiclient.NewInterfacesIERC20TransferFromRequest(*openapiclient.NewInterfacesIERC20TransferFromRequestContractParams()) // InterfacesIERC20TransferFromRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IERC20MetadataApi.InterfacesIERC20MetadataTransferFrom(context.Background(), networkId, address).InterfacesIERC20TransferFromRequest(interfacesIERC20TransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MetadataApi.InterfacesIERC20MetadataTransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MetadataTransferFrom`: InterfacesIERC20TransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MetadataApi.InterfacesIERC20MetadataTransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MetadataTransferFromRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIERC20TransferFromRequest** | [**InterfacesIERC20TransferFromRequest**](InterfacesIERC20TransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC20TransferFrom200Response**](InterfacesIERC20TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

