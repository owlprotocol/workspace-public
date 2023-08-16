# IERC1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MintableMint**](IERC1155MintableApi.md#interfacesIERC1155MintableMint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
[**interfacesIERC1155MintableMintBatch**](IERC1155MintableApi.md#interfacesIERC1155MintableMintBatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch


<a id="interfacesIERC1155MintableMint"></a>
# **interfacesIERC1155MintableMint**
> InterfacesIERC1155MintableMint200Response interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest)

IERC1155Mintable.mint

Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155MintableMintRequest : InterfacesIERC1155MintableMintRequest =  // InterfacesIERC1155MintableMintRequest | 
try {
    val result : InterfacesIERC1155MintableMint200Response = apiInstance.interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MintableApi#interfacesIERC1155MintableMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MintableApi#interfacesIERC1155MintableMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md)|  |

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MintableMintBatch"></a>
# **interfacesIERC1155MintableMintBatch**
> InterfacesIERC1155MintableMintBatch200Response interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest)

IERC1155Mintable.mintBatch

Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155MintableMintBatchRequest : InterfacesIERC1155MintableMintBatchRequest =  // InterfacesIERC1155MintableMintBatchRequest | 
try {
    val result : InterfacesIERC1155MintableMintBatch200Response = apiInstance.interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MintableApi#interfacesIERC1155MintableMintBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MintableApi#interfacesIERC1155MintableMintBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

