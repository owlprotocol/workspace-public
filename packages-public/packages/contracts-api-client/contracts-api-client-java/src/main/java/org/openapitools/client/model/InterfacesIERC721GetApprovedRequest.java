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
import org.openapitools.client.model.InterfacesIERC721GetApprovedRequestContractParams;

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
 * InterfacesIERC721GetApprovedRequest
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC721GetApprovedRequest {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIERC721GetApprovedRequestContractParams contractParams;

  public InterfacesIERC721GetApprovedRequest() {
  }

  public InterfacesIERC721GetApprovedRequest contractParams(InterfacesIERC721GetApprovedRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIERC721GetApprovedRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIERC721GetApprovedRequestContractParams contractParams) {
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
    InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = (InterfacesIERC721GetApprovedRequest) o;
    return Objects.equals(this.contractParams, interfacesIERC721GetApprovedRequest.contractParams);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC721GetApprovedRequest {\n");
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
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC721GetApprovedRequest
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC721GetApprovedRequest.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC721GetApprovedRequest is not found in the empty JSON string", InterfacesIERC721GetApprovedRequest.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC721GetApprovedRequest.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC721GetApprovedRequest` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIERC721GetApprovedRequest.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIERC721GetApprovedRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC721GetApprovedRequest.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC721GetApprovedRequest' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC721GetApprovedRequest> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC721GetApprovedRequest.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC721GetApprovedRequest>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC721GetApprovedRequest value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC721GetApprovedRequest read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC721GetApprovedRequest given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC721GetApprovedRequest
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC721GetApprovedRequest
  */
  public static InterfacesIERC721GetApprovedRequest fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC721GetApprovedRequest.class);
  }

 /**
  * Convert an instance of InterfacesIERC721GetApprovedRequest to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}
