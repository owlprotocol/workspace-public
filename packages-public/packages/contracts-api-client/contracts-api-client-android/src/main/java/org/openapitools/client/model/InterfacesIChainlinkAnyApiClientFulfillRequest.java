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

import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientFulfillRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIChainlinkAnyApiClientFulfillRequest {
  
  @SerializedName("contractParams")
  private InterfacesIChainlinkAnyApiClientFulfillRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIChainlinkAnyApiClientFulfillRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIChainlinkAnyApiClientFulfillRequestContractParams contractParams) {
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
    InterfacesIChainlinkAnyApiClientFulfillRequest interfacesIChainlinkAnyApiClientFulfillRequest = (InterfacesIChainlinkAnyApiClientFulfillRequest) o;
    return (this.contractParams == null ? interfacesIChainlinkAnyApiClientFulfillRequest.contractParams == null : this.contractParams.equals(interfacesIChainlinkAnyApiClientFulfillRequest.contractParams));
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
    sb.append("class InterfacesIChainlinkAnyApiClientFulfillRequest {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}