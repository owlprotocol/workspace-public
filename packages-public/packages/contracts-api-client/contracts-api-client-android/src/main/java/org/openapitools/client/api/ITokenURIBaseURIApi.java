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
import org.openapitools.client.model.InterfacesIBeaconImplementationRequest;
import org.openapitools.client.model.InterfacesIContractURIContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURIRequest;

import org.apache.http.HttpEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

public class ITokenURIBaseURIApi {
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
  * ITokenURIBaseURI.baseURI
  * Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIBeaconImplementationRequest 
   * @return InterfacesIContractURIContractURI200Response
  */
  public InterfacesIContractURIContractURI200Response interfacesITokenURIBaseURIBaseURI (String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIBeaconImplementationRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURIBaseURI"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenURIBaseURIBaseURI"));
    }
    // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
    if (interfacesIBeaconImplementationRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIBeaconImplementationRequest' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'interfacesIBeaconImplementationRequest' when calling interfacesITokenURIBaseURIBaseURI"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesIContractURIContractURI200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIContractURIContractURI200Response.class);
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
   * ITokenURIBaseURI.baseURI
   * Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIBeaconImplementationRequest 
  */
  public void interfacesITokenURIBaseURIBaseURI (String networkId, String address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, final Response.Listener<InterfacesIContractURIContractURI200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIBeaconImplementationRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURIBaseURI"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenURIBaseURIBaseURI"));
    }
    // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
    if (interfacesIBeaconImplementationRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIBeaconImplementationRequest' when calling interfacesITokenURIBaseURIBaseURI",
        new ApiException(400, "Missing the required parameter 'interfacesIBeaconImplementationRequest' when calling interfacesITokenURIBaseURIBaseURI"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesIContractURIContractURI200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIContractURIContractURI200Response.class));
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
  * ITokenURIBaseURI.setTokenURIBaseURI
  * Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
   * @param networkId The network id
   * @param address An ethereum address
   * @param interfacesIContractURISetContractURIRequest 
   * @return InterfacesIContractURISetContractURI200Response
  */
  public InterfacesIContractURISetContractURI200Response interfacesITokenURIBaseURISetTokenURIBaseURI (String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest) throws TimeoutException, ExecutionException, InterruptedException, ApiException {
    Object postBody = interfacesIContractURISetContractURIRequest;
    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }
    // verify the required parameter 'interfacesIContractURISetContractURIRequest' is set
    if (interfacesIContractURISetContractURIRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIContractURISetContractURIRequest' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'interfacesIContractURISetContractURIRequest' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI".replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
         return (InterfacesIContractURISetContractURI200Response) ApiInvoker.deserialize(localVarResponse, "", InterfacesIContractURISetContractURI200Response.class);
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
   * ITokenURIBaseURI.setTokenURIBaseURI
   * Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
   * @param networkId The network id   * @param address An ethereum address   * @param interfacesIContractURISetContractURIRequest 
  */
  public void interfacesITokenURIBaseURISetTokenURIBaseURI (String networkId, String address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, final Response.Listener<InterfacesIContractURISetContractURI200Response> responseListener, final Response.ErrorListener errorListener) {
    Object postBody = interfacesIContractURISetContractURIRequest;

    // verify the required parameter 'networkId' is set
    if (networkId == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'networkId' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }
    // verify the required parameter 'address' is set
    if (address == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'address' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'address' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }
    // verify the required parameter 'interfacesIContractURISetContractURIRequest' is set
    if (interfacesIContractURISetContractURIRequest == null) {
      VolleyError error = new VolleyError("Missing the required parameter 'interfacesIContractURISetContractURIRequest' when calling interfacesITokenURIBaseURISetTokenURIBaseURI",
        new ApiException(400, "Missing the required parameter 'interfacesIContractURISetContractURIRequest' when calling interfacesITokenURIBaseURISetTokenURIBaseURI"));
    }

    // create path and map variables
    String path = "/{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI".replaceAll("\\{format\\}","json").replaceAll("\\{" + "networkId" + "\\}", apiInvoker.escapeString(networkId.toString())).replaceAll("\\{" + "address" + "\\}", apiInvoker.escapeString(address.toString()));

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
              responseListener.onResponse((InterfacesIContractURISetContractURI200Response) ApiInvoker.deserialize(localVarResponse,  "", InterfacesIContractURISetContractURI200Response.class));
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