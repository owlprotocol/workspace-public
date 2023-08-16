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
public class InterfacesIERC1820GetInterfaceImplementerRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("account")
  private String account = null;
  @SerializedName("_interfaceHash")
  private String interfaceHash = null;

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
   * A solidity bytes32
   **/
  @ApiModelProperty(value = "A solidity bytes32")
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
  public String getAccount() {
    return account;
  }
  public void setAccount(String account) {
    this.account = account;
  }

  /**
   * A solidity bytes32
   **/
  @ApiModelProperty(value = "A solidity bytes32")
  public String getInterfaceHash() {
    return interfaceHash;
  }
  public void setInterfaceHash(String interfaceHash) {
    this.interfaceHash = interfaceHash;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC1820GetInterfaceImplementerRequestContractParams interfacesIERC1820GetInterfaceImplementerRequestContractParams = (InterfacesIERC1820GetInterfaceImplementerRequestContractParams) o;
    return (this._0 == null ? interfacesIERC1820GetInterfaceImplementerRequestContractParams._0 == null : this._0.equals(interfacesIERC1820GetInterfaceImplementerRequestContractParams._0)) &&
        (this._1 == null ? interfacesIERC1820GetInterfaceImplementerRequestContractParams._1 == null : this._1.equals(interfacesIERC1820GetInterfaceImplementerRequestContractParams._1)) &&
        (this.account == null ? interfacesIERC1820GetInterfaceImplementerRequestContractParams.account == null : this.account.equals(interfacesIERC1820GetInterfaceImplementerRequestContractParams.account)) &&
        (this.interfaceHash == null ? interfacesIERC1820GetInterfaceImplementerRequestContractParams.interfaceHash == null : this.interfaceHash.equals(interfacesIERC1820GetInterfaceImplementerRequestContractParams.interfaceHash));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this.account == null ? 0: this.account.hashCode());
    result = 31 * result + (this.interfaceHash == null ? 0: this.interfaceHash.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC1820GetInterfaceImplementerRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  account: ").append(account).append("\n");
    sb.append("  interfaceHash: ").append(interfaceHash).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
