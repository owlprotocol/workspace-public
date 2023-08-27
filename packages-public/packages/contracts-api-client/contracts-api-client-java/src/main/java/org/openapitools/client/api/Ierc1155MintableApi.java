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
import org.openapitools.client.model.InterfacesIERC1155MintableMint200Response;
import org.openapitools.client.model.InterfacesIERC1155MintableMintBatch200Response;
import org.openapitools.client.model.InterfacesIERC1155MintableMintBatchRequest;
import org.openapitools.client.model.InterfacesIERC1155MintableMintRequest;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.GenericType;

public class Ierc1155MintableApi {
    private ApiClient localVarApiClient;
    private int localHostIndex;
    private String localCustomBaseUrl;

    public Ierc1155MintableApi() {
        this(Configuration.getDefaultApiClient());
    }

    public Ierc1155MintableApi(ApiClient apiClient) {
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
     * Build call for interfacesIERC1155MintableMint
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintRequest  (required)
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
    public okhttp3.Call interfacesIERC1155MintableMintCall(String networkId, String address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesIERC1155MintableMintRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IERC1155Mintable/write/{address}/mint"
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
    private okhttp3.Call interfacesIERC1155MintableMintValidateBeforeCall(String networkId, String address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIERC1155MintableMint(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIERC1155MintableMint(Async)");
        }

        // verify the required parameter 'interfacesIERC1155MintableMintRequest' is set
        if (interfacesIERC1155MintableMintRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC1155MintableMintRequest' when calling interfacesIERC1155MintableMint(Async)");
        }

        return interfacesIERC1155MintableMintCall(networkId, address, interfacesIERC1155MintableMintRequest, _callback);

    }

    /**
     * IERC1155Mintable.mint
     * Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintRequest  (required)
     * @return InterfacesIERC1155MintableMint200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIERC1155MintableMint200Response interfacesIERC1155MintableMint(String networkId, String address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest) throws ApiException {
        ApiResponse<InterfacesIERC1155MintableMint200Response> localVarResp = interfacesIERC1155MintableMintWithHttpInfo(networkId, address, interfacesIERC1155MintableMintRequest);
        return localVarResp.getData();
    }

    /**
     * IERC1155Mintable.mint
     * Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintRequest  (required)
     * @return ApiResponse&lt;InterfacesIERC1155MintableMint200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIERC1155MintableMint200Response> interfacesIERC1155MintableMintWithHttpInfo(String networkId, String address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIERC1155MintableMintValidateBeforeCall(networkId, address, interfacesIERC1155MintableMintRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIERC1155MintableMint200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IERC1155Mintable.mint (asynchronously)
     * Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintRequest  (required)
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
    public okhttp3.Call interfacesIERC1155MintableMintAsync(String networkId, String address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest, final ApiCallback<InterfacesIERC1155MintableMint200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIERC1155MintableMintValidateBeforeCall(networkId, address, interfacesIERC1155MintableMintRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIERC1155MintableMint200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesIERC1155MintableMintBatch
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintBatchRequest  (required)
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
    public okhttp3.Call interfacesIERC1155MintableMintBatchCall(String networkId, String address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesIERC1155MintableMintBatchRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch"
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
    private okhttp3.Call interfacesIERC1155MintableMintBatchValidateBeforeCall(String networkId, String address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIERC1155MintableMintBatch(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIERC1155MintableMintBatch(Async)");
        }

        // verify the required parameter 'interfacesIERC1155MintableMintBatchRequest' is set
        if (interfacesIERC1155MintableMintBatchRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC1155MintableMintBatchRequest' when calling interfacesIERC1155MintableMintBatch(Async)");
        }

        return interfacesIERC1155MintableMintBatchCall(networkId, address, interfacesIERC1155MintableMintBatchRequest, _callback);

    }

    /**
     * IERC1155Mintable.mintBatch
     * Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintBatchRequest  (required)
     * @return InterfacesIERC1155MintableMintBatch200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIERC1155MintableMintBatch200Response interfacesIERC1155MintableMintBatch(String networkId, String address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest) throws ApiException {
        ApiResponse<InterfacesIERC1155MintableMintBatch200Response> localVarResp = interfacesIERC1155MintableMintBatchWithHttpInfo(networkId, address, interfacesIERC1155MintableMintBatchRequest);
        return localVarResp.getData();
    }

    /**
     * IERC1155Mintable.mintBatch
     * Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintBatchRequest  (required)
     * @return ApiResponse&lt;InterfacesIERC1155MintableMintBatch200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIERC1155MintableMintBatch200Response> interfacesIERC1155MintableMintBatchWithHttpInfo(String networkId, String address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIERC1155MintableMintBatchValidateBeforeCall(networkId, address, interfacesIERC1155MintableMintBatchRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIERC1155MintableMintBatch200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IERC1155Mintable.mintBatch (asynchronously)
     * Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC1155MintableMintBatchRequest  (required)
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
    public okhttp3.Call interfacesIERC1155MintableMintBatchAsync(String networkId, String address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest, final ApiCallback<InterfacesIERC1155MintableMintBatch200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIERC1155MintableMintBatchValidateBeforeCall(networkId, address, interfacesIERC1155MintableMintBatchRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIERC1155MintableMintBatch200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
}