# IContractURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIContractURIContractURI**](IContractURIApi.md#interfacesIContractURIContractURI) | **POST** /{networkId}/interface/IContractURI/read/{address}/contractURI | IContractURI.contractURI
[**interfacesIContractURISetContractURI**](IContractURIApi.md#interfacesIContractURISetContractURI) | **POST** /{networkId}/interface/IContractURI/write/{address}/setContractURI | IContractURI.setContractURI


<a id="interfacesIContractURIContractURI"></a>
# **interfacesIContractURIContractURI**
> InterfacesIContractURIContractURI200Response interfacesIContractURIContractURI(networkId, address, interfacesIBeaconImplementationRequest)

IContractURI.contractURI

Read &#x60;contractURI()&#x60; on an instance of &#x60;IContractURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IContractURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesIContractURIContractURI(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IContractURIApi#interfacesIContractURIContractURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IContractURIApi#interfacesIContractURIContractURI")
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIContractURISetContractURI"></a>
# **interfacesIContractURISetContractURI**
> InterfacesIContractURISetContractURI200Response interfacesIContractURISetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)

IContractURI.setContractURI

Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IContractURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IContractURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIContractURISetContractURIRequest : InterfacesIContractURISetContractURIRequest =  // InterfacesIContractURISetContractURIRequest | 
try {
    val result : InterfacesIContractURISetContractURI200Response = apiInstance.interfacesIContractURISetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IContractURIApi#interfacesIContractURISetContractURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IContractURIApi#interfacesIContractURISetContractURI")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md)|  |

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

