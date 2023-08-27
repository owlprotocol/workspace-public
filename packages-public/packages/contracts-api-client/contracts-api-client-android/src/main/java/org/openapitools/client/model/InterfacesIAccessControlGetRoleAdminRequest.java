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

import org.openapitools.client.model.InterfacesIAccessControlGetRoleAdminRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIAccessControlGetRoleAdminRequest {
  
  @SerializedName("contractParams")
  private InterfacesIAccessControlGetRoleAdminRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIAccessControlGetRoleAdminRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIAccessControlGetRoleAdminRequestContractParams contractParams) {
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
    InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = (InterfacesIAccessControlGetRoleAdminRequest) o;
    return (this.contractParams == null ? interfacesIAccessControlGetRoleAdminRequest.contractParams == null : this.contractParams.equals(interfacesIAccessControlGetRoleAdminRequest.contractParams));
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
    sb.append("class InterfacesIAccessControlGetRoleAdminRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}