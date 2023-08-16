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

import org.openapitools.client.model.InterfacesIBeaconImplementation200ResponseResult;
import org.openapitools.client.model.InterfacesIERC1820GetInterfaceImplementerRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1820GetInterfaceImplementer200Response {
  
  @SerializedName("contractParams")
  private InterfacesIERC1820GetInterfaceImplementerRequestContractParams contractParams = null;
  @SerializedName("result")
  private InterfacesIBeaconImplementation200ResponseResult result = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1820GetInterfaceImplementerRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC1820GetInterfaceImplementerRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIBeaconImplementation200ResponseResult getResult() {
    return result;
  }
  public void setResult(InterfacesIBeaconImplementation200ResponseResult result) {
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
    InterfacesIERC1820GetInterfaceImplementer200Response interfacesIERC1820GetInterfaceImplementer200Response = (InterfacesIERC1820GetInterfaceImplementer200Response) o;
    return (this.contractParams == null ? interfacesIERC1820GetInterfaceImplementer200Response.contractParams == null : this.contractParams.equals(interfacesIERC1820GetInterfaceImplementer200Response.contractParams)) &&
        (this.result == null ? interfacesIERC1820GetInterfaceImplementer200Response.result == null : this.result.equals(interfacesIERC1820GetInterfaceImplementer200Response.result));
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
    sb.append("class InterfacesIERC1820GetInterfaceImplementer200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  result: ").append(result).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
