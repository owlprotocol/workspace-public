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

import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class DeployBeaconProxyRequestDeployParams {
  
  @SerializedName("msgSender")
  private String msgSender = null;
  @SerializedName("salt")
  private String salt = 0x1;
  public enum DeploymentMethodEnum {
     DETERMINISTIC,  ERC1167,  BEACON_OWL,  BEACON_EXISTING,  BEACON_NEW, 
  };
  @SerializedName("deploymentMethod")
  private DeploymentMethodEnum deploymentMethod = null;
  @SerializedName("beaconAddress")
  private String beaconAddress = null;
  @SerializedName("beaonAdmin")
  private String beaonAdmin = null;

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getMsgSender() {
    return msgSender;
  }
  public void setMsgSender(String msgSender) {
    this.msgSender = msgSender;
  }

  /**
   * Salt parameter string to deploy different contracts with identical parameteres (default: 1)
   **/
  @ApiModelProperty(value = "Salt parameter string to deploy different contracts with identical parameteres (default: 1)")
  public String getSalt() {
    return salt;
  }
  public void setSalt(String salt) {
    this.salt = salt;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public DeploymentMethodEnum getDeploymentMethod() {
    return deploymentMethod;
  }
  public void setDeploymentMethod(DeploymentMethodEnum deploymentMethod) {
    this.deploymentMethod = deploymentMethod;
  }

  /**
   * The address of the beacon, if used in the deployment method
   **/
  @ApiModelProperty(value = "The address of the beacon, if used in the deployment method")
  public String getBeaconAddress() {
    return beaconAddress;
  }
  public void setBeaconAddress(String beaconAddress) {
    this.beaconAddress = beaconAddress;
  }

  /**
   * The admin address of the beacon, if a new beacon is deployed
   **/
  @ApiModelProperty(value = "The admin address of the beacon, if a new beacon is deployed")
  public String getBeaonAdmin() {
    return beaonAdmin;
  }
  public void setBeaonAdmin(String beaonAdmin) {
    this.beaonAdmin = beaonAdmin;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeployBeaconProxyRequestDeployParams deployBeaconProxyRequestDeployParams = (DeployBeaconProxyRequestDeployParams) o;
    return (this.msgSender == null ? deployBeaconProxyRequestDeployParams.msgSender == null : this.msgSender.equals(deployBeaconProxyRequestDeployParams.msgSender)) &&
        (this.salt == null ? deployBeaconProxyRequestDeployParams.salt == null : this.salt.equals(deployBeaconProxyRequestDeployParams.salt)) &&
        (this.deploymentMethod == null ? deployBeaconProxyRequestDeployParams.deploymentMethod == null : this.deploymentMethod.equals(deployBeaconProxyRequestDeployParams.deploymentMethod)) &&
        (this.beaconAddress == null ? deployBeaconProxyRequestDeployParams.beaconAddress == null : this.beaconAddress.equals(deployBeaconProxyRequestDeployParams.beaconAddress)) &&
        (this.beaonAdmin == null ? deployBeaconProxyRequestDeployParams.beaonAdmin == null : this.beaonAdmin.equals(deployBeaconProxyRequestDeployParams.beaonAdmin));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.msgSender == null ? 0: this.msgSender.hashCode());
    result = 31 * result + (this.salt == null ? 0: this.salt.hashCode());
    result = 31 * result + (this.deploymentMethod == null ? 0: this.deploymentMethod.hashCode());
    result = 31 * result + (this.beaconAddress == null ? 0: this.beaconAddress.hashCode());
    result = 31 * result + (this.beaonAdmin == null ? 0: this.beaonAdmin.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeployBeaconProxyRequestDeployParams {\n");
    
    sb.append("  msgSender: ").append(msgSender).append("\n");
    sb.append("  salt: ").append(salt).append("\n");
    sb.append("  deploymentMethod: ").append(deploymentMethod).append("\n");
    sb.append("  beaconAddress: ").append(beaconAddress).append("\n");
    sb.append("  beaonAdmin: ").append(beaonAdmin).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
