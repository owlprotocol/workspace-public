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

import org.openapitools.client.model.InterfacesIERC1820InterfaceHash200ResponseResult;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response {
  
  @SerializedName("contractParams")
  private Object contractParams = null;
  @SerializedName("result")
  private InterfacesIERC1820InterfaceHash200ResponseResult result = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public Object getContractParams() {
    return contractParams;
  }
  public void setContractParams(Object contractParams) {
    this.contractParams = contractParams;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1820InterfaceHash200ResponseResult getResult() {
    return result;
  }
  public void setResult(InterfacesIERC1820InterfaceHash200ResponseResult result) {
    this.result = result;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response interfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response = (InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response) o;
    return (this.contractParams == null ? interfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.contractParams == null : this.contractParams.equals(interfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.contractParams)) &&
        (this.result == null ? interfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.result == null : this.result.equals(interfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.result));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.contractParams == null ? 0: this.contractParams.hashCode());
    result = 31 * result + (this.result == null ? 0: this.result.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  result: ").append(result).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}