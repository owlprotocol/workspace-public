/*
 * Owl Contract Api
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package org.openapitools.client.api;

import org.openapitools.client.ApiCallback;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.ApiResponse;
import org.openapitools.client.Configuration;
import org.openapitools.client.Pair;
import org.openapitools.client.ProgressRequestBody;
import org.openapitools.client.ProgressResponseBody;

import com.google.gson.reflect.TypeToken;

import java.io.IOException;


import org.openapitools.client.model.DeployBeaconProxyDefaultResponse;
import org.openapitools.client.model.InterfacesIBeaconImplementationRequest;
import org.openapitools.client.model.InterfacesIContractURIContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURIRequest;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.GenericType;

public class IContractUriApi {
    private ApiClient localVarApiClient;
    private int localHostIndex;
    private String localCustomBaseUrl;

    public IContractUriApi() {
        this(Configuration.getDefaultApiClient());
    }

    public IContractUriApi(ApiClient apiClient) {
        this.localVarApiClient = apiClient;
    }

    public ApiClient getApiClient() {
        return localVarApiClient;
    }

    public void setApiClient(ApiClient apiClient) {
        this.localVarApiClient = apiClient;
    }

    public int getHostIndex() {
        return localHostIndex;
    }

    public void setHostIndex(int hostIndex) {
        this.localHostIndex = hostIndex;
    }

    public String getCustomBaseUrl() {
        return localCustomBaseUrl;
    }

    public void setCustomBaseUrl(String customBaseUrl) {
        this.localCustomBaseUrl = customBaseUrl;
    }

    /**
     * Build call for interfacesIContractURIContractURI
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIBeaconImplementationRequest  (required)
     * @param _callback Callback for upload/download progress
     * @return Call to execute
     * @throws ApiException If fail to serialize the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesIContractURIContractURICall(String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, final ApiCallback _callback) throws ApiException {
        String basePath = null;
        // Operation Servers
        String[] localBasePaths = new String[] {  };

        // Determine Base Path to Use
        if (localCustomBaseUrl != null){
            basePath = localCustomBaseUrl;
        } else if ( localBasePaths.length > 0 ) {
            basePath = localBasePaths[localHostIndex];
        } else {
            basePath = null;
        }

        Object localVarPostBody = interfacesIBeaconImplementationRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IContractURI/read/{address}/contractURI"
            .replace("{" + "networkId" + "}", localVarApiClient.escapeString(networkId.toString()))
            .replace("{" + "address" + "}", localVarApiClient.escapeString(address.toString()));

        List<Pair> localVarQueryParams = new ArrayList<Pair>();
        List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
        Map<String, String> localVarHeaderParams = new HashMap<String, String>();
        Map<String, String> localVarCookieParams = new HashMap<String, String>();
        Map<String, Object> localVarFormParams = new HashMap<String, Object>();

        final String[] localVarAccepts = {
            "application/json"
        };
        final String localVarAccept = localVarApiClient.selectHeaderAccept(localVarAccepts);
        if (localVarAccept != null) {
            localVarHeaderParams.put("Accept", localVarAccept);
        }

        final String[] localVarContentTypes = {
            "application/json"
        };
        final String localVarContentType = localVarApiClient.selectHeaderContentType(localVarContentTypes);
        if (localVarContentType != null) {
            localVarHeaderParams.put("Content-Type", localVarContentType);
        }

        String[] localVarAuthNames = new String[] { "Authorization" };
        return localVarApiClient.buildCall(basePath, localVarPath, "POST", localVarQueryParams, localVarCollectionQueryParams, localVarPostBody, localVarHeaderParams, localVarCookieParams, localVarFormParams, localVarAuthNames, _callback);
    }

    @SuppressWarnings("rawtypes")
    private okhttp3.Call interfacesIContractURIContractURIValidateBeforeCall(String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIContractURIContractURI(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIContractURIContractURI(Async)");
        }

        // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
        if (interfacesIBeaconImplementationRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIBeaconImplementationRequest' when calling interfacesIContractURIContractURI(Async)");
        }

        return interfacesIContractURIContractURICall(networkId, address, interfacesIBeaconImplementationRequest, _callback);

    }

    /**
     * IContractURI.contractURI
     * Read &#x60;contractURI()&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIBeaconImplementationRequest  (required)
     * @return InterfacesIContractURIContractURI200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIContractURIContractURI200Response interfacesIContractURIContractURI(String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest) throws ApiException {
        ApiResponse<InterfacesIContractURIContractURI200Response> localVarResp = interfacesIContractURIContractURIWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
        return localVarResp.getData();
    }

    /**
     * IContractURI.contractURI
     * Read &#x60;contractURI()&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIBeaconImplementationRequest  (required)
     * @return ApiResponse&lt;InterfacesIContractURIContractURI200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIContractURIContractURI200Response> interfacesIContractURIContractURIWithHttpInfo(String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIContractURIContractURIValidateBeforeCall(networkId, address, interfacesIBeaconImplementationRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIContractURIContractURI200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IContractURI.contractURI (asynchronously)
     * Read &#x60;contractURI()&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIBeaconImplementationRequest  (required)
     * @param _callback The callback to be executed when the API call finishes
     * @return The request call
     * @throws ApiException If fail to process the API call, e.g. serializing the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesIContractURIContractURIAsync(String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, final ApiCallback<InterfacesIContractURIContractURI200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIContractURIContractURIValidateBeforeCall(networkId, address, interfacesIBeaconImplementationRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIContractURIContractURI200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesIContractURISetContractURI
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIContractURISetContractURIRequest  (required)
     * @param _callback Callback for upload/download progress
     * @return Call to execute
     * @throws ApiException If fail to serialize the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesIContractURISetContractURICall(String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, final ApiCallback _callback) throws ApiException {
        String basePath = null;
        // Operation Servers
        String[] localBasePaths = new String[] {  };

        // Determine Base Path to Use
        if (localCustomBaseUrl != null){
            basePath = localCustomBaseUrl;
        } else if ( localBasePaths.length > 0 ) {
            basePath = localBasePaths[localHostIndex];
        } else {
            basePath = null;
        }

        Object localVarPostBody = interfacesIContractURISetContractURIRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IContractURI/write/{address}/setContractURI"
            .replace("{" + "networkId" + "}", localVarApiClient.escapeString(networkId.toString()))
            .replace("{" + "address" + "}", localVarApiClient.escapeString(address.toString()));

        List<Pair> localVarQueryParams = new ArrayList<Pair>();
        List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
        Map<String, String> localVarHeaderParams = new HashMap<String, String>();
        Map<String, String> localVarCookieParams = new HashMap<String, String>();
        Map<String, Object> localVarFormParams = new HashMap<String, Object>();

        final String[] localVarAccepts = {
            "application/json"
        };
        final String localVarAccept = localVarApiClient.selectHeaderAccept(localVarAccepts);
        if (localVarAccept != null) {
            localVarHeaderParams.put("Accept", localVarAccept);
        }

        final String[] localVarContentTypes = {
            "application/json"
        };
        final String localVarContentType = localVarApiClient.selectHeaderContentType(localVarContentTypes);
        if (localVarContentType != null) {
            localVarHeaderParams.put("Content-Type", localVarContentType);
        }

        String[] localVarAuthNames = new String[] { "Authorization" };
        return localVarApiClient.buildCall(basePath, localVarPath, "POST", localVarQueryParams, localVarCollectionQueryParams, localVarPostBody, localVarHeaderParams, localVarCookieParams, localVarFormParams, localVarAuthNames, _callback);
    }

    @SuppressWarnings("rawtypes")
    private okhttp3.Call interfacesIContractURISetContractURIValidateBeforeCall(String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIContractURISetContractURI(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIContractURISetContractURI(Async)");
        }

        // verify the required parameter 'interfacesIContractURISetContractURIRequest' is set
        if (interfacesIContractURISetContractURIRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIContractURISetContractURIRequest' when calling interfacesIContractURISetContractURI(Async)");
        }

        return interfacesIContractURISetContractURICall(networkId, address, interfacesIContractURISetContractURIRequest, _callback);

    }

    /**
     * IContractURI.setContractURI
     * Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIContractURISetContractURIRequest  (required)
     * @return InterfacesIContractURISetContractURI200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIContractURISetContractURI200Response interfacesIContractURISetContractURI(String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest) throws ApiException {
        ApiResponse<InterfacesIContractURISetContractURI200Response> localVarResp = interfacesIContractURISetContractURIWithHttpInfo(networkId, address, interfacesIContractURISetContractURIRequest);
        return localVarResp.getData();
    }

    /**
     * IContractURI.setContractURI
     * Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIContractURISetContractURIRequest  (required)
     * @return ApiResponse&lt;InterfacesIContractURISetContractURI200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIContractURISetContractURI200Response> interfacesIContractURISetContractURIWithHttpInfo(String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIContractURISetContractURIValidateBeforeCall(networkId, address, interfacesIContractURISetContractURIRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIContractURISetContractURI200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IContractURI.setContractURI (asynchronously)
     * Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IContractURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIContractURISetContractURIRequest  (required)
     * @param _callback The callback to be executed when the API call finishes
     * @return The request call
     * @throws ApiException If fail to process the API call, e.g. serializing the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesIContractURISetContractURIAsync(String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, final ApiCallback<InterfacesIContractURISetContractURI200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIContractURISetContractURIValidateBeforeCall(networkId, address, interfacesIContractURISetContractURIRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIContractURISetContractURI200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
}
