# IERC721MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableMint**](IERC721MintableApi.md#interfacesIERC721MintableMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
[**interfacesIERC721MintableMintBatch**](IERC721MintableApi.md#interfacesIERC721MintableMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
[**interfacesIERC721MintableSafeMint**](IERC721MintableApi.md#interfacesIERC721MintableSafeMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
[**interfacesIERC721MintableSafeMintBatch**](IERC721MintableApi.md#interfacesIERC721MintableSafeMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch


<a id="interfacesIERC721MintableMint"></a>
# **interfacesIERC721MintableMint**
> InterfacesIERC721Approve200Response interfacesIERC721MintableMint(networkId, address, interfacesIERC721ApproveRequest)

IERC721Mintable.mint

Write &#x60;mint(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721ApproveRequest : InterfacesIERC721ApproveRequest =  // InterfacesIERC721ApproveRequest | 
try {
    val result : InterfacesIERC721Approve200Response = apiInstance.interfacesIERC721MintableMint(networkId, address, interfacesIERC721ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableApi#interfacesIERC721MintableMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableApi#interfacesIERC721MintableMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md)|  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableMintBatch"></a>
# **interfacesIERC721MintableMintBatch**
> InterfacesIERC721MintableMintBatch200Response interfacesIERC721MintableMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.mintBatch

Write &#x60;mintBatch(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableMintBatchRequest : InterfacesIERC721MintableMintBatchRequest =  // InterfacesIERC721MintableMintBatchRequest | 
try {
    val result : InterfacesIERC721MintableMintBatch200Response = apiInstance.interfacesIERC721MintableMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableApi#interfacesIERC721MintableMintBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableApi#interfacesIERC721MintableMintBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableSafeMint"></a>
# **interfacesIERC721MintableSafeMint**
> InterfacesIERC721Approve200Response interfacesIERC721MintableSafeMint(networkId, address, interfacesIERC721ApproveRequest)

IERC721Mintable.safeMint

Write &#x60;safeMint(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721ApproveRequest : InterfacesIERC721ApproveRequest =  // InterfacesIERC721ApproveRequest | 
try {
    val result : InterfacesIERC721Approve200Response = apiInstance.interfacesIERC721MintableSafeMint(networkId, address, interfacesIERC721ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableApi#interfacesIERC721MintableSafeMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableApi#interfacesIERC721MintableSafeMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md)|  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableSafeMintBatch"></a>
# **interfacesIERC721MintableSafeMintBatch**
> InterfacesIERC721MintableMintBatch200Response interfacesIERC721MintableSafeMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.safeMintBatch

Write &#x60;safeMintBatch(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableMintBatchRequest : InterfacesIERC721MintableMintBatchRequest =  // InterfacesIERC721MintableMintBatchRequest | 
try {
    val result : InterfacesIERC721MintableMintBatch200Response = apiInstance.interfacesIERC721MintableSafeMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableApi#interfacesIERC721MintableSafeMintBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableApi#interfacesIERC721MintableSafeMintBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

