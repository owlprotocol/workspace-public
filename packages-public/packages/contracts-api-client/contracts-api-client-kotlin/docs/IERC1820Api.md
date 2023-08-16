# IERC1820Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1820GetInterfaceImplementer**](IERC1820Api.md#interfacesIERC1820GetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer
[**interfacesIERC1820GetManager**](IERC1820Api.md#interfacesIERC1820GetManager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager
[**interfacesIERC1820ImplementsERC165Interface**](IERC1820Api.md#interfacesIERC1820ImplementsERC165Interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface
[**interfacesIERC1820ImplementsERC165InterfaceNoCache**](IERC1820Api.md#interfacesIERC1820ImplementsERC165InterfaceNoCache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache
[**interfacesIERC1820InterfaceHash**](IERC1820Api.md#interfacesIERC1820InterfaceHash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash
[**interfacesIERC1820SetInterfaceImplementer**](IERC1820Api.md#interfacesIERC1820SetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer
[**interfacesIERC1820SetManager**](IERC1820Api.md#interfacesIERC1820SetManager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager
[**interfacesIERC1820UpdateERC165Cache**](IERC1820Api.md#interfacesIERC1820UpdateERC165Cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache


<a id="interfacesIERC1820GetInterfaceImplementer"></a>
# **interfacesIERC1820GetInterfaceImplementer**
> InterfacesIERC1820GetInterfaceImplementer200Response interfacesIERC1820GetInterfaceImplementer(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest)

IERC1820.getInterfaceImplementer

Read &#x60;getInterfaceImplementer(account,_interfaceHash)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820GetInterfaceImplementerRequest : InterfacesIERC1820GetInterfaceImplementerRequest =  // InterfacesIERC1820GetInterfaceImplementerRequest | 
try {
    val result : InterfacesIERC1820GetInterfaceImplementer200Response = apiInstance.interfacesIERC1820GetInterfaceImplementer(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820GetInterfaceImplementer")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820GetInterfaceImplementer")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820GetInterfaceImplementerRequest** | [**InterfacesIERC1820GetInterfaceImplementerRequest**](InterfacesIERC1820GetInterfaceImplementerRequest.md)|  |

### Return type

[**InterfacesIERC1820GetInterfaceImplementer200Response**](InterfacesIERC1820GetInterfaceImplementer200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820GetManager"></a>
# **interfacesIERC1820GetManager**
> InterfacesIERC1820GetManager200Response interfacesIERC1820GetManager(networkId, address, interfacesIERC1820GetManagerRequest)

IERC1820.getManager

Read &#x60;getManager(account)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820GetManagerRequest : InterfacesIERC1820GetManagerRequest =  // InterfacesIERC1820GetManagerRequest | 
try {
    val result : InterfacesIERC1820GetManager200Response = apiInstance.interfacesIERC1820GetManager(networkId, address, interfacesIERC1820GetManagerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820GetManager")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820GetManager")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md)|  |

### Return type

[**InterfacesIERC1820GetManager200Response**](InterfacesIERC1820GetManager200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820ImplementsERC165Interface"></a>
# **interfacesIERC1820ImplementsERC165Interface**
> InterfacesIERC1820ImplementsERC165Interface200Response interfacesIERC1820ImplementsERC165Interface(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165Interface

Read &#x60;implementsERC165Interface(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820ImplementsERC165InterfaceRequest : InterfacesIERC1820ImplementsERC165InterfaceRequest =  // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
try {
    val result : InterfacesIERC1820ImplementsERC165Interface200Response = apiInstance.interfacesIERC1820ImplementsERC165Interface(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820ImplementsERC165Interface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820ImplementsERC165Interface")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  |

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820ImplementsERC165InterfaceNoCache"></a>
# **interfacesIERC1820ImplementsERC165InterfaceNoCache**
> InterfacesIERC1820ImplementsERC165Interface200Response interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165InterfaceNoCache

Read &#x60;implementsERC165InterfaceNoCache(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820ImplementsERC165InterfaceRequest : InterfacesIERC1820ImplementsERC165InterfaceRequest =  // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
try {
    val result : InterfacesIERC1820ImplementsERC165Interface200Response = apiInstance.interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820ImplementsERC165InterfaceNoCache")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820ImplementsERC165InterfaceNoCache")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  |

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820InterfaceHash"></a>
# **interfacesIERC1820InterfaceHash**
> InterfacesIERC1820InterfaceHash200Response interfacesIERC1820InterfaceHash(networkId, address, interfacesIERC1820InterfaceHashRequest)

IERC1820.interfaceHash

Read &#x60;interfaceHash(interfaceName)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820InterfaceHashRequest : InterfacesIERC1820InterfaceHashRequest =  // InterfacesIERC1820InterfaceHashRequest | 
try {
    val result : InterfacesIERC1820InterfaceHash200Response = apiInstance.interfacesIERC1820InterfaceHash(networkId, address, interfacesIERC1820InterfaceHashRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820InterfaceHash")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820InterfaceHash")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820InterfaceHashRequest** | [**InterfacesIERC1820InterfaceHashRequest**](InterfacesIERC1820InterfaceHashRequest.md)|  |

### Return type

[**InterfacesIERC1820InterfaceHash200Response**](InterfacesIERC1820InterfaceHash200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820SetInterfaceImplementer"></a>
# **interfacesIERC1820SetInterfaceImplementer**
> InterfacesIERC1820SetInterfaceImplementer200Response interfacesIERC1820SetInterfaceImplementer(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest)

IERC1820.setInterfaceImplementer

Write &#x60;setInterfaceImplementer(account,_interfaceHash,implementer)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820SetInterfaceImplementerRequest : InterfacesIERC1820SetInterfaceImplementerRequest =  // InterfacesIERC1820SetInterfaceImplementerRequest | 
try {
    val result : InterfacesIERC1820SetInterfaceImplementer200Response = apiInstance.interfacesIERC1820SetInterfaceImplementer(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820SetInterfaceImplementer")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820SetInterfaceImplementer")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820SetInterfaceImplementerRequest** | [**InterfacesIERC1820SetInterfaceImplementerRequest**](InterfacesIERC1820SetInterfaceImplementerRequest.md)|  |

### Return type

[**InterfacesIERC1820SetInterfaceImplementer200Response**](InterfacesIERC1820SetInterfaceImplementer200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820SetManager"></a>
# **interfacesIERC1820SetManager**
> InterfacesIERC1820SetManager200Response interfacesIERC1820SetManager(networkId, address, interfacesIERC1820SetManagerRequest)

IERC1820.setManager

Write &#x60;setManager(account,newManager)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820SetManagerRequest : InterfacesIERC1820SetManagerRequest =  // InterfacesIERC1820SetManagerRequest | 
try {
    val result : InterfacesIERC1820SetManager200Response = apiInstance.interfacesIERC1820SetManager(networkId, address, interfacesIERC1820SetManagerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820SetManager")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820SetManager")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820SetManagerRequest** | [**InterfacesIERC1820SetManagerRequest**](InterfacesIERC1820SetManagerRequest.md)|  |

### Return type

[**InterfacesIERC1820SetManager200Response**](InterfacesIERC1820SetManager200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC1820UpdateERC165Cache"></a>
# **interfacesIERC1820UpdateERC165Cache**
> InterfacesIERC1820UpdateERC165Cache200Response interfacesIERC1820UpdateERC165Cache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.updateERC165Cache

Write &#x60;updateERC165Cache(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC1820Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820ImplementsERC165InterfaceRequest : InterfacesIERC1820ImplementsERC165InterfaceRequest =  // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
try {
    val result : InterfacesIERC1820UpdateERC165Cache200Response = apiInstance.interfacesIERC1820UpdateERC165Cache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC1820Api#interfacesIERC1820UpdateERC165Cache")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC1820Api#interfacesIERC1820UpdateERC165Cache")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  |

### Return type

[**InterfacesIERC1820UpdateERC165Cache200Response**](InterfacesIERC1820UpdateERC165Cache200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

