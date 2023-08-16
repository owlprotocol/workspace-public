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

import org.openapitools.client.model.InterfacesIERC165SupportsInterfaceRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC165SupportsInterfaceRequest {
  
  @SerializedName("contractParams")
  private InterfacesIERC165SupportsInterfaceRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC165SupportsInterfaceRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC165SupportsInterfaceRequestContractParams contractParams) {
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
    InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = (InterfacesIERC165SupportsInterfaceRequest) o;
    return (this.contractParams == null ? interfacesIERC165SupportsInterfaceRequest.contractParams == null : this.contractParams.equals(interfacesIERC165SupportsInterfaceRequest.contractParams));
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
    sb.append("class InterfacesIERC165SupportsInterfaceRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
