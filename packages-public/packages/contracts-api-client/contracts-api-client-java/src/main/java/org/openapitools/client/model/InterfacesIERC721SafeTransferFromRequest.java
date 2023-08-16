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
import org.openapitools.client.model.InterfacesIERC721SafeTransferFromRequestContractParams;

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
 * InterfacesIERC721SafeTransferFromRequest
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC721SafeTransferFromRequest {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIERC721SafeTransferFromRequestContractParams contractParams;

  public InterfacesIERC721SafeTransferFromRequest() {
  }

  public InterfacesIERC721SafeTransferFromRequest contractParams(InterfacesIERC721SafeTransferFromRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIERC721SafeTransferFromRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIERC721SafeTransferFromRequestContractParams contractParams) {
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
    InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest = (InterfacesIERC721SafeTransferFromRequest) o;
    return Objects.equals(this.contractParams, interfacesIERC721SafeTransferFromRequest.contractParams);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC721SafeTransferFromRequest {\n");
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
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC721SafeTransferFromRequest
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC721SafeTransferFromRequest.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC721SafeTransferFromRequest is not found in the empty JSON string", InterfacesIERC721SafeTransferFromRequest.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC721SafeTransferFromRequest.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC721SafeTransferFromRequest` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIERC721SafeTransferFromRequest.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIERC721SafeTransferFromRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC721SafeTransferFromRequest.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC721SafeTransferFromRequest' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC721SafeTransferFromRequest> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC721SafeTransferFromRequest.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC721SafeTransferFromRequest>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC721SafeTransferFromRequest value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC721SafeTransferFromRequest read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC721SafeTransferFromRequest given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC721SafeTransferFromRequest
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC721SafeTransferFromRequest
  */
  public static InterfacesIERC721SafeTransferFromRequest fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC721SafeTransferFromRequest.class);
  }

 /**
  * Convert an instance of InterfacesIERC721SafeTransferFromRequest to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

