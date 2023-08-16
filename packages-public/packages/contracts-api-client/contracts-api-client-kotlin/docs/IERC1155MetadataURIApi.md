# IERC1155MetadataURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MetadataURIBalanceOf**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOf) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
[**interfacesIERC1155MetadataURIBalanceOfBatch**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOfBatch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
[**interfacesIERC1155MetadataURIIsApprovedForAll**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIIsApprovedForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll
[**interfacesIERC1155MetadataURISafeBatchTransferFrom**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
[**interfacesIERC1155MetadataURISafeTransferFrom**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
[**interfacesIERC1155MetadataURISetApprovalForAll**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISetApprovalForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
[**interfacesIERC1155MetadataURISupportsInterface**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISupportsInterface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
[**interfacesIERC1155MetadataURIUri**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIUri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri


<a id="interfacesIERC1155MetadataURIBalanceOf"></a>
# **interfacesIERC1155MetadataURIBalanceOf**
> InterfacesIERC1155BalanceOf200Response interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)

IERC1155MetadataURI.balanceOf

Read &#x60;balanceOf(account,id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155BalanceOfRequest : InterfacesIERC1155BalanceOfRequest =  // InterfacesIERC1155BalanceOfRequest | 
try {
    val result : InterfacesIERC1155BalanceOf200Response = apiInstance.interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOf")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md)|  |

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURIBalanceOfBatch"></a>
# **interfacesIERC1155MetadataURIBalanceOfBatch**
> InterfacesIERC1155BalanceOfBatch200Response interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)

IERC1155MetadataURI.balanceOfBatch

Read &#x60;balanceOfBatch(accounts,ids)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155BalanceOfBatchRequest : InterfacesIERC1155BalanceOfBatchRequest =  // InterfacesIERC1155BalanceOfBatchRequest | 
try {
    val result : InterfacesIERC1155BalanceOfBatch200Response = apiInstance.interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOfBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOfBatch")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md)|  |

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURIIsApprovedForAll"></a>
# **interfacesIERC1155MetadataURIIsApprovedForAll**
> InterfacesIERC1155IsApprovedForAll200Response interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)

IERC1155MetadataURI.isApprovedForAll

Read &#x60;isApprovedForAll(account,operator)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155IsApprovedForAllRequest : InterfacesIERC1155IsApprovedForAllRequest =  // InterfacesIERC1155IsApprovedForAllRequest | 
try {
    val result : InterfacesIERC1155IsApprovedForAll200Response = apiInstance.interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIIsApprovedForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIIsApprovedForAll")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md)|  |

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURISafeBatchTransferFrom"></a>
# **interfacesIERC1155MetadataURISafeBatchTransferFrom**
> InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155MetadataURI.safeBatchTransferFrom

Write &#x60;safeBatchTransferFrom(from,to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SafeBatchTransferFromRequest : InterfacesIERC1155SafeBatchTransferFromRequest =  // InterfacesIERC1155SafeBatchTransferFromRequest | 
try {
    val result : InterfacesIERC1155SafeBatchTransferFrom200Response = apiInstance.interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeBatchTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeBatchTransferFrom")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURISafeTransferFrom"></a>
# **interfacesIERC1155MetadataURISafeTransferFrom**
> InterfacesIERC1155SafeTransferFrom200Response interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)

IERC1155MetadataURI.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,id,amount,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SafeTransferFromRequest : InterfacesIERC1155SafeTransferFromRequest =  // InterfacesIERC1155SafeTransferFromRequest | 
try {
    val result : InterfacesIERC1155SafeTransferFrom200Response = apiInstance.interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeTransferFrom")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURISetApprovalForAll"></a>
# **interfacesIERC1155MetadataURISetApprovalForAll**
> InterfacesIERC1155SetApprovalForAll200Response interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)

IERC1155MetadataURI.setApprovalForAll

Write &#x60;setApprovalForAll(operator,approved)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SetApprovalForAllRequest : InterfacesIERC1155SetApprovalForAllRequest =  // InterfacesIERC1155SetApprovalForAllRequest | 
try {
    val result : InterfacesIERC1155SetApprovalForAll200Response = apiInstance.interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISetApprovalForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISetApprovalForAll")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md)|  |

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1155MetadataURISupportsInterface"></a>
# **interfacesIERC1155MetadataURISupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC1155MetadataURI.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISupportsInterface")
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

<a id="interfacesIERC1155MetadataURIUri"></a>
# **interfacesIERC1155MetadataURIUri**
> InterfacesIERC1155MetadataURIUri200Response interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest)

IERC1155MetadataURI.uri

Read &#x60;uri(id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155MetadataURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155MetadataURIUriRequest : InterfacesIERC1155MetadataURIUriRequest =  // InterfacesIERC1155MetadataURIUriRequest | 
try {
    val result : InterfacesIERC1155MetadataURIUri200Response = apiInstance.interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIUri")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIUri")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1155MetadataURIUriRequest** | [**InterfacesIERC1155MetadataURIUriRequest**](InterfacesIERC1155MetadataURIUriRequest.md)|  |

### Return type

[**InterfacesIERC1155MetadataURIUri200Response**](InterfacesIERC1155MetadataURIUri200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

