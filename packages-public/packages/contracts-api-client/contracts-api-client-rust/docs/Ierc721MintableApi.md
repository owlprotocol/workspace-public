# \Ierc721MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc721_mintable_mint**](Ierc721MintableApi.md#interfaces_ierc721_mintable_mint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
[**interfaces_ierc721_mintable_mint_batch**](Ierc721MintableApi.md#interfaces_ierc721_mintable_mint_batch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
[**interfaces_ierc721_mintable_safe_mint**](Ierc721MintableApi.md#interfaces_ierc721_mintable_safe_mint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
[**interfaces_ierc721_mintable_safe_mint_batch**](Ierc721MintableApi.md#interfaces_ierc721_mintable_safe_mint_batch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch



## interfaces_ierc721_mintable_mint

> crate::models::InterfacesIerc721Approve200Response interfaces_ierc721_mintable_mint(network_id, address, interfaces_ierc721_approve_request)
IERC721Mintable.mint

Write `mint(to,tokenId)` on an instance of `IERC721Mintable`

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


## interfaces_ierc721_mintable_mint_batch

> crate::models::InterfacesIerc721MintableMintBatch200Response interfaces_ierc721_mintable_mint_batch(network_id, address, interfaces_ierc721_mintable_mint_batch_request)
IERC721Mintable.mintBatch

Write `mintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_mint_batch_request** | [**InterfacesIerc721MintableMintBatchRequest**](InterfacesIerc721MintableMintBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableMintBatch200Response**](interfaces_IERC721Mintable_mintBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_mintable_safe_mint

> crate::models::InterfacesIerc721Approve200Response interfaces_ierc721_mintable_safe_mint(network_id, address, interfaces_ierc721_approve_request)
IERC721Mintable.safeMint

Write `safeMint(to,tokenId)` on an instance of `IERC721Mintable`

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


## interfaces_ierc721_mintable_safe_mint_batch

> crate::models::InterfacesIerc721MintableMintBatch200Response interfaces_ierc721_mintable_safe_mint_batch(network_id, address, interfaces_ierc721_mintable_mint_batch_request)
IERC721Mintable.safeMintBatch

Write `safeMintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_mint_batch_request** | [**InterfacesIerc721MintableMintBatchRequest**](InterfacesIerc721MintableMintBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableMintBatch200Response**](interfaces_IERC721Mintable_mintBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

