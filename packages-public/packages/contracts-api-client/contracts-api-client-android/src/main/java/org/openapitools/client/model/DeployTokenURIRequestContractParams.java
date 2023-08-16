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
public class DeployTokenURIRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("2")
  private String _2 = null;
  @SerializedName("3")
  private String _3 = null;
  @SerializedName("_admin")
  private String admin = null;
  @SerializedName("_contractUri")
  private String contractUri = null;
  @SerializedName("_uriRole")
  private String uriRole = null;
  @SerializedName("_uri")
  private String uri = null;

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String get0() {
    return _0;
  }
  public void set0(String _0) {
    this._0 = _0;
  }

  /**
   * A string
   **/
  @ApiModelProperty(value = "A string")
  public String get1() {
    return _1;
  }
  public void set1(String _1) {
    this._1 = _1;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String get2() {
    return _2;
  }
  public void set2(String _2) {
    this._2 = _2;
  }

  /**
   * A string
   **/
  @ApiModelProperty(value = "A string")
  public String get3() {
    return _3;
  }
  public void set3(String _3) {
    this._3 = _3;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getAdmin() {
    return admin;
  }
  public void setAdmin(String admin) {
    this.admin = admin;
  }

  /**
   * A string
   **/
  @ApiModelProperty(value = "A string")
  public String getContractUri() {
    return contractUri;
  }
  public void setContractUri(String contractUri) {
    this.contractUri = contractUri;
  }

  /**
   * An ethereum address
   **/
  @ApiModelProperty(value = "An ethereum address")
  public String getUriRole() {
    return uriRole;
  }
  public void setUriRole(String uriRole) {
    this.uriRole = uriRole;
  }

  /**
   * A string
   **/
  @ApiModelProperty(value = "A string")
  public String getUri() {
    return uri;
  }
  public void setUri(String uri) {
    this.uri = uri;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeployTokenURIRequestContractParams deployTokenURIRequestContractParams = (DeployTokenURIRequestContractParams) o;
    return (this._0 == null ? deployTokenURIRequestContractParams._0 == null : this._0.equals(deployTokenURIRequestContractParams._0)) &&
        (this._1 == null ? deployTokenURIRequestContractParams._1 == null : this._1.equals(deployTokenURIRequestContractParams._1)) &&
        (this._2 == null ? deployTokenURIRequestContractParams._2 == null : this._2.equals(deployTokenURIRequestContractParams._2)) &&
        (this._3 == null ? deployTokenURIRequestContractParams._3 == null : this._3.equals(deployTokenURIRequestContractParams._3)) &&
        (this.admin == null ? deployTokenURIRequestContractParams.admin == null : this.admin.equals(deployTokenURIRequestContractParams.admin)) &&
        (this.contractUri == null ? deployTokenURIRequestContractParams.contractUri == null : this.contractUri.equals(deployTokenURIRequestContractParams.contractUri)) &&
        (this.uriRole == null ? deployTokenURIRequestContractParams.uriRole == null : this.uriRole.equals(deployTokenURIRequestContractParams.uriRole)) &&
        (this.uri == null ? deployTokenURIRequestContractParams.uri == null : this.uri.equals(deployTokenURIRequestContractParams.uri));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this._2 == null ? 0: this._2.hashCode());
    result = 31 * result + (this._3 == null ? 0: this._3.hashCode());
    result = 31 * result + (this.admin == null ? 0: this.admin.hashCode());
    result = 31 * result + (this.contractUri == null ? 0: this.contractUri.hashCode());
    result = 31 * result + (this.uriRole == null ? 0: this.uriRole.hashCode());
    result = 31 * result + (this.uri == null ? 0: this.uri.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeployTokenURIRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  _2: ").append(_2).append("\n");
    sb.append("  _3: ").append(_3).append("\n");
    sb.append("  admin: ").append(admin).append("\n");
    sb.append("  contractUri: ").append(contractUri).append("\n");
    sb.append("  uriRole: ").append(uriRole).append("\n");
    sb.append("  uri: ").append(uri).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
