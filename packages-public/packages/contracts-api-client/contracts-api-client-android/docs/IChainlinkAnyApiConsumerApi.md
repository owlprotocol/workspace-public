# IChainlinkAnyApiConsumerApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIChainlinkAnyApiConsumerFulfill**](IChainlinkAnyApiConsumerApi.md#interfacesIChainlinkAnyApiConsumerFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill



## interfacesIChainlinkAnyApiConsumerFulfill

> InterfacesIChainlinkAnyApiConsumerFulfill200Response interfacesIChainlinkAnyApiConsumerFulfill(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest)

IChainlinkAnyApiConsumer.fulfill

Write &#x60;fulfill(fulfillPrefixData,fulfillResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiConsumer&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IChainlinkAnyApiConsumerApi;

IChainlinkAnyApiConsumerApi apiInstance = new IChainlinkAnyApiConsumerApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIChainlinkAnyApiConsumerFulfillRequest interfacesIChainlinkAnyApiConsumerFulfillRequest = new InterfacesIChainlinkAnyApiConsumerFulfillRequest(); // InterfacesIChainlinkAnyApiConsumerFulfillRequest | 
try {
    InterfacesIChainlinkAnyApiConsumerFulfill200Response result = apiInstance.interfacesIChainlinkAnyApiConsumerFulfill(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IChainlinkAnyApiConsumerApi#interfacesIChainlinkAnyApiConsumerFulfill");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIChainlinkAnyApiConsumerFulfillRequest** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md)|  |

### Return type

[**InterfacesIChainlinkAnyApiConsumerFulfill200Response**](InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

