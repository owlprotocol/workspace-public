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

import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC20ApproveRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("spender")
  private String spender = null;
  @SerializedName("amount")
  private String amount = null;

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String get0() {
    return _0;
  }
  public void set0(String _0) {
    this._0 = _0;
  }

  /**
   * A solidity uint256
   **/
  @ApiModelProperty(value = "A solidity uint256")
  public String get1() {
    return _1;
  }
  public void set1(String _1) {
    this._1 = _1;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getSpender() {
    return spender;
  }
  public void setSpender(String spender) {
    this.spender = spender;
  }

  /**
   * A solidity uint256
   **/
  @ApiModelProperty(value = "A solidity uint256")
  public String getAmount() {
    return amount;
  }
  public void setAmount(String amount) {
    this.amount = amount;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC20ApproveRequestContractParams interfacesIERC20ApproveRequestContractParams = (InterfacesIERC20ApproveRequestContractParams) o;
    return (this._0 == null ? interfacesIERC20ApproveRequestContractParams._0 == null : this._0.equals(interfacesIERC20ApproveRequestContractParams._0)) &&
        (this._1 == null ? interfacesIERC20ApproveRequestContractParams._1 == null : this._1.equals(interfacesIERC20ApproveRequestContractParams._1)) &&
        (this.spender == null ? interfacesIERC20ApproveRequestContractParams.spender == null : this.spender.equals(interfacesIERC20ApproveRequestContractParams.spender)) &&
        (this.amount == null ? interfacesIERC20ApproveRequestContractParams.amount == null : this.amount.equals(interfacesIERC20ApproveRequestContractParams.amount));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this.spender == null ? 0: this.spender.hashCode());
    result = 31 * result + (this.amount == null ? 0: this.amount.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC20ApproveRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  spender: ").append(spender).append("\n");
    sb.append("  amount: ").append(amount).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}