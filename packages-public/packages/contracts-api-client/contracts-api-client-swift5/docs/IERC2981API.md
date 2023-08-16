# IERC2981API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981RoyaltyInfo**](IERC2981API.md#interfacesierc2981royaltyinfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo
[**interfacesIERC2981SupportsInterface**](IERC2981API.md#interfacesierc2981supportsinterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface


# **interfacesIERC2981RoyaltyInfo**
```swift
    open class func interfacesIERC2981RoyaltyInfo(networkId: String, address: String, interfacesIERC2981RoyaltyInfoRequest: InterfacesIERC2981RoyaltyInfoRequest, completion: @escaping (_ data: InterfacesIERC2981RoyaltyInfo200Response?, _ error: Error?) -> Void)
```

IERC2981.royaltyInfo

Read `royaltyInfo(tokenId,salePrice)` on an instance of `IERC2981`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC2981RoyaltyInfoRequest = interfaces_IERC2981_royaltyInfo_request(contractParams: interfaces_IERC2981_royaltyInfo_request_contractParams(_0: "_0_example", _1: "_1_example", tokenId: "tokenId_example", salePrice: "salePrice_example")) // InterfacesIERC2981RoyaltyInfoRequest | 

// IERC2981.royaltyInfo
IERC2981API.interfacesIERC2981RoyaltyInfo(networkId: networkId, address: address, interfacesIERC2981RoyaltyInfoRequest: interfacesIERC2981RoyaltyInfoRequest) { (response, error) in
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
 **interfacesIERC2981RoyaltyInfoRequest** | [**InterfacesIERC2981RoyaltyInfoRequest**](InterfacesIERC2981RoyaltyInfoRequest.md) |  | 

### Return type

[**InterfacesIERC2981RoyaltyInfo200Response**](InterfacesIERC2981RoyaltyInfo200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC2981SupportsInterface**
```swift
    open class func interfacesIERC2981SupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC2981.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC2981`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC2981.supportsInterface
IERC2981API.interfacesIERC2981SupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

