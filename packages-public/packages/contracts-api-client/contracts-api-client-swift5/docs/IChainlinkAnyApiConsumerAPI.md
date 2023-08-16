# IChainlinkAnyApiConsumerAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIChainlinkAnyApiConsumerFulfill**](IChainlinkAnyApiConsumerAPI.md#interfacesichainlinkanyapiconsumerfulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill


# **interfacesIChainlinkAnyApiConsumerFulfill**
```swift
    open class func interfacesIChainlinkAnyApiConsumerFulfill(networkId: String, address: String, interfacesIChainlinkAnyApiConsumerFulfillRequest: InterfacesIChainlinkAnyApiConsumerFulfillRequest, completion: @escaping (_ data: InterfacesIChainlinkAnyApiConsumerFulfill200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiConsumer.fulfill

Write `fulfill(fulfillPrefixData,fulfillResponseData)` on an instance of `IChainlinkAnyApiConsumer`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIChainlinkAnyApiConsumerFulfillRequest = interfaces_IChainlinkAnyApiConsumer_fulfill_request(contractParams: interfaces_IChainlinkAnyApiConsumer_fulfill_request_contractParams(_0: "_0_example", _1: "_1_example", fulfillPrefixData: "fulfillPrefixData_example", fulfillResponseData: "fulfillResponseData_example")) // InterfacesIChainlinkAnyApiConsumerFulfillRequest | 

// IChainlinkAnyApiConsumer.fulfill
IChainlinkAnyApiConsumerAPI.interfacesIChainlinkAnyApiConsumerFulfill(networkId: networkId, address: address, interfacesIChainlinkAnyApiConsumerFulfillRequest: interfacesIChainlinkAnyApiConsumerFulfillRequest) { (response, error) in
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
 **interfacesIChainlinkAnyApiConsumerFulfillRequest** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiConsumerFulfill200Response**](InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

