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
import org.openapitools.client.model.InterfacesIContractURISetContractURIRequestContractParams;

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
 * InterfacesIContractURISetContractURI200Response
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIContractURISetContractURI200Response {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIContractURISetContractURIRequestContractParams contractParams;

  public static final String SERIALIZED_NAME_TX_HASH = "txHash";
  @SerializedName(SERIALIZED_NAME_TX_HASH)
  private String txHash;

  public InterfacesIContractURISetContractURI200Response() {
  }

  public InterfacesIContractURISetContractURI200Response contractParams(InterfacesIContractURISetContractURIRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIContractURISetContractURIRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIContractURISetContractURIRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }


  public InterfacesIContractURISetContractURI200Response txHash(String txHash) {
    
    this.txHash = txHash;
    return this;
  }

   /**
   * Get txHash
   * @return txHash
  **/
  @javax.annotation.Nonnull
  public String getTxHash() {
    return txHash;
  }


  public void setTxHash(String txHash) {
    this.txHash = txHash;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIContractURISetContractURI200Response interfacesIContractURISetContractURI200Response = (InterfacesIContractURISetContractURI200Response) o;
    return Objects.equals(this.contractParams, interfacesIContractURISetContractURI200Response.contractParams) &&
        Objects.equals(this.txHash, interfacesIContractURISetContractURI200Response.txHash);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams, txHash);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIContractURISetContractURI200Response {\n");
    sb.append("    contractParams: ").append(toIndentedString(contractParams)).append("\n");
    sb.append("    txHash: ").append(toIndentedString(txHash)).append("\n");
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
    openapiFields.add("txHash");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
    openapiRequiredFields.add("contractParams");
    openapiRequiredFields.add("txHash");
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIContractURISetContractURI200Response
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIContractURISetContractURI200Response.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIContractURISetContractURI200Response is not found in the empty JSON string", InterfacesIContractURISetContractURI200Response.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIContractURISetContractURI200Response.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIContractURISetContractURI200Response` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIContractURISetContractURI200Response.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIContractURISetContractURIRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
      if (!jsonObj.get("txHash").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `txHash` to be a primitive type in the JSON string but got `%s`", jsonObj.get("txHash").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIContractURISetContractURI200Response.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIContractURISetContractURI200Response' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIContractURISetContractURI200Response> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIContractURISetContractURI200Response.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIContractURISetContractURI200Response>() {
           @Override
           public void write(JsonWriter out, InterfacesIContractURISetContractURI200Response value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIContractURISetContractURI200Response read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIContractURISetContractURI200Response given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIContractURISetContractURI200Response
  * @throws IOException if the JSON string is invalid with respect to InterfacesIContractURISetContractURI200Response
  */
  public static InterfacesIContractURISetContractURI200Response fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIContractURISetContractURI200Response.class);
  }

 /**
  * Convert an instance of InterfacesIContractURISetContractURI200Response to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}
