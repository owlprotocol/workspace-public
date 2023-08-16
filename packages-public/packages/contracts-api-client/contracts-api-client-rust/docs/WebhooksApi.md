# \WebhooksApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**webhooks_readme**](WebhooksApi.md#webhooks_readme) | **POST** /webhooks/readme | Signup/Login user with readme.io



## webhooks_readme

> crate::models::WebhooksReadme200Response webhooks_readme(webhooks_readme_request)
Signup/Login user with readme.io

Readme.io webhook for signups

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**webhooks_readme_request** | [**WebhooksReadmeRequest**](WebhooksReadmeRequest.md) |  | [required] |

### Return type

[**crate::models::WebhooksReadme200Response**](webhooks_readme_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

