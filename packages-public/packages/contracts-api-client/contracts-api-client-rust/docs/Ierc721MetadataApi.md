# \Ierc721MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc721_metadata_approve**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_approve) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/approve | IERC721Metadata.approve
[**interfaces_ierc721_metadata_balance_of**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_balance_of) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/balanceOf | IERC721Metadata.balanceOf
[**interfaces_ierc721_metadata_get_approved**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_get_approved) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/getApproved | IERC721Metadata.getApproved
[**interfaces_ierc721_metadata_is_approved_for_all**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_is_approved_for_all) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/isApprovedForAll | IERC721Metadata.isApprovedForAll
[**interfaces_ierc721_metadata_name**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_name) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/name | IERC721Metadata.name
[**interfaces_ierc721_metadata_owner_of**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_owner_of) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/ownerOf | IERC721Metadata.ownerOf
[**interfaces_ierc721_metadata_safe_transfer_from**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_safe_transfer_from) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/safeTransferFrom | IERC721Metadata.safeTransferFrom
[**interfaces_ierc721_metadata_set_approval_for_all**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_set_approval_for_all) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/setApprovalForAll | IERC721Metadata.setApprovalForAll
[**interfaces_ierc721_metadata_supports_interface**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_supports_interface) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/supportsInterface | IERC721Metadata.supportsInterface
[**interfaces_ierc721_metadata_symbol**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_symbol) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/symbol | IERC721Metadata.symbol
[**interfaces_ierc721_metadata_token_uri**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_token_uri) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/tokenURI | IERC721Metadata.tokenURI
[**interfaces_ierc721_metadata_transfer_from**](Ierc721MetadataApi.md#interfaces_ierc721_metadata_transfer_from) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/transferFrom | IERC721Metadata.transferFrom



## interfaces_ierc721_metadata_approve

> crate::models::InterfacesIerc721Approve200Response interfaces_ierc721_metadata_approve(network_id, address, interfaces_ierc721_approve_request)
IERC721Metadata.approve

Write `approve(to,tokenId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_approve_request** | [**InterfacesIerc721ApproveRequest**](InterfacesIerc721ApproveRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721Approve200Response**](interfaces_IERC721_approve_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_balance_of

> crate::models::InterfacesIerc721BalanceOf200Response interfaces_ierc721_metadata_balance_of(network_id, address, interfaces_ierc721_balance_of_request)
IERC721Metadata.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_balance_of_request** | [**InterfacesIerc721BalanceOfRequest**](InterfacesIerc721BalanceOfRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721BalanceOf200Response**](interfaces_IERC721_balanceOf_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_get_approved

> crate::models::InterfacesIerc721GetApproved200Response interfaces_ierc721_metadata_get_approved(network_id, address, interfaces_ierc721_get_approved_request)
IERC721Metadata.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_get_approved_request** | [**InterfacesIerc721GetApprovedRequest**](InterfacesIerc721GetApprovedRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721GetApproved200Response**](interfaces_IERC721_getApproved_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_is_approved_for_all

> crate::models::InterfacesIerc721IsApprovedForAll200Response interfaces_ierc721_metadata_is_approved_for_all(network_id, address, interfaces_ierc721_is_approved_for_all_request)
IERC721Metadata.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_is_approved_for_all_request** | [**InterfacesIerc721IsApprovedForAllRequest**](InterfacesIerc721IsApprovedForAllRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721IsApprovedForAll200Response**](interfaces_IERC721_isApprovedForAll_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_name

> crate::models::InterfacesIContractUriContractUri200Response interfaces_ierc721_metadata_name(network_id, address, interfaces_i_beacon_implementation_request)
IERC721Metadata.name

Read `name()` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIContractUriContractUri200Response**](interfaces_IContractURI_contractURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_owner_of

> crate::models::InterfacesIerc721OwnerOf200Response interfaces_ierc721_metadata_owner_of(network_id, address, interfaces_ierc721_get_approved_request)
IERC721Metadata.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_get_approved_request** | [**InterfacesIerc721GetApprovedRequest**](InterfacesIerc721GetApprovedRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721OwnerOf200Response**](interfaces_IERC721_ownerOf_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_safe_transfer_from

> crate::models::InterfacesIerc721SafeTransferFrom200Response interfaces_ierc721_metadata_safe_transfer_from(network_id, address, interfaces_ierc721_safe_transfer_from_request)
IERC721Metadata.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_safe_transfer_from_request** | [**InterfacesIerc721SafeTransferFromRequest**](InterfacesIerc721SafeTransferFromRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721SafeTransferFrom200Response**](interfaces_IERC721_safeTransferFrom_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_set_approval_for_all

> crate::models::InterfacesIerc721SetApprovalForAll200Response interfaces_ierc721_metadata_set_approval_for_all(network_id, address, interfaces_ierc721_set_approval_for_all_request)
IERC721Metadata.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_set_approval_for_all_request** | [**InterfacesIerc721SetApprovalForAllRequest**](InterfacesIerc721SetApprovalForAllRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721SetApprovalForAll200Response**](interfaces_IERC721_setApprovalForAll_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc721_metadata_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC721Metadata.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc165_supports_interface_request** | [**InterfacesIerc165SupportsInterfaceRequest**](InterfacesIerc165SupportsInterfaceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc165SupportsInterface200Response**](interfaces_IERC165_supportsInterface_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_symbol

> crate::models::InterfacesIContractUriContractUri200Response interfaces_ierc721_metadata_symbol(network_id, address, interfaces_i_beacon_implementation_request)
IERC721Metadata.symbol

Read `symbol()` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIContractUriContractUri200Response**](interfaces_IContractURI_contractURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_token_uri

> crate::models::InterfacesIerc721MetadataTokenUri200Response interfaces_ierc721_metadata_token_uri(network_id, address, interfaces_ierc721_get_approved_request)
IERC721Metadata.tokenURI

Read `tokenURI(tokenId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_get_approved_request** | [**InterfacesIerc721GetApprovedRequest**](InterfacesIerc721GetApprovedRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MetadataTokenUri200Response**](interfaces_IERC721Metadata_tokenURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_metadata_transfer_from

> crate::models::InterfacesIerc721TransferFrom200Response interfaces_ierc721_metadata_transfer_from(network_id, address, interfaces_ierc721_transfer_from_request)
IERC721Metadata.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_transfer_from_request** | [**InterfacesIerc721TransferFromRequest**](InterfacesIerc721TransferFromRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721TransferFrom200Response**](interfaces_IERC721_transferFrom_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

