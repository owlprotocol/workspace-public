# \DeployApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deploy_beacon_proxy**](DeployApi.md#deploy_beacon_proxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy
[**deploy_chainlink_any_api_client**](DeployApi.md#deploy_chainlink_any_api_client) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient
[**deploy_erc1155_mintable**](DeployApi.md#deploy_erc1155_mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable
[**deploy_erc20_mintable**](DeployApi.md#deploy_erc20_mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable
[**deploy_erc2981_setter**](DeployApi.md#deploy_erc2981_setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter
[**deploy_erc721_mintable**](DeployApi.md#deploy_erc721_mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable
[**deploy_erc721_mintable_auto_id**](DeployApi.md#deploy_erc721_mintable_auto_id) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId
[**deploy_token_dna**](DeployApi.md#deploy_token_dna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna
[**deploy_token_uri**](DeployApi.md#deploy_token_uri) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI
[**deploy_token_uri_base_uri**](DeployApi.md#deploy_token_uri_base_uri) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI
[**deploy_token_uri_dna**](DeployApi.md#deploy_token_uri_dna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna
[**deploy_upgradeable_beacon**](DeployApi.md#deploy_upgradeable_beacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon



## deploy_beacon_proxy

> serde_json::Value deploy_beacon_proxy(network_id, deploy_beacon_proxy_request)
Deploy BeaconProxy

Deploys an instance of `BeaconProxy`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_beacon_proxy_request** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_chainlink_any_api_client

> serde_json::Value deploy_chainlink_any_api_client(network_id, deploy_chainlink_any_api_client_request)
Deploy ChainlinkAnyApiClient

Deploys an instance of `ChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_chainlink_any_api_client_request** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_erc1155_mintable

> serde_json::Value deploy_erc1155_mintable(network_id, deploy_erc1155_mintable_request)
Deploy ERC1155Mintable

Deploys an instance of `ERC1155Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_erc1155_mintable_request** | [**DeployErc1155MintableRequest**](DeployErc1155MintableRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_erc20_mintable

> serde_json::Value deploy_erc20_mintable(network_id, deploy_erc20_mintable_request)
Deploy ERC20Mintable

Deploys an instance of `ERC20Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_erc20_mintable_request** | [**DeployErc20MintableRequest**](DeployErc20MintableRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_erc2981_setter

> serde_json::Value deploy_erc2981_setter(network_id, deploy_erc2981_setter_request)
Deploy ERC2981Setter

Deploys an instance of `ERC2981Setter`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_erc2981_setter_request** | [**DeployErc2981SetterRequest**](DeployErc2981SetterRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_erc721_mintable

> serde_json::Value deploy_erc721_mintable(network_id, deploy_erc721_mintable_request)
Deploy ERC721Mintable

Deploys an instance of `ERC721Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_erc721_mintable_request** | [**DeployErc721MintableRequest**](DeployErc721MintableRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_erc721_mintable_auto_id

> serde_json::Value deploy_erc721_mintable_auto_id(network_id, deploy_erc721_mintable_request)
Deploy ERC721MintableAutoId

Deploys an instance of `ERC721MintableAutoId`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_erc721_mintable_request** | [**DeployErc721MintableRequest**](DeployErc721MintableRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_token_dna

> serde_json::Value deploy_token_dna(network_id, deploy_token_dna_request)
Deploy TokenDna

Deploys an instance of `TokenDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_token_dna_request** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_token_uri

> serde_json::Value deploy_token_uri(network_id, deploy_token_uri_request)
Deploy TokenURI

Deploys an instance of `TokenURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_token_uri_request** | [**DeployTokenUriRequest**](DeployTokenUriRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_token_uri_base_uri

> serde_json::Value deploy_token_uri_base_uri(network_id, deploy_token_uri_base_uri_request)
Deploy TokenURIBaseURI

Deploys an instance of `TokenURIBaseURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_token_uri_base_uri_request** | [**DeployTokenUriBaseUriRequest**](DeployTokenUriBaseUriRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_token_uri_dna

> serde_json::Value deploy_token_uri_dna(network_id, deploy_token_uri_dna_request)
Deploy TokenURIDna

Deploys an instance of `TokenURIDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_token_uri_dna_request** | [**DeployTokenUriDnaRequest**](DeployTokenUriDnaRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_upgradeable_beacon

> serde_json::Value deploy_upgradeable_beacon(network_id, deploy_upgradeable_beacon_request)
Deploy UpgradeableBeacon

Deploys an instance of `UpgradeableBeacon`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**deploy_upgradeable_beacon_request** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md) |  | [required] |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

