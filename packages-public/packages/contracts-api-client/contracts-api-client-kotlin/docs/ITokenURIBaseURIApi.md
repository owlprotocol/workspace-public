# ITokenURIBaseURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenURIBaseURIBaseURI**](ITokenURIBaseURIApi.md#interfacesITokenURIBaseURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI
[**interfacesITokenURIBaseURISetTokenURIBaseURI**](ITokenURIBaseURIApi.md#interfacesITokenURIBaseURISetTokenURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI


<a id="interfacesITokenURIBaseURIBaseURI"></a>
# **interfacesITokenURIBaseURIBaseURI**
> InterfacesIContractURIContractURI200Response interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest)

ITokenURIBaseURI.baseURI

Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenURIBaseURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenURIBaseURIApi#interfacesITokenURIBaseURIBaseURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenURIBaseURIApi#interfacesITokenURIBaseURIBaseURI")
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

<a id="interfacesITokenURIBaseURISetTokenURIBaseURI"></a>
# **interfacesITokenURIBaseURISetTokenURIBaseURI**
> InterfacesIContractURISetContractURI200Response interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest)

ITokenURIBaseURI.setTokenURIBaseURI

Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenURIBaseURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIContractURISetContractURIRequest : InterfacesIContractURISetContractURIRequest =  // InterfacesIContractURISetContractURIRequest | 
try {
    val result : InterfacesIContractURISetContractURI200Response = apiInstance.interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenURIBaseURIApi#interfacesITokenURIBaseURISetTokenURIBaseURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenURIBaseURIApi#interfacesITokenURIBaseURISetTokenURIBaseURI")
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

