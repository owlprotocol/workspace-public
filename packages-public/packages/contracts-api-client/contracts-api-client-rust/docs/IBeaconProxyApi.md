# \IBeaconProxyApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_beacon_proxy_beacon**](IBeaconProxyApi.md#interfaces_i_beacon_proxy_beacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
[**interfaces_i_beacon_proxy_set_beacon**](IBeaconProxyApi.md#interfaces_i_beacon_proxy_set_beacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon



## interfaces_i_beacon_proxy_beacon

> crate::models::InterfacesIBeaconImplementation200Response interfaces_i_beacon_proxy_beacon(network_id, address, interfaces_i_beacon_implementation_request)
IBeaconProxy.beacon

Read `beacon()` on an instance of `IBeaconProxy`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIBeaconImplementation200Response**](interfaces_IBeacon_implementation_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_beacon_proxy_set_beacon

> crate::models::InterfacesIBeaconProxySetBeacon200Response interfaces_i_beacon_proxy_set_beacon(network_id, address, interfaces_i_beacon_proxy_set_beacon_request)
IBeaconProxy.setBeacon

Write `setBeacon(_beaconAddress,data)` on an instance of `IBeaconProxy`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_proxy_set_beacon_request** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIBeaconProxySetBeacon200Response**](interfaces_IBeaconProxy_setBeacon_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

