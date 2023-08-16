# \ITokenURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**InterfacesITokenURITokenURI**](ITokenURIApi.md#InterfacesITokenURITokenURI) | **Post** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI



## InterfacesITokenURITokenURI

> InterfacesIERC721MetadataTokenURI200Response InterfacesITokenURITokenURI(ctx, networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()

ITokenURI.tokenURI



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
    resp, r, err := apiClient.ITokenURIApi.InterfacesITokenURITokenURI(context.Background(), networkId, address).InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ITokenURIApi.InterfacesITokenURITokenURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `InterfacesITokenURITokenURI`: InterfacesIERC721MetadataTokenURI200Response
    fmt.Fprintf(os.Stdout, "Response from `ITokenURIApi.InterfacesITokenURITokenURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]
**address** | **string** | An ethereum address | 

### Other Parameters

Other parameters are passed through a pointer to a apiInterfacesITokenURITokenURIRequest struct via the builder pattern


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

