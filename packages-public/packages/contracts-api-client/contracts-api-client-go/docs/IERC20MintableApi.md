# \IERC20MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesIERC20MintableMint**](IERC20MintableApi.md#InterfacesIERC20MintableMint) | **Post** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint



## InterfacesIERC20MintableMint

> InterfacesIERC20Transfer200Response InterfacesIERC20MintableMint(ctx, networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()

IERC20Mintable.mint



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
    resp, r, err := apiClient.IERC20MintableApi.InterfacesIERC20MintableMint(context.Background(), networkId, address).InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `IERC20MintableApi.InterfacesIERC20MintableMint``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesIERC20MintableMint`: InterfacesIERC20Transfer200Response
    fmt.Fprintf(os.Stdout, "Response from `IERC20MintableApi.InterfacesIERC20MintableMint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesIERC20MintableMintRequest struct via the builder pattern


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

