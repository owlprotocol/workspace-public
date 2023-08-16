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


// IERC20ApiService IERC20Api service
type IERC20ApiService service

type ApiInterfacesIERC20AllowanceRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIERC20AllowanceRequest *InterfacesIERC20AllowanceRequest
}

func (r ApiInterfacesIERC20AllowanceRequest) InterfacesIERC20AllowanceRequest(interfacesIERC20AllowanceRequest InterfacesIERC20AllowanceRequest) ApiInterfacesIERC20AllowanceRequest {
	r.interfacesIERC20AllowanceRequest = &interfacesIERC20AllowanceRequest
	return r
}

func (r ApiInterfacesIERC20AllowanceRequest) Execute() (*InterfacesIERC20Allowance200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20AllowanceExecute(r)
}

/*
InterfacesIERC20Allowance IERC20.allowance

Read `allowance(owner,spender)` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20AllowanceRequest
*/
func (a *IERC20ApiService) InterfacesIERC20Allowance(ctx context.Context, networkId string, address string) ApiInterfacesIERC20AllowanceRequest {
	return ApiInterfacesIERC20AllowanceRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20Allowance200Response
func (a *IERC20ApiService) InterfacesIERC20AllowanceExecute(r ApiInterfacesIERC20AllowanceRequest) (*InterfacesIERC20Allowance200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20Allowance200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20Allowance")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/read/{address}/allowance"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC20AllowanceRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC20AllowanceRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC20AllowanceRequest
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

type ApiInterfacesIERC20ApproveRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIERC20ApproveRequest *InterfacesIERC20ApproveRequest
}

func (r ApiInterfacesIERC20ApproveRequest) InterfacesIERC20ApproveRequest(interfacesIERC20ApproveRequest InterfacesIERC20ApproveRequest) ApiInterfacesIERC20ApproveRequest {
	r.interfacesIERC20ApproveRequest = &interfacesIERC20ApproveRequest
	return r
}

func (r ApiInterfacesIERC20ApproveRequest) Execute() (*InterfacesIERC20Approve200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20ApproveExecute(r)
}

/*
InterfacesIERC20Approve IERC20.approve

Write `approve(spender,amount)` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20ApproveRequest
*/
func (a *IERC20ApiService) InterfacesIERC20Approve(ctx context.Context, networkId string, address string) ApiInterfacesIERC20ApproveRequest {
	return ApiInterfacesIERC20ApproveRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20Approve200Response
func (a *IERC20ApiService) InterfacesIERC20ApproveExecute(r ApiInterfacesIERC20ApproveRequest) (*InterfacesIERC20Approve200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20Approve200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20Approve")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/write/{address}/approve"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC20ApproveRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC20ApproveRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC20ApproveRequest
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

type ApiInterfacesIERC20BalanceOfRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIERC1820GetManagerRequest *InterfacesIERC1820GetManagerRequest
}

func (r ApiInterfacesIERC20BalanceOfRequest) InterfacesIERC1820GetManagerRequest(interfacesIERC1820GetManagerRequest InterfacesIERC1820GetManagerRequest) ApiInterfacesIERC20BalanceOfRequest {
	r.interfacesIERC1820GetManagerRequest = &interfacesIERC1820GetManagerRequest
	return r
}

func (r ApiInterfacesIERC20BalanceOfRequest) Execute() (*InterfacesIERC20BalanceOf200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20BalanceOfExecute(r)
}

/*
InterfacesIERC20BalanceOf IERC20.balanceOf

Read `balanceOf(account)` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20BalanceOfRequest
*/
func (a *IERC20ApiService) InterfacesIERC20BalanceOf(ctx context.Context, networkId string, address string) ApiInterfacesIERC20BalanceOfRequest {
	return ApiInterfacesIERC20BalanceOfRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20BalanceOf200Response
func (a *IERC20ApiService) InterfacesIERC20BalanceOfExecute(r ApiInterfacesIERC20BalanceOfRequest) (*InterfacesIERC20BalanceOf200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20BalanceOf200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20BalanceOf")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/read/{address}/balanceOf"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC1820GetManagerRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC1820GetManagerRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC1820GetManagerRequest
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

type ApiInterfacesIERC20TotalSupplyRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIBeaconImplementationRequest *InterfacesIBeaconImplementationRequest
}

func (r ApiInterfacesIERC20TotalSupplyRequest) InterfacesIBeaconImplementationRequest(interfacesIBeaconImplementationRequest InterfacesIBeaconImplementationRequest) ApiInterfacesIERC20TotalSupplyRequest {
	r.interfacesIBeaconImplementationRequest = &interfacesIBeaconImplementationRequest
	return r
}

func (r ApiInterfacesIERC20TotalSupplyRequest) Execute() (*InterfacesIERC20TotalSupply200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20TotalSupplyExecute(r)
}

/*
InterfacesIERC20TotalSupply IERC20.totalSupply

Read `totalSupply()` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20TotalSupplyRequest
*/
func (a *IERC20ApiService) InterfacesIERC20TotalSupply(ctx context.Context, networkId string, address string) ApiInterfacesIERC20TotalSupplyRequest {
	return ApiInterfacesIERC20TotalSupplyRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20TotalSupply200Response
func (a *IERC20ApiService) InterfacesIERC20TotalSupplyExecute(r ApiInterfacesIERC20TotalSupplyRequest) (*InterfacesIERC20TotalSupply200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20TotalSupply200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20TotalSupply")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/read/{address}/totalSupply"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIBeaconImplementationRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIBeaconImplementationRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIBeaconImplementationRequest
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

type ApiInterfacesIERC20TransferRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIERC20TransferRequest *InterfacesIERC20TransferRequest
}

func (r ApiInterfacesIERC20TransferRequest) InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest InterfacesIERC20TransferRequest) ApiInterfacesIERC20TransferRequest {
	r.interfacesIERC20TransferRequest = &interfacesIERC20TransferRequest
	return r
}

func (r ApiInterfacesIERC20TransferRequest) Execute() (*InterfacesIERC20Transfer200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20TransferExecute(r)
}

/*
InterfacesIERC20Transfer IERC20.transfer

Write `transfer(to,amount)` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20TransferRequest
*/
func (a *IERC20ApiService) InterfacesIERC20Transfer(ctx context.Context, networkId string, address string) ApiInterfacesIERC20TransferRequest {
	return ApiInterfacesIERC20TransferRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20Transfer200Response
func (a *IERC20ApiService) InterfacesIERC20TransferExecute(r ApiInterfacesIERC20TransferRequest) (*InterfacesIERC20Transfer200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20Transfer200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20Transfer")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/write/{address}/transfer"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC20TransferRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC20TransferRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC20TransferRequest
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

type ApiInterfacesIERC20TransferFromRequest struct {
	ctx context.Context
	ApiService *IERC20ApiService
	networkId string
	address string
	interfacesIERC20TransferFromRequest *InterfacesIERC20TransferFromRequest
}

func (r ApiInterfacesIERC20TransferFromRequest) InterfacesIERC20TransferFromRequest(interfacesIERC20TransferFromRequest InterfacesIERC20TransferFromRequest) ApiInterfacesIERC20TransferFromRequest {
	r.interfacesIERC20TransferFromRequest = &interfacesIERC20TransferFromRequest
	return r
}

func (r ApiInterfacesIERC20TransferFromRequest) Execute() (*InterfacesIERC20TransferFrom200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20TransferFromExecute(r)
}

/*
InterfacesIERC20TransferFrom IERC20.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20TransferFromRequest
*/
func (a *IERC20ApiService) InterfacesIERC20TransferFrom(ctx context.Context, networkId string, address string) ApiInterfacesIERC20TransferFromRequest {
	return ApiInterfacesIERC20TransferFromRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20TransferFrom200Response
func (a *IERC20ApiService) InterfacesIERC20TransferFromExecute(r ApiInterfacesIERC20TransferFromRequest) (*InterfacesIERC20TransferFrom200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20TransferFrom200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20ApiService.InterfacesIERC20TransferFrom")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20/write/{address}/transferFrom"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC20TransferFromRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC20TransferFromRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC20TransferFromRequest
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
