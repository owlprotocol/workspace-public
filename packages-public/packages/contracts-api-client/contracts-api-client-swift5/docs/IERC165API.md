# IERC165API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC165SupportsInterface**](IERC165API.md#interfacesierc165supportsinterface) | **POST** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface


# **interfacesIERC165SupportsInterface**
```swift
    open class func interfacesIERC165SupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC165.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC165`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC165.supportsInterface
IERC165API.interfacesIERC165SupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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

