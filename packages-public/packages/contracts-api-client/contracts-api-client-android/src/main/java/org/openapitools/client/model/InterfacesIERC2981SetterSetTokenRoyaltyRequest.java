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

import org.openapitools.client.model.InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC2981SetterSetTokenRoyaltyRequest {
  
  @SerializedName("contractParams")
  private InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIERC2981SetterSetTokenRoyaltyRequest interfacesIERC2981SetterSetTokenRoyaltyRequest = (InterfacesIERC2981SetterSetTokenRoyaltyRequest) o;
    return (this.contractParams == null ? interfacesIERC2981SetterSetTokenRoyaltyRequest.contractParams == null : this.contractParams.equals(interfacesIERC2981SetterSetTokenRoyaltyRequest.contractParams));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.contractParams == null ? 0: this.contractParams.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIERC2981SetterSetTokenRoyaltyRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
