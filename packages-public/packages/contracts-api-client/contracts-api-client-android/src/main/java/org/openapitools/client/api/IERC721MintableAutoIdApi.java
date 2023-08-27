/**
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

import org.openapitools.client.ApiInvoker;
import org.openapitools.client.ApiException;
import org.openapitools.client.Pair;

import org.openapitools.client.model.*;

import java.util.*;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.openapitools.client.model.DeployBeaconProxyDefaultResponse;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMint200Response;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintBatch200Response;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintBatchRequest;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintRequest;

import org.apache.http.HttpEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

public class IERC721MintableAutoIdApi {
  String basePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
  ApiInvoker apiInvoker = ApiInvoker.getInstance();

  public void addHeader(String key, String value) {
    getInvoker().addDefaultHeader(key, value);
  }

  public ApiInvoker getInvoker() {
    return apiInvoker;
  }

  public void setBasePath(String basePath) {
    this.basePath = basePath;
  }

  public String getBasePath() {
    return basePath;
  }

  /**
  * IERC721MintableAutoId.mint
  * Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIERC721MintableAutoIdMintRequest 
   * @return InterfacesIERC721MintableAutoIdMint200Response
  */
  public InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdMint (String networkId, String address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIERC721MintableAutoIdMintRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMint"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMint"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintRequest' is set
    if (interfacesIERC721MintableAutoIdMintRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdMint"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mint".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();
    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
    }

    String[] authNames = new String[] { "Authorization" };

    try {
      String localVarResponse = apiInvoker.invokeAPI (basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames);
      if (localVarResponse != null) {
         return (InterfacesIERC721MintableAutoIdMint200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIERC721MintableAutoIdMint200Response.class);
      } else {
         return null;
      }
    } catch (ApiException ex) {
       throw ex;
    } catch (InterruptedException ex) {
       throw ex;
    } catch (ExecutionException ex) {
      if (ex.getCause() instanceof VolleyError) {
        VolleyError volleyError = (VolleyError)ex.getCause();
        if (volleyError.networkResponse != null) {
          throw new ApiException(volleyError.networkResponse.statusCode, volleyError.getMessage());
        }
      }
      throw ex;
    } catch (TimeoutException ex) {
      throw ex;
    }
  }

      /**
   * IERC721MintableAutoId.mint
   * Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIERC721MintableAutoIdMintRequest 
  */
  public void interfacesIERC721MintableAutoIdMint (String networkId, String address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest, final Response.Listener<InterfacesIERC721MintableAutoIdMint200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIERC721MintableAutoIdMintRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMint"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMint"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintRequest' is set
    if (interfacesIERC721MintableAutoIdMintRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdMint",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdMint"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mint".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();



    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      

      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
          }

    String[] authNames = new String[] { "Authorization" };

    try {
      apiInvoker.invokeAPI(basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames,
        new Response.Listener<String>() {
          @Override
          public void onResponse(String localVarResponse) {
            try {
              responseListener.onResponse((InterfacesIERC721MintableAutoIdMint200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIERC721MintableAutoIdMint200Response.class));
            } catch (ApiException exception) {
               errorListener.onErrorResponse(new VolleyError(exception));
            }
          }
      }, new Response.ErrorListener() {
          @Override
          public void onErrorResponse(VolleyError error) {
            errorListener.onErrorResponse(error);
          }
      });
    } catch (ApiException ex) {
      errorListener.onErrorResponse(new VolleyError(ex));
    }
  }
  /**
  * IERC721MintableAutoId.mintBatch
  * Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIERC721MintableAutoIdMintBatchRequest 
   * @return InterfacesIERC721MintableAutoIdMintBatch200Response
  */
  public InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdMintBatch (String networkId, String address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIERC721MintableAutoIdMintBatchRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' is set
    if (interfacesIERC721MintableAutoIdMintBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();
    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
    }

    String[] authNames = new String[] { "Authorization" };

    try {
      String localVarResponse = apiInvoker.invokeAPI (basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames);
      if (localVarResponse != null) {
         return (InterfacesIERC721MintableAutoIdMintBatch200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIERC721MintableAutoIdMintBatch200Response.class);
      } else {
         return null;
      }
    } catch (ApiException ex) {
       throw ex;
    } catch (InterruptedException ex) {
       throw ex;
    } catch (ExecutionException ex) {
      if (ex.getCause() instanceof VolleyError) {
        VolleyError volleyError = (VolleyError)ex.getCause();
        if (volleyError.networkResponse != null) {
          throw new ApiException(volleyError.networkResponse.statusCode, volleyError.getMessage());
        }
      }
      throw ex;
    } catch (TimeoutException ex) {
      throw ex;
    }
  }

      /**
   * IERC721MintableAutoId.mintBatch
   * Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIERC721MintableAutoIdMintBatchRequest 
  */
  public void interfacesIERC721MintableAutoIdMintBatch (String networkId, String address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest, final Response.Listener<InterfacesIERC721MintableAutoIdMintBatch200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIERC721MintableAutoIdMintBatchRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' is set
    if (interfacesIERC721MintableAutoIdMintBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdMintBatch",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdMintBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();



    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      

      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
          }

    String[] authNames = new String[] { "Authorization" };

    try {
      apiInvoker.invokeAPI(basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames,
        new Response.Listener<String>() {
          @Override
          public void onResponse(String localVarResponse) {
            try {
              responseListener.onResponse((InterfacesIERC721MintableAutoIdMintBatch200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIERC721MintableAutoIdMintBatch200Response.class));
            } catch (ApiException exception) {
               errorListener.onErrorResponse(new VolleyError(exception));
            }
          }
      }, new Response.ErrorListener() {
          @Override
          public void onErrorResponse(VolleyError error) {
            errorListener.onErrorResponse(error);
          }
      });
    } catch (ApiException ex) {
      errorListener.onErrorResponse(new VolleyError(ex));
    }
  }
  /**
  * IERC721MintableAutoId.safeMint
  * Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIERC721MintableAutoIdMintRequest 
   * @return InterfacesIERC721MintableAutoIdMint200Response
  */
  public InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdSafeMint (String networkId, String address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIERC721MintableAutoIdMintRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintRequest' is set
    if (interfacesIERC721MintableAutoIdMintRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();
    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
    }

    String[] authNames = new String[] { "Authorization" };

    try {
      String localVarResponse = apiInvoker.invokeAPI (basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames);
      if (localVarResponse != null) {
         return (InterfacesIERC721MintableAutoIdMint200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIERC721MintableAutoIdMint200Response.class);
      } else {
         return null;
      }
    } catch (ApiException ex) {
       throw ex;
    } catch (InterruptedException ex) {
       throw ex;
    } catch (ExecutionException ex) {
      if (ex.getCause() instanceof VolleyError) {
        VolleyError volleyError = (VolleyError)ex.getCause();
        if (volleyError.networkResponse != null) {
          throw new ApiException(volleyError.networkResponse.statusCode, volleyError.getMessage());
        }
      }
      throw ex;
    } catch (TimeoutException ex) {
      throw ex;
    }
  }

      /**
   * IERC721MintableAutoId.safeMint
   * Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIERC721MintableAutoIdMintRequest 
  */
  public void interfacesIERC721MintableAutoIdSafeMint (String networkId, String address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest, final Response.Listener<InterfacesIERC721MintableAutoIdMint200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIERC721MintableAutoIdMintRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintRequest' is set
    if (interfacesIERC721MintableAutoIdMintRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdSafeMint",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintRequest' when calling interfacesIERC721MintableAutoIdSafeMint"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();



    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      

      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
          }

    String[] authNames = new String[] { "Authorization" };

    try {
      apiInvoker.invokeAPI(basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames,
        new Response.Listener<String>() {
          @Override
          public void onResponse(String localVarResponse) {
            try {
              responseListener.onResponse((InterfacesIERC721MintableAutoIdMint200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIERC721MintableAutoIdMint200Response.class));
            } catch (ApiException exception) {
               errorListener.onErrorResponse(new VolleyError(exception));
            }
          }
      }, new Response.ErrorListener() {
          @Override
          public void onErrorResponse(VolleyError error) {
            errorListener.onErrorResponse(error);
          }
      });
    } catch (ApiException ex) {
      errorListener.onErrorResponse(new VolleyError(ex));
    }
  }
  /**
  * IERC721MintableAutoId.safeMintBatch
  * Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIERC721MintableAutoIdMintBatchRequest 
   * @return InterfacesIERC721MintableAutoIdMintBatch200Response
  */
  public InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdSafeMintBatch (String networkId, String address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIERC721MintableAutoIdMintBatchRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' is set
    if (interfacesIERC721MintableAutoIdMintBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();
    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
    }

    String[] authNames = new String[] { "Authorization" };

    try {
      String localVarResponse = apiInvoker.invokeAPI (basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames);
      if (localVarResponse != null) {
         return (InterfacesIERC721MintableAutoIdMintBatch200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIERC721MintableAutoIdMintBatch200Response.class);
      } else {
         return null;
      }
    } catch (ApiException ex) {
       throw ex;
    } catch (InterruptedException ex) {
       throw ex;
    } catch (ExecutionException ex) {
      if (ex.getCause() instanceof VolleyError) {
        VolleyError volleyError = (VolleyError)ex.getCause();
        if (volleyError.networkResponse != null) {
          throw new ApiException(volleyError.networkResponse.statusCode, volleyError.getMessage());
        }
      }
      throw ex;
    } catch (TimeoutException ex) {
      throw ex;
    }
  }

      /**
   * IERC721MintableAutoId.safeMintBatch
   * Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIERC721MintableAutoIdMintBatchRequest 
  */
  public void interfacesIERC721MintableAutoIdSafeMintBatch (String networkId, String address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest, final Response.Listener<InterfacesIERC721MintableAutoIdMintBatch200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIERC721MintableAutoIdMintBatchRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }
    // verify the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' is set
    if (interfacesIERC721MintableAutoIdMintBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdSafeMintBatch",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721MintableAutoIdMintBatchRequest' when calling interfacesIERC721MintableAutoIdSafeMintBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

    // query params
    List<Pair> queryParams = new ArrayList<Pair>();
    // header params
    Map<String, String> headerParams = new HashMap<String, String>();
    // form params
    Map<String, String> formParams = new HashMap<String, String>();



    String[] contentTypes = {
      "application/json"
    };
    String contentType = contentTypes.length > 0 ? contentTypes[0] : "application/json";

    if (contentType.startsWith("multipart/form-data")) {
      // file uploading
      MultipartEntityBuilder localVarBuilder = MultipartEntityBuilder.create();
      

      HttpEntity httpEntity = localVarBuilder.build();
      postBody = httpEntity;
    } else {
      // normal form params
          }

    String[] authNames = new String[] { "Authorization" };

    try {
      apiInvoker.invokeAPI(basePath, path, "POST", queryParams, postBody, headerParams, formParams, contentType, authNames,
        new Response.Listener<String>() {
          @Override
          public void onResponse(String localVarResponse) {
            try {
              responseListener.onResponse((InterfacesIERC721MintableAutoIdMintBatch200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIERC721MintableAutoIdMintBatch200Response.class));
            } catch (ApiException exception) {
               errorListener.onErrorResponse(new VolleyError(exception));
            }
          }
      }, new Response.ErrorListener() {
          @Override
          public void onErrorResponse(VolleyError error) {
            errorListener.onErrorResponse(error);
          }
      });
    } catch (ApiException ex) {
      errorListener.onErrorResponse(new VolleyError(ex));
    }
  }
}