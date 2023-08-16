# UsersApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersMe**](UsersApi.md#usersMe) | **GET** /users/me | Get user info



## usersMe

> UsersMe200Response usersMe()

Get user info

Get user info such as email, walletId, credit balance

### Example

```java
// Import classes:
//import org.openapitools.client.api.UsersApi;

UsersApi apiInstance = new UsersApi();
try {
    UsersMe200Response result = apiInstance.usersMe();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UsersApi#usersMe");
    e.printStackTrace();
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UsersMe200Response**](UsersMe200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

