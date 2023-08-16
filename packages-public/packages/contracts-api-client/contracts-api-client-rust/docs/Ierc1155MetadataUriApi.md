# \Ierc1155MetadataUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc1155_metadata_uri_balance_of**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_balance_of) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
[**interfaces_ierc1155_metadata_uri_balance_of_batch**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_balance_of_batch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
[**interfaces_ierc1155_metadata_uri_safe_batch_transfer_from**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_safe_batch_transfer_from) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
[**interfaces_ierc1155_metadata_uri_safe_transfer_from**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_safe_transfer_from) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
[**interfaces_ierc1155_metadata_uri_set_approval_for_all**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_set_approval_for_all) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
[**interfaces_ierc1155_metadata_uri_supports_interface**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_supports_interface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
[**interfaces_ierc1155_metadata_uri_uri**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uri_uri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri
[**interfaces_ierc1155_metadata_uriis_approved_for_all**](Ierc1155MetadataUriApi.md#interfaces_ierc1155_metadata_uriis_approved_for_all) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll



## interfaces_ierc1155_metadata_uri_balance_of

> crate::models::InterfacesIerc1155BalanceOf200Response interfaces_ierc1155_metadata_uri_balance_of(network_id, address, interfaces_ierc1155_balance_of_request)
IERC1155MetadataURI.balanceOf

Read `balanceOf(account,id)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_balance_of_request** | [**InterfacesIerc1155BalanceOfRequest**](InterfacesIerc1155BalanceOfRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155BalanceOf200Response**](interfaces_IERC1155_balanceOf_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uri_balance_of_batch

> crate::models::InterfacesIerc1155BalanceOfBatch200Response interfaces_ierc1155_metadata_uri_balance_of_batch(network_id, address, interfaces_ierc1155_balance_of_batch_request)
IERC1155MetadataURI.balanceOfBatch

Read `balanceOfBatch(accounts,ids)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_balance_of_batch_request** | [**InterfacesIerc1155BalanceOfBatchRequest**](InterfacesIerc1155BalanceOfBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155BalanceOfBatch200Response**](interfaces_IERC1155_balanceOfBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uri_safe_batch_transfer_from

> crate::models::InterfacesIerc1155SafeBatchTransferFrom200Response interfaces_ierc1155_metadata_uri_safe_batch_transfer_from(network_id, address, interfaces_ierc1155_safe_batch_transfer_from_request)
IERC1155MetadataURI.safeBatchTransferFrom

Write `safeBatchTransferFrom(from,to,ids,amounts,data)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_safe_batch_transfer_from_request** | [**InterfacesIerc1155SafeBatchTransferFromRequest**](InterfacesIerc1155SafeBatchTransferFromRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155SafeBatchTransferFrom200Response**](interfaces_IERC1155_safeBatchTransferFrom_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uri_safe_transfer_from

> crate::models::InterfacesIerc1155SafeTransferFrom200Response interfaces_ierc1155_metadata_uri_safe_transfer_from(network_id, address, interfaces_ierc1155_safe_transfer_from_request)
IERC1155MetadataURI.safeTransferFrom

Write `safeTransferFrom(from,to,id,amount,data)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_safe_transfer_from_request** | [**InterfacesIerc1155SafeTransferFromRequest**](InterfacesIerc1155SafeTransferFromRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155SafeTransferFrom200Response**](interfaces_IERC1155_safeTransferFrom_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uri_set_approval_for_all

> crate::models::InterfacesIerc1155SetApprovalForAll200Response interfaces_ierc1155_metadata_uri_set_approval_for_all(network_id, address, interfaces_ierc1155_set_approval_for_all_request)
IERC1155MetadataURI.setApprovalForAll

Write `setApprovalForAll(operator,approved)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_set_approval_for_all_request** | [**InterfacesIerc1155SetApprovalForAllRequest**](InterfacesIerc1155SetApprovalForAllRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155SetApprovalForAll200Response**](interfaces_IERC1155_setApprovalForAll_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uri_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc1155_metadata_uri_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC1155MetadataURI.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC1155MetadataURI`

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


## interfaces_ierc1155_metadata_uri_uri

> crate::models::InterfacesIerc1155MetadataUriUri200Response interfaces_ierc1155_metadata_uri_uri(network_id, address, interfaces_ierc1155_metadata_uri_uri_request)
IERC1155MetadataURI.uri

Read `uri(id)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_metadata_uri_uri_request** | [**InterfacesIerc1155MetadataUriUriRequest**](InterfacesIerc1155MetadataUriUriRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155MetadataUriUri200Response**](interfaces_IERC1155MetadataURI_uri_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_metadata_uriis_approved_for_all

> crate::models::InterfacesIerc1155IsApprovedForAll200Response interfaces_ierc1155_metadata_uriis_approved_for_all(network_id, address, interfaces_ierc1155_is_approved_for_all_request)
IERC1155MetadataURI.isApprovedForAll

Read `isApprovedForAll(account,operator)` on an instance of `IERC1155MetadataURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_is_approved_for_all_request** | [**InterfacesIerc1155IsApprovedForAllRequest**](InterfacesIerc1155IsApprovedForAllRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155IsApprovedForAll200Response**](interfaces_IERC1155_isApprovedForAll_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

