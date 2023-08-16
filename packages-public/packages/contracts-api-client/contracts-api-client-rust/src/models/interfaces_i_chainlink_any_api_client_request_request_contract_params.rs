/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */




#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// An arbitrary length byte array
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// A solidity bytes32
    #[serde(rename = "2", skip_serializing_if = "Option::is_none")]
    pub param_2: Option<String>,
    /// A string
    #[serde(rename = "3", skip_serializing_if = "Option::is_none")]
    pub param_3: Option<String>,
    /// A string
    #[serde(rename = "4", skip_serializing_if = "Option::is_none")]
    pub param_4: Option<String>,
    /// A solidity uint256
    #[serde(rename = "5", skip_serializing_if = "Option::is_none")]
    pub param_5: Option<String>,
    /// An ethereum address
    #[serde(rename = "fulfillAddress", skip_serializing_if = "Option::is_none")]
    pub fulfill_address: Option<String>,
    /// An arbitrary length byte array
    #[serde(rename = "fulfillPrefixData", skip_serializing_if = "Option::is_none")]
    pub fulfill_prefix_data: Option<String>,
    /// A solidity bytes32
    #[serde(rename = "reqJobId", skip_serializing_if = "Option::is_none")]
    pub req_job_id: Option<String>,
    /// A string
    #[serde(rename = "reqUrl", skip_serializing_if = "Option::is_none")]
    pub req_url: Option<String>,
    /// A string
    #[serde(rename = "reqPath", skip_serializing_if = "Option::is_none")]
    pub req_path: Option<String>,
    /// A solidity uint256
    #[serde(rename = "reqFee", skip_serializing_if = "Option::is_none")]
    pub req_fee: Option<String>,
}

impl InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
    pub fn new() -> InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
        InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
            param_0: None,
            param_1: None,
            param_2: None,
            param_3: None,
            param_4: None,
            param_5: None,
            fulfill_address: None,
            fulfill_prefix_data: None,
            req_job_id: None,
            req_url: None,
            req_path: None,
            req_fee: None,
        }
    }
}


