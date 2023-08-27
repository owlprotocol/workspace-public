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
public class InterfacesIERC1155MintableMintRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("2")
  private String _2 = null;
  @SerializedName("3")
  private String _3 = null;
  @SerializedName("to")
  private String to = null;
  @SerializedName("id")
  private String id = null;
  @SerializedName("amount")
  private String amount = null;
  @SerializedName("data")
  private String data = null;

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
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
  public String get3() {
    return _3;
  }
  public void set3(String _3) {
    this._3 = _3;
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
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
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

  /**
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
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
    return (this._0 == null ? interfacesIERC1155MintableMintRequestContractParams._0 == null : this._0.equals(interfacesIERC1155MintableMintRequestContractParams._0)) &&
        (this._1 == null ? interfacesIERC1155MintableMintRequestContractParams._1 == null : this._1.equals(interfacesIERC1155MintableMintRequestContractParams._1)) &&
        (this._2 == null ? interfacesIERC1155MintableMintRequestContractParams._2 == null : this._2.equals(interfacesIERC1155MintableMintRequestContractParams._2)) &&
        (this._3 == null ? interfacesIERC1155MintableMintRequestContractParams._3 == null : this._3.equals(interfacesIERC1155MintableMintRequestContractParams._3)) &&
        (this.to == null ? interfacesIERC1155MintableMintRequestContractParams.to == null : this.to.equals(interfacesIERC1155MintableMintRequestContractParams.to)) &&
        (this.id == null ? interfacesIERC1155MintableMintRequestContractParams.id == null : this.id.equals(interfacesIERC1155MintableMintRequestContractParams.id)) &&
        (this.amount == null ? interfacesIERC1155MintableMintRequestContractParams.amount == null : this.amount.equals(interfacesIERC1155MintableMintRequestContractParams.amount)) &&
        (this.data == null ? interfacesIERC1155MintableMintRequestContractParams.data == null : this.data.equals(interfacesIERC1155MintableMintRequestContractParams.data));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this._2 == null ? 0: this._2.hashCode());
    result = 31 * result + (this._3 == null ? 0: this._3.hashCode());
    result = 31 * result + (this.to == null ? 0: this.to.hashCode());
    result = 31 * result + (this.id == null ? 0: this.id.hashCode());
    result = 31 * result + (this.amount == null ? 0: this.amount.hashCode());
    result = 31 * result + (this.data == null ? 0: this.data.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC1155MintableMintRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  _2: ").append(_2).append("\n");
    sb.append("  _3: ").append(_3).append("\n");
    sb.append("  to: ").append(to).append("\n");
    sb.append("  id: ").append(id).append("\n");
    sb.append("  amount: ").append(amount).append("\n");
    sb.append("  data: ").append(data).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}