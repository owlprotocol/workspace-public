# \WebhooksApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**WebhooksReadme**](WebhooksApi.md#WebhooksReadme) | **Post** /webhooks/readme | Signup/Login user with readme.io



## WebhooksReadme

> WebhooksReadme200Response WebhooksReadme(ctx).WebhooksReadmeRequest(webhooksReadmeRequest).Execute()

Signup/Login user with readme.io



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    webhooksReadmeRequest := *openapiclient.NewWebhooksReadmeRequest("Email_example") // WebhooksReadmeRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.WebhooksApi.WebhooksReadme(context.Background()).WebhooksReadmeRequest(webhooksReadmeRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `WebhooksApi.WebhooksReadme``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `WebhooksReadme`: WebhooksReadme200Response
    fmt.Fprintf(os.Stdout, "Response from `WebhooksApi.WebhooksReadme`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiWebhooksReadmeRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

