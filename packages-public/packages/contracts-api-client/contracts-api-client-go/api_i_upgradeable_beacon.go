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


// IUpgradeableBeaconApiService IUpgradeableBeaconApi service
type IUpgradeableBeaconApiService service

type ApiInterfacesIUpgradeableBeaconUpgradeToRequest struct {
	ctx context.Context
	ApiService *IUpgradeableBeaconApiService
	networkId string
	address string
	interfacesIUpgradeableBeaconUpgradeToRequest *InterfacesIUpgradeableBeaconUpgradeToRequest
}

func (r ApiInterfacesIUpgradeableBeaconUpgradeToRequest) InterfacesIUpgradeableBeaconUpgradeToRequest(interfacesIUpgradeableBeaconUpgradeToRequest InterfacesIUpgradeableBeaconUpgradeToRequest) ApiInterfacesIUpgradeableBeaconUpgradeToRequest {
	r.interfacesIUpgradeableBeaconUpgradeToRequest = &interfacesIUpgradeableBeaconUpgradeToRequest
	return r
}

func (r ApiInterfacesIUpgradeableBeaconUpgradeToRequest) Execute() (*InterfacesIUpgradeableBeaconUpgradeTo200Response, *http.Response, error) {
	return r.ApiService.InterfacesIUpgradeableBeaconUpgradeToExecute(r)
}

/*
InterfacesIUpgradeableBeaconUpgradeTo IUpgradeableBeacon.upgradeTo

Write `upgradeTo(newImplementation)` on an instance of `IUpgradeableBeacon`

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param networkId The network id
 @param address An ethereum address
 @return ApiInterfacesIUpgradeableBeaconUpgradeToRequest
*/
func (a *IUpgradeableBeaconApiService) InterfacesIUpgradeableBeaconUpgradeTo(ctx context.Context, networkId string, address string) ApiInterfacesIUpgradeableBeaconUpgradeToRequest {
	return ApiInterfacesIUpgradeableBeaconUpgradeToRequest{
		ApiService: a,
		ctx: ctx,
		networkId: networkId,
		address: address,
	}
}

// Execute executes the request
//  @return InterfacesIUpgradeableBeaconUpgradeTo200Response
func (a *IUpgradeableBeaconApiService) InterfacesIUpgradeableBeaconUpgradeToExecute(r ApiInterfacesIUpgradeableBeaconUpgradeToRequest) (*InterfacesIUpgradeableBeaconUpgradeTo200Response, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *InterfacesIUpgradeableBeaconUpgradeTo200Response
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "IUpgradeableBeaconApiService.InterfacesIUpgradeableBeaconUpgradeTo")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo"
	localVarPath = strings.Replace(localVarPath, "{"+"networkId"+"}", url.PathEscape(parameterValueToString(r.networkId, "networkId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"address"+"}", url.PathEscape(parameterValueToString(r.address, "address")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.interfacesIUpgradeableBeaconUpgradeToRequest == nil {
		return localVarReturnValue, nil, reportError("interfacesIUpgradeableBeaconUpgradeToRequest is required and must be specified")
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
	localVarPostBody = r.interfacesIUpgradeableBeaconUpgradeToRequest
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