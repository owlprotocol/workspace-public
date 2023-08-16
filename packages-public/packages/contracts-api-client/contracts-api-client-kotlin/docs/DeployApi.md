# DeployApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deployBeaconProxy**](DeployApi.md#deployBeaconProxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy
[**deployChainlinkAnyApiClient**](DeployApi.md#deployChainlinkAnyApiClient) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient
[**deployERC1155Mintable**](DeployApi.md#deployERC1155Mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable
[**deployERC20Mintable**](DeployApi.md#deployERC20Mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable
[**deployERC2981Setter**](DeployApi.md#deployERC2981Setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter
[**deployERC721Mintable**](DeployApi.md#deployERC721Mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable
[**deployERC721MintableAutoId**](DeployApi.md#deployERC721MintableAutoId) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId
[**deployTokenDna**](DeployApi.md#deployTokenDna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna
[**deployTokenURI**](DeployApi.md#deployTokenURI) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI
[**deployTokenURIBaseURI**](DeployApi.md#deployTokenURIBaseURI) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI
[**deployTokenURIDna**](DeployApi.md#deployTokenURIDna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna
[**deployUpgradeableBeacon**](DeployApi.md#deployUpgradeableBeacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon


<a id="deployBeaconProxy"></a>
# **deployBeaconProxy**
> kotlin.Any deployBeaconProxy(networkId, deployBeaconProxyRequest)

Deploy BeaconProxy

Deploys an instance of &#x60;BeaconProxy&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployBeaconProxyRequest : DeployBeaconProxyRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployBeaconProxyRequest | 
try {
    val result : kotlin.Any = apiInstance.deployBeaconProxy(networkId, deployBeaconProxyRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployBeaconProxy")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployBeaconProxy")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployChainlinkAnyApiClient"></a>
# **deployChainlinkAnyApiClient**
> kotlin.Any deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest)

Deploy ChainlinkAnyApiClient

Deploys an instance of &#x60;ChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployChainlinkAnyApiClientRequest : DeployChainlinkAnyApiClientRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployChainlinkAnyApiClientRequest | 
try {
    val result : kotlin.Any = apiInstance.deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployChainlinkAnyApiClient")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployChainlinkAnyApiClient")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployERC1155Mintable"></a>
# **deployERC1155Mintable**
> kotlin.Any deployERC1155Mintable(networkId, deployERC1155MintableRequest)

Deploy ERC1155Mintable

Deploys an instance of &#x60;ERC1155Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployERC1155MintableRequest : DeployERC1155MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployERC1155MintableRequest | 
try {
    val result : kotlin.Any = apiInstance.deployERC1155Mintable(networkId, deployERC1155MintableRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployERC1155Mintable")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployERC1155Mintable")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployERC20Mintable"></a>
# **deployERC20Mintable**
> kotlin.Any deployERC20Mintable(networkId, deployERC20MintableRequest)

Deploy ERC20Mintable

Deploys an instance of &#x60;ERC20Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployERC20MintableRequest : DeployERC20MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployERC20MintableRequest | 
try {
    val result : kotlin.Any = apiInstance.deployERC20Mintable(networkId, deployERC20MintableRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployERC20Mintable")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployERC20Mintable")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployERC2981Setter"></a>
# **deployERC2981Setter**
> kotlin.Any deployERC2981Setter(networkId, deployERC2981SetterRequest)

Deploy ERC2981Setter

Deploys an instance of &#x60;ERC2981Setter&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployERC2981SetterRequest : DeployERC2981SetterRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployERC2981SetterRequest | 
try {
    val result : kotlin.Any = apiInstance.deployERC2981Setter(networkId, deployERC2981SetterRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployERC2981Setter")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployERC2981Setter")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployERC721Mintable"></a>
# **deployERC721Mintable**
> kotlin.Any deployERC721Mintable(networkId, deployERC721MintableRequest)

Deploy ERC721Mintable

Deploys an instance of &#x60;ERC721Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployERC721MintableRequest : DeployERC721MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployERC721MintableRequest | 
try {
    val result : kotlin.Any = apiInstance.deployERC721Mintable(networkId, deployERC721MintableRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployERC721Mintable")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployERC721Mintable")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployERC721MintableAutoId"></a>
# **deployERC721MintableAutoId**
> kotlin.Any deployERC721MintableAutoId(networkId, deployERC721MintableRequest)

Deploy ERC721MintableAutoId

Deploys an instance of &#x60;ERC721MintableAutoId&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployERC721MintableRequest : DeployERC721MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployERC721MintableRequest | 
try {
    val result : kotlin.Any = apiInstance.deployERC721MintableAutoId(networkId, deployERC721MintableRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployERC721MintableAutoId")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployERC721MintableAutoId")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployTokenDna"></a>
# **deployTokenDna**
> kotlin.Any deployTokenDna(networkId, deployTokenDnaRequest)

Deploy TokenDna

Deploys an instance of &#x60;TokenDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployTokenDnaRequest : DeployTokenDnaRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployTokenDnaRequest | 
try {
    val result : kotlin.Any = apiInstance.deployTokenDna(networkId, deployTokenDnaRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployTokenDna")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployTokenDna")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployTokenURI"></a>
# **deployTokenURI**
> kotlin.Any deployTokenURI(networkId, deployTokenURIRequest)

Deploy TokenURI

Deploys an instance of &#x60;TokenURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployTokenURIRequest : DeployTokenURIRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployTokenURIRequest | 
try {
    val result : kotlin.Any = apiInstance.deployTokenURI(networkId, deployTokenURIRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployTokenURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployTokenURI")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployTokenURIBaseURI"></a>
# **deployTokenURIBaseURI**
> kotlin.Any deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest)

Deploy TokenURIBaseURI

Deploys an instance of &#x60;TokenURIBaseURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployTokenURIBaseURIRequest : DeployTokenURIBaseURIRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployTokenURIBaseURIRequest | 
try {
    val result : kotlin.Any = apiInstance.deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployTokenURIBaseURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployTokenURIBaseURI")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployTokenURIDna"></a>
# **deployTokenURIDna**
> kotlin.Any deployTokenURIDna(networkId, deployTokenURIDnaRequest)

Deploy TokenURIDna

Deploys an instance of &#x60;TokenURIDna&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployTokenURIDnaRequest : DeployTokenURIDnaRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployTokenURIDnaRequest | 
try {
    val result : kotlin.Any = apiInstance.deployTokenURIDna(networkId, deployTokenURIDnaRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployTokenURIDna")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployTokenURIDna")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="deployUpgradeableBeacon"></a>
# **deployUpgradeableBeacon**
> kotlin.Any deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest)

Deploy UpgradeableBeacon

Deploys an instance of &#x60;UpgradeableBeacon&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = DeployApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val deployUpgradeableBeaconRequest : DeployUpgradeableBeaconRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}} // DeployUpgradeableBeaconRequest | 
try {
    val result : kotlin.Any = apiInstance.deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DeployApi#deployUpgradeableBeacon")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DeployApi#deployUpgradeableBeacon")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md)|  |

### Return type

[**kotlin.Any**](kotlin.Any.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

