# IERC1155Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155BalanceOf**](IERC1155Api.md#interfacesIERC1155BalanceOf) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf
[**interfacesIERC1155BalanceOfBatch**](IERC1155Api.md#interfacesIERC1155BalanceOfBatch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch
[**interfacesIERC1155IsApprovedForAll**](IERC1155Api.md#interfacesIERC1155IsApprovedForAll) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll
[**interfacesIERC1155SafeBatchTransferFrom**](IERC1155Api.md#interfacesIERC1155SafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom
[**interfacesIERC1155SafeTransferFrom**](IERC1155Api.md#interfacesIERC1155SafeTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom
[**interfacesIERC1155SetApprovalForAll**](IERC1155Api.md#interfacesIERC1155SetApprovalForAll) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll
[**interfacesIERC1155SupportsInterface**](IERC1155Api.md#interfacesIERC1155SupportsInterface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface


<a id="interfacesIERC1155BalanceOf"></a>
# **interfacesIERC1155BalanceOf**
> InterfacesIERC1155BalanceOf200Response interfacesIERC1155BalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)

IERC1155.balanceOf

Read &#x60;balanceOf(account,id)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155BalanceOfRequest : InterfacesIERC1155BalanceOfRequest =  // InterfacesIERC1155BalanceOfRequest | 
try {
    val result : InterfacesIERC1155BalanceOf200Response = apiInstance.interfacesIERC1155BalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155BalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155BalanceOf")
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

<a id="interfacesIERC1155BalanceOfBatch"></a>
# **interfacesIERC1155BalanceOfBatch**
> InterfacesIERC1155BalanceOfBatch200Response interfacesIERC1155BalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)

IERC1155.balanceOfBatch

Read &#x60;balanceOfBatch(accounts,ids)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155BalanceOfBatchRequest : InterfacesIERC1155BalanceOfBatchRequest =  // InterfacesIERC1155BalanceOfBatchRequest | 
try {
    val result : InterfacesIERC1155BalanceOfBatch200Response = apiInstance.interfacesIERC1155BalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155BalanceOfBatch")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155BalanceOfBatch")
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

<a id="interfacesIERC1155IsApprovedForAll"></a>
# **interfacesIERC1155IsApprovedForAll**
> InterfacesIERC1155IsApprovedForAll200Response interfacesIERC1155IsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)

IERC1155.isApprovedForAll

Read &#x60;isApprovedForAll(account,operator)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155IsApprovedForAllRequest : InterfacesIERC1155IsApprovedForAllRequest =  // InterfacesIERC1155IsApprovedForAllRequest | 
try {
    val result : InterfacesIERC1155IsApprovedForAll200Response = apiInstance.interfacesIERC1155IsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155IsApprovedForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155IsApprovedForAll")
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

<a id="interfacesIERC1155SafeBatchTransferFrom"></a>
# **interfacesIERC1155SafeBatchTransferFrom**
> InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155SafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155.safeBatchTransferFrom

Write &#x60;safeBatchTransferFrom(from,to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SafeBatchTransferFromRequest : InterfacesIERC1155SafeBatchTransferFromRequest =  // InterfacesIERC1155SafeBatchTransferFromRequest | 
try {
    val result : InterfacesIERC1155SafeBatchTransferFrom200Response = apiInstance.interfacesIERC1155SafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155SafeBatchTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155SafeBatchTransferFrom")
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

<a id="interfacesIERC1155SafeTransferFrom"></a>
# **interfacesIERC1155SafeTransferFrom**
> InterfacesIERC1155SafeTransferFrom200Response interfacesIERC1155SafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)

IERC1155.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,id,amount,data)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SafeTransferFromRequest : InterfacesIERC1155SafeTransferFromRequest =  // InterfacesIERC1155SafeTransferFromRequest | 
try {
    val result : InterfacesIERC1155SafeTransferFrom200Response = apiInstance.interfacesIERC1155SafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155SafeTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155SafeTransferFrom")
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

<a id="interfacesIERC1155SetApprovalForAll"></a>
# **interfacesIERC1155SetApprovalForAll**
> InterfacesIERC1155SetApprovalForAll200Response interfacesIERC1155SetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)

IERC1155.setApprovalForAll

Write &#x60;setApprovalForAll(operator,approved)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1155SetApprovalForAllRequest : InterfacesIERC1155SetApprovalForAllRequest =  // InterfacesIERC1155SetApprovalForAllRequest | 
try {
    val result : InterfacesIERC1155SetApprovalForAll200Response = apiInstance.interfacesIERC1155SetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155SetApprovalForAll")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155SetApprovalForAll")
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

<a id="interfacesIERC1155SupportsInterface"></a>
# **interfacesIERC1155SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC1155SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC1155.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1155Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC1155SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1155Api#interfacesIERC1155SupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1155Api#interfacesIERC1155SupportsInterface")
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

