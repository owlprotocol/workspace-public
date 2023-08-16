# WebhooksAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**webhooksReadme**](WebhooksAPI.md#webhooksreadme) | **POST** /webhooks/readme | Signup/Login user with readme.io


# **webhooksReadme**
```swift
    open class func webhooksReadme(webhooksReadmeRequest: WebhooksReadmeRequest, completion: @escaping (_ data: WebhooksReadme200Response?, _ error: Error?) -> Void)
```

Signup/Login user with readme.io

Readme.io webhook for signups

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let webhooksReadmeRequest = webhooks_readme_request(email: "email_example") // WebhooksReadmeRequest | 

// Signup/Login user with readme.io
WebhooksAPI.webhooksReadme(webhooksReadmeRequest: webhooksReadmeRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhooksReadmeRequest** | [**WebhooksReadmeRequest**](WebhooksReadmeRequest.md) |  | 

### Return type

[**WebhooksReadme200Response**](WebhooksReadme200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

