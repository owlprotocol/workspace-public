# WebhooksApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**webhooksReadme**](WebhooksApi.md#webhooksReadme) | **POST** /webhooks/readme | Signup/Login user with readme.io


<a id="webhooksReadme"></a>
# **webhooksReadme**
> WebhooksReadme200Response webhooksReadme(webhooksReadmeRequest)

Signup/Login user with readme.io

Readme.io webhook for signups

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = WebhooksApi()
val webhooksReadmeRequest : WebhooksReadmeRequest =  // WebhooksReadmeRequest | 
try {
    val result : WebhooksReadme200Response = apiInstance.webhooksReadme(webhooksReadmeRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling WebhooksApi#webhooksReadme")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling WebhooksApi#webhooksReadme")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhooksReadmeRequest** | [**WebhooksReadmeRequest**](WebhooksReadmeRequest.md)|  |

### Return type

[**WebhooksReadme200Response**](WebhooksReadme200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

