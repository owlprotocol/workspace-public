/*
Owl Contract Api

Specification for our API focused on contract interactions

API version: 0.0.1
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"net/url"
	"strings"
)


// ITokenDnaApiService ITokenDnaApi service
type ITokenDnaApiService service

type ApiInterfacesITokenDnaGetDnaRequest struct {
	ctx context.Context
	ApiService *ITokenDnaApiService
	networkId string
	address string
	interfacesIERC721GetApprovedRequest *InterfacesIERC721GetApprovedRequest
}

func (r ApiInterfacesITokenDnaGetDnaRequest) InterfacesIERC721GetApprovedRequest(interfacesIERC721GetApprovedRequest InterfacesIERC721GetApprovedRequest) ApiInterfacesITokenDnaGetDnaRequest {
	r.interfacesIERC721GetApprovedRequest = &interfacesIERC721GetApprovedRequest
	return r
}

func (r ApiInterfacesITokenDnaGetDnaRequest) Execute() (*InterfacesITokenDnaGetDna200Response, *http.Response, error) {
	return r.ApiService.InterfacesITokenDnaGetDnaExecute(r)
}

/*
InterfacesITokenDnaGetDna ITokenDna.getDna

Read `getDna(tokenId)` on an instance of `ITokenDna`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesITokenDnaGetDnaRequest
*/
func (a *ITokenDnaApiService) InterfacesITokenDnaGetDna(ctx context.Context, networkId string, address string) ApiInterfacesITokenDnaGetDnaRequest {
	return ApiInterfacesITokenDnaGetDnaRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesITokenDnaGetDna200Response
func (a *ITokenDnaApiService) InterfacesITokenDnaGetDnaExecute(r ApiInterfacesITokenDnaGetDnaRequest) (*InterfacesITokenDnaGetDna200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesITokenDnaGetDna200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ITokenDnaApiService.InterfacesITokenDnaGetDna")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/ITokenDna/read/{address}/getDna"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC721GetApprovedRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC721GetApprovedRequest is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.interfacesIERC721GetApprovedRequest
	if r.ctx != nil {
		// API Key Authentication
		if auth, ok := r.ctx.Value(ContextAPIKeys).(map[string]APIKey); ok {
			if apiKey, ok := auth["Authorization"]; ok {
				var key string
				if apiKey.Prefix != "" {
					key = apiKey.Prefix + " " + apiKey.Key
				} else {
					key = apiKey.Key
				}
				localVarHeaderParams["x-api-key"] = key
			}
		}
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
			var v DeployBeaconProxyDefaultResponse
			err = a.client.decode(&v, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
			if err != nil {
				newErr.error = err.Error()
				return localVarReturnValue, localVarHTTPResponse, newErr
			}
					newErr.error = formatErrorMessage(localVarHTTPResponse.Status, &v)
					newErr.model = v
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}

type ApiInterfacesITokenDnaGetDnaBatchRequest struct {
	ctx context.Context
	ApiService *ITokenDnaApiService
	networkId string
	address string
	interfacesITokenDnaGetDnaBatchRequest *InterfacesITokenDnaGetDnaBatchRequest
}

func (r ApiInterfacesITokenDnaGetDnaBatchRequest) InterfacesITokenDnaGetDnaBatchRequest(interfacesITokenDnaGetDnaBatchRequest InterfacesITokenDnaGetDnaBatchRequest) ApiInterfacesITokenDnaGetDnaBatchRequest {
	r.interfacesITokenDnaGetDnaBatchRequest = &interfacesITokenDnaGetDnaBatchRequest
	return r
}

func (r ApiInterfacesITokenDnaGetDnaBatchRequest) Execute() (*InterfacesITokenDnaGetDnaBatch200Response, *http.Response, error) {
	return r.ApiService.InterfacesITokenDnaGetDnaBatchExecute(r)
}

/*
InterfacesITokenDnaGetDnaBatch ITokenDna.getDnaBatch

Read `getDnaBatch(tokenId)` on an instance of `ITokenDna`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesITokenDnaGetDnaBatchRequest
*/
func (a *ITokenDnaApiService) InterfacesITokenDnaGetDnaBatch(ctx context.Context, networkId string, address string) ApiInterfacesITokenDnaGetDnaBatchRequest {
	return ApiInterfacesITokenDnaGetDnaBatchRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesITokenDnaGetDnaBatch200Response
func (a *ITokenDnaApiService) InterfacesITokenDnaGetDnaBatchExecute(r ApiInterfacesITokenDnaGetDnaBatchRequest) (*InterfacesITokenDnaGetDnaBatch200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesITokenDnaGetDnaBatch200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ITokenDnaApiService.InterfacesITokenDnaGetDnaBatch")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/ITokenDna/read/{address}/getDnaBatch"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesITokenDnaGetDnaBatchRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesITokenDnaGetDnaBatchRequest is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.interfacesITokenDnaGetDnaBatchRequest
	if r.ctx != nil {
		// API Key Authentication
		if auth, ok := r.ctx.Value(ContextAPIKeys).(map[string]APIKey); ok {
			if apiKey, ok := auth["Authorization"]; ok {
				var key string
				if apiKey.Prefix != "" {
					key = apiKey.Prefix + " " + apiKey.Key
				} else {
					key = apiKey.Key
				}
				localVarHeaderParams["x-api-key"] = key
			}
		}
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
			var v DeployBeaconProxyDefaultResponse
			err = a.client.decode(&v, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
			if err != nil {
				newErr.error = err.Error()
				return localVarReturnValue, localVarHTTPResponse, newErr
			}
					newErr.error = formatErrorMessage(localVarHTTPResponse.Status, &v)
					newErr.model = v
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}

type ApiInterfacesITokenDnaSetDnaRequest struct {
	ctx context.Context
	ApiService *ITokenDnaApiService
	networkId string
	address string
	interfacesITokenDnaSetDnaRequest *InterfacesITokenDnaSetDnaRequest
}

func (r ApiInterfacesITokenDnaSetDnaRequest) InterfacesITokenDnaSetDnaRequest(interfacesITokenDnaSetDnaRequest InterfacesITokenDnaSetDnaRequest) ApiInterfacesITokenDnaSetDnaRequest {
	r.interfacesITokenDnaSetDnaRequest = &interfacesITokenDnaSetDnaRequest
	return r
}

func (r ApiInterfacesITokenDnaSetDnaRequest) Execute() (*InterfacesITokenDnaSetDna200Response, *http.Response, error) {
	return r.ApiService.InterfacesITokenDnaSetDnaExecute(r)
}

/*
InterfacesITokenDnaSetDna ITokenDna.setDna

Write `setDna(tokenId,dna)` on an instance of `ITokenDna`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesITokenDnaSetDnaRequest
*/
func (a *ITokenDnaApiService) InterfacesITokenDnaSetDna(ctx context.Context, networkId string, address string) ApiInterfacesITokenDnaSetDnaRequest {
	return ApiInterfacesITokenDnaSetDnaRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesITokenDnaSetDna200Response
func (a *ITokenDnaApiService) InterfacesITokenDnaSetDnaExecute(r ApiInterfacesITokenDnaSetDnaRequest) (*InterfacesITokenDnaSetDna200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesITokenDnaSetDna200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ITokenDnaApiService.InterfacesITokenDnaSetDna")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/ITokenDna/write/{address}/setDna"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesITokenDnaSetDnaRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesITokenDnaSetDnaRequest is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.interfacesITokenDnaSetDnaRequest
	if r.ctx != nil {
		// API Key Authentication
		if auth, ok := r.ctx.Value(ContextAPIKeys).(map[string]APIKey); ok {
			if apiKey, ok := auth["Authorization"]; ok {
				var key string
				if apiKey.Prefix != "" {
					key = apiKey.Prefix + " " + apiKey.Key
				} else {
					key = apiKey.Key
				}
				localVarHeaderParams["x-api-key"] = key
			}
		}
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
			var v DeployBeaconProxyDefaultResponse
			err = a.client.decode(&v, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
			if err != nil {
				newErr.error = err.Error()
				return localVarReturnValue, localVarHTTPResponse, newErr
			}
					newErr.error = formatErrorMessage(localVarHTTPResponse.Status, &v)
					newErr.model = v
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}

type ApiInterfacesITokenDnaSetDnaBatchRequest struct {
	ctx context.Context
	ApiService *ITokenDnaApiService
	networkId string
	address string
	interfacesITokenDnaSetDnaBatchRequest *InterfacesITokenDnaSetDnaBatchRequest
}

func (r ApiInterfacesITokenDnaSetDnaBatchRequest) InterfacesITokenDnaSetDnaBatchRequest(interfacesITokenDnaSetDnaBatchRequest InterfacesITokenDnaSetDnaBatchRequest) ApiInterfacesITokenDnaSetDnaBatchRequest {
	r.interfacesITokenDnaSetDnaBatchRequest = &interfacesITokenDnaSetDnaBatchRequest
	return r
}

func (r ApiInterfacesITokenDnaSetDnaBatchRequest) Execute() (*InterfacesITokenDnaSetDnaBatch200Response, *http.Response, error) {
	return r.ApiService.InterfacesITokenDnaSetDnaBatchExecute(r)
}

/*
InterfacesITokenDnaSetDnaBatch ITokenDna.setDnaBatch

Write `setDnaBatch(tokenId,dna)` on an instance of `ITokenDna`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesITokenDnaSetDnaBatchRequest
*/
func (a *ITokenDnaApiService) InterfacesITokenDnaSetDnaBatch(ctx context.Context, networkId string, address string) ApiInterfacesITokenDnaSetDnaBatchRequest {
	return ApiInterfacesITokenDnaSetDnaBatchRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesITokenDnaSetDnaBatch200Response
func (a *ITokenDnaApiService) InterfacesITokenDnaSetDnaBatchExecute(r ApiInterfacesITokenDnaSetDnaBatchRequest) (*InterfacesITokenDnaSetDnaBatch200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesITokenDnaSetDnaBatch200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ITokenDnaApiService.InterfacesITokenDnaSetDnaBatch")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/ITokenDna/write/{address}/setDnaBatch"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesITokenDnaSetDnaBatchRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesITokenDnaSetDnaBatchRequest is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.interfacesITokenDnaSetDnaBatchRequest
	if r.ctx != nil {
		// API Key Authentication
		if auth, ok := r.ctx.Value(ContextAPIKeys).(map[string]APIKey); ok {
			if apiKey, ok := auth["Authorization"]; ok {
				var key string
				if apiKey.Prefix != "" {
					key = apiKey.Prefix + " " + apiKey.Key
				} else {
					key = apiKey.Key
				}
				localVarHeaderParams["x-api-key"] = key
			}
		}
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
			var v DeployBeaconProxyDefaultResponse
			err = a.client.decode(&v, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
			if err != nil {
				newErr.error = err.Error()
				return localVarReturnValue, localVarHTTPResponse, newErr
			}
					newErr.error = formatErrorMessage(localVarHTTPResponse.Status, &v)
					newErr.model = v
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}
