# UsersApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersMe**](UsersApi.md#usersMe) | **GET** /users/me | Get user info


<a id="usersMe"></a>
# **usersMe**
> UsersMe200Response usersMe()

Get user info

Get user info such as email, walletId, credit balance

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = UsersApi()
try {
    val result : UsersMe200Response = apiInstance.usersMe()
    println(result)
} catch (e: ClientException) {
    println("4xx response calling UsersApi#usersMe")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling UsersApi#usersMe")
    e.printStackTrace()
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UsersMe200Response**](UsersMe200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

