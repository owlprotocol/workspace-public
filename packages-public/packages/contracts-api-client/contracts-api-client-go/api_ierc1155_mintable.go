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


// IERC1155MintableApiService IERC1155MintableApi service
type IERC1155MintableApiService service

type ApiInterfacesIERC1155MintableMintRequest struct {
	ctx context.Context
	ApiService *IERC1155MintableApiService
	networkId string
	address string
	interfacesIERC1155MintableMintRequest *InterfacesIERC1155MintableMintRequest
}

func (r ApiInterfacesIERC1155MintableMintRequest) InterfacesIERC1155MintableMintRequest(interfacesIERC1155MintableMintRequest InterfacesIERC1155MintableMintRequest) ApiInterfacesIERC1155MintableMintRequest {
	r.interfacesIERC1155MintableMintRequest = &interfacesIERC1155MintableMintRequest
	return r
}

func (r ApiInterfacesIERC1155MintableMintRequest) Execute() (*InterfacesIERC1155MintableMint200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC1155MintableMintExecute(r)
}

/*
InterfacesIERC1155MintableMint IERC1155Mintable.mint

Write `mint(to,id,amount,data)` on an instance of `IERC1155Mintable`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC1155MintableMintRequest
*/
func (a *IERC1155MintableApiService) InterfacesIERC1155MintableMint(ctx context.Context, networkId string, address string) ApiInterfacesIERC1155MintableMintRequest {
	return ApiInterfacesIERC1155MintableMintRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC1155MintableMint200Response
func (a *IERC1155MintableApiService) InterfacesIERC1155MintableMintExecute(r ApiInterfacesIERC1155MintableMintRequest) (*InterfacesIERC1155MintableMint200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC1155MintableMint200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC1155MintableApiService.InterfacesIERC1155MintableMint")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC1155Mintable/write/{address}/mint"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC1155MintableMintRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC1155MintableMintRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC1155MintableMintRequest
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

type ApiInterfacesIERC1155MintableMintBatchRequest struct {
	ctx context.Context
	ApiService *IERC1155MintableApiService
	networkId string
	address string
	interfacesIERC1155MintableMintBatchRequest *InterfacesIERC1155MintableMintBatchRequest
}

func (r ApiInterfacesIERC1155MintableMintBatchRequest) InterfacesIERC1155MintableMintBatchRequest(interfacesIERC1155MintableMintBatchRequest InterfacesIERC1155MintableMintBatchRequest) ApiInterfacesIERC1155MintableMintBatchRequest {
	r.interfacesIERC1155MintableMintBatchRequest = &interfacesIERC1155MintableMintBatchRequest
	return r
}

func (r ApiInterfacesIERC1155MintableMintBatchRequest) Execute() (*InterfacesIERC1155MintableMintBatch200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC1155MintableMintBatchExecute(r)
}

/*
InterfacesIERC1155MintableMintBatch IERC1155Mintable.mintBatch

Write `mintBatch(to,ids,amounts,data)` on an instance of `IERC1155Mintable`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC1155MintableMintBatchRequest
*/
func (a *IERC1155MintableApiService) InterfacesIERC1155MintableMintBatch(ctx context.Context, networkId string, address string) ApiInterfacesIERC1155MintableMintBatchRequest {
	return ApiInterfacesIERC1155MintableMintBatchRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC1155MintableMintBatch200Response
func (a *IERC1155MintableApiService) InterfacesIERC1155MintableMintBatchExecute(r ApiInterfacesIERC1155MintableMintBatchRequest) (*InterfacesIERC1155MintableMintBatch200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC1155MintableMintBatch200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC1155MintableApiService.InterfacesIERC1155MintableMintBatch")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIERC1155MintableMintBatchRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIERC1155MintableMintBatchRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIERC1155MintableMintBatchRequest
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
