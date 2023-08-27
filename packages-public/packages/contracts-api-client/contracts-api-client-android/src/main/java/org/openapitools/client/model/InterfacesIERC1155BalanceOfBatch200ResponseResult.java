/**
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

import java.util.*;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1155BalanceOfBatch200ResponseResult {
  
  @SerializedName("0")
  private List<String> _0 = null;
  @SerializedName("")
  private List<String>  = null;

  /**
   **/
  @ApiModelProperty(value = "")
  public List<String> get0() {
    return _0;
  }
  public void set0(List<String> _0) {
    this._0 = _0;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public List<String> get() {
    return ;
  }
  public void set(List<String> ) {
    this. = ;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC1155BalanceOfBatch200ResponseResult interfacesIERC1155BalanceOfBatch200ResponseResult = (InterfacesIERC1155BalanceOfBatch200ResponseResult) o;
    return (this._0 == null ? interfacesIERC1155BalanceOfBatch200ResponseResult._0 == null : this._0.equals(interfacesIERC1155BalanceOfBatch200ResponseResult._0)) &&
        (this. == null ? interfacesIERC1155BalanceOfBatch200ResponseResult. == null : this..equals(interfacesIERC1155BalanceOfBatch200ResponseResult.));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this. == null ? 0: this..hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC1155BalanceOfBatch200ResponseResult {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  : ").append().append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}