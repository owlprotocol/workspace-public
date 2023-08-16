# \Ierc721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc721_mintable_auto_id_mint**](Ierc721MintableAutoIdApi.md#interfaces_ierc721_mintable_auto_id_mint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
[**interfaces_ierc721_mintable_auto_id_mint_batch**](Ierc721MintableAutoIdApi.md#interfaces_ierc721_mintable_auto_id_mint_batch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
[**interfaces_ierc721_mintable_auto_id_safe_mint**](Ierc721MintableAutoIdApi.md#interfaces_ierc721_mintable_auto_id_safe_mint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
[**interfaces_ierc721_mintable_auto_id_safe_mint_batch**](Ierc721MintableAutoIdApi.md#interfaces_ierc721_mintable_auto_id_safe_mint_batch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch



## interfaces_ierc721_mintable_auto_id_mint

> crate::models::InterfacesIerc721MintableAutoIdMint200Response interfaces_ierc721_mintable_auto_id_mint(network_id, address, interfaces_ierc721_mintable_auto_id_mint_request)
IERC721MintableAutoId.mint

Write `mint(to)` on an instance of `IERC721MintableAutoId`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_auto_id_mint_request** | [**InterfacesIerc721MintableAutoIdMintRequest**](InterfacesIerc721MintableAutoIdMintRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableAutoIdMint200Response**](interfaces_IERC721MintableAutoId_mint_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_mintable_auto_id_mint_batch

> crate::models::InterfacesIerc721MintableAutoIdMintBatch200Response interfaces_ierc721_mintable_auto_id_mint_batch(network_id, address, interfaces_ierc721_mintable_auto_id_mint_batch_request)
IERC721MintableAutoId.mintBatch

Write `mintBatch(to)` on an instance of `IERC721MintableAutoId`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_auto_id_mint_batch_request** | [**InterfacesIerc721MintableAutoIdMintBatchRequest**](InterfacesIerc721MintableAutoIdMintBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableAutoIdMintBatch200Response**](interfaces_IERC721MintableAutoId_mintBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_mintable_auto_id_safe_mint

> crate::models::InterfacesIerc721MintableAutoIdMint200Response interfaces_ierc721_mintable_auto_id_safe_mint(network_id, address, interfaces_ierc721_mintable_auto_id_mint_request)
IERC721MintableAutoId.safeMint

Write `safeMint(to)` on an instance of `IERC721MintableAutoId`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_auto_id_mint_request** | [**InterfacesIerc721MintableAutoIdMintRequest**](InterfacesIerc721MintableAutoIdMintRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableAutoIdMint200Response**](interfaces_IERC721MintableAutoId_mint_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc721_mintable_auto_id_safe_mint_batch

> crate::models::InterfacesIerc721MintableAutoIdMintBatch200Response interfaces_ierc721_mintable_auto_id_safe_mint_batch(network_id, address, interfaces_ierc721_mintable_auto_id_mint_batch_request)
IERC721MintableAutoId.safeMintBatch

Write `safeMintBatch(to)` on an instance of `IERC721MintableAutoId`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_mintable_auto_id_mint_batch_request** | [**InterfacesIerc721MintableAutoIdMintBatchRequest**](InterfacesIerc721MintableAutoIdMintBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MintableAutoIdMintBatch200Response**](interfaces_IERC721MintableAutoId_mintBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

