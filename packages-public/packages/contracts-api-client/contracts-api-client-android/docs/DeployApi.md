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



## deployBeaconProxy

> OasAnyTypeNotMapped deployBeaconProxy(networkId, deployBeaconProxyRequest)

Deploy BeaconProxy

Deploys an instance of &#x60;BeaconProxy&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployBeaconProxyRequest deployBeaconProxyRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployBeaconProxyRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployBeaconProxy(networkId, deployBeaconProxyRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployBeaconProxy");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployChainlinkAnyApiClient

> OasAnyTypeNotMapped deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest)

Deploy ChainlinkAnyApiClient

Deploys an instance of &#x60;ChainlinkAnyApiClient&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployChainlinkAnyApiClientRequest deployChainlinkAnyApiClientRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployChainlinkAnyApiClientRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployChainlinkAnyApiClient");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployERC1155Mintable

> OasAnyTypeNotMapped deployERC1155Mintable(networkId, deployERC1155MintableRequest)

Deploy ERC1155Mintable

Deploys an instance of &#x60;ERC1155Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployERC1155MintableRequest deployERC1155MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployERC1155MintableRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployERC1155Mintable(networkId, deployERC1155MintableRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployERC1155Mintable");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployERC20Mintable

> OasAnyTypeNotMapped deployERC20Mintable(networkId, deployERC20MintableRequest)

Deploy ERC20Mintable

Deploys an instance of &#x60;ERC20Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployERC20MintableRequest deployERC20MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployERC20MintableRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployERC20Mintable(networkId, deployERC20MintableRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployERC20Mintable");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployERC2981Setter

> OasAnyTypeNotMapped deployERC2981Setter(networkId, deployERC2981SetterRequest)

Deploy ERC2981Setter

Deploys an instance of &#x60;ERC2981Setter&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployERC2981SetterRequest deployERC2981SetterRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployERC2981SetterRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployERC2981Setter(networkId, deployERC2981SetterRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployERC2981Setter");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployERC721Mintable

> OasAnyTypeNotMapped deployERC721Mintable(networkId, deployERC721MintableRequest)

Deploy ERC721Mintable

Deploys an instance of &#x60;ERC721Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployERC721MintableRequest deployERC721MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployERC721MintableRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployERC721Mintable(networkId, deployERC721MintableRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployERC721Mintable");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployERC721MintableAutoId

> OasAnyTypeNotMapped deployERC721MintableAutoId(networkId, deployERC721MintableRequest)

Deploy ERC721MintableAutoId

Deploys an instance of &#x60;ERC721MintableAutoId&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployERC721MintableRequest deployERC721MintableRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployERC721MintableRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployERC721MintableAutoId(networkId, deployERC721MintableRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployERC721MintableAutoId");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployTokenDna

> OasAnyTypeNotMapped deployTokenDna(networkId, deployTokenDnaRequest)

Deploy TokenDna

Deploys an instance of &#x60;TokenDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployTokenDnaRequest deployTokenDnaRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployTokenDnaRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployTokenDna(networkId, deployTokenDnaRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployTokenDna");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployTokenURI

> OasAnyTypeNotMapped deployTokenURI(networkId, deployTokenURIRequest)

Deploy TokenURI

Deploys an instance of &#x60;TokenURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployTokenURIRequest deployTokenURIRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployTokenURIRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployTokenURI(networkId, deployTokenURIRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployTokenURI");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployTokenURIBaseURI

> OasAnyTypeNotMapped deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest)

Deploy TokenURIBaseURI

Deploys an instance of &#x60;TokenURIBaseURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployTokenURIBaseURIRequest deployTokenURIBaseURIRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployTokenURIBaseURIRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployTokenURIBaseURI");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployTokenURIDna

> OasAnyTypeNotMapped deployTokenURIDna(networkId, deployTokenURIDnaRequest)

Deploy TokenURIDna

Deploys an instance of &#x60;TokenURIDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployTokenURIDnaRequest deployTokenURIDnaRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployTokenURIDnaRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployTokenURIDna(networkId, deployTokenURIDnaRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployTokenURIDna");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deployUpgradeableBeacon

> OasAnyTypeNotMapped deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest)

Deploy UpgradeableBeacon

Deploys an instance of &#x60;UpgradeableBeacon&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.DeployApi;

DeployApi apiInstance = new DeployApi();
String networkId = 80001; // String | The network id
DeployUpgradeableBeaconRequest deployUpgradeableBeaconRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployUpgradeableBeaconRequest | 
try {
    OasAnyTypeNotMapped result = apiInstance.deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DeployApi#deployUpgradeableBeacon");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md)|  |

### Return type

[**OasAnyTypeNotMapped**](OasAnyTypeNotMapped.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

