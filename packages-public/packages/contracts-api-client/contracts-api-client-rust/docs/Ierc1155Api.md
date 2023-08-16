# \Ierc1155Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc1155_balance_of**](Ierc1155Api.md#interfaces_ierc1155_balance_of) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf
[**interfaces_ierc1155_balance_of_batch**](Ierc1155Api.md#interfaces_ierc1155_balance_of_batch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch
[**interfaces_ierc1155_is_approved_for_all**](Ierc1155Api.md#interfaces_ierc1155_is_approved_for_all) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll
[**interfaces_ierc1155_safe_batch_transfer_from**](Ierc1155Api.md#interfaces_ierc1155_safe_batch_transfer_from) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom
[**interfaces_ierc1155_safe_transfer_from**](Ierc1155Api.md#interfaces_ierc1155_safe_transfer_from) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom
[**interfaces_ierc1155_set_approval_for_all**](Ierc1155Api.md#interfaces_ierc1155_set_approval_for_all) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll
[**interfaces_ierc1155_supports_interface**](Ierc1155Api.md#interfaces_ierc1155_supports_interface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface



## interfaces_ierc1155_balance_of

> crate::models::InterfacesIerc1155BalanceOf200Response interfaces_ierc1155_balance_of(network_id, address, interfaces_ierc1155_balance_of_request)
IERC1155.balanceOf

Read `balanceOf(account,id)` on an instance of `IERC1155`

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


## interfaces_ierc1155_balance_of_batch

> crate::models::InterfacesIerc1155BalanceOfBatch200Response interfaces_ierc1155_balance_of_batch(network_id, address, interfaces_ierc1155_balance_of_batch_request)
IERC1155.balanceOfBatch

Read `balanceOfBatch(accounts,ids)` on an instance of `IERC1155`

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


## interfaces_ierc1155_is_approved_for_all

> crate::models::InterfacesIerc1155IsApprovedForAll200Response interfaces_ierc1155_is_approved_for_all(network_id, address, interfaces_ierc1155_is_approved_for_all_request)
IERC1155.isApprovedForAll

Read `isApprovedForAll(account,operator)` on an instance of `IERC1155`

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


## interfaces_ierc1155_safe_batch_transfer_from

> crate::models::InterfacesIerc1155SafeBatchTransferFrom200Response interfaces_ierc1155_safe_batch_transfer_from(network_id, address, interfaces_ierc1155_safe_batch_transfer_from_request)
IERC1155.safeBatchTransferFrom

Write `safeBatchTransferFrom(from,to,ids,amounts,data)` on an instance of `IERC1155`

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


## interfaces_ierc1155_safe_transfer_from

> crate::models::InterfacesIerc1155SafeTransferFrom200Response interfaces_ierc1155_safe_transfer_from(network_id, address, interfaces_ierc1155_safe_transfer_from_request)
IERC1155.safeTransferFrom

Write `safeTransferFrom(from,to,id,amount,data)` on an instance of `IERC1155`

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


## interfaces_ierc1155_set_approval_for_all

> crate::models::InterfacesIerc1155SetApprovalForAll200Response interfaces_ierc1155_set_approval_for_all(network_id, address, interfaces_ierc1155_set_approval_for_all_request)
IERC1155.setApprovalForAll

Write `setApprovalForAll(operator,approved)` on an instance of `IERC1155`

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


## interfaces_ierc1155_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc1155_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC1155.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC1155`

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

