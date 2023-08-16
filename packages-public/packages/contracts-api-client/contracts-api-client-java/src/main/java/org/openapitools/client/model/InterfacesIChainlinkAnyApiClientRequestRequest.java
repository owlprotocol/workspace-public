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
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequestRequestContractParams;

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
 * InterfacesIChainlinkAnyApiClientRequestRequest
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIChainlinkAnyApiClientRequestRequest {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIChainlinkAnyApiClientRequestRequestContractParams contractParams;

  public InterfacesIChainlinkAnyApiClientRequestRequest() {
  }

  public InterfacesIChainlinkAnyApiClientRequestRequest contractParams(InterfacesIChainlinkAnyApiClientRequestRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIChainlinkAnyApiClientRequestRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIChainlinkAnyApiClientRequestRequestContractParams contractParams) {
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
    InterfacesIChainlinkAnyApiClientRequestRequest interfacesIChainlinkAnyApiClientRequestRequest = (InterfacesIChainlinkAnyApiClientRequestRequest) o;
    return Objects.equals(this.contractParams, interfacesIChainlinkAnyApiClientRequestRequest.contractParams);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIChainlinkAnyApiClientRequestRequest {\n");
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
    openapiFields.add("contractParams");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
    openapiRequiredFields.add("contractParams");
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIChainlinkAnyApiClientRequestRequest
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIChainlinkAnyApiClientRequestRequest.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIChainlinkAnyApiClientRequestRequest is not found in the empty JSON string", InterfacesIChainlinkAnyApiClientRequestRequest.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIChainlinkAnyApiClientRequestRequest.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIChainlinkAnyApiClientRequestRequest` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIChainlinkAnyApiClientRequestRequest.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIChainlinkAnyApiClientRequestRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIChainlinkAnyApiClientRequestRequest.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIChainlinkAnyApiClientRequestRequest' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIChainlinkAnyApiClientRequestRequest> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIChainlinkAnyApiClientRequestRequest.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIChainlinkAnyApiClientRequestRequest>() {
           @Override
           public void write(JsonWriter out, InterfacesIChainlinkAnyApiClientRequestRequest value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIChainlinkAnyApiClientRequestRequest read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIChainlinkAnyApiClientRequestRequest given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIChainlinkAnyApiClientRequestRequest
  * @throws IOException if the JSON string is invalid with respect to InterfacesIChainlinkAnyApiClientRequestRequest
  */
  public static InterfacesIChainlinkAnyApiClientRequestRequest fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIChainlinkAnyApiClientRequestRequest.class);
  }

 /**
  * Convert an instance of InterfacesIChainlinkAnyApiClientRequestRequest to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

