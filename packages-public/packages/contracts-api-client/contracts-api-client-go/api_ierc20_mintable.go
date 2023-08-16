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


// IERC20MintableApiService IERC20MintableApi service
type IERC20MintableApiService service

type ApiInterfacesIERC20MintableMintRequest struct {
	ctx context.Context
	ApiService *IERC20MintableApiService
	networkId string
	address string
	interfacesIERC20TransferRequest *InterfacesIERC20TransferRequest
}

func (r ApiInterfacesIERC20MintableMintRequest) InterfacesIERC20TransferRequest(interfacesIERC20TransferRequest InterfacesIERC20TransferRequest) ApiInterfacesIERC20MintableMintRequest {
	r.interfacesIERC20TransferRequest = &interfacesIERC20TransferRequest
	return r
}

func (r ApiInterfacesIERC20MintableMintRequest) Execute() (*InterfacesIERC20Transfer200Response, *http.Response, error) {
	return r.ApiService.InterfacesIERC20MintableMintExecute(r)
}

/*
InterfacesIERC20MintableMint IERC20Mintable.mint

Write `mint(to,amount)` on an instance of `IERC20Mintable`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIERC20MintableMintRequest
*/
func (a *IERC20MintableApiService) InterfacesIERC20MintableMint(ctx context.Context, networkId string, address string) ApiInterfacesIERC20MintableMintRequest {
	return ApiInterfacesIERC20MintableMintRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIERC20Transfer200Response
func (a *IERC20MintableApiService) InterfacesIERC20MintableMintExecute(r ApiInterfacesIERC20MintableMintRequest) (*InterfacesIERC20Transfer200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIERC20Transfer200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IERC20MintableApiService.InterfacesIERC20MintableMint")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IERC20Mintable/write/{address}/mint"
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
