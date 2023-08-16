# IBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIBeaconImplementation**](IBeaconApi.md#interfacesIBeaconImplementation) | **POST** /{networkId}/interface/IBeacon/read/{address}/implementation | IBeacon.implementation


<a id="interfacesIBeaconImplementation"></a>
# **interfacesIBeaconImplementation**
> InterfacesIBeaconImplementation200Response interfacesIBeaconImplementation(networkId, address, interfacesIBeaconImplementationRequest)

IBeacon.implementation

Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IBeaconApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIBeaconImplementation200Response = apiInstance.interfacesIBeaconImplementation(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IBeaconApi#interfacesIBeaconImplementation")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IBeaconApi#interfacesIBeaconImplementation")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  |

### Return type

[**InterfacesIBeaconImplementation200Response**](InterfacesIBeaconImplementation200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

