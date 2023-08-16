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

import org.openapitools.client.model.InterfacesIERC1155IsApprovedForAllRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1155IsApprovedForAllRequest {
  
  @SerializedName("contractParams")
  private InterfacesIERC1155IsApprovedForAllRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1155IsApprovedForAllRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC1155IsApprovedForAllRequestContractParams contractParams) {
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
    InterfacesIERC1155IsApprovedForAllRequest interfacesIERC1155IsApprovedForAllRequest = (InterfacesIERC1155IsApprovedForAllRequest) o;
    return (this.contractParams == null ? interfacesIERC1155IsApprovedForAllRequest.contractParams == null : this.contractParams.equals(interfacesIERC1155IsApprovedForAllRequest.contractParams));
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
    sb.append("class InterfacesIERC1155IsApprovedForAllRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
