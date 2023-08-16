# \IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIAccessControlGetRoleAdmin**](IAccessControlApi.md#InterfacesIAccessControlGetRoleAdmin) | **Post** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
[**InterfacesIAccessControlGrantRole**](IAccessControlApi.md#InterfacesIAccessControlGrantRole) | **Post** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
[**InterfacesIAccessControlHasRole**](IAccessControlApi.md#InterfacesIAccessControlHasRole) | **Post** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
[**InterfacesIAccessControlRenounceRole**](IAccessControlApi.md#InterfacesIAccessControlRenounceRole) | **Post** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
[**InterfacesIAccessControlRevokeRole**](IAccessControlApi.md#InterfacesIAccessControlRevokeRole) | **Post** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole



## InterfacesIAccessControlGetRoleAdmin

> InterfacesIAccessControlGetRoleAdmin200Response InterfacesIAccessControlGetRoleAdmin(ctx, networkId, address).InterfacesIAccessControlGetRoleAdminRequest(interfacesIAccessControlGetRoleAdminRequest).Execute()

IAccessControl.getRoleAdmin



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
    resp, r, err := apiClient.IAccessControlApi.InterfacesIAccessControlGetRoleAdmin(context.Background(), networkId, address).InterfacesIAccessControlGetRoleAdminRequest(interfacesIAccessControlGetRoleAdminRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IAccessControlApi.InterfacesIAccessControlGetRoleAdmin``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIAccessControlGetRoleAdmin`: InterfacesIAccessControlGetRoleAdmin200Response
    fmt.Fprintf(os.Stdout, "Response from `IAccessControlApi.InterfacesIAccessControlGetRoleAdmin`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIAccessControlGetRoleAdminRequest struct via the builder pattern


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


## InterfacesIAccessControlGrantRole

> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlGrantRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IAccessControl.grantRole



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
    resp, r, err := apiClient.IAccessControlApi.InterfacesIAccessControlGrantRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IAccessControlApi.InterfacesIAccessControlGrantRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIAccessControlGrantRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IAccessControlApi.InterfacesIAccessControlGrantRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIAccessControlGrantRoleRequest struct via the builder pattern


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


## InterfacesIAccessControlHasRole

> InterfacesIAccessControlHasRole200Response InterfacesIAccessControlHasRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IAccessControl.hasRole



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
    resp, r, err := apiClient.IAccessControlApi.InterfacesIAccessControlHasRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IAccessControlApi.InterfacesIAccessControlHasRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIAccessControlHasRole`: InterfacesIAccessControlHasRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IAccessControlApi.InterfacesIAccessControlHasRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIAccessControlHasRoleRequest struct via the builder pattern


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


## InterfacesIAccessControlRenounceRole

> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlRenounceRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IAccessControl.renounceRole



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
    resp, r, err := apiClient.IAccessControlApi.InterfacesIAccessControlRenounceRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IAccessControlApi.InterfacesIAccessControlRenounceRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIAccessControlRenounceRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IAccessControlApi.InterfacesIAccessControlRenounceRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIAccessControlRenounceRoleRequest struct via the builder pattern


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


## InterfacesIAccessControlRevokeRole

> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlRevokeRole(ctx, networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()

IAccessControl.revokeRole



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
    resp, r, err := apiClient.IAccessControlApi.InterfacesIAccessControlRevokeRole(context.Background(), networkId, address).InterfacesIAccessControlGrantRoleRequest(interfacesIAccessControlGrantRoleRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IAccessControlApi.InterfacesIAccessControlRevokeRole``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIAccessControlRevokeRole`: InterfacesIAccessControlGrantRole200Response
    fmt.Fprintf(os.Stdout, "Response from `IAccessControlApi.InterfacesIAccessControlRevokeRole`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIAccessControlRevokeRoleRequest struct via the builder pattern


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

