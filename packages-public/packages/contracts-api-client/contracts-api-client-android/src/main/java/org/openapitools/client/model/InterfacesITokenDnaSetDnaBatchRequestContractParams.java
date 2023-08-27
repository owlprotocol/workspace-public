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
public class InterfacesITokenDnaSetDnaBatchRequestContractParams {
  
  @SerializedName("0")
  private List<String> _0 = null;
  @SerializedName("1")
  private List<String> _1 = null;
  @SerializedName("tokenId")
  private List<String> tokenId = null;
  @SerializedName("dna")
  private List<String> dna = null;

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
  public List<String> get1() {
    return _1;
  }
  public void set1(List<String> _1) {
    this._1 = _1;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public List<String> getTokenId() {
    return tokenId;
  }
  public void setTokenId(List<String> tokenId) {
    this.tokenId = tokenId;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public List<String> getDna() {
    return dna;
  }
  public void setDna(List<String> dna) {
    this.dna = dna;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesITokenDnaSetDnaBatchRequestContractParams interfacesITokenDnaSetDnaBatchRequestContractParams = (InterfacesITokenDnaSetDnaBatchRequestContractParams) o;
    return (this._0 == null ? interfacesITokenDnaSetDnaBatchRequestContractParams._0 == null : this._0.equals(interfacesITokenDnaSetDnaBatchRequestContractParams._0)) &&
        (this._1 == null ? interfacesITokenDnaSetDnaBatchRequestContractParams._1 == null : this._1.equals(interfacesITokenDnaSetDnaBatchRequestContractParams._1)) &&
        (this.tokenId == null ? interfacesITokenDnaSetDnaBatchRequestContractParams.tokenId == null : this.tokenId.equals(interfacesITokenDnaSetDnaBatchRequestContractParams.tokenId)) &&
        (this.dna == null ? interfacesITokenDnaSetDnaBatchRequestContractParams.dna == null : this.dna.equals(interfacesITokenDnaSetDnaBatchRequestContractParams.dna));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this.tokenId == null ? 0: this.tokenId.hashCode());
    result = 31 * result + (this.dna == null ? 0: this.dna.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesITokenDnaSetDnaBatchRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  tokenId: ").append(tokenId).append("\n");
    sb.append("  dna: ").append(dna).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}