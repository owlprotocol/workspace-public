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
 * DeployUpgradeableBeaconRequestContractParams
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class DeployUpgradeableBeaconRequestContractParams {
  public static final String SERIALIZED_NAME_0 = "0";
  @SerializedName(SERIALIZED_NAME_0)
  private String _0;

  public static final String SERIALIZED_NAME_1 = "1";
  @SerializedName(SERIALIZED_NAME_1)
  private String _1;

  public static final String SERIALIZED_NAME_ADMIN = "_admin";
  @SerializedName(SERIALIZED_NAME_ADMIN)
  private String admin;

  public static final String SERIALIZED_NAME_IMPLEMENTATION = "implementation_";
  @SerializedName(SERIALIZED_NAME_IMPLEMENTATION)
  private String implementation;

  public DeployUpgradeableBeaconRequestContractParams() {
  }

  public DeployUpgradeableBeaconRequestContractParams _0(String _0) {
    
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


  public DeployUpgradeableBeaconRequestContractParams _1(String _1) {
    
    this._1 = _1;
    return this;
  }

   /**
   * An ethereum address
   * @return _1
  **/
  @javax.annotation.Nullable
  public String get1() {
    return _1;
  }


  public void set1(String _1) {
    this._1 = _1;
  }


  public DeployUpgradeableBeaconRequestContractParams admin(String admin) {
    
    this.admin = admin;
    return this;
  }

   /**
   * An ethereum address
   * @return admin
  **/
  @javax.annotation.Nullable
  public String getAdmin() {
    return admin;
  }


  public void setAdmin(String admin) {
    this.admin = admin;
  }


  public DeployUpgradeableBeaconRequestContractParams implementation(String implementation) {
    
    this.implementation = implementation;
    return this;
  }

   /**
   * An ethereum address
   * @return implementation
  **/
  @javax.annotation.Nullable
  public String getImplementation() {
    return implementation;
  }


  public void setImplementation(String implementation) {
    this.implementation = implementation;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeployUpgradeableBeaconRequestContractParams deployUpgradeableBeaconRequestContractParams = (DeployUpgradeableBeaconRequestContractParams) o;
    return Objects.equals(this._0, deployUpgradeableBeaconRequestContractParams._0) &&
        Objects.equals(this._1, deployUpgradeableBeaconRequestContractParams._1) &&
        Objects.equals(this.admin, deployUpgradeableBeaconRequestContractParams.admin) &&
        Objects.equals(this.implementation, deployUpgradeableBeaconRequestContractParams.implementation);
  }

  @Override
  public int hashCode() {
    return Objects.hash(_0, _1, admin, implementation);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeployUpgradeableBeaconRequestContractParams {\n");
    sb.append("    _0: ").append(toIndentedString(_0)).append("\n");
    sb.append("    _1: ").append(toIndentedString(_1)).append("\n");
    sb.append("    admin: ").append(toIndentedString(admin)).append("\n");
    sb.append("    implementation: ").append(toIndentedString(implementation)).append("\n");
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
    openapiFields.add("1");
    openapiFields.add("_admin");
    openapiFields.add("implementation_");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to DeployUpgradeableBeaconRequestContractParams
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!DeployUpgradeableBeaconRequestContractParams.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in DeployUpgradeableBeaconRequestContractParams is not found in the empty JSON string", DeployUpgradeableBeaconRequestContractParams.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!DeployUpgradeableBeaconRequestContractParams.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `DeployUpgradeableBeaconRequestContractParams` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }
      if ((jsonObj.get("0") != null && !jsonObj.get("0").isJsonNull()) && !jsonObj.get("0").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `0` to be a primitive type in the JSON string but got `%s`", jsonObj.get("0").toString()));
      }
      if ((jsonObj.get("1") != null && !jsonObj.get("1").isJsonNull()) && !jsonObj.get("1").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `1` to be a primitive type in the JSON string but got `%s`", jsonObj.get("1").toString()));
      }
      if ((jsonObj.get("_admin") != null && !jsonObj.get("_admin").isJsonNull()) && !jsonObj.get("_admin").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `_admin` to be a primitive type in the JSON string but got `%s`", jsonObj.get("_admin").toString()));
      }
      if ((jsonObj.get("implementation_") != null && !jsonObj.get("implementation_").isJsonNull()) && !jsonObj.get("implementation_").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `implementation_` to be a primitive type in the JSON string but got `%s`", jsonObj.get("implementation_").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!DeployUpgradeableBeaconRequestContractParams.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'DeployUpgradeableBeaconRequestContractParams' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<DeployUpgradeableBeaconRequestContractParams> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(DeployUpgradeableBeaconRequestContractParams.class));

       return (TypeAdapter<T>) new TypeAdapter<DeployUpgradeableBeaconRequestContractParams>() {
           @Override
           public void write(JsonWriter out, DeployUpgradeableBeaconRequestContractParams value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public DeployUpgradeableBeaconRequestContractParams read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of DeployUpgradeableBeaconRequestContractParams given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of DeployUpgradeableBeaconRequestContractParams
  * @throws IOException if the JSON string is invalid with respect to DeployUpgradeableBeaconRequestContractParams
  */
  public static DeployUpgradeableBeaconRequestContractParams fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, DeployUpgradeableBeaconRequestContractParams.class);
  }

 /**
  * Convert an instance of DeployUpgradeableBeaconRequestContractParams to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

