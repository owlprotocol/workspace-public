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
public class InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams {
  
  @SerializedName("0")
  private String _0 = null;
  @SerializedName("1")
  private String _1 = null;
  @SerializedName("fulfillPrefixData")
  private String fulfillPrefixData = null;
  @SerializedName("fulfillResponseData")
  private String fulfillResponseData = null;

  /**
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
  public String get0() {
    return _0;
  }
  public void set0(String _0) {
    this._0 = _0;
  }

  /**
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
  public String get1() {
    return _1;
  }
  public void set1(String _1) {
    this._1 = _1;
  }

  /**
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
  public String getFulfillPrefixData() {
    return fulfillPrefixData;
  }
  public void setFulfillPrefixData(String fulfillPrefixData) {
    this.fulfillPrefixData = fulfillPrefixData;
  }

  /**
   * An arbitrary length byte array
   **/
  @ApiModelProperty(value = "An arbitrary length byte array")
  public String getFulfillResponseData() {
    return fulfillResponseData;
  }
  public void setFulfillResponseData(String fulfillResponseData) {
    this.fulfillResponseData = fulfillResponseData;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams = (InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams) o;
    return (this._0 == null ? interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams._0 == null : this._0.equals(interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams._0)) &&
        (this._1 == null ? interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams._1 == null : this._1.equals(interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams._1)) &&
        (this.fulfillPrefixData == null ? interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams.fulfillPrefixData == null : this.fulfillPrefixData.equals(interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams.fulfillPrefixData)) &&
        (this.fulfillResponseData == null ? interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams.fulfillResponseData == null : this.fulfillResponseData.equals(interfacesIChainlinkAnyApiConsumerFulfillRequestContractParams.fulfillResponseData));
  }

  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + (this._0 == null ? 0: this._0.hashCode());
    result = 31 * result + (this._1 == null ? 0: this._1.hashCode());
    result = 31 * result + (this.fulfillPrefixData == null ? 0: this.fulfillPrefixData.hashCode());
    result = 31 * result + (this.fulfillResponseData == null ? 0: this.fulfillResponseData.hashCode());
    return result;
  }

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams {\n");
    
    sb.append("  _0: ").append(_0).append("\n");
    sb.append("  _1: ").append(_1).append("\n");
    sb.append("  fulfillPrefixData: ").append(fulfillPrefixData).append("\n");
    sb.append("  fulfillResponseData: ").append(fulfillResponseData).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}