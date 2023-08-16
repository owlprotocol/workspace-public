# \IERC20Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC20Allowance**](IERC20Api.md#InterfacesIERC20Allowance) | **Post** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
[**InterfacesIERC20Approve**](IERC20Api.md#InterfacesIERC20Approve) | **Post** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
[**InterfacesIERC20BalanceOf**](IERC20Api.md#InterfacesIERC20BalanceOf) | **Post** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
[**InterfacesIERC20TotalSupply**](IERC20Api.md#InterfacesIERC20TotalSupply) | **Post** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
[**InterfacesIERC20Transfer**](IERC20Api.md#InterfacesIERC20Transfer) | **Post** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
[**InterfacesIERC20TransferFrom**](IERC20Api.md#InterfacesIERC20TransferFrom) | **Post** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom



## InterfacesIERC20Allowance

> InterfacesIERC20Allowance200Response InterfacesIERC20Allowance(ctx, networkId, address).InterfacesIERC20AllowanceRequest(interfacesIERC20AllowanceRequest).Execute()

IERC20.allowance



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20Allowance(context.Background(), networkId, address).InterfacesIERC20AllowanceRequest(interfacesIERC20AllowanceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20Allowance``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20Allowance`: InterfacesIERC20Allowance200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20Allowance`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20AllowanceRequest struct via the builder pattern


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


## InterfacesIERC20Approve

> InterfacesIERC20Approve200Response InterfacesIERC20Approve(ctx, networkId, address).InterfacesIERC20ApproveRequest(interfacesIERC20ApproveRequest).Execute()

IERC20.approve



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20Approve(context.Background(), networkId, address).InterfacesIERC20ApproveRequest(interfacesIERC20ApproveRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20Approve``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20Approve`: InterfacesIERC20Approve200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20Approve`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20ApproveRequest struct via the builder pattern


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


## InterfacesIERC20BalanceOf

> InterfacesIERC20BalanceOf200Response InterfacesIERC20BalanceOf(ctx, networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()

IERC20.balanceOf



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20BalanceOf(context.Background(), networkId, address).InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20BalanceOf``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20BalanceOf`: InterfacesIERC20BalanceOf200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20BalanceOf`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20BalanceOfRequest struct via the builder pattern


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


## InterfacesIERC20TotalSupply

> InterfacesIERC20TotalSupply200Response InterfacesIERC20TotalSupply(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IERC20.totalSupply



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20TotalSupply(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20TotalSupply``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20TotalSupply`: InterfacesIERC20TotalSupply200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20TotalSupply`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20TotalSupplyRequest struct via the builder pattern


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


## InterfacesIERC20Transfer

> InterfacesIERC20Transfer200Response InterfacesIERC20Transfer(ctx, networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()

IERC20.transfer



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20Transfer(context.Background(), networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20Transfer``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20Transfer`: InterfacesIERC20Transfer200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20Transfer`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20TransferRequest struct via the builder pattern


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


## InterfacesIERC20TransferFrom

> InterfacesIERC20TransferFrom200Response InterfacesIERC20TransferFrom(ctx, networkId, address).InterfacesIERC20TransferFromRequest(interfacesIERC20TransferFromRequest).Execute()

IERC20.transferFrom



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
    resp, r, err := apiClient.IERC20Api.InterfacesIERC20TransferFrom(context.Background(), networkId, address).InterfacesIERC20TransferFromRequest(interfacesIERC20TransferFromRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20Api.InterfacesIERC20TransferFrom``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20TransferFrom`: InterfacesIERC20TransferFrom200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20Api.InterfacesIERC20TransferFrom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20TransferFromRequest struct via the builder pattern


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

