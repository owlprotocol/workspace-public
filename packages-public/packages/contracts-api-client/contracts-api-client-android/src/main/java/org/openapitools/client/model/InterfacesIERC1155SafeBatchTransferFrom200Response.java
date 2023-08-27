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

import org.openapitools.client.model.InterfacesIERC1155SafeBatchTransferFromRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1155SafeBatchTransferFrom200Response {
  
  @SerializedName("contractParams")
  private InterfacesIERC1155SafeBatchTransferFromRequestContractParams contractParams = null;
  @SerializedName("txHash")
  private String txHash = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1155SafeBatchTransferFromRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC1155SafeBatchTransferFromRequestContractParams contractParams) {
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
    InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155SafeBatchTransferFrom200Response = (InterfacesIERC1155SafeBatchTransferFrom200Response) o;
    return (this.contractParams == null ? interfacesIERC1155SafeBatchTransferFrom200Response.contractParams == null : this.contractParams.equals(interfacesIERC1155SafeBatchTransferFrom200Response.contractParams)) &&
        (this.txHash == null ? interfacesIERC1155SafeBatchTransferFrom200Response.txHash == null : this.txHash.equals(interfacesIERC1155SafeBatchTransferFrom200Response.txHash));
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
    sb.append("class InterfacesIERC1155SafeBatchTransferFrom200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  txHash: ").append(txHash).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}