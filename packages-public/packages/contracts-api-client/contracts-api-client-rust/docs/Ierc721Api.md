# \Ierc721Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc721_approve**](Ierc721Api.md#interfaces_ierc721_approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
[**interfaces_ierc721_balance_of**](Ierc721Api.md#interfaces_ierc721_balance_of) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
[**interfaces_ierc721_get_approved**](Ierc721Api.md#interfaces_ierc721_get_approved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
[**interfaces_ierc721_is_approved_for_all**](Ierc721Api.md#interfaces_ierc721_is_approved_for_all) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
[**interfaces_ierc721_owner_of**](Ierc721Api.md#interfaces_ierc721_owner_of) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
[**interfaces_ierc721_safe_transfer_from**](Ierc721Api.md#interfaces_ierc721_safe_transfer_from) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
[**interfaces_ierc721_set_approval_for_all**](Ierc721Api.md#interfaces_ierc721_set_approval_for_all) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
[**interfaces_ierc721_supports_interface**](Ierc721Api.md#interfaces_ierc721_supports_interface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
[**interfaces_ierc721_transfer_from**](Ierc721Api.md#interfaces_ierc721_transfer_from) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom



## interfaces_ierc721_approve

> crate::models::InterfacesIerc721Approve200Response interfaces_ierc721_approve(network_id, address, interfaces_ierc721_approve_request)
IERC721.approve

Write `approve(to,tokenId)` on an instance of `IERC721`

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


## interfaces_ierc721_balance_of

> crate::models::InterfacesIerc721BalanceOf200Response interfaces_ierc721_balance_of(network_id, address, interfaces_ierc721_balance_of_request)
IERC721.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721`

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


## interfaces_ierc721_get_approved

> crate::models::InterfacesIerc721GetApproved200Response interfaces_ierc721_get_approved(network_id, address, interfaces_ierc721_get_approved_request)
IERC721.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721`

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


## interfaces_ierc721_is_approved_for_all

> crate::models::InterfacesIerc721IsApprovedForAll200Response interfaces_ierc721_is_approved_for_all(network_id, address, interfaces_ierc721_is_approved_for_all_request)
IERC721.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721`

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


## interfaces_ierc721_owner_of

> crate::models::InterfacesIerc721OwnerOf200Response interfaces_ierc721_owner_of(network_id, address, interfaces_ierc721_get_approved_request)
IERC721.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721`

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


## interfaces_ierc721_safe_transfer_from

> crate::models::InterfacesIerc721SafeTransferFrom200Response interfaces_ierc721_safe_transfer_from(network_id, address, interfaces_ierc721_safe_transfer_from_request)
IERC721.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721`

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


## interfaces_ierc721_set_approval_for_all

> crate::models::InterfacesIerc721SetApprovalForAll200Response interfaces_ierc721_set_approval_for_all(network_id, address, interfaces_ierc721_set_approval_for_all_request)
IERC721.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721`

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


## interfaces_ierc721_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc721_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC721.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721`

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


## interfaces_ierc721_transfer_from

> crate::models::InterfacesIerc721TransferFrom200Response interfaces_ierc721_transfer_from(network_id, address, interfaces_ierc721_transfer_from_request)
IERC721.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721`

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

