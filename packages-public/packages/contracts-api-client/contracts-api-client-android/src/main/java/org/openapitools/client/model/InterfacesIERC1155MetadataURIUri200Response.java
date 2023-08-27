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

import org.openapitools.client.model.InterfacesIContractURIContractURI200ResponseResult;
import org.openapitools.client.model.InterfacesIERC1155MetadataURIUriRequestContractParams;
import io.swagger.annotations.*;
import com.google.gson.annotations.SerializedName;

@ApiModel(description = "")
public class InterfacesIERC1155MetadataURIUri200Response {
  
  @SerializedName("contractParams")
  private InterfacesIERC1155MetadataURIUriRequestContractParams contractParams = null;
  @SerializedName("result")
  private InterfacesIContractURIContractURI200ResponseResult result = null;

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIERC1155MetadataURIUriRequestContractParams getContractParams() {
    return contractParams;
  }
  public void setContractParams(InterfacesIERC1155MetadataURIUriRequestContractParams contractParams) {
    this.contractParams = contractParams;
  }

  /**
   **/
  @ApiModelProperty(required = true, value = "")
  public InterfacesIContractURIContractURI200ResponseResult getResult() {
    return result;
  }
  public void setResult(InterfacesIContractURIContractURI200ResponseResult result) {
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
    InterfacesIERC1155MetadataURIUri200Response interfacesIERC1155MetadataURIUri200Response = (InterfacesIERC1155MetadataURIUri200Response) o;
    return (this.contractParams == null ? interfacesIERC1155MetadataURIUri200Response.contractParams == null : this.contractParams.equals(interfacesIERC1155MetadataURIUri200Response.contractParams)) &&
        (this.result == null ? interfacesIERC1155MetadataURIUri200Response.result == null : this.result.equals(interfacesIERC1155MetadataURIUri200Response.result));
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
    sb.append("class InterfacesIERC1155MetadataURIUri200Response {\n");
    
    sb.append("  contractParams: ").append(contractParams).append("\n");
    sb.append("  result: ").append(result).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}