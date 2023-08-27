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
 * InterfacesIERC1155MintableMintRequestContractParams
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC1155MintableMintRequestContractParams {
  public static final String SERIALIZED_NAME_0 = "0";
  @SerializedName(SERIALIZED_NAME_0)
  private String _0;

  public static final String SERIALIZED_NAME_1 = "1";
  @SerializedName(SERIALIZED_NAME_1)
  private String _1;

  public static final String SERIALIZED_NAME_2 = "2";
  @SerializedName(SERIALIZED_NAME_2)
  private String _2;

  public static final String SERIALIZED_NAME_3 = "3";
  @SerializedName(SERIALIZED_NAME_3)
  private String _3;

  public static final String SERIALIZED_NAME_TO = "to";
  @SerializedName(SERIALIZED_NAME_TO)
  private String to;

  public static final String SERIALIZED_NAME_ID = "id";
  @SerializedName(SERIALIZED_NAME_ID)
  private String id;

  public static final String SERIALIZED_NAME_AMOUNT = "amount";
  @SerializedName(SERIALIZED_NAME_AMOUNT)
  private String amount;

  public static final String SERIALIZED_NAME_DATA = "data";
  @SerializedName(SERIALIZED_NAME_DATA)
  private String data;

  public InterfacesIERC1155MintableMintRequestContractParams() {
  }

  public InterfacesIERC1155MintableMintRequestContractParams _0(String _0) {
    
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


  public InterfacesIERC1155MintableMintRequestContractParams _1(String _1) {
    
    this._1 = _1;
    return this;
  }

   /**
   * A solidity uint256
   * @return _1
  **/
  @javax.annotation.Nullable
  public String get1() {
    return _1;
  }


  public void set1(String _1) {
    this._1 = _1;
  }


  public InterfacesIERC1155MintableMintRequestContractParams _2(String _2) {
    
    this._2 = _2;
    return this;
  }

   /**
   * A solidity uint256
   * @return _2
  **/
  @javax.annotation.Nullable
  public String get2() {
    return _2;
  }


  public void set2(String _2) {
    this._2 = _2;
  }


  public InterfacesIERC1155MintableMintRequestContractParams _3(String _3) {
    
    this._3 = _3;
    return this;
  }

   /**
   * An arbitrary length byte array
   * @return _3
  **/
  @javax.annotation.Nullable
  public String get3() {
    return _3;
  }


  public void set3(String _3) {
    this._3 = _3;
  }


  public InterfacesIERC1155MintableMintRequestContractParams to(String to) {
    
    this.to = to;
    return this;
  }

   /**
   * An ethereum address
   * @return to
  **/
  @javax.annotation.Nullable
  public String getTo() {
    return to;
  }


  public void setTo(String to) {
    this.to = to;
  }


  public InterfacesIERC1155MintableMintRequestContractParams id(String id) {
    
    this.id = id;
    return this;
  }

   /**
   * A solidity uint256
   * @return id
  **/
  @javax.annotation.Nullable
  public String getId() {
    return id;
  }


  public void setId(String id) {
    this.id = id;
  }


  public InterfacesIERC1155MintableMintRequestContractParams amount(String amount) {
    
    this.amount = amount;
    return this;
  }

   /**
   * A solidity uint256
   * @return amount
  **/
  @javax.annotation.Nullable
  public String getAmount() {
    return amount;
  }


  public void setAmount(String amount) {
    this.amount = amount;
  }


  public InterfacesIERC1155MintableMintRequestContractParams data(String data) {
    
    this.data = data;
    return this;
  }

   /**
   * An arbitrary length byte array
   * @return data
  **/
  @javax.annotation.Nullable
  public String getData() {
    return data;
  }


  public void setData(String data) {
    this.data = data;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC1155MintableMintRequestContractParams interfacesIERC1155MintableMintRequestContractParams = (InterfacesIERC1155MintableMintRequestContractParams) o;
    return Objects.equals(this._0, interfacesIERC1155MintableMintRequestContractParams._0) &&
        Objects.equals(this._1, interfacesIERC1155MintableMintRequestContractParams._1) &&
        Objects.equals(this._2, interfacesIERC1155MintableMintRequestContractParams._2) &&
        Objects.equals(this._3, interfacesIERC1155MintableMintRequestContractParams._3) &&
        Objects.equals(this.to, interfacesIERC1155MintableMintRequestContractParams.to) &&
        Objects.equals(this.id, interfacesIERC1155MintableMintRequestContractParams.id) &&
        Objects.equals(this.amount, interfacesIERC1155MintableMintRequestContractParams.amount) &&
        Objects.equals(this.data, interfacesIERC1155MintableMintRequestContractParams.data);
  }

  @Override
  public int hashCode() {
    return Objects.hash(_0, _1, _2, _3, to, id, amount, data);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC1155MintableMintRequestContractParams {\n");
    sb.append("    _0: ").append(toIndentedString(_0)).append("\n");
    sb.append("    _1: ").append(toIndentedString(_1)).append("\n");
    sb.append("    _2: ").append(toIndentedString(_2)).append("\n");
    sb.append("    _3: ").append(toIndentedString(_3)).append("\n");
    sb.append("    to: ").append(toIndentedString(to)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    amount: ").append(toIndentedString(amount)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
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
    openapiFields.add("2");
    openapiFields.add("3");
    openapiFields.add("to");
    openapiFields.add("id");
    openapiFields.add("amount");
    openapiFields.add("data");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC1155MintableMintRequestContractParams
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC1155MintableMintRequestContractParams.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC1155MintableMintRequestContractParams is not found in the empty JSON string", InterfacesIERC1155MintableMintRequestContractParams.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC1155MintableMintRequestContractParams.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC1155MintableMintRequestContractParams` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }
      if ((jsonObj.get("0") != null && !jsonObj.get("0").isJsonNull()) && !jsonObj.get("0").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `0` to be a primitive type in the JSON string but got `%s`", jsonObj.get("0").toString()));
      }
      if ((jsonObj.get("1") != null && !jsonObj.get("1").isJsonNull()) && !jsonObj.get("1").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `1` to be a primitive type in the JSON string but got `%s`", jsonObj.get("1").toString()));
      }
      if ((jsonObj.get("2") != null && !jsonObj.get("2").isJsonNull()) && !jsonObj.get("2").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `2` to be a primitive type in the JSON string but got `%s`", jsonObj.get("2").toString()));
      }
      if ((jsonObj.get("3") != null && !jsonObj.get("3").isJsonNull()) && !jsonObj.get("3").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `3` to be a primitive type in the JSON string but got `%s`", jsonObj.get("3").toString()));
      }
      if ((jsonObj.get("to") != null && !jsonObj.get("to").isJsonNull()) && !jsonObj.get("to").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `to` to be a primitive type in the JSON string but got `%s`", jsonObj.get("to").toString()));
      }
      if ((jsonObj.get("id") != null && !jsonObj.get("id").isJsonNull()) && !jsonObj.get("id").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `id` to be a primitive type in the JSON string but got `%s`", jsonObj.get("id").toString()));
      }
      if ((jsonObj.get("amount") != null && !jsonObj.get("amount").isJsonNull()) && !jsonObj.get("amount").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `amount` to be a primitive type in the JSON string but got `%s`", jsonObj.get("amount").toString()));
      }
      if ((jsonObj.get("data") != null && !jsonObj.get("data").isJsonNull()) && !jsonObj.get("data").isJsonPrimitive()) {
        throw new IllegalArgumentException(String.format("Expected the field `data` to be a primitive type in the JSON string but got `%s`", jsonObj.get("data").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC1155MintableMintRequestContractParams.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC1155MintableMintRequestContractParams' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC1155MintableMintRequestContractParams> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC1155MintableMintRequestContractParams.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC1155MintableMintRequestContractParams>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC1155MintableMintRequestContractParams value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC1155MintableMintRequestContractParams read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC1155MintableMintRequestContractParams given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC1155MintableMintRequestContractParams
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC1155MintableMintRequestContractParams
  */
  public static InterfacesIERC1155MintableMintRequestContractParams fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC1155MintableMintRequestContractParams.class);
  }

 /**
  * Convert an instance of InterfacesIERC1155MintableMintRequestContractParams to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}
