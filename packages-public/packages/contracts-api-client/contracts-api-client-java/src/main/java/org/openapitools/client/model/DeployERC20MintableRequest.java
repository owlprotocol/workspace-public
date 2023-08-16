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


package org.openapitools.client.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import org.openapitools.client.model.DeployBeaconProxyRequestDeployParams;
import org.openapitools.client.model.DeployERC20MintableRequestContractParams;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.openapitools.client.JSON;

/**
 * DeployERC20MintableRequest
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class DeployERC20MintableRequest {
  public static final String SERIALIZED_NAME_DEPLOY_PARAMS = "deployParams";
  @SerializedName(SERIALIZED_NAME_DEPLOY_PARAMS)
  private DeployBeaconProxyRequestDeployParams deployParams;

  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private DeployERC20MintableRequestContractParams contractParams;

  public DeployERC20MintableRequest() {
  }

  public DeployERC20MintableRequest deployParams(DeployBeaconProxyRequestDeployParams deployParams) {
    
    this.deployParams = deployParams;
    return this;
  }

   /**
   * Get deployParams
   * @return deployParams
  **/
  @javax.annotation.Nonnull
  public DeployBeaconProxyRequestDeployParams getDeployParams() {
    return deployParams;
  }


  public void setDeployParams(DeployBeaconProxyRequestDeployParams deployParams) {
    this.deployParams = deployParams;
  }


  public DeployERC20MintableRequest contractParams(DeployERC20MintableRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public DeployERC20MintableRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(DeployERC20MintableRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeployERC20MintableRequest deployERC20MintableRequest = (DeployERC20MintableRequest) o;
    return Objects.equals(this.deployParams, deployERC20MintableRequest.deployParams) &&
        Objects.equals(this.contractParams, deployERC20MintableRequest.contractParams);
  }

  @Override
  public int hashCode() {
    return Objects.hash(deployParams, contractParams);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeployERC20MintableRequest {\n");
    sb.append("    deployParams: ").append(toIndentedString(deployParams)).append("\n");
    sb.append("    contractParams: ").append(toIndentedString(contractParams)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }


  public static HashSet<String> openapiFields;
  public static HashSet<String> openapiRequiredFields;

  static {
    // a set of all properties/fields (JSON key names)
    openapiFields = new HashSet<String>();
    openapiFields.add("deployParams");
    openapiFields.add("contractParams");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
    openapiRequiredFields.add("deployParams");
    openapiRequiredFields.add("contractParams");
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to DeployERC20MintableRequest
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!DeployERC20MintableRequest.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in DeployERC20MintableRequest is not found in the empty JSON string", DeployERC20MintableRequest.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!DeployERC20MintableRequest.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `DeployERC20MintableRequest` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : DeployERC20MintableRequest.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `deployParams`
      DeployBeaconProxyRequestDeployParams.validateJsonObject(jsonObj.getAsJsonObject("deployParams"));
      // validate the required field `contractParams`
      DeployERC20MintableRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!DeployERC20MintableRequest.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'DeployERC20MintableRequest' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<DeployERC20MintableRequest> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(DeployERC20MintableRequest.class));

       return (TypeAdapter<T>) new TypeAdapter<DeployERC20MintableRequest>() {
           @Override
           public void write(JsonWriter out, DeployERC20MintableRequest value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public DeployERC20MintableRequest read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of DeployERC20MintableRequest given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of DeployERC20MintableRequest
  * @throws IOException if the JSON string is invalid with respect to DeployERC20MintableRequest
  */
  public static DeployERC20MintableRequest fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, DeployERC20MintableRequest.class);
  }

 /**
  * Convert an instance of DeployERC20MintableRequest to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

