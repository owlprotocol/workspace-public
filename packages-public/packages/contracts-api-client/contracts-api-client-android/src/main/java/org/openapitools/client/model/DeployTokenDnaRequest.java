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

import org.openapitools.client.model.DeployBeaconProxyRequestDeployParams;
import org.openapitools.client.model.DeployTokenDnaRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class DeployTokenDnaRequest {
  
  @SerializedName("deployParams")
  private DeployBeaconProxyRequestDeployParams deployParams = null;
  @SerializedName("contractParams")
  private DeployTokenDnaRequestContractParams contractParams = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public DeployBeaconProxyRequestDeployParams getDeployParams() {
    return deployParams;
  }
  public void setDeployParams(DeployBeaconProxyRequestDeployParams deployParams) {
    this.deployParams = deployParams;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public DeployTokenDnaRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(DeployTokenDnaRequestContractParams contractParams) {
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
    DeployTokenDnaRequest deployTokenDnaRequest = (DeployTokenDnaRequest) o;
    return (this.deployParams == null ? deployTokenDnaRequest.deployParams == null : this.deployParams.equals(deployTokenDnaRequest.deployParams)) &&
        (this.contractParams == null ? deployTokenDnaRequest.contractParams == null : this.contractParams.equals(deployTokenDnaRequest.contractParams));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.deployParams == null ? 0: this.deployParams.hashCode());
    result = 31 * result + (this.contractParams == null ? 0: this.contractParams.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeployTokenDnaRequest {\n");
    
    sb.append("  deployParams: ").append(deployParams).append("\n");
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}