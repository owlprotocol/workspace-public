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

import org.openapitools.client.model.InterfacesIERC20ApproveRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC20Approve200Response {
  
  @SerializedName("contractParams")
  private InterfacesIERC20ApproveRequestContractParams contractParams = null;
  @SerializedName("txHash")
  private String txHash = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC20ApproveRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC20ApproveRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public String getTxHash() {
    return txHash;
  }
  public void setTxHash(String txHash) {
    this.txHash = txHash;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC20Approve200Response interfacesIERC20Approve200Response = (InterfacesIERC20Approve200Response) o;
    return (this.contractParams == null ? interfacesIERC20Approve200Response.contractParams == null : this.contractParams.equals(interfacesIERC20Approve200Response.contractParams)) &&
        (this.txHash == null ? interfacesIERC20Approve200Response.txHash == null : this.txHash.equals(interfacesIERC20Approve200Response.txHash));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.contractParams == null ? 0: this.contractParams.hashCode());
    result = 31 * result + (this.txHash == null ? 0: this.txHash.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC20Approve200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  txHash: ").append(txHash).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}