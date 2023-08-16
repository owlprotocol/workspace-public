# WebhooksApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**webhooksReadme**](WebhooksApi.md#webhooksReadme) | **POST** /webhooks/readme | Signup/Login user with readme.io



## webhooksReadme

> WebhooksReadme200Response webhooksReadme(webhooksReadmeRequest)

Signup/Login user with readme.io

Readme.io webhook for signups

### Example

```java
// Import classes:
//import org.openapitools.client.api.WebhooksApi;

WebhooksApi apiInstance = new WebhooksApi();
WebhooksReadmeRequest webhooksReadmeRequest = new WebhooksReadmeRequest(); // WebhooksReadmeRequest | 
try {
    WebhooksReadme200Response result = apiInstance.webhooksReadme(webhooksReadmeRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling WebhooksApi#webhooksReadme");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhooksReadmeRequest** | [**WebhooksReadmeRequest**](WebhooksReadmeRequest.md)|  |

### Return type

[**WebhooksReadme200Response**](WebhooksReadme200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

