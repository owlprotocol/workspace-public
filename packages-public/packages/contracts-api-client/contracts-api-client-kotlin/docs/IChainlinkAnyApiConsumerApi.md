# IChainlinkAnyApiConsumerApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIChainlinkAnyApiConsumerFulfill**](IChainlinkAnyApiConsumerApi.md#interfacesIChainlinkAnyApiConsumerFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill


<a id="interfacesIChainlinkAnyApiConsumerFulfill"></a>
# **interfacesIChainlinkAnyApiConsumerFulfill**
> InterfacesIChainlinkAnyApiConsumerFulfill200Response interfacesIChainlinkAnyApiConsumerFulfill(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest)

IChainlinkAnyApiConsumer.fulfill

Write &#x60;fulfill(fulfillPrefixData,fulfillResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiConsumer&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiConsumerApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIChainlinkAnyApiConsumerFulfillRequest : InterfacesIChainlinkAnyApiConsumerFulfillRequest =  // InterfacesIChainlinkAnyApiConsumerFulfillRequest | 
try {
    val result : InterfacesIChainlinkAnyApiConsumerFulfill200Response = apiInstance.interfacesIChainlinkAnyApiConsumerFulfill(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiConsumerApi#interfacesIChainlinkAnyApiConsumerFulfill")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiConsumerApi#interfacesIChainlinkAnyApiConsumerFulfill")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIChainlinkAnyApiConsumerFulfillRequest** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md)|  |

### Return type

[**InterfacesIChainlinkAnyApiConsumerFulfill200Response**](InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

