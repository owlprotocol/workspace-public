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
import org.openapitools.client.model.InterfacesIERC20Allowance200ResponseResult;
import org.openapitools.client.model.InterfacesIERC721EnumerableTokenByIndexRequestContractParams;

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
 * InterfacesIERC721EnumerableTokenByIndex200Response
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-08-16T18:48:04.561997+03:00[Europe/Istanbul]")
public class InterfacesIERC721EnumerableTokenByIndex200Response {
  public static final String SERIALIZED_NAME_CONTRACT_PARAMS = "contractParams";
  @SerializedName(SERIALIZED_NAME_CONTRACT_PARAMS)
  private InterfacesIERC721EnumerableTokenByIndexRequestContractParams contractParams;

  public static final String SERIALIZED_NAME_RESULT = "result";
  @SerializedName(SERIALIZED_NAME_RESULT)
  private InterfacesIERC20Allowance200ResponseResult result;

  public InterfacesIERC721EnumerableTokenByIndex200Response() {
  }

  public InterfacesIERC721EnumerableTokenByIndex200Response contractParams(InterfacesIERC721EnumerableTokenByIndexRequestContractParams contractParams) {
    
    this.contractParams = contractParams;
    return this;
  }

   /**
   * Get contractParams
   * @return contractParams
  **/
  @javax.annotation.Nonnull
  public InterfacesIERC721EnumerableTokenByIndexRequestContractParams getContractParams() {
    return contractParams;
  }


  public void setContractParams(InterfacesIERC721EnumerableTokenByIndexRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }


  public InterfacesIERC721EnumerableTokenByIndex200Response result(InterfacesIERC20Allowance200ResponseResult result) {
    
    this.result = result;
    return this;
  }

   /**
   * Get result
   * @return result
  **/
  @javax.annotation.Nonnull
  public InterfacesIERC20Allowance200ResponseResult getResult() {
    return result;
  }


  public void setResult(InterfacesIERC20Allowance200ResponseResult result) {
    this.result = result;
  }



  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC721EnumerableTokenByIndex200Response interfacesIERC721EnumerableTokenByIndex200Response = (InterfacesIERC721EnumerableTokenByIndex200Response) o;
    return Objects.equals(this.contractParams, interfacesIERC721EnumerableTokenByIndex200Response.contractParams) &&
        Objects.equals(this.result, interfacesIERC721EnumerableTokenByIndex200Response.result);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractParams, result);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC721EnumerableTokenByIndex200Response {\n");
    sb.append("    contractParams: ").append(toIndentedString(contractParams)).append("\n");
    sb.append("    result: ").append(toIndentedString(result)).append("\n");
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
    openapiFields.add("result");

    // a set of required properties/fields (JSON key names)
    openapiRequiredFields = new HashSet<String>();
    openapiRequiredFields.add("contractParams");
    openapiRequiredFields.add("result");
  }

 /**
  * Validates the JSON Object and throws an exception if issues found
  *
  * @param jsonObj JSON Object
  * @throws IOException if the JSON Object is invalid with respect to InterfacesIERC721EnumerableTokenByIndex200Response
  */
  public static void validateJsonObject(JsonObject jsonObj) throws IOException {
      if (jsonObj == null) {
        if (!InterfacesIERC721EnumerableTokenByIndex200Response.openapiRequiredFields.isEmpty()) { // has required fields but JSON object is null
          throw new IllegalArgumentException(String.format("The required field(s) %s in InterfacesIERC721EnumerableTokenByIndex200Response is not found in the empty JSON string", InterfacesIERC721EnumerableTokenByIndex200Response.openapiRequiredFields.toString()));
        }
      }

      Set<Entry<String, JsonElement>> entries = jsonObj.entrySet();
      // check to see if the JSON string contains additional fields
      for (Entry<String, JsonElement> entry : entries) {
        if (!InterfacesIERC721EnumerableTokenByIndex200Response.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field `%s` in the JSON string is not defined in the `InterfacesIERC721EnumerableTokenByIndex200Response` properties. JSON: %s", entry.getKey(), jsonObj.toString()));
        }
      }

      // check to make sure all required properties/fields are present in the JSON string
      for (String requiredField : InterfacesIERC721EnumerableTokenByIndex200Response.openapiRequiredFields) {
        if (jsonObj.get(requiredField) == null) {
          throw new IllegalArgumentException(String.format("The required field `%s` is not found in the JSON string: %s", requiredField, jsonObj.toString()));
        }
      }
      // validate the required field `contractParams`
      InterfacesIERC721EnumerableTokenByIndexRequestContractParams.validateJsonObject(jsonObj.getAsJsonObject("contractParams"));
      // validate the required field `result`
      InterfacesIERC20Allowance200ResponseResult.validateJsonObject(jsonObj.getAsJsonObject("result"));
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!InterfacesIERC721EnumerableTokenByIndex200Response.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'InterfacesIERC721EnumerableTokenByIndex200Response' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<InterfacesIERC721EnumerableTokenByIndex200Response> thisAdapter
                        = gson.getDelegateAdapter(this, TypeToken.get(InterfacesIERC721EnumerableTokenByIndex200Response.class));

       return (TypeAdapter<T>) new TypeAdapter<InterfacesIERC721EnumerableTokenByIndex200Response>() {
           @Override
           public void write(JsonWriter out, InterfacesIERC721EnumerableTokenByIndex200Response value) throws IOException {
             JsonObject obj = thisAdapter.toJsonTree(value).getAsJsonObject();
             elementAdapter.write(out, obj);
           }

           @Override
           public InterfacesIERC721EnumerableTokenByIndex200Response read(JsonReader in) throws IOException {
             JsonObject jsonObj = elementAdapter.read(in).getAsJsonObject();
             validateJsonObject(jsonObj);
             return thisAdapter.fromJsonTree(jsonObj);
           }

       }.nullSafe();
    }
  }

 /**
  * Create an instance of InterfacesIERC721EnumerableTokenByIndex200Response given an JSON string
  *
  * @param jsonString JSON string
  * @return An instance of InterfacesIERC721EnumerableTokenByIndex200Response
  * @throws IOException if the JSON string is invalid with respect to InterfacesIERC721EnumerableTokenByIndex200Response
  */
  public static InterfacesIERC721EnumerableTokenByIndex200Response fromJson(String jsonString) throws IOException {
    return JSON.getGson().fromJson(jsonString, InterfacesIERC721EnumerableTokenByIndex200Response.class);
  }

 /**
  * Convert an instance of InterfacesIERC721EnumerableTokenByIndex200Response to an JSON string
  *
  * @return JSON string
  */
  public String toJson() {
    return JSON.getGson().toJson(this);
  }
}

