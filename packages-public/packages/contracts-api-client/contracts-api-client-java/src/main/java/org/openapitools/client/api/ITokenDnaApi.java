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
import org.openapitools.client.model.InterfacesIERC721GetApprovedRequest;
import org.openapitools.client.model.InterfacesITokenDnaGetDna200Response;
import org.openapitools.client.model.InterfacesITokenDnaGetDnaBatch200Response;
import org.openapitools.client.model.InterfacesITokenDnaGetDnaBatchRequest;
import org.openapitools.client.model.InterfacesITokenDnaSetDna200Response;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaBatch200Response;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaBatchRequest;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaRequest;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.GenericType;

public class ITokenDnaApi {
    private ApiClient localVarApiClient;
    private int localHostIndex;
    private String localCustomBaseUrl;

    public ITokenDnaApi() {
        this(Configuration.getDefaultApiClient());
    }

    public ITokenDnaApi(ApiClient apiClient) {
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
     * Build call for interfacesITokenDnaGetDna
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaGetDnaCall(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesIERC721GetApprovedRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/ITokenDna/read/{address}/getDna"
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
    private okhttp3.Call interfacesITokenDnaGetDnaValidateBeforeCall(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDna(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesITokenDnaGetDna(Async)");
        }

        // verify the required parameter 'interfacesIERC721GetApprovedRequest' is set
        if (interfacesIERC721GetApprovedRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenDnaGetDna(Async)");
        }

        return interfacesITokenDnaGetDnaCall(networkId, address, interfacesIERC721GetApprovedRequest, _callback);

    }

    /**
     * ITokenDna.getDna
     * Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @return InterfacesITokenDnaGetDna200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesITokenDnaGetDna200Response interfacesITokenDnaGetDna(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest) throws ApiException {
        ApiResponse<InterfacesITokenDnaGetDna200Response> localVarResp = interfacesITokenDnaGetDnaWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
        return localVarResp.getData();
    }

    /**
     * ITokenDna.getDna
     * Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @return ApiResponse&lt;InterfacesITokenDnaGetDna200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesITokenDnaGetDna200Response> interfacesITokenDnaGetDnaWithHttpInfo(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesITokenDnaGetDnaValidateBeforeCall(networkId, address, interfacesIERC721GetApprovedRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaGetDna200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * ITokenDna.getDna (asynchronously)
     * Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaGetDnaAsync(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback<InterfacesITokenDnaGetDna200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesITokenDnaGetDnaValidateBeforeCall(networkId, address, interfacesIERC721GetApprovedRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaGetDna200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesITokenDnaGetDnaBatch
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaGetDnaBatchRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaGetDnaBatchCall(String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesITokenDnaGetDnaBatchRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/ITokenDna/read/{address}/getDnaBatch"
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
    private okhttp3.Call interfacesITokenDnaGetDnaBatchValidateBeforeCall(String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDnaBatch(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesITokenDnaGetDnaBatch(Async)");
        }

        // verify the required parameter 'interfacesITokenDnaGetDnaBatchRequest' is set
        if (interfacesITokenDnaGetDnaBatchRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesITokenDnaGetDnaBatchRequest' when calling interfacesITokenDnaGetDnaBatch(Async)");
        }

        return interfacesITokenDnaGetDnaBatchCall(networkId, address, interfacesITokenDnaGetDnaBatchRequest, _callback);

    }

    /**
     * ITokenDna.getDnaBatch
     * Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaGetDnaBatchRequest  (required)
     * @return InterfacesITokenDnaGetDnaBatch200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesITokenDnaGetDnaBatch200Response interfacesITokenDnaGetDnaBatch(String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest) throws ApiException {
        ApiResponse<InterfacesITokenDnaGetDnaBatch200Response> localVarResp = interfacesITokenDnaGetDnaBatchWithHttpInfo(networkId, address, interfacesITokenDnaGetDnaBatchRequest);
        return localVarResp.getData();
    }

    /**
     * ITokenDna.getDnaBatch
     * Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaGetDnaBatchRequest  (required)
     * @return ApiResponse&lt;InterfacesITokenDnaGetDnaBatch200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesITokenDnaGetDnaBatch200Response> interfacesITokenDnaGetDnaBatchWithHttpInfo(String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesITokenDnaGetDnaBatchValidateBeforeCall(networkId, address, interfacesITokenDnaGetDnaBatchRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaGetDnaBatch200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * ITokenDna.getDnaBatch (asynchronously)
     * Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaGetDnaBatchRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaGetDnaBatchAsync(String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest, final ApiCallback<InterfacesITokenDnaGetDnaBatch200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesITokenDnaGetDnaBatchValidateBeforeCall(networkId, address, interfacesITokenDnaGetDnaBatchRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaGetDnaBatch200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesITokenDnaSetDna
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaSetDnaCall(String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesITokenDnaSetDnaRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/ITokenDna/write/{address}/setDna"
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
    private okhttp3.Call interfacesITokenDnaSetDnaValidateBeforeCall(String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDna(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesITokenDnaSetDna(Async)");
        }

        // verify the required parameter 'interfacesITokenDnaSetDnaRequest' is set
        if (interfacesITokenDnaSetDnaRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesITokenDnaSetDnaRequest' when calling interfacesITokenDnaSetDna(Async)");
        }

        return interfacesITokenDnaSetDnaCall(networkId, address, interfacesITokenDnaSetDnaRequest, _callback);

    }

    /**
     * ITokenDna.setDna
     * Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaRequest  (required)
     * @return InterfacesITokenDnaSetDna200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesITokenDnaSetDna200Response interfacesITokenDnaSetDna(String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest) throws ApiException {
        ApiResponse<InterfacesITokenDnaSetDna200Response> localVarResp = interfacesITokenDnaSetDnaWithHttpInfo(networkId, address, interfacesITokenDnaSetDnaRequest);
        return localVarResp.getData();
    }

    /**
     * ITokenDna.setDna
     * Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaRequest  (required)
     * @return ApiResponse&lt;InterfacesITokenDnaSetDna200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesITokenDnaSetDna200Response> interfacesITokenDnaSetDnaWithHttpInfo(String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesITokenDnaSetDnaValidateBeforeCall(networkId, address, interfacesITokenDnaSetDnaRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaSetDna200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * ITokenDna.setDna (asynchronously)
     * Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaSetDnaAsync(String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest, final ApiCallback<InterfacesITokenDnaSetDna200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesITokenDnaSetDnaValidateBeforeCall(networkId, address, interfacesITokenDnaSetDnaRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaSetDna200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesITokenDnaSetDnaBatch
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaBatchRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaSetDnaBatchCall(String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesITokenDnaSetDnaBatchRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/ITokenDna/write/{address}/setDnaBatch"
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
    private okhttp3.Call interfacesITokenDnaSetDnaBatchValidateBeforeCall(String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDnaBatch(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesITokenDnaSetDnaBatch(Async)");
        }

        // verify the required parameter 'interfacesITokenDnaSetDnaBatchRequest' is set
        if (interfacesITokenDnaSetDnaBatchRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesITokenDnaSetDnaBatchRequest' when calling interfacesITokenDnaSetDnaBatch(Async)");
        }

        return interfacesITokenDnaSetDnaBatchCall(networkId, address, interfacesITokenDnaSetDnaBatchRequest, _callback);

    }

    /**
     * ITokenDna.setDnaBatch
     * Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaBatchRequest  (required)
     * @return InterfacesITokenDnaSetDnaBatch200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesITokenDnaSetDnaBatch200Response interfacesITokenDnaSetDnaBatch(String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest) throws ApiException {
        ApiResponse<InterfacesITokenDnaSetDnaBatch200Response> localVarResp = interfacesITokenDnaSetDnaBatchWithHttpInfo(networkId, address, interfacesITokenDnaSetDnaBatchRequest);
        return localVarResp.getData();
    }

    /**
     * ITokenDna.setDnaBatch
     * Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaBatchRequest  (required)
     * @return ApiResponse&lt;InterfacesITokenDnaSetDnaBatch200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesITokenDnaSetDnaBatch200Response> interfacesITokenDnaSetDnaBatchWithHttpInfo(String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesITokenDnaSetDnaBatchValidateBeforeCall(networkId, address, interfacesITokenDnaSetDnaBatchRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaSetDnaBatch200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * ITokenDna.setDnaBatch (asynchronously)
     * Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesITokenDnaSetDnaBatchRequest  (required)
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
    public okhttp3.Call interfacesITokenDnaSetDnaBatchAsync(String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest, final ApiCallback<InterfacesITokenDnaSetDnaBatch200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesITokenDnaSetDnaBatchValidateBeforeCall(networkId, address, interfacesITokenDnaSetDnaBatchRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesITokenDnaSetDnaBatch200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
}