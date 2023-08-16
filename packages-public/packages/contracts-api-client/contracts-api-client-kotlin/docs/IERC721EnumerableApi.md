# IERC721EnumerableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721EnumerableApprove**](IERC721EnumerableApi.md#interfacesIERC721EnumerableApprove) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
[**interfacesIERC721EnumerableBalanceOf**](IERC721EnumerableApi.md#interfacesIERC721EnumerableBalanceOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
[**interfacesIERC721EnumerableGetApproved**](IERC721EnumerableApi.md#interfacesIERC721EnumerableGetApproved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
[**interfacesIERC721EnumerableIsApprovedForAll**](IERC721EnumerableApi.md#interfacesIERC721EnumerableIsApprovedForAll) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
[**interfacesIERC721EnumerableOwnerOf**](IERC721EnumerableApi.md#interfacesIERC721EnumerableOwnerOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
[**interfacesIERC721EnumerableSafeTransferFrom**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSafeTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
[**interfacesIERC721EnumerableSetApprovalForAll**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSetApprovalForAll) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
[**interfacesIERC721EnumerableSupportsInterface**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSupportsInterface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
[**interfacesIERC721EnumerableTokenByIndex**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
[**interfacesIERC721EnumerableTokenOfOwnerByIndex**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenOfOwnerByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
[**interfacesIERC721EnumerableTotalSupply**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTotalSupply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
[**interfacesIERC721EnumerableTransferFrom**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom


<a id="interfacesIERC721EnumerableApprove"></a>
# **interfacesIERC721EnumerableApprove**
> InterfacesIERC721Approve200Response interfacesIERC721EnumerableApprove(networkId, address, interfacesIERC721ApproveRequest)

IERC721Enumerable.approve

Write &#x60;approve(to,tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721ApproveRequest : InterfacesIERC721ApproveRequest =  // InterfacesIERC721ApproveRequest | 
try {
    val result : InterfacesIERC721Approve200Response = apiInstance.interfacesIERC721EnumerableApprove(networkId, address, interfacesIERC721ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableApprove")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableApprove")
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

<a id="interfacesIERC721EnumerableBalanceOf"></a>
# **interfacesIERC721EnumerableBalanceOf**
> InterfacesIERC721BalanceOf200Response interfacesIERC721EnumerableBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)

IERC721Enumerable.balanceOf

Read &#x60;balanceOf(owner)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721BalanceOfRequest : InterfacesIERC721BalanceOfRequest =  // InterfacesIERC721BalanceOfRequest | 
try {
    val result : InterfacesIERC721BalanceOf200Response = apiInstance.interfacesIERC721EnumerableBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableBalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableBalanceOf")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721BalanceOfRequest** | [**InterfacesIERC721BalanceOfRequest**](InterfacesIERC721BalanceOfRequest.md)|  |

### Return type

[**InterfacesIERC721BalanceOf200Response**](InterfacesIERC721BalanceOf200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableGetApproved"></a>
# **interfacesIERC721EnumerableGetApproved**
> InterfacesIERC721GetApproved200Response interfacesIERC721EnumerableGetApproved(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Enumerable.getApproved

Read &#x60;getApproved(tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesIERC721GetApproved200Response = apiInstance.interfacesIERC721EnumerableGetApproved(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableGetApproved")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableGetApproved")
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

[**InterfacesIERC721GetApproved200Response**](InterfacesIERC721GetApproved200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableIsApprovedForAll"></a>
# **interfacesIERC721EnumerableIsApprovedForAll**
> InterfacesIERC721IsApprovedForAll200Response interfacesIERC721EnumerableIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)

IERC721Enumerable.isApprovedForAll

Read &#x60;isApprovedForAll(owner,operator)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721IsApprovedForAllRequest : InterfacesIERC721IsApprovedForAllRequest =  // InterfacesIERC721IsApprovedForAllRequest | 
try {
    val result : InterfacesIERC721IsApprovedForAll200Response = apiInstance.interfacesIERC721EnumerableIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableIsApprovedForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableIsApprovedForAll")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721IsApprovedForAllRequest** | [**InterfacesIERC721IsApprovedForAllRequest**](InterfacesIERC721IsApprovedForAllRequest.md)|  |

### Return type

[**InterfacesIERC721IsApprovedForAll200Response**](InterfacesIERC721IsApprovedForAll200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableOwnerOf"></a>
# **interfacesIERC721EnumerableOwnerOf**
> InterfacesIERC721OwnerOf200Response interfacesIERC721EnumerableOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Enumerable.ownerOf

Read &#x60;ownerOf(tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesIERC721OwnerOf200Response = apiInstance.interfacesIERC721EnumerableOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableOwnerOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableOwnerOf")
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

[**InterfacesIERC721OwnerOf200Response**](InterfacesIERC721OwnerOf200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableSafeTransferFrom"></a>
# **interfacesIERC721EnumerableSafeTransferFrom**
> InterfacesIERC721SafeTransferFrom200Response interfacesIERC721EnumerableSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)

IERC721Enumerable.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,tokenId,data)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721SafeTransferFromRequest : InterfacesIERC721SafeTransferFromRequest =  // InterfacesIERC721SafeTransferFromRequest | 
try {
    val result : InterfacesIERC721SafeTransferFrom200Response = apiInstance.interfacesIERC721EnumerableSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSafeTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSafeTransferFrom")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721SafeTransferFromRequest** | [**InterfacesIERC721SafeTransferFromRequest**](InterfacesIERC721SafeTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC721SafeTransferFrom200Response**](InterfacesIERC721SafeTransferFrom200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableSetApprovalForAll"></a>
# **interfacesIERC721EnumerableSetApprovalForAll**
> InterfacesIERC721SetApprovalForAll200Response interfacesIERC721EnumerableSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)

IERC721Enumerable.setApprovalForAll

Write &#x60;setApprovalForAll(operator,_approved)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721SetApprovalForAllRequest : InterfacesIERC721SetApprovalForAllRequest =  // InterfacesIERC721SetApprovalForAllRequest | 
try {
    val result : InterfacesIERC721SetApprovalForAll200Response = apiInstance.interfacesIERC721EnumerableSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSetApprovalForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSetApprovalForAll")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721SetApprovalForAllRequest** | [**InterfacesIERC721SetApprovalForAllRequest**](InterfacesIERC721SetApprovalForAllRequest.md)|  |

### Return type

[**InterfacesIERC721SetApprovalForAll200Response**](InterfacesIERC721SetApprovalForAll200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableSupportsInterface"></a>
# **interfacesIERC721EnumerableSupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC721EnumerableSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC721Enumerable.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC721EnumerableSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableSupportsInterface")
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

<a id="interfacesIERC721EnumerableTokenByIndex"></a>
# **interfacesIERC721EnumerableTokenByIndex**
> InterfacesIERC721EnumerableTokenByIndex200Response interfacesIERC721EnumerableTokenByIndex(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest)

IERC721Enumerable.tokenByIndex

Read &#x60;tokenByIndex(index)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721EnumerableTokenByIndexRequest : InterfacesIERC721EnumerableTokenByIndexRequest =  // InterfacesIERC721EnumerableTokenByIndexRequest | 
try {
    val result : InterfacesIERC721EnumerableTokenByIndex200Response = apiInstance.interfacesIERC721EnumerableTokenByIndex(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenByIndex")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenByIndex")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721EnumerableTokenByIndexRequest** | [**InterfacesIERC721EnumerableTokenByIndexRequest**](InterfacesIERC721EnumerableTokenByIndexRequest.md)|  |

### Return type

[**InterfacesIERC721EnumerableTokenByIndex200Response**](InterfacesIERC721EnumerableTokenByIndex200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableTokenOfOwnerByIndex"></a>
# **interfacesIERC721EnumerableTokenOfOwnerByIndex**
> InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest)

IERC721Enumerable.tokenOfOwnerByIndex

Read &#x60;tokenOfOwnerByIndex(owner,index)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721EnumerableTokenOfOwnerByIndexRequest : InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest =  // InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest | 
try {
    val result : InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response = apiInstance.interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenOfOwnerByIndex")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenOfOwnerByIndex")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721EnumerableTokenOfOwnerByIndexRequest** | [**InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md)|  |

### Return type

[**InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response**](InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableTotalSupply"></a>
# **interfacesIERC721EnumerableTotalSupply**
> InterfacesIERC20TotalSupply200Response interfacesIERC721EnumerableTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC721Enumerable.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIERC20TotalSupply200Response = apiInstance.interfacesIERC721EnumerableTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTotalSupply")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTotalSupply")
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

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC721EnumerableTransferFrom"></a>
# **interfacesIERC721EnumerableTransferFrom**
> InterfacesIERC721TransferFrom200Response interfacesIERC721EnumerableTransferFrom(networkId, address, interfacesIERC721TransferFromRequest)

IERC721Enumerable.transferFrom

Write &#x60;transferFrom(from,to,tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721EnumerableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721TransferFromRequest : InterfacesIERC721TransferFromRequest =  // InterfacesIERC721TransferFromRequest | 
try {
    val result : InterfacesIERC721TransferFrom200Response = apiInstance.interfacesIERC721EnumerableTransferFrom(networkId, address, interfacesIERC721TransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721EnumerableApi#interfacesIERC721EnumerableTransferFrom")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721TransferFromRequest** | [**InterfacesIERC721TransferFromRequest**](InterfacesIERC721TransferFromRequest.md)|  |

### Return type

[**InterfacesIERC721TransferFrom200Response**](InterfacesIERC721TransferFrom200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

