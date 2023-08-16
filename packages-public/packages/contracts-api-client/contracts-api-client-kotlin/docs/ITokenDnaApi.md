# ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenDnaGetDna**](ITokenDnaApi.md#interfacesITokenDnaGetDna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
[**interfacesITokenDnaGetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaGetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
[**interfacesITokenDnaSetDna**](ITokenDnaApi.md#interfacesITokenDnaSetDna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
[**interfacesITokenDnaSetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaSetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch


<a id="interfacesITokenDnaGetDna"></a>
# **interfacesITokenDnaGetDna**
> InterfacesITokenDnaGetDna200Response interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenDna.getDna

Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenDnaApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesITokenDnaGetDna200Response = apiInstance.interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenDnaApi#interfacesITokenDnaGetDna")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenDnaApi#interfacesITokenDnaGetDna")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md)|  |

### Return type

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesITokenDnaGetDnaBatch"></a>
# **interfacesITokenDnaGetDnaBatch**
> InterfacesITokenDnaGetDnaBatch200Response interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest)

ITokenDna.getDnaBatch

Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenDnaApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesITokenDnaGetDnaBatchRequest : InterfacesITokenDnaGetDnaBatchRequest =  // InterfacesITokenDnaGetDnaBatchRequest | 
try {
    val result : InterfacesITokenDnaGetDnaBatch200Response = apiInstance.interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenDnaApi#interfacesITokenDnaGetDnaBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenDnaApi#interfacesITokenDnaGetDnaBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md)|  |

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesITokenDnaSetDna"></a>
# **interfacesITokenDnaSetDna**
> InterfacesITokenDnaSetDna200Response interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest)

ITokenDna.setDna

Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenDnaApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesITokenDnaSetDnaRequest : InterfacesITokenDnaSetDnaRequest =  // InterfacesITokenDnaSetDnaRequest | 
try {
    val result : InterfacesITokenDnaSetDna200Response = apiInstance.interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenDnaApi#interfacesITokenDnaSetDna")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenDnaApi#interfacesITokenDnaSetDna")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md)|  |

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesITokenDnaSetDnaBatch"></a>
# **interfacesITokenDnaSetDnaBatch**
> InterfacesITokenDnaSetDnaBatch200Response interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest)

ITokenDna.setDnaBatch

Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenDnaApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesITokenDnaSetDnaBatchRequest : InterfacesITokenDnaSetDnaBatchRequest =  // InterfacesITokenDnaSetDnaBatchRequest | 
try {
    val result : InterfacesITokenDnaSetDnaBatch200Response = apiInstance.interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenDnaApi#interfacesITokenDnaSetDnaBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenDnaApi#interfacesITokenDnaSetDnaBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md)|  |

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

