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
import org.openapitools.client.model.InterfacesIERC165SupportsInterface200Response;
import org.openapitools.client.model.InterfacesIERC165SupportsInterfaceRequest;
import org.openapitools.client.model.InterfacesIERC2981RoyaltyInfo200Response;
import org.openapitools.client.model.InterfacesIERC2981RoyaltyInfoRequest;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.GenericType;

public class Ierc2981Api {
    private ApiClient localVarApiClient;
    private int localHostIndex;
    private String localCustomBaseUrl;

    public Ierc2981Api() {
        this(Configuration.getDefaultApiClient());
    }

    public Ierc2981Api(ApiClient apiClient) {
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
     * Build call for interfacesIERC2981RoyaltyInfo
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC2981RoyaltyInfoRequest  (required)
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
    public okhttp3.Call interfacesIERC2981RoyaltyInfoCall(String networkId, String address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesIERC2981RoyaltyInfoRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IERC2981/read/{address}/royaltyInfo"
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
    private okhttp3.Call interfacesIERC2981RoyaltyInfoValidateBeforeCall(String networkId, String address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIERC2981RoyaltyInfo(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIERC2981RoyaltyInfo(Async)");
        }

        // verify the required parameter 'interfacesIERC2981RoyaltyInfoRequest' is set
        if (interfacesIERC2981RoyaltyInfoRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC2981RoyaltyInfoRequest' when calling interfacesIERC2981RoyaltyInfo(Async)");
        }

        return interfacesIERC2981RoyaltyInfoCall(networkId, address, interfacesIERC2981RoyaltyInfoRequest, _callback);

    }

    /**
     * IERC2981.royaltyInfo
     * Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC2981RoyaltyInfoRequest  (required)
     * @return InterfacesIERC2981RoyaltyInfo200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIERC2981RoyaltyInfo200Response interfacesIERC2981RoyaltyInfo(String networkId, String address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest) throws ApiException {
        ApiResponse<InterfacesIERC2981RoyaltyInfo200Response> localVarResp = interfacesIERC2981RoyaltyInfoWithHttpInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest);
        return localVarResp.getData();
    }

    /**
     * IERC2981.royaltyInfo
     * Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC2981RoyaltyInfoRequest  (required)
     * @return ApiResponse&lt;InterfacesIERC2981RoyaltyInfo200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIERC2981RoyaltyInfo200Response> interfacesIERC2981RoyaltyInfoWithHttpInfo(String networkId, String address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIERC2981RoyaltyInfoValidateBeforeCall(networkId, address, interfacesIERC2981RoyaltyInfoRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIERC2981RoyaltyInfo200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IERC2981.royaltyInfo (asynchronously)
     * Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC2981RoyaltyInfoRequest  (required)
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
    public okhttp3.Call interfacesIERC2981RoyaltyInfoAsync(String networkId, String address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest, final ApiCallback<InterfacesIERC2981RoyaltyInfo200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIERC2981RoyaltyInfoValidateBeforeCall(networkId, address, interfacesIERC2981RoyaltyInfoRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIERC2981RoyaltyInfo200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
    /**
     * Build call for interfacesIERC2981SupportsInterface
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC165SupportsInterfaceRequest  (required)
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
    public okhttp3.Call interfacesIERC2981SupportsInterfaceCall(String networkId, String address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest, final ApiCallback _callback) throws ApiException {
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

        Object localVarPostBody = interfacesIERC165SupportsInterfaceRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/IERC2981/read/{address}/supportsInterface"
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
    private okhttp3.Call interfacesIERC2981SupportsInterfaceValidateBeforeCall(String networkId, String address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesIERC2981SupportsInterface(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesIERC2981SupportsInterface(Async)");
        }

        // verify the required parameter 'interfacesIERC165SupportsInterfaceRequest' is set
        if (interfacesIERC165SupportsInterfaceRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC165SupportsInterfaceRequest' when calling interfacesIERC2981SupportsInterface(Async)");
        }

        return interfacesIERC2981SupportsInterfaceCall(networkId, address, interfacesIERC165SupportsInterfaceRequest, _callback);

    }

    /**
     * IERC2981.supportsInterface
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC165SupportsInterfaceRequest  (required)
     * @return InterfacesIERC165SupportsInterface200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIERC165SupportsInterface200Response interfacesIERC2981SupportsInterface(String networkId, String address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest) throws ApiException {
        ApiResponse<InterfacesIERC165SupportsInterface200Response> localVarResp = interfacesIERC2981SupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
        return localVarResp.getData();
    }

    /**
     * IERC2981.supportsInterface
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC165SupportsInterfaceRequest  (required)
     * @return ApiResponse&lt;InterfacesIERC165SupportsInterface200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIERC165SupportsInterface200Response> interfacesIERC2981SupportsInterfaceWithHttpInfo(String networkId, String address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesIERC2981SupportsInterfaceValidateBeforeCall(networkId, address, interfacesIERC165SupportsInterfaceRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIERC165SupportsInterface200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * IERC2981.supportsInterface (asynchronously)
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC165SupportsInterfaceRequest  (required)
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
    public okhttp3.Call interfacesIERC2981SupportsInterfaceAsync(String networkId, String address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest, final ApiCallback<InterfacesIERC165SupportsInterface200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesIERC2981SupportsInterfaceValidateBeforeCall(networkId, address, interfacesIERC165SupportsInterfaceRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIERC165SupportsInterface200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
}