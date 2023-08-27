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
 * InterfacesIUpgradeableBeaconUpgradeToRequestContractParams
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIUpgradeableBeaconUpgradeToRequestContractParams {
  public static final String SERIALIZED_NAME_0 = "0";
  @SerializedName(SERIALIZED_NAME_0)
  private String _0;

  public static final String SERIALIZED_NAME_NEW_IMPLEMENTATION = "newImplementation";
  @SerializedName(SERIALIZED_NAME_NEW_IMPLEMENTATION)
  private String newImplementation;

  public InterfacesIUpgradeableBeaconUpgradeToRequestContractParams() {
  }

  public InterfacesIUpgradeableBeaconUpgradeToRequestContractParams _0(String _0) {
    
    this._0 = _0;
    return this;
  }

   /**
   * An ethereum address
   * @return _0
  **/
  @javax.annotation.Nullable
  public String get0() {
    return _0;
  }


  public void set0(String _0) {
    this._0 = _0;
  }


  public InterfacesIUpgradeableBeaconUpgradeToRequestContractParams newImplementation(String newImplementation) {
    
    this.newImplementation = newImplementation;
    return this;
  }

   /**
   * An ethereum address
   * @return newImplementation
  **/
  @javax.annotation.Nullable
  public String getNewImplementation() {
    return newImplementation;
  }


  public void setNewImplementation(String newImplementation) {
    this.newImplementation = newImplementation;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIUpgradeableBeaconUpgradeToRequestContractParams interfacesIUpgradeableBeaconUpgradeToRequestContractParams = (InterfacesIUpgradeableBeaconUpgradeToRequestContractParams) o;
    return Objects.equals(this._0, interfacesIUpgradeableBeaconUpgradeToRequestContractParams._0) &&
        Objects.equals(this.newImplementation, interfacesIUpgradeableBeaconUpgradeToRequestContractParams.newImplementation);
  }

  @Override
  public int hashCode() {
    return Objects.hash(_0, newImplementation);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIUpgradeableBeaconUpgradeToRequestContractParams {\n");
    sb.append("    _0: ").append(toIndentedString(_0)).append("\n");
    sb.append("    newImplementation: ").append(toIndentedString(newImplementation)).append("\n");
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
    openapiFields.add("0");
    openapiFields.add("newImplementation");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIUpgradeableBeaconUpgradeToRequestContractParams
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIUpgradeableBeaconUpgradeToRequestContractParams is not found in the empty JSON string", InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIUpgradeableBeaconUpgradeToRequestContractParams` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }
      if ((jsonObj.get("0") != null && !jsonObj.get("0").isJsonNull()) && !jsonObj.get("0").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `0` to be a primitive type in the JSON string but got `%s`", jsonObj.get("0").toString()));
      }
      if ((jsonObj.get("newImplementation") != null && !jsonObj.get("newImplementation").isJsonNull()) && !jsonObj.get("newImplementation").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `newImplementation` to be a primitive type in the JSON string but got `%s`", jsonObj.get("newImplementation").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIUpgradeableBeaconUpgradeToRequestContractParams' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIUpgradeableBeaconUpgradeToRequestContractParams> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIUpgradeableBeaconUpgradeToRequestContractParams>() {
           @Override
           public void write(JsonWriter out, InterfacesIUpgradeableBeaconUpgradeToRequestContractParams value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIUpgradeableBeaconUpgradeToRequestContractParams read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIUpgradeableBeaconUpgradeToRequestContractParams given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIUpgradeableBeaconUpgradeToRequestContractParams
  * @throws IOException if the JSON string is invalid with respect to InterfacesIUpgradeableBeaconUpgradeToRequestContractParams
  */
  public static InterfacesIUpgradeableBeaconUpgradeToRequestContractParams fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.class);
  }

 /**
  * Convert an instance of InterfacesIUpgradeableBeaconUpgradeToRequestContractParams to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}
