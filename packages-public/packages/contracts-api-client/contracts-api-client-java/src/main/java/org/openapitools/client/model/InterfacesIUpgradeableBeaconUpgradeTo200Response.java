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
import org.openapitools.client.model.InterfacesIUpgradeableBeaconUpgradeToRequestContractParams;

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
 * InterfacesIUpgradeableBeaconUpgradeTo200Response
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIUpgradeableBeaconUpgradeTo200Response {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIUpgradeableBeaconUpgradeToRequestContractParams contractParams;

  public static final String SERIALIZED_NAME_TX_HASH = "txHash";
  @SerializedName(SERIALIZED_NAME_TX_HASH)
  private String txHash;

  public InterfacesIUpgradeableBeaconUpgradeTo200Response() {
  }

  public InterfacesIUpgradeableBeaconUpgradeTo200Response contractParams(InterfacesIUpgradeableBeaconUpgradeToRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIUpgradeableBeaconUpgradeToRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIUpgradeableBeaconUpgradeToRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }


  public InterfacesIUpgradeableBeaconUpgradeTo200Response txHash(String txHash) {
    
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
    InterfacesIUpgradeableBeaconUpgradeTo200Response interfacesIUpgradeableBeaconUpgradeTo200Response = (InterfacesIUpgradeableBeaconUpgradeTo200Response) o;
    return Objects.equals(this.contractParams, interfacesIUpgradeableBeaconUpgradeTo200Response.contractParams) &&
        Objects.equals(this.txHash, interfacesIUpgradeableBeaconUpgradeTo200Response.txHash);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams, txHash);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIUpgradeableBeaconUpgradeTo200Response {\n");
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
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIUpgradeableBeaconUpgradeTo200Response
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIUpgradeableBeaconUpgradeTo200Response.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIUpgradeableBeaconUpgradeTo200Response is not found in the empty JSON string", InterfacesIUpgradeableBeaconUpgradeTo200Response.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIUpgradeableBeaconUpgradeTo200Response.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIUpgradeableBeaconUpgradeTo200Response` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIUpgradeableBeaconUpgradeTo200Response.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
      if (!jsonObj.get("txHash").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `txHash` to be a primitive type in the JSON string but got `%s`", jsonObj.get("txHash").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIUpgradeableBeaconUpgradeTo200Response.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIUpgradeableBeaconUpgradeTo200Response' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIUpgradeableBeaconUpgradeTo200Response> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIUpgradeableBeaconUpgradeTo200Response.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIUpgradeableBeaconUpgradeTo200Response>() {
           @Override
           public void write(JsonWriter out, InterfacesIUpgradeableBeaconUpgradeTo200Response value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIUpgradeableBeaconUpgradeTo200Response read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIUpgradeableBeaconUpgradeTo200Response given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIUpgradeableBeaconUpgradeTo200Response
  * @throws IOException if the JSON string is invalid with respect to InterfacesIUpgradeableBeaconUpgradeTo200Response
  */
  public static InterfacesIUpgradeableBeaconUpgradeTo200Response fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIUpgradeableBeaconUpgradeTo200Response.class);
  }

 /**
  * Convert an instance of InterfacesIUpgradeableBeaconUpgradeTo200Response to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

