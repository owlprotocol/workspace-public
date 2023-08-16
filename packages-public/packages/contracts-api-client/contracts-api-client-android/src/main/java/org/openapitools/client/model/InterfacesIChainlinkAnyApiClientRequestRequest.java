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

import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequestRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIChainlinkAnyApiClientRequestRequest {
  
  @SerializedName("contractParams")
  private InterfacesIChainlinkAnyApiClientRequestRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIChainlinkAnyApiClientRequestRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIChainlinkAnyApiClientRequestRequestContractParams contractParams) {
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
    InterfacesIChainlinkAnyApiClientRequestRequest interfacesIChainlinkAnyApiClientRequestRequest = (InterfacesIChainlinkAnyApiClientRequestRequest) o;
    return (this.contractParams == null ? interfacesIChainlinkAnyApiClientRequestRequest.contractParams == null : this.contractParams.equals(interfacesIChainlinkAnyApiClientRequestRequest.contractParams));
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
    sb.append("class InterfacesIChainlinkAnyApiClientRequestRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
