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

import org.openapitools.client.model.InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1820ImplementsERC165InterfaceRequest {
  
  @SerializedName("contractParams")
  private InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams contractParams) {
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
    InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest = (InterfacesIERC1820ImplementsERC165InterfaceRequest) o;
    return (this.contractParams == null ? interfacesIERC1820ImplementsERC165InterfaceRequest.contractParams == null : this.contractParams.equals(interfacesIERC1820ImplementsERC165InterfaceRequest.contractParams));
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
    sb.append("class InterfacesIERC1820ImplementsERC165InterfaceRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}