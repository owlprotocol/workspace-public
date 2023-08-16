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


// IERC721MintableAutoIdApiService IERC721MintableAutoIdApi service
type IERC721MintableAutoIdApiService service

type ApiInterfacesIERC721MintableAutoIdMintRequest struct {
	ctx context.Context
	ApiService *IERC721MintableAutoIdApiService
	networkId string
	address string
	interfacesIERC721MintableAutoIdMintRequest *InterfacesIERC721MintableAutoIdMintRequest
}

func (r ApiInterfacesIERC721MintableAutoIdMintRequest) InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest InterfacesIERC721MintableAutoIdMintRequest) ApiInterfacesIERC721MintableAutoIdMintRequest {
	r.interfacesIERC721MintableAutoIdMintRequest = &interfacesIERC721MintableAutoIdMintRequest
	return r
}

func (r ApiInterfacesIERC721MintableAutoIdMintRequest) Execute() (*InterfacesIERC721MintableAutoIdMint200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC721MintableAutoIdMintExecute(r)
}

/*
InterfacesIERC721MintableAutoIdMint IERC721MintableAutoId.mint

Write `mint(to)` on an instance of `IERC721MintableAutoId`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC721MintableAutoIdMintRequest
*/
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdMint(ctx context.Context, networkId string, address string) ApiInterfacesIERC721MintableAutoIdMintRequest {
	return ApiInterfacesIERC721MintableAutoIdMintRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC721MintableAutoIdMint200Response
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdMintExecute(r ApiInterfacesIERC721MintableAutoIdMintRequest) (*InterfacesIERC721MintableAutoIdMint200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC721MintableAutoIdMint200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC721MintableAutoIdApiService.InterfacesIERC721MintableAutoIdMint")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mint"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC721MintableAutoIdMintRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC721MintableAutoIdMintRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC721MintableAutoIdMintRequest
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

type ApiInterfacesIERC721MintableAutoIdMintBatchRequest struct {
	ctx context.Context
	ApiService *IERC721MintableAutoIdApiService
	networkId string
	address string
	interfacesIERC721MintableAutoIdMintBatchRequest *InterfacesIERC721MintableAutoIdMintBatchRequest
}

func (r ApiInterfacesIERC721MintableAutoIdMintBatchRequest) InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest InterfacesIERC721MintableAutoIdMintBatchRequest) ApiInterfacesIERC721MintableAutoIdMintBatchRequest {
	r.interfacesIERC721MintableAutoIdMintBatchRequest = &interfacesIERC721MintableAutoIdMintBatchRequest
	return r
}

func (r ApiInterfacesIERC721MintableAutoIdMintBatchRequest) Execute() (*InterfacesIERC721MintableAutoIdMintBatch200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC721MintableAutoIdMintBatchExecute(r)
}

/*
InterfacesIERC721MintableAutoIdMintBatch IERC721MintableAutoId.mintBatch

Write `mintBatch(to)` on an instance of `IERC721MintableAutoId`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC721MintableAutoIdMintBatchRequest
*/
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdMintBatch(ctx context.Context, networkId string, address string) ApiInterfacesIERC721MintableAutoIdMintBatchRequest {
	return ApiInterfacesIERC721MintableAutoIdMintBatchRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC721MintableAutoIdMintBatch200Response
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdMintBatchExecute(r ApiInterfacesIERC721MintableAutoIdMintBatchRequest) (*InterfacesIERC721MintableAutoIdMintBatch200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC721MintableAutoIdMintBatch200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC721MintableAutoIdApiService.InterfacesIERC721MintableAutoIdMintBatch")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC721MintableAutoIdMintBatchRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC721MintableAutoIdMintBatchRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC721MintableAutoIdMintBatchRequest
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

type ApiInterfacesIERC721MintableAutoIdSafeMintRequest struct {
	ctx context.Context
	ApiService *IERC721MintableAutoIdApiService
	networkId string
	address string
	interfacesIERC721MintableAutoIdMintRequest *InterfacesIERC721MintableAutoIdMintRequest
}

func (r ApiInterfacesIERC721MintableAutoIdSafeMintRequest) InterfacesIERC721MintableAutoIdMintRequest(interfacesIERC721MintableAutoIdMintRequest InterfacesIERC721MintableAutoIdMintRequest) ApiInterfacesIERC721MintableAutoIdSafeMintRequest {
	r.interfacesIERC721MintableAutoIdMintRequest = &interfacesIERC721MintableAutoIdMintRequest
	return r
}

func (r ApiInterfacesIERC721MintableAutoIdSafeMintRequest) Execute() (*InterfacesIERC721MintableAutoIdMint200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC721MintableAutoIdSafeMintExecute(r)
}

/*
InterfacesIERC721MintableAutoIdSafeMint IERC721MintableAutoId.safeMint

Write `safeMint(to)` on an instance of `IERC721MintableAutoId`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC721MintableAutoIdSafeMintRequest
*/
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdSafeMint(ctx context.Context, networkId string, address string) ApiInterfacesIERC721MintableAutoIdSafeMintRequest {
	return ApiInterfacesIERC721MintableAutoIdSafeMintRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC721MintableAutoIdMint200Response
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdSafeMintExecute(r ApiInterfacesIERC721MintableAutoIdSafeMintRequest) (*InterfacesIERC721MintableAutoIdMint200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC721MintableAutoIdMint200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC721MintableAutoIdApiService.InterfacesIERC721MintableAutoIdSafeMint")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC721MintableAutoIdMintRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC721MintableAutoIdMintRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC721MintableAutoIdMintRequest
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

type ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest struct {
	ctx context.Context
	ApiService *IERC721MintableAutoIdApiService
	networkId string
	address string
	interfacesIERC721MintableAutoIdMintBatchRequest *InterfacesIERC721MintableAutoIdMintBatchRequest
}

func (r ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest) InterfacesIERC721MintableAutoIdMintBatchRequest(interfacesIERC721MintableAutoIdMintBatchRequest InterfacesIERC721MintableAutoIdMintBatchRequest) ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest {
	r.interfacesIERC721MintableAutoIdMintBatchRequest = &interfacesIERC721MintableAutoIdMintBatchRequest
	return r
}

func (r ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest) Execute() (*InterfacesIERC721MintableAutoIdMintBatch200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC721MintableAutoIdSafeMintBatchExecute(r)
}

/*
InterfacesIERC721MintableAutoIdSafeMintBatch IERC721MintableAutoId.safeMintBatch

Write `safeMintBatch(to)` on an instance of `IERC721MintableAutoId`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest
*/
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdSafeMintBatch(ctx context.Context, networkId string, address string) ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest {
	return ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC721MintableAutoIdMintBatch200Response
func (a *IERC721MintableAutoIdApiService) InterfacesIERC721MintableAutoIdSafeMintBatchExecute(r ApiInterfacesIERC721MintableAutoIdSafeMintBatchRequest) (*InterfacesIERC721MintableAutoIdMintBatch200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC721MintableAutoIdMintBatch200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC721MintableAutoIdApiService.InterfacesIERC721MintableAutoIdSafeMintBatch")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC721MintableAutoIdMintBatchRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC721MintableAutoIdMintBatchRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC721MintableAutoIdMintBatchRequest
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
