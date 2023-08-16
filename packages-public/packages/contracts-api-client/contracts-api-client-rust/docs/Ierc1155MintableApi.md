# \Ierc1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc1155_mintable_mint**](Ierc1155MintableApi.md#interfaces_ierc1155_mintable_mint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
[**interfaces_ierc1155_mintable_mint_batch**](Ierc1155MintableApi.md#interfaces_ierc1155_mintable_mint_batch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch



## interfaces_ierc1155_mintable_mint

> crate::models::InterfacesIerc1155MintableMint200Response interfaces_ierc1155_mintable_mint(network_id, address, interfaces_ierc1155_mintable_mint_request)
IERC1155Mintable.mint

Write `mint(to,id,amount,data)` on an instance of `IERC1155Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_mintable_mint_request** | [**InterfacesIerc1155MintableMintRequest**](InterfacesIerc1155MintableMintRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155MintableMint200Response**](interfaces_IERC1155Mintable_mint_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc1155_mintable_mint_batch

> crate::models::InterfacesIerc1155MintableMintBatch200Response interfaces_ierc1155_mintable_mint_batch(network_id, address, interfaces_ierc1155_mintable_mint_batch_request)
IERC1155Mintable.mintBatch

Write `mintBatch(to,ids,amounts,data)` on an instance of `IERC1155Mintable`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1155_mintable_mint_batch_request** | [**InterfacesIerc1155MintableMintBatchRequest**](InterfacesIerc1155MintableMintBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc1155MintableMintBatch200Response**](interfaces_IERC1155Mintable_mintBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

