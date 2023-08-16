# \IChainlinkAnyApiConsumerApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_chainlink_any_api_consumer_fulfill**](IChainlinkAnyApiConsumerApi.md#interfaces_i_chainlink_any_api_consumer_fulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill



## interfaces_i_chainlink_any_api_consumer_fulfill

> crate::models::InterfacesIChainlinkAnyApiConsumerFulfill200Response interfaces_i_chainlink_any_api_consumer_fulfill(network_id, address, interfaces_i_chainlink_any_api_consumer_fulfill_request)
IChainlinkAnyApiConsumer.fulfill

Write `fulfill(fulfillPrefixData,fulfillResponseData)` on an instance of `IChainlinkAnyApiConsumer`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_chainlink_any_api_consumer_fulfill_request** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIChainlinkAnyApiConsumerFulfill200Response**](interfaces_IChainlinkAnyApiConsumer_fulfill_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

