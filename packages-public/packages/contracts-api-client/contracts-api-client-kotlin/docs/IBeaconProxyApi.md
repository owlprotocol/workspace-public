# IBeaconProxyApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIBeaconProxyBeacon**](IBeaconProxyApi.md#interfacesIBeaconProxyBeacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
[**interfacesIBeaconProxySetBeacon**](IBeaconProxyApi.md#interfacesIBeaconProxySetBeacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon


<a id="interfacesIBeaconProxyBeacon"></a>
# **interfacesIBeaconProxyBeacon**
> InterfacesIBeaconImplementation200Response interfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest)

IBeaconProxy.beacon

Read &#x60;beacon()&#x60; on an instance of &#x60;IBeaconProxy&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IBeaconProxyApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIBeaconImplementation200Response = apiInstance.interfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IBeaconProxyApi#interfacesIBeaconProxyBeacon")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IBeaconProxyApi#interfacesIBeaconProxyBeacon")
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

<a id="interfacesIBeaconProxySetBeacon"></a>
# **interfacesIBeaconProxySetBeacon**
> InterfacesIBeaconProxySetBeacon200Response interfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest)

IBeaconProxy.setBeacon

Write &#x60;setBeacon(_beaconAddress,data)&#x60; on an instance of &#x60;IBeaconProxy&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IBeaconProxyApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconProxySetBeaconRequest : InterfacesIBeaconProxySetBeaconRequest =  // InterfacesIBeaconProxySetBeaconRequest | 
try {
    val result : InterfacesIBeaconProxySetBeacon200Response = apiInstance.interfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IBeaconProxyApi#interfacesIBeaconProxySetBeacon")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IBeaconProxyApi#interfacesIBeaconProxySetBeacon")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIBeaconProxySetBeaconRequest** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md)|  |

### Return type

[**InterfacesIBeaconProxySetBeacon200Response**](InterfacesIBeaconProxySetBeacon200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
