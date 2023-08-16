# IERC2981Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981RoyaltyInfo**](IERC2981Api.md#interfacesIERC2981RoyaltyInfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo
[**interfacesIERC2981SupportsInterface**](IERC2981Api.md#interfacesIERC2981SupportsInterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface


<a id="interfacesIERC2981RoyaltyInfo"></a>
# **interfacesIERC2981RoyaltyInfo**
> InterfacesIERC2981RoyaltyInfo200Response interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest)

IERC2981.royaltyInfo

Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC2981Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC2981RoyaltyInfoRequest : InterfacesIERC2981RoyaltyInfoRequest =  // InterfacesIERC2981RoyaltyInfoRequest | 
try {
    val result : InterfacesIERC2981RoyaltyInfo200Response = apiInstance.interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC2981Api#interfacesIERC2981RoyaltyInfo")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC2981Api#interfacesIERC2981RoyaltyInfo")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC2981RoyaltyInfoRequest** | [**InterfacesIERC2981RoyaltyInfoRequest**](InterfacesIERC2981RoyaltyInfoRequest.md)|  |

### Return type

[**InterfacesIERC2981RoyaltyInfo200Response**](InterfacesIERC2981RoyaltyInfo200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC2981SupportsInterface"></a>
# **interfacesIERC2981SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC2981.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC2981Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC2981Api#interfacesIERC2981SupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC2981Api#interfacesIERC2981SupportsInterface")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md)|  |

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

