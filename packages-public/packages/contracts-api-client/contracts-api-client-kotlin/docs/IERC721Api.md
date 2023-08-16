# IERC721Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721Approve**](IERC721Api.md#interfacesIERC721Approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
[**interfacesIERC721BalanceOf**](IERC721Api.md#interfacesIERC721BalanceOf) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
[**interfacesIERC721GetApproved**](IERC721Api.md#interfacesIERC721GetApproved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
[**interfacesIERC721IsApprovedForAll**](IERC721Api.md#interfacesIERC721IsApprovedForAll) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
[**interfacesIERC721OwnerOf**](IERC721Api.md#interfacesIERC721OwnerOf) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
[**interfacesIERC721SafeTransferFrom**](IERC721Api.md#interfacesIERC721SafeTransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
[**interfacesIERC721SetApprovalForAll**](IERC721Api.md#interfacesIERC721SetApprovalForAll) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
[**interfacesIERC721SupportsInterface**](IERC721Api.md#interfacesIERC721SupportsInterface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
[**interfacesIERC721TransferFrom**](IERC721Api.md#interfacesIERC721TransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom


<a id="interfacesIERC721Approve"></a>
# **interfacesIERC721Approve**
> InterfacesIERC721Approve200Response interfacesIERC721Approve(networkId, address, interfacesIERC721ApproveRequest)

IERC721.approve

Write &#x60;approve(to,tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721ApproveRequest : InterfacesIERC721ApproveRequest =  // InterfacesIERC721ApproveRequest | 
try {
    val result : InterfacesIERC721Approve200Response = apiInstance.interfacesIERC721Approve(networkId, address, interfacesIERC721ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721Approve")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721Approve")
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

<a id="interfacesIERC721BalanceOf"></a>
# **interfacesIERC721BalanceOf**
> InterfacesIERC721BalanceOf200Response interfacesIERC721BalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)

IERC721.balanceOf

Read &#x60;balanceOf(owner)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721BalanceOfRequest : InterfacesIERC721BalanceOfRequest =  // InterfacesIERC721BalanceOfRequest | 
try {
    val result : InterfacesIERC721BalanceOf200Response = apiInstance.interfacesIERC721BalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721BalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721BalanceOf")
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

<a id="interfacesIERC721GetApproved"></a>
# **interfacesIERC721GetApproved**
> InterfacesIERC721GetApproved200Response interfacesIERC721GetApproved(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721.getApproved

Read &#x60;getApproved(tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesIERC721GetApproved200Response = apiInstance.interfacesIERC721GetApproved(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721GetApproved")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721GetApproved")
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

<a id="interfacesIERC721IsApprovedForAll"></a>
# **interfacesIERC721IsApprovedForAll**
> InterfacesIERC721IsApprovedForAll200Response interfacesIERC721IsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)

IERC721.isApprovedForAll

Read &#x60;isApprovedForAll(owner,operator)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721IsApprovedForAllRequest : InterfacesIERC721IsApprovedForAllRequest =  // InterfacesIERC721IsApprovedForAllRequest | 
try {
    val result : InterfacesIERC721IsApprovedForAll200Response = apiInstance.interfacesIERC721IsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721IsApprovedForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721IsApprovedForAll")
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

<a id="interfacesIERC721OwnerOf"></a>
# **interfacesIERC721OwnerOf**
> InterfacesIERC721OwnerOf200Response interfacesIERC721OwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721.ownerOf

Read &#x60;ownerOf(tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesIERC721OwnerOf200Response = apiInstance.interfacesIERC721OwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721OwnerOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721OwnerOf")
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

<a id="interfacesIERC721SafeTransferFrom"></a>
# **interfacesIERC721SafeTransferFrom**
> InterfacesIERC721SafeTransferFrom200Response interfacesIERC721SafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)

IERC721.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,tokenId,data)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721SafeTransferFromRequest : InterfacesIERC721SafeTransferFromRequest =  // InterfacesIERC721SafeTransferFromRequest | 
try {
    val result : InterfacesIERC721SafeTransferFrom200Response = apiInstance.interfacesIERC721SafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721SafeTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721SafeTransferFrom")
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

<a id="interfacesIERC721SetApprovalForAll"></a>
# **interfacesIERC721SetApprovalForAll**
> InterfacesIERC721SetApprovalForAll200Response interfacesIERC721SetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)

IERC721.setApprovalForAll

Write &#x60;setApprovalForAll(operator,_approved)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721SetApprovalForAllRequest : InterfacesIERC721SetApprovalForAllRequest =  // InterfacesIERC721SetApprovalForAllRequest | 
try {
    val result : InterfacesIERC721SetApprovalForAll200Response = apiInstance.interfacesIERC721SetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721SetApprovalForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721SetApprovalForAll")
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

<a id="interfacesIERC721SupportsInterface"></a>
# **interfacesIERC721SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC721SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC721.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC721SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721SupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721SupportsInterface")
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

<a id="interfacesIERC721TransferFrom"></a>
# **interfacesIERC721TransferFrom**
> InterfacesIERC721TransferFrom200Response interfacesIERC721TransferFrom(networkId, address, interfacesIERC721TransferFromRequest)

IERC721.transferFrom

Write &#x60;transferFrom(from,to,tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC721Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721TransferFromRequest : InterfacesIERC721TransferFromRequest =  // InterfacesIERC721TransferFromRequest | 
try {
    val result : InterfacesIERC721TransferFrom200Response = apiInstance.interfacesIERC721TransferFrom(networkId, address, interfacesIERC721TransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC721Api#interfacesIERC721TransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC721Api#interfacesIERC721TransferFrom")
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

