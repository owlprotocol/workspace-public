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
public class InterfacesIERC20TransferFromRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("2")
  private String _2 = null;
  @SerializedName("from")
  private String from = null;
  @SerializedName("to")
  private String to = null;
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
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String get1() {
    return _1;
  }
  public void set1(String _1) {
    this._1 = _1;
  }

  /**
   * A solidity uint256
   **/
  @ApiModelProperty(value = "A solidity uint256")
  public String get2() {
    return _2;
  }
  public void set2(String _2) {
    this._2 = _2;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getFrom() {
    return from;
  }
  public void setFrom(String from) {
    this.from = from;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getTo() {
    return to;
  }
  public void setTo(String to) {
    this.to = to;
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
    InterfacesIERC20TransferFromRequestContractParams interfacesIERC20TransferFromRequestContractParams = (InterfacesIERC20TransferFromRequestContractParams) o;
    return (this._0 == null ? interfacesIERC20TransferFromRequestContractParams._0 == null : this._0.equals(interfacesIERC20TransferFromRequestContractParams._0)) &&
        (this._1 == null ? interfacesIERC20TransferFromRequestContractParams._1 == null : this._1.equals(interfacesIERC20TransferFromRequestContractParams._1)) &&
        (this._2 == null ? interfacesIERC20TransferFromRequestContractParams._2 == null : this._2.equals(interfacesIERC20TransferFromRequestContractParams._2)) &&
        (this.from == null ? interfacesIERC20TransferFromRequestContractParams.from == null : this.from.equals(interfacesIERC20TransferFromRequestContractParams.from)) &&
        (this.to == null ? interfacesIERC20TransferFromRequestContractParams.to == null : this.to.equals(interfacesIERC20TransferFromRequestContractParams.to)) &&
        (this.amount == null ? interfacesIERC20TransferFromRequestContractParams.amount == null : this.amount.equals(interfacesIERC20TransferFromRequestContractParams.amount));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this._2 == null ? 0: this._2.hashCode());
    result = 31 * result + (this.from == null ? 0: this.from.hashCode());
    result = 31 * result + (this.to == null ? 0: this.to.hashCode());
    result = 31 * result + (this.amount == null ? 0: this.amount.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC20TransferFromRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  _2: ").append(_2).append("\n");
    sb.append("  from: ").append(from).append("\n");
    sb.append("  to: ").append(to).append("\n");
    sb.append("  amount: ").append(amount).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
