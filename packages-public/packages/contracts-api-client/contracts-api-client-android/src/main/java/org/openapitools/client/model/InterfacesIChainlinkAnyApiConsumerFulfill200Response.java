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

import org.openapitools.client.model.InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIChainlinkAnyApiConsumerFulfill200Response {
  
  @SerializedName("contractParams")
  private InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams contractParams = null;
  @SerializedName("txHash")
  private String txHash = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams contractParams) {
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
    InterfacesIChainlinkAnyApiConsumerFulfill200Response interfacesIChainlinkAnyApiConsumerFulfill200Response = (InterfacesIChainlinkAnyApiConsumerFulfill200Response) o;
    return (this.contractParams == null ? interfacesIChainlinkAnyApiConsumerFulfill200Response.contractParams == null : this.contractParams.equals(interfacesIChainlinkAnyApiConsumerFulfill200Response.contractParams)) &&
        (this.txHash == null ? interfacesIChainlinkAnyApiConsumerFulfill200Response.txHash == null : this.txHash.equals(interfacesIChainlinkAnyApiConsumerFulfill200Response.txHash));
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
    sb.append("class InterfacesIChainlinkAnyApiConsumerFulfill200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  txHash: ").append(txHash).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}