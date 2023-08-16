# IERC2981SetterAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981SetterSetDefaultRoyalty**](IERC2981SetterAPI.md#interfacesierc2981settersetdefaultroyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
[**interfacesIERC2981SetterSetTokenRoyalty**](IERC2981SetterAPI.md#interfacesierc2981settersettokenroyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty


# **interfacesIERC2981SetterSetDefaultRoyalty**
```swift
    open class func interfacesIERC2981SetterSetDefaultRoyalty(networkId: String, address: String, interfacesIERC2981SetterSetDefaultRoyaltyRequest: InterfacesIERC2981SetterSetDefaultRoyaltyRequest, completion: @escaping (_ data: InterfacesIERC2981SetterSetDefaultRoyalty200Response?, _ error: Error?) -> Void)
```

IERC2981Setter.setDefaultRoyalty

Write `setDefaultRoyalty(receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC2981SetterSetDefaultRoyaltyRequest = interfaces_IERC2981Setter_setDefaultRoyalty_request(contractParams: interfaces_IERC2981Setter_setDefaultRoyalty_request_contractParams(_0: "_0_example", _1: "_1_example", receiver: "receiver_example", feeNumerator: "feeNumerator_example")) // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 

// IERC2981Setter.setDefaultRoyalty
IERC2981SetterAPI.interfacesIERC2981SetterSetDefaultRoyalty(networkId: networkId, address: address, interfacesIERC2981SetterSetDefaultRoyaltyRequest: interfacesIERC2981SetterSetDefaultRoyaltyRequest) { (response, error) in
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
 **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md) |  | 

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC2981SetterSetTokenRoyalty**
```swift
    open class func interfacesIERC2981SetterSetTokenRoyalty(networkId: String, address: String, interfacesIERC2981SetterSetTokenRoyaltyRequest: InterfacesIERC2981SetterSetTokenRoyaltyRequest, completion: @escaping (_ data: InterfacesIERC2981SetterSetTokenRoyalty200Response?, _ error: Error?) -> Void)
```

IERC2981Setter.setTokenRoyalty

Write `setTokenRoyalty(tokenId,receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC2981SetterSetTokenRoyaltyRequest = interfaces_IERC2981Setter_setTokenRoyalty_request(contractParams: interfaces_IERC2981Setter_setTokenRoyalty_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", tokenId: "tokenId_example", receiver: "receiver_example", feeNumerator: "feeNumerator_example")) // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 

// IERC2981Setter.setTokenRoyalty
IERC2981SetterAPI.interfacesIERC2981SetterSetTokenRoyalty(networkId: networkId, address: address, interfacesIERC2981SetterSetTokenRoyaltyRequest: interfacesIERC2981SetterSetTokenRoyaltyRequest) { (response, error) in
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
 **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md) |  | 

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

