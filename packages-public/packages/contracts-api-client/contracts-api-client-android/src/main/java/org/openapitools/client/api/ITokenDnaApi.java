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
import org.openapitools.client.model.InterfacesIERC721GetApprovedRequest;
import org.openapitools.client.model.InterfacesITokenDnaGetDna200Response;
import org.openapitools.client.model.InterfacesITokenDnaGetDnaBatch200Response;
import org.openapitools.client.model.InterfacesITokenDnaGetDnaBatchRequest;
import org.openapitools.client.model.InterfacesITokenDnaSetDna200Response;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaBatch200Response;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaBatchRequest;
import org.openapitools.client.model.InterfacesITokenDnaSetDnaRequest;

import org.apache.http.HttpEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

public class ITokenDnaApi {
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
  * ITokenDna.getDna
  * Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIERC721GetApprovedRequest 
   * @return InterfacesITokenDnaGetDna200Response
  */
  public InterfacesITokenDnaGetDna200Response interfacesITokenDnaGetDna (String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIERC721GetApprovedRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDna"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaGetDna"));
    }
    // verify the required parameter 'interfacesIERC721GetApprovedRequest' is set
    if (interfacesIERC721GetApprovedRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenDnaGetDna"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/read/{address}/getDna".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesITokenDnaGetDna200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesITokenDnaGetDna200Response.class);
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
   * ITokenDna.getDna
   * Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIERC721GetApprovedRequest 
  */
  public void interfacesITokenDnaGetDna (String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final Response.Listener<InterfacesITokenDnaGetDna200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIERC721GetApprovedRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDna"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaGetDna"));
    }
    // verify the required parameter 'interfacesIERC721GetApprovedRequest' is set
    if (interfacesIERC721GetApprovedRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenDnaGetDna",
        new ApiException(400, "Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenDnaGetDna"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/read/{address}/getDna".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesITokenDnaGetDna200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesITokenDnaGetDna200Response.class));
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
  * ITokenDna.getDnaBatch
  * Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesITokenDnaGetDnaBatchRequest 
   * @return InterfacesITokenDnaGetDnaBatch200Response
  */
  public InterfacesITokenDnaGetDnaBatch200Response interfacesITokenDnaGetDnaBatch (String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesITokenDnaGetDnaBatchRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDnaBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaGetDnaBatch"));
    }
    // verify the required parameter 'interfacesITokenDnaGetDnaBatchRequest' is set
    if (interfacesITokenDnaGetDnaBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaGetDnaBatchRequest' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaGetDnaBatchRequest' when calling interfacesITokenDnaGetDnaBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/read/{address}/getDnaBatch".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesITokenDnaGetDnaBatch200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesITokenDnaGetDnaBatch200Response.class);
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
   * ITokenDna.getDnaBatch
   * Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesITokenDnaGetDnaBatchRequest 
  */
  public void interfacesITokenDnaGetDnaBatch (String networkId, String address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest, final Response.Listener<InterfacesITokenDnaGetDnaBatch200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesITokenDnaGetDnaBatchRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaGetDnaBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaGetDnaBatch"));
    }
    // verify the required parameter 'interfacesITokenDnaGetDnaBatchRequest' is set
    if (interfacesITokenDnaGetDnaBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaGetDnaBatchRequest' when calling interfacesITokenDnaGetDnaBatch",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaGetDnaBatchRequest' when calling interfacesITokenDnaGetDnaBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/read/{address}/getDnaBatch".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesITokenDnaGetDnaBatch200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesITokenDnaGetDnaBatch200Response.class));
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
  * ITokenDna.setDna
  * Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesITokenDnaSetDnaRequest 
   * @return InterfacesITokenDnaSetDna200Response
  */
  public InterfacesITokenDnaSetDna200Response interfacesITokenDnaSetDna (String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesITokenDnaSetDnaRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDna"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaSetDna"));
    }
    // verify the required parameter 'interfacesITokenDnaSetDnaRequest' is set
    if (interfacesITokenDnaSetDnaRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaSetDnaRequest' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaSetDnaRequest' when calling interfacesITokenDnaSetDna"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/write/{address}/setDna".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesITokenDnaSetDna200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesITokenDnaSetDna200Response.class);
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
   * ITokenDna.setDna
   * Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesITokenDnaSetDnaRequest 
  */
  public void interfacesITokenDnaSetDna (String networkId, String address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest, final Response.Listener<InterfacesITokenDnaSetDna200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesITokenDnaSetDnaRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDna"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaSetDna"));
    }
    // verify the required parameter 'interfacesITokenDnaSetDnaRequest' is set
    if (interfacesITokenDnaSetDnaRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaSetDnaRequest' when calling interfacesITokenDnaSetDna",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaSetDnaRequest' when calling interfacesITokenDnaSetDna"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/write/{address}/setDna".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesITokenDnaSetDna200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesITokenDnaSetDna200Response.class));
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
  * ITokenDna.setDnaBatch
  * Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesITokenDnaSetDnaBatchRequest 
   * @return InterfacesITokenDnaSetDnaBatch200Response
  */
  public InterfacesITokenDnaSetDnaBatch200Response interfacesITokenDnaSetDnaBatch (String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesITokenDnaSetDnaBatchRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDnaBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaSetDnaBatch"));
    }
    // verify the required parameter 'interfacesITokenDnaSetDnaBatchRequest' is set
    if (interfacesITokenDnaSetDnaBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaSetDnaBatchRequest' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaSetDnaBatchRequest' when calling interfacesITokenDnaSetDnaBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/write/{address}/setDnaBatch".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesITokenDnaSetDnaBatch200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesITokenDnaSetDnaBatch200Response.class);
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
   * ITokenDna.setDnaBatch
   * Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesITokenDnaSetDnaBatchRequest 
  */
  public void interfacesITokenDnaSetDnaBatch (String networkId, String address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest, final Response.Listener<InterfacesITokenDnaSetDnaBatch200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesITokenDnaSetDnaBatchRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenDnaSetDnaBatch"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenDnaSetDnaBatch"));
    }
    // verify the required parameter 'interfacesITokenDnaSetDnaBatchRequest' is set
    if (interfacesITokenDnaSetDnaBatchRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesITokenDnaSetDnaBatchRequest' when calling interfacesITokenDnaSetDnaBatch",
        new ApiException(400, "Missing the required parameter 'interfacesITokenDnaSetDnaBatchRequest' when calling interfacesITokenDnaSetDnaBatch"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenDna/write/{address}/setDnaBatch".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesITokenDnaSetDnaBatch200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesITokenDnaSetDnaBatch200Response.class));
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