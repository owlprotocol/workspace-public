# \Ierc721EnumerableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc721_enumerable_approve**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_approve) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
[**interfaces_ierc721_enumerable_balance_of**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_balance_of) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
[**interfaces_ierc721_enumerable_get_approved**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_get_approved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
[**interfaces_ierc721_enumerable_is_approved_for_all**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_is_approved_for_all) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
[**interfaces_ierc721_enumerable_owner_of**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_owner_of) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
[**interfaces_ierc721_enumerable_safe_transfer_from**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_safe_transfer_from) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
[**interfaces_ierc721_enumerable_set_approval_for_all**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_set_approval_for_all) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
[**interfaces_ierc721_enumerable_supports_interface**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_supports_interface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
[**interfaces_ierc721_enumerable_token_by_index**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_token_by_index) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
[**interfaces_ierc721_enumerable_token_of_owner_by_index**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_token_of_owner_by_index) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
[**interfaces_ierc721_enumerable_total_supply**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_total_supply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
[**interfaces_ierc721_enumerable_transfer_from**](Ierc721EnumerableApi.md#interfaces_ierc721_enumerable_transfer_from) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom



## interfaces_ierc721_enumerable_approve

> crate::models::InterfacesIerc721Approve200Response interfaces_ierc721_enumerable_approve(network_id, address, interfaces_ierc721_approve_request)
IERC721Enumerable.approve

Write `approve(to,tokenId)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_balance_of

> crate::models::InterfacesIerc721BalanceOf200Response interfaces_ierc721_enumerable_balance_of(network_id, address, interfaces_ierc721_balance_of_request)
IERC721Enumerable.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_get_approved

> crate::models::InterfacesIerc721GetApproved200Response interfaces_ierc721_enumerable_get_approved(network_id, address, interfaces_ierc721_get_approved_request)
IERC721Enumerable.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_is_approved_for_all

> crate::models::InterfacesIerc721IsApprovedForAll200Response interfaces_ierc721_enumerable_is_approved_for_all(network_id, address, interfaces_ierc721_is_approved_for_all_request)
IERC721Enumerable.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_owner_of

> crate::models::InterfacesIerc721OwnerOf200Response interfaces_ierc721_enumerable_owner_of(network_id, address, interfaces_ierc721_get_approved_request)
IERC721Enumerable.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_safe_transfer_from

> crate::models::InterfacesIerc721SafeTransferFrom200Response interfaces_ierc721_enumerable_safe_transfer_from(network_id, address, interfaces_ierc721_safe_transfer_from_request)
IERC721Enumerable.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_set_approval_for_all

> crate::models::InterfacesIerc721SetApprovalForAll200Response interfaces_ierc721_enumerable_set_approval_for_all(network_id, address, interfaces_ierc721_set_approval_for_all_request)
IERC721Enumerable.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc721_enumerable_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC721Enumerable.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721Enumerable`

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


## interfaces_ierc721_enumerable_token_by_index

> crate::models::InterfacesIerc721EnumerableTokenByIndex200Response interfaces_ierc721_enumerable_token_by_index(network_id, address, interfaces_ierc721_enumerable_token_by_index_request)
IERC721Enumerable.tokenByIndex

Read `tokenByIndex(index)` on an instance of `IERC721Enumerable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_enumerable_token_by_index_request** | [**InterfacesIerc721EnumerableTokenByIndexRequest**](InterfacesIerc721EnumerableTokenByIndexRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721EnumerableTokenByIndex200Response**](interfaces_IERC721Enumerable_tokenByIndex_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_enumerable_token_of_owner_by_index

> crate::models::InterfacesIerc721EnumerableTokenOfOwnerByIndex200Response interfaces_ierc721_enumerable_token_of_owner_by_index(network_id, address, interfaces_ierc721_enumerable_token_of_owner_by_index_request)
IERC721Enumerable.tokenOfOwnerByIndex

Read `tokenOfOwnerByIndex(owner,index)` on an instance of `IERC721Enumerable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_enumerable_token_of_owner_by_index_request** | [**InterfacesIerc721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIerc721EnumerableTokenOfOwnerByIndexRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721EnumerableTokenOfOwnerByIndex200Response**](interfaces_IERC721Enumerable_tokenOfOwnerByIndex_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_enumerable_total_supply

> crate::models::InterfacesIerc20TotalSupply200Response interfaces_ierc721_enumerable_total_supply(network_id, address, interfaces_i_beacon_implementation_request)
IERC721Enumerable.totalSupply

Read `totalSupply()` on an instance of `IERC721Enumerable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20TotalSupply200Response**](interfaces_IERC20_totalSupply_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_enumerable_transfer_from

> crate::models::InterfacesIerc721TransferFrom200Response interfaces_ierc721_enumerable_transfer_from(network_id, address, interfaces_ierc721_transfer_from_request)
IERC721Enumerable.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Enumerable`

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

