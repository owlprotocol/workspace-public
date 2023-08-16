# IERC2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981SetterSetDefaultRoyalty**](IERC2981SetterApi.md#interfacesIERC2981SetterSetDefaultRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
[**interfacesIERC2981SetterSetTokenRoyalty**](IERC2981SetterApi.md#interfacesIERC2981SetterSetTokenRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty


<a id="interfacesIERC2981SetterSetDefaultRoyalty"></a>
# **interfacesIERC2981SetterSetDefaultRoyalty**
> InterfacesIERC2981SetterSetDefaultRoyalty200Response interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest)

IERC2981Setter.setDefaultRoyalty

Write &#x60;setDefaultRoyalty(receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC2981SetterApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC2981SetterSetDefaultRoyaltyRequest : InterfacesIERC2981SetterSetDefaultRoyaltyRequest =  // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 
try {
    val result : InterfacesIERC2981SetterSetDefaultRoyalty200Response = apiInstance.interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC2981SetterApi#interfacesIERC2981SetterSetDefaultRoyalty")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC2981SetterApi#interfacesIERC2981SetterSetDefaultRoyalty")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md)|  |

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC2981SetterSetTokenRoyalty"></a>
# **interfacesIERC2981SetterSetTokenRoyalty**
> InterfacesIERC2981SetterSetTokenRoyalty200Response interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest)

IERC2981Setter.setTokenRoyalty

Write &#x60;setTokenRoyalty(tokenId,receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC2981SetterApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC2981SetterSetTokenRoyaltyRequest : InterfacesIERC2981SetterSetTokenRoyaltyRequest =  // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 
try {
    val result : InterfacesIERC2981SetterSetTokenRoyalty200Response = apiInstance.interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC2981SetterApi#interfacesIERC2981SetterSetTokenRoyalty")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC2981SetterApi#interfacesIERC2981SetterSetTokenRoyalty")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md)|  |

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

