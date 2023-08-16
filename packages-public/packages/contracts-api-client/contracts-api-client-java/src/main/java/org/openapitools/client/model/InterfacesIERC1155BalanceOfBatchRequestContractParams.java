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
import java.util.ArrayList;
import java.util.List;

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
 * InterfacesIERC1155BalanceOfBatchRequestContractParams
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC1155BalanceOfBatchRequestContractParams {
  public static final String SERIALIZED_NAME_0 = "0";
  @SerializedName(SERIALIZED_NAME_0)
  private List<String> _0;

  public static final String SERIALIZED_NAME_1 = "1";
  @SerializedName(SERIALIZED_NAME_1)
  private List<String> _1;

  public static final String SERIALIZED_NAME_ACCOUNTS = "accounts";
  @SerializedName(SERIALIZED_NAME_ACCOUNTS)
  private List<String> accounts;

  public static final String SERIALIZED_NAME_IDS = "ids";
  @SerializedName(SERIALIZED_NAME_IDS)
  private List<String> ids;

  public InterfacesIERC1155BalanceOfBatchRequestContractParams() {
  }

  public InterfacesIERC1155BalanceOfBatchRequestContractParams _0(List<String> _0) {
    
    this._0 = _0;
    return this;
  }

  public InterfacesIERC1155BalanceOfBatchRequestContractParams add0Item(String _0Item) {
    if (this._0 == null) {
      this._0 = new ArrayList<>();
    }
    this._0.add(_0Item);
    return this;
  }

   /**
   * Get _0
   * @return _0
  **/
  @javax.annotation.Nullable
  public List<String> get0() {
    return _0;
  }


  public void set0(List<String> _0) {
    this._0 = _0;
  }


  public InterfacesIERC1155BalanceOfBatchRequestContractParams _1(List<String> _1) {
    
    this._1 = _1;
    return this;
  }

  public InterfacesIERC1155BalanceOfBatchRequestContractParams add1Item(String _1Item) {
    if (this._1 == null) {
      this._1 = new ArrayList<>();
    }
    this._1.add(_1Item);
    return this;
  }

   /**
   * Get _1
   * @return _1
  **/
  @javax.annotation.Nullable
  public List<String> get1() {
    return _1;
  }


  public void set1(List<String> _1) {
    this._1 = _1;
  }


  public InterfacesIERC1155BalanceOfBatchRequestContractParams accounts(List<String> accounts) {
    
    this.accounts = accounts;
    return this;
  }

  public InterfacesIERC1155BalanceOfBatchRequestContractParams addAccountsItem(String accountsItem) {
    if (this.accounts == null) {
      this.accounts = new ArrayList<>();
    }
    this.accounts.add(accountsItem);
    return this;
  }

   /**
   * Get accounts
   * @return accounts
  **/
  @javax.annotation.Nullable
  public List<String> getAccounts() {
    return accounts;
  }


  public void setAccounts(List<String> accounts) {
    this.accounts = accounts;
  }


  public InterfacesIERC1155BalanceOfBatchRequestContractParams ids(List<String> ids) {
    
    this.ids = ids;
    return this;
  }

  public InterfacesIERC1155BalanceOfBatchRequestContractParams addIdsItem(String idsItem) {
    if (this.ids == null) {
      this.ids = new ArrayList<>();
    }
    this.ids.add(idsItem);
    return this;
  }

   /**
   * Get ids
   * @return ids
  **/
  @javax.annotation.Nullable
  public List<String> getIds() {
    return ids;
  }


  public void setIds(List<String> ids) {
    this.ids = ids;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC1155BalanceOfBatchRequestContractParams interfacesIERC1155BalanceOfBatchRequestContractParams = (InterfacesIERC1155BalanceOfBatchRequestContractParams) o;
    return Objects.equals(this._0, interfacesIERC1155BalanceOfBatchRequestContractParams._0) &&
        Objects.equals(this._1, interfacesIERC1155BalanceOfBatchRequestContractParams._1) &&
        Objects.equals(this.accounts, interfacesIERC1155BalanceOfBatchRequestContractParams.accounts) &&
        Objects.equals(this.ids, interfacesIERC1155BalanceOfBatchRequestContractParams.ids);
  }

  @Override
  public int hashCode() {
    return Objects.hash(_0, _1, accounts, ids);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC1155BalanceOfBatchRequestContractParams {\n");
    sb.append("    _0: ").append(toIndentedString(_0)).append("\n");
    sb.append("    _1: ").append(toIndentedString(_1)).append("\n");
    sb.append("    accounts: ").append(toIndentedString(accounts)).append("\n");
    sb.append("    ids: ").append(toIndentedString(ids)).append("\n");
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
    openapiFields.add("accounts");
    openapiFields.add("ids");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC1155BalanceOfBatchRequestContractParams
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC1155BalanceOfBatchRequestContractParams.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC1155BalanceOfBatchRequestContractParams is not found in the empty JSON string", InterfacesIERC1155BalanceOfBatchRequestContractParams.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC1155BalanceOfBatchRequestContractParams.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC1155BalanceOfBatchRequestContractParams` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }
      // ensure the optional json data is an array if present
      if (jsonObj.get("0") != null && !jsonObj.get("0").isJsonArray()) {
        throw new IllegalArgumentException(String.format("Expected the field `0` to be an array in the JSON string but got `%s`", jsonObj.get("0").toString()));
      }
      // ensure the optional json data is an array if present
      if (jsonObj.get("1") != null && !jsonObj.get("1").isJsonArray()) {
        throw new IllegalArgumentException(String.format("Expected the field `1` to be an array in the JSON string but got `%s`", jsonObj.get("1").toString()));
      }
      // ensure the optional json data is an array if present
      if (jsonObj.get("accounts") != null && !jsonObj.get("accounts").isJsonArray()) {
        throw new IllegalArgumentException(String.format("Expected the field `accounts` to be an array in the JSON string but got `%s`", jsonObj.get("accounts").toString()));
      }
      // ensure the optional json data is an array if present
      if (jsonObj.get("ids") != null && !jsonObj.get("ids").isJsonArray()) {
        throw new IllegalArgumentException(String.format("Expected the field `ids` to be an array in the JSON string but got `%s`", jsonObj.get("ids").toString()));
      }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC1155BalanceOfBatchRequestContractParams.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC1155BalanceOfBatchRequestContractParams' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC1155BalanceOfBatchRequestContractParams> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC1155BalanceOfBatchRequestContractParams.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC1155BalanceOfBatchRequestContractParams>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC1155BalanceOfBatchRequestContractParams value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC1155BalanceOfBatchRequestContractParams read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC1155BalanceOfBatchRequestContractParams given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC1155BalanceOfBatchRequestContractParams
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC1155BalanceOfBatchRequestContractParams
  */
  public static InterfacesIERC1155BalanceOfBatchRequestContractParams fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC1155BalanceOfBatchRequestContractParams.class);
  }

 /**
  * Convert an instance of InterfacesIERC1155BalanceOfBatchRequestContractParams to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

