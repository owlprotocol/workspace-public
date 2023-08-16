# \IERC165Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC165SupportsInterface**](IERC165Api.md#InterfacesIERC165SupportsInterface) | **Post** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface



## InterfacesIERC165SupportsInterface

> InterfacesIERC165SupportsInterface200Response InterfacesIERC165SupportsInterface(ctx, networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()

IERC165.supportsInterface



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
    resp, r, err := apiClient.IERC165Api.InterfacesIERC165SupportsInterface(context.Background(), networkId, address).InterfacesIERC165SupportsInterfaceRequest(interfacesIERC165SupportsInterfaceRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC165Api.InterfacesIERC165SupportsInterface``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC165SupportsInterface`: InterfacesIERC165SupportsInterface200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC165Api.InterfacesIERC165SupportsInterface`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC165SupportsInterfaceRequest struct via the builder pattern


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

