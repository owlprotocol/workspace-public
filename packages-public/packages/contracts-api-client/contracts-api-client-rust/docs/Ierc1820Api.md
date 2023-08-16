# \Ierc1820Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc1820_get_interface_implementer**](Ierc1820Api.md#interfaces_ierc1820_get_interface_implementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer
[**interfaces_ierc1820_get_manager**](Ierc1820Api.md#interfaces_ierc1820_get_manager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager
[**interfaces_ierc1820_implements_erc165_interface**](Ierc1820Api.md#interfaces_ierc1820_implements_erc165_interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface
[**interfaces_ierc1820_implements_erc165_interface_no_cache**](Ierc1820Api.md#interfaces_ierc1820_implements_erc165_interface_no_cache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache
[**interfaces_ierc1820_interface_hash**](Ierc1820Api.md#interfaces_ierc1820_interface_hash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash
[**interfaces_ierc1820_set_interface_implementer**](Ierc1820Api.md#interfaces_ierc1820_set_interface_implementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer
[**interfaces_ierc1820_set_manager**](Ierc1820Api.md#interfaces_ierc1820_set_manager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager
[**interfaces_ierc1820_update_erc165_cache**](Ierc1820Api.md#interfaces_ierc1820_update_erc165_cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache



## interfaces_ierc1820_get_interface_implementer

> crate::models::InterfacesIerc1820GetInterfaceImplementer200Response interfaces_ierc1820_get_interface_implementer(network_id, address, interfaces_ierc1820_get_interface_implementer_request)
IERC1820.getInterfaceImplementer

Read `getInterfaceImplementer(account,_interfaceHash)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_get_interface_implementer_request** | [**InterfacesIerc1820GetInterfaceImplementerRequest**](InterfacesIerc1820GetInterfaceImplementerRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820GetInterfaceImplementer200Response**](interfaces_IERC1820_getInterfaceImplementer_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_get_manager

> crate::models::InterfacesIerc1820GetManager200Response interfaces_ierc1820_get_manager(network_id, address, interfaces_ierc1820_get_manager_request)
IERC1820.getManager

Read `getManager(account)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_get_manager_request** | [**InterfacesIerc1820GetManagerRequest**](InterfacesIerc1820GetManagerRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820GetManager200Response**](interfaces_IERC1820_getManager_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_implements_erc165_interface

> crate::models::InterfacesIerc1820ImplementsErc165Interface200Response interfaces_ierc1820_implements_erc165_interface(network_id, address, interfaces_ierc1820_implements_erc165_interface_request)
IERC1820.implementsERC165Interface

Read `implementsERC165Interface(account,interfaceId)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_implements_erc165_interface_request** | [**InterfacesIerc1820ImplementsErc165InterfaceRequest**](InterfacesIerc1820ImplementsErc165InterfaceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820ImplementsErc165Interface200Response**](interfaces_IERC1820_implementsERC165Interface_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_implements_erc165_interface_no_cache

> crate::models::InterfacesIerc1820ImplementsErc165Interface200Response interfaces_ierc1820_implements_erc165_interface_no_cache(network_id, address, interfaces_ierc1820_implements_erc165_interface_request)
IERC1820.implementsERC165InterfaceNoCache

Read `implementsERC165InterfaceNoCache(account,interfaceId)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_implements_erc165_interface_request** | [**InterfacesIerc1820ImplementsErc165InterfaceRequest**](InterfacesIerc1820ImplementsErc165InterfaceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820ImplementsErc165Interface200Response**](interfaces_IERC1820_implementsERC165Interface_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_interface_hash

> crate::models::InterfacesIerc1820InterfaceHash200Response interfaces_ierc1820_interface_hash(network_id, address, interfaces_ierc1820_interface_hash_request)
IERC1820.interfaceHash

Read `interfaceHash(interfaceName)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_interface_hash_request** | [**InterfacesIerc1820InterfaceHashRequest**](InterfacesIerc1820InterfaceHashRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820InterfaceHash200Response**](interfaces_IERC1820_interfaceHash_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_set_interface_implementer

> crate::models::InterfacesIerc1820SetInterfaceImplementer200Response interfaces_ierc1820_set_interface_implementer(network_id, address, interfaces_ierc1820_set_interface_implementer_request)
IERC1820.setInterfaceImplementer

Write `setInterfaceImplementer(account,_interfaceHash,implementer)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_set_interface_implementer_request** | [**InterfacesIerc1820SetInterfaceImplementerRequest**](InterfacesIerc1820SetInterfaceImplementerRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820SetInterfaceImplementer200Response**](interfaces_IERC1820_setInterfaceImplementer_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_set_manager

> crate::models::InterfacesIerc1820SetManager200Response interfaces_ierc1820_set_manager(network_id, address, interfaces_ierc1820_set_manager_request)
IERC1820.setManager

Write `setManager(account,newManager)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_set_manager_request** | [**InterfacesIerc1820SetManagerRequest**](InterfacesIerc1820SetManagerRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820SetManager200Response**](interfaces_IERC1820_setManager_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1820_update_erc165_cache

> crate::models::InterfacesIerc1820UpdateErc165Cache200Response interfaces_ierc1820_update_erc165_cache(network_id, address, interfaces_ierc1820_implements_erc165_interface_request)
IERC1820.updateERC165Cache

Write `updateERC165Cache(account,interfaceId)` on an instance of `IERC1820`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_implements_erc165_interface_request** | [**InterfacesIerc1820ImplementsErc165InterfaceRequest**](InterfacesIerc1820ImplementsErc165InterfaceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1820UpdateErc165Cache200Response**](interfaces_IERC1820_updateERC165Cache_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

