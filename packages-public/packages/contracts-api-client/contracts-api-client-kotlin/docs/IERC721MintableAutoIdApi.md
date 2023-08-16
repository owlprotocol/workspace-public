# IERC721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableAutoIdMint**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
[**interfacesIERC721MintableAutoIdMintBatch**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
[**interfacesIERC721MintableAutoIdSafeMint**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
[**interfacesIERC721MintableAutoIdSafeMintBatch**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch


<a id="interfacesIERC721MintableAutoIdMint"></a>
# **interfacesIERC721MintableAutoIdMint**
> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.mint

Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableAutoIdApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableAutoIdMintRequest : InterfacesIERC721MintableAutoIdMintRequest =  // InterfacesIERC721MintableAutoIdMintRequest | 
try {
    val result : InterfacesIERC721MintableAutoIdMint200Response = apiInstance.interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableAutoIdMintBatch"></a>
# **interfacesIERC721MintableAutoIdMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.mintBatch

Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableAutoIdApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableAutoIdMintBatchRequest : InterfacesIERC721MintableAutoIdMintBatchRequest =  // InterfacesIERC721MintableAutoIdMintBatchRequest | 
try {
    val result : InterfacesIERC721MintableAutoIdMintBatch200Response = apiInstance.interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMintBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMintBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableAutoIdSafeMint"></a>
# **interfacesIERC721MintableAutoIdSafeMint**
> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.safeMint

Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableAutoIdApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableAutoIdMintRequest : InterfacesIERC721MintableAutoIdMintRequest =  // InterfacesIERC721MintableAutoIdMintRequest | 
try {
    val result : InterfacesIERC721MintableAutoIdMint200Response = apiInstance.interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721MintableAutoIdSafeMintBatch"></a>
# **interfacesIERC721MintableAutoIdSafeMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.safeMintBatch

Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721MintableAutoIdApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721MintableAutoIdMintBatchRequest : InterfacesIERC721MintableAutoIdMintBatchRequest =  // InterfacesIERC721MintableAutoIdMintBatchRequest | 
try {
    val result : InterfacesIERC721MintableAutoIdMintBatch200Response = apiInstance.interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMintBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMintBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

