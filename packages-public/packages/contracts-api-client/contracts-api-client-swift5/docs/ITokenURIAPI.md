# ITokenURIAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenURITokenURI**](ITokenURIAPI.md#interfacesitokenuritokenuri) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI


# **interfacesITokenURITokenURI**
```swift
    open class func interfacesITokenURITokenURI(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721MetadataTokenURI200Response?, _ error: Error?) -> Void)
```

ITokenURI.tokenURI

Read `tokenURI(tokenId)` on an instance of `ITokenURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// ITokenURI.tokenURI
ITokenURIAPI.interfacesITokenURITokenURI(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

