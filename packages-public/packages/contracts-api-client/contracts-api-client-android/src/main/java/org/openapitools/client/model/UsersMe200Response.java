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

import org.openapitools.client.model.OasAnyTypeNotMapped;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class UsersMe200Response {
  
  @SerializedName("email")
  private String email = null;
  @SerializedName("apiKey")
  private String apiKey = null;
  @SerializedName("dfnsAddress")
  private String dfnsAddress = null;
  @SerializedName("dfnsId")
  private String dfnsId = null;
  @SerializedName("dfnsStatus")
  private String dfnsStatus = null;
  @SerializedName("gnosisTxHash")
  private String gnosisTxHash = null;
  @SerializedName("gnosisAddress")
  private String gnosisAddress = null;
  @SerializedName("topupTotals")
  private OasAnyTypeNotMapped topupTotals = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public String getApiKey() {
    return apiKey;
  }
  public void setApiKey(String apiKey) {
    this.apiKey = apiKey;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public String getDfnsAddress() {
    return dfnsAddress;
  }
  public void setDfnsAddress(String dfnsAddress) {
    this.dfnsAddress = dfnsAddress;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public String getDfnsId() {
    return dfnsId;
  }
  public void setDfnsId(String dfnsId) {
    this.dfnsId = dfnsId;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public String getDfnsStatus() {
    return dfnsStatus;
  }
  public void setDfnsStatus(String dfnsStatus) {
    this.dfnsStatus = dfnsStatus;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public String getGnosisTxHash() {
    return gnosisTxHash;
  }
  public void setGnosisTxHash(String gnosisTxHash) {
    this.gnosisTxHash = gnosisTxHash;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public String getGnosisAddress() {
    return gnosisAddress;
  }
  public void setGnosisAddress(String gnosisAddress) {
    this.gnosisAddress = gnosisAddress;
  }

  /**
   **/
  @ApiModelProperty(value = "")
  public OasAnyTypeNotMapped getTopupTotals() {
    return topupTotals;
  }
  public void setTopupTotals(OasAnyTypeNotMapped topupTotals) {
    this.topupTotals = topupTotals;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UsersMe200Response usersMe200Response = (UsersMe200Response) o;
    return (this.email == null ? usersMe200Response.email == null : this.email.equals(usersMe200Response.email)) &&
        (this.apiKey == null ? usersMe200Response.apiKey == null : this.apiKey.equals(usersMe200Response.apiKey)) &&
        (this.dfnsAddress == null ? usersMe200Response.dfnsAddress == null : this.dfnsAddress.equals(usersMe200Response.dfnsAddress)) &&
        (this.dfnsId == null ? usersMe200Response.dfnsId == null : this.dfnsId.equals(usersMe200Response.dfnsId)) &&
        (this.dfnsStatus == null ? usersMe200Response.dfnsStatus == null : this.dfnsStatus.equals(usersMe200Response.dfnsStatus)) &&
        (this.gnosisTxHash == null ? usersMe200Response.gnosisTxHash == null : this.gnosisTxHash.equals(usersMe200Response.gnosisTxHash)) &&
        (this.gnosisAddress == null ? usersMe200Response.gnosisAddress == null : this.gnosisAddress.equals(usersMe200Response.gnosisAddress)) &&
        (this.topupTotals == null ? usersMe200Response.topupTotals == null : this.topupTotals.equals(usersMe200Response.topupTotals));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this.email == null ? 0: this.email.hashCode());
    result = 31 * result + (this.apiKey == null ? 0: this.apiKey.hashCode());
    result = 31 * result + (this.dfnsAddress == null ? 0: this.dfnsAddress.hashCode());
    result = 31 * result + (this.dfnsId == null ? 0: this.dfnsId.hashCode());
    result = 31 * result + (this.dfnsStatus == null ? 0: this.dfnsStatus.hashCode());
    result = 31 * result + (this.gnosisTxHash == null ? 0: this.gnosisTxHash.hashCode());
    result = 31 * result + (this.gnosisAddress == null ? 0: this.gnosisAddress.hashCode());
    result = 31 * result + (this.topupTotals == null ? 0: this.topupTotals.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class UsersMe200Response {\n");
    
    sb.append("  email: ").append(email).append("\n");
    sb.append("  apiKey: ").append(apiKey).append("\n");
    sb.append("  dfnsAddress: ").append(dfnsAddress).append("\n");
    sb.append("  dfnsId: ").append(dfnsId).append("\n");
    sb.append("  dfnsStatus: ").append(dfnsStatus).append("\n");
    sb.append("  gnosisTxHash: ").append(gnosisTxHash).append("\n");
    sb.append("  gnosisAddress: ").append(gnosisAddress).append("\n");
    sb.append("  topupTotals: ").append(topupTotals).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}