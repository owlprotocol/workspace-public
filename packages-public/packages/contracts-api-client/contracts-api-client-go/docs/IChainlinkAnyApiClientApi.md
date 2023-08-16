# \IChainlinkAnyApiClientApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIChainlinkAnyApiClientContractURI**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientContractURI) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI
[**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
[**InterfacesIChainlinkAnyApiClientFulfill**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientFulfill) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill
[**InterfacesIChainlinkAnyApiClientGetRoleAdmin**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientGetRoleAdmin) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin
[**InterfacesIChainlinkAnyApiClientGrantRole**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientGrantRole) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole
[**InterfacesIChainlinkAnyApiClientHasRole**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientHasRole) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole
[**InterfacesIChainlinkAnyApiClientRenounceRole**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientRenounceRole) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole
[**InterfacesIChainlinkAnyApiClientRequest**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientRequest) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request
[**InterfacesIChainlinkAnyApiClientRequests**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientRequests) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests
[**InterfacesIChainlinkAnyApiClientRevokeRole**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientRevokeRole) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole
[**InterfacesIChainlinkAnyApiClientSetContractURI**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientSetContractURI) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI
[**InterfacesIChainlinkAnyApiClientSupportsInterface**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientSupportsInterface) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface
[**InterfacesIChainlinkAnyApiClientVersion**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientVersion) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version
[**InterfacesIChainlinkAnyApiClientWithdrawLink**](IChainlinkAnyApiClientApi.md#InterfacesIChainlinkAnyApiClientWithdrawLink) | **Post** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink



## InterfacesIChainlinkAnyApiClientContractURI

> InterfacesIContractURIContractURI200Response InterfacesIChainlinkAnyApiClientContractURI(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IChainlinkAnyApiClient.contractURI



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
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientContractURI(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientContractURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientContractURI`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientContractURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientContractURIRequest struct via the builder pattern


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


## InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE

> InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE



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
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE`: InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientDEFAULTADMINROLERequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response**](InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientFulfill

> InterfacesIChainlinkAnyApiClientFulfill200Response InterfacesIChainlinkAnyApiClientFulfill(ctx, networkId, address).InterfacesIChainlinkAnyApiClientFulfillRequest(interfacesIChainlinkAnyApiClientFulfillRequest).Execute()

IChainlinkAnyApiClient.fulfill



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
    interfacesIChainlinkAnyApiClientFulfillRequest := *openapiclient.NewInterfacesIChainlinkAnyApiClientFulfillRequest(*openapiclient.NewInterfacesIChainlinkAnyApiClientFulfillRequestContractParams()) // InterfacesIChainlinkAnyApiClientFulfillRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientFulfill(context.Background(), networkId, address).InterfacesIChainlinkAnyApiClientFulfillRequest(interfacesIChainlinkAnyApiClientFulfillRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientFulfill``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientFulfill`: InterfacesIChainlinkAnyApiClientFulfill200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientFulfill`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientFulfillRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIChainlinkAnyApiClientFulfillRequest** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientFulfill200Response**](InterfacesIChainlinkAnyApiClientFulfill200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientGetRoleAdmin

> InterfacesIAccessControlGetRoleAdmin200Response InterfacesIChainlinkAnyApiClientGetRoleAdmin(ctx, networkId, address).InterfacesIAccessControlGetRoleAdminRequest(interfacesIAccessControlGetRoleAdminRequest).Execute()

IChainlinkAnyApiClient.getRoleAdmin



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
    interfacesIAccessControlGetRoleAdminRequest := *openapiclient.NewInterfacesIAccessControlGetRoleAdminRequest(*openapiclient.NewInterfacesIAccessControlGetRoleAdminRequestContractParams()) // InterfacesIAccessControlGetRoleAdminRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGetRoleAdmin(context.Background(), networkId, address).InterfacesIAccessControlGetRoleAdminRequest(interfacesIAccessControlGetRoleAdminRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGetRoleAdmin``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientGetRoleAdmin`: InterfacesIAccessControlGetRoleAdmin200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGetRoleAdmin`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientGetRoleAdminRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGetRoleAdmin200Response**](InterfacesIAccessControlGetRoleAdmin200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientGrantRole

> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientGrantRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IChainlinkAnyApiClient.grantRole



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
    interfacesIAccessControlGrantRoleRequest := *openapiclient.NewInterfacesIAccessControlGrantRoleRequest(*openapiclient.NewInterfacesIAccessControlGrantRoleRequestContractParams()) // InterfacesIAccessControlGrantRoleRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGrantRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGrantRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientGrantRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGrantRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientGrantRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientHasRole

> InterfacesIAccessControlHasRole200Response InterfacesIChainlinkAnyApiClientHasRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IChainlinkAnyApiClient.hasRole



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
    interfacesIAccessControlGrantRoleRequest := *openapiclient.NewInterfacesIAccessControlGrantRoleRequest(*openapiclient.NewInterfacesIAccessControlGrantRoleRequestContractParams()) // InterfacesIAccessControlGrantRoleRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientHasRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientHasRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientHasRole`: InterfacesIAccessControlHasRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientHasRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientHasRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlHasRole200Response**](InterfacesIAccessControlHasRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientRenounceRole

> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientRenounceRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IChainlinkAnyApiClient.renounceRole



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
    interfacesIAccessControlGrantRoleRequest := *openapiclient.NewInterfacesIAccessControlGrantRoleRequest(*openapiclient.NewInterfacesIAccessControlGrantRoleRequestContractParams()) // InterfacesIAccessControlGrantRoleRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRenounceRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRenounceRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientRenounceRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRenounceRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientRenounceRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientRequest

> InterfacesIChainlinkAnyApiClientRequest200Response InterfacesIChainlinkAnyApiClientRequest(ctx, networkId, address).InterfacesIChainlinkAnyApiClientRequestRequest(interfacesIChainlinkAnyApiClientRequestRequest).Execute()

IChainlinkAnyApiClient.request



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
    interfacesIChainlinkAnyApiClientRequestRequest := *openapiclient.NewInterfacesIChainlinkAnyApiClientRequestRequest(*openapiclient.NewInterfacesIChainlinkAnyApiClientRequestRequestContractParams()) // InterfacesIChainlinkAnyApiClientRequestRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequest(context.Background(), networkId, address).InterfacesIChainlinkAnyApiClientRequestRequest(interfacesIChainlinkAnyApiClientRequestRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequest``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientRequest`: InterfacesIChainlinkAnyApiClientRequest200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequest`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientRequestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIChainlinkAnyApiClientRequestRequest** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientRequest200Response**](InterfacesIChainlinkAnyApiClientRequest200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientRequests

> InterfacesIChainlinkAnyApiClientRequests200Response InterfacesIChainlinkAnyApiClientRequests(ctx, networkId, address).InterfacesIChainlinkAnyApiClientRequestsRequest(interfacesIChainlinkAnyApiClientRequestsRequest).Execute()

IChainlinkAnyApiClient.requests



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
    interfacesIChainlinkAnyApiClientRequestsRequest := *openapiclient.NewInterfacesIChainlinkAnyApiClientRequestsRequest(*openapiclient.NewInterfacesIERC1820InterfaceHash200ResponseResult()) // InterfacesIChainlinkAnyApiClientRequestsRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequests(context.Background(), networkId, address).InterfacesIChainlinkAnyApiClientRequestsRequest(interfacesIChainlinkAnyApiClientRequestsRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequests``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientRequests`: InterfacesIChainlinkAnyApiClientRequests200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequests`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientRequestsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIChainlinkAnyApiClientRequestsRequest** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientRequests200Response**](InterfacesIChainlinkAnyApiClientRequests200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientRevokeRole

> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientRevokeRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IChainlinkAnyApiClient.revokeRole



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
    interfacesIAccessControlGrantRoleRequest := *openapiclient.NewInterfacesIAccessControlGrantRoleRequest(*openapiclient.NewInterfacesIAccessControlGrantRoleRequestContractParams()) // InterfacesIAccessControlGrantRoleRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRevokeRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRevokeRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientRevokeRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRevokeRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientRevokeRoleRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientSetContractURI

> InterfacesIContractURISetContractURI200Response InterfacesIChainlinkAnyApiClientSetContractURI(ctx, networkId, address).InterfacesIContractURISetContractURIRequest(interfacesIContractURISetContractURIRequest).Execute()

IChainlinkAnyApiClient.setContractURI



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
    interfacesIContractURISetContractURIRequest := *openapiclient.NewInterfacesIContractURISetContractURIRequest(*openapiclient.NewInterfacesIContractURISetContractURIRequestContractParams()) // InterfacesIContractURISetContractURIRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSetContractURI(context.Background(), networkId, address).InterfacesIContractURISetContractURIRequest(interfacesIContractURISetContractURIRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSetContractURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientSetContractURI`: InterfacesIContractURISetContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSetContractURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientSetContractURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  | 

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## InterfacesIChainlinkAnyApiClientSupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIChainlinkAnyApiClientSupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IChainlinkAnyApiClient.supportsInterface



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
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientSupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientSupportsInterfaceRequest struct via the builder pattern


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


## InterfacesIChainlinkAnyApiClientVersion

> InterfacesIContractURIContractURI200Response InterfacesIChainlinkAnyApiClientVersion(ctx, networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()

IChainlinkAnyApiClient.version



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
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientVersion(context.Background(), networkId, address).InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientVersion``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientVersion`: InterfacesIContractURIContractURI200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientVersion`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientVersionRequest struct via the builder pattern


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


## InterfacesIChainlinkAnyApiClientWithdrawLink

> InterfacesIERC20Transfer200Response InterfacesIChainlinkAnyApiClientWithdrawLink(ctx, networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()

IChainlinkAnyApiClient.withdrawLink



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
    resp, r, err := apiClient.IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientWithdrawLink(context.Background(), networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientWithdrawLink``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIChainlinkAnyApiClientWithdrawLink`: InterfacesIERC20Transfer200Response
    fmt.Fprintf(os.Stdout, "Response from `IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientWithdrawLink`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIChainlinkAnyApiClientWithdrawLinkRequest struct via the builder pattern


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

