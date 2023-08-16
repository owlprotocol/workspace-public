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
 * InterfacesIERC165SupportsInterfaceRequestContractParams
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC165SupportsInterfaceRequestContractParams {
  public static final String SERIALIZED_NAME_0 = "0";
  @SerializedName(SERIALIZED_NAME_0)
  private String _0;

  public static final String SERIALIZED_NAME_INTERFACE_ID = "interfaceId";
  @SerializedName(SERIALIZED_NAME_INTERFACE_ID)
  private String interfaceId;

  public InterfacesIERC165SupportsInterfaceRequestContractParams() {
  }

  public InterfacesIERC165SupportsInterfaceRequestContractParams _0(String _0) {
    
    this._0 = _0;
    return this;
  }

   /**
   * A solidity bytes4
   * @return _0
  **/
  @javax.annotation.Nullable
  public String get0() {
    return _0;
  }


  public void set0(String _0) {
    this._0 = _0;
  }


  public InterfacesIERC165SupportsInterfaceRequestContractParams interfaceId(String interfaceId) {
    
    this.interfaceId = interfaceId;
    return this;
  }

   /**
   * A solidity bytes4
   * @return interfaceId
  **/
  @javax.annotation.Nullable
  public String getInterfaceId() {
    return interfaceId;
  }


  public void setInterfaceId(String interfaceId) {
    this.interfaceId = interfaceId;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC165SupportsInterfaceRequestContractParams interfacesIERC165SupportsInterfaceRequestContractParams = (InterfacesIERC165SupportsInterfaceRequestContractParams) o;
    return Objects.equals(this._0, interfacesIERC165SupportsInterfaceRequestContractParams._0) &&
        Objects.equals(this.interfaceId, interfacesIERC165SupportsInterfaceRequestContractParams.interfaceId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(_0, interfaceId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC165SupportsInterfaceRequestContractParams {\n");
    sb.append("    _0: ").append(toIndentedString(_0)).append("\n");
    sb.append("    interfaceId: ").append(toIndentedString(interfaceId)).append("\n");
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
    openapiFields.add("interfaceId");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC165SupportsInterfaceRequestContractParams
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC165SupportsInterfaceRequestContractParams.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC165SupportsInterfaceRequestContractParams is not found in the empty JSON string", InterfacesIERC165SupportsInterfaceRequestContractParams.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC165SupportsInterfaceRequestContractParams.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC165SupportsInterfaceRequestContractParams` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }
      if ((jsonObj.get("0") != null && !jsonObj.get("0").isJsonNull()) && !jsonObj.get("0").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `0` to be a primitive type in the JSON string but got `%s`", jsonObj.get("0").toString()));
      }
      if ((jsonObj.get("interfaceId") != null && !jsonObj.get("interfaceId").isJsonNull()) && !jsonObj.get("interfaceId").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `interfaceId` to be a primitive type in the JSON string but got `%s`", jsonObj.get("interfaceId").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC165SupportsInterfaceRequestContractParams.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC165SupportsInterfaceRequestContractParams' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC165SupportsInterfaceRequestContractParams> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC165SupportsInterfaceRequestContractParams.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC165SupportsInterfaceRequestContractParams>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC165SupportsInterfaceRequestContractParams value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC165SupportsInterfaceRequestContractParams read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC165SupportsInterfaceRequestContractParams given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC165SupportsInterfaceRequestContractParams
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC165SupportsInterfaceRequestContractParams
  */
  public static InterfacesIERC165SupportsInterfaceRequestContractParams fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC165SupportsInterfaceRequestContractParams.class);
  }

 /**
  * Convert an instance of InterfacesIERC165SupportsInterfaceRequestContractParams to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

