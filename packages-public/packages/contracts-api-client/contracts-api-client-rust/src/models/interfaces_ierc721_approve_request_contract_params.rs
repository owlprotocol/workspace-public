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
pub struct InterfacesIerc721ApproveRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// A solidity uint256
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// An ethereum address
    #[serde(rename = "to", skip_serializing_if = "Option::is_none")]
    pub to: Option<String>,
    /// A solidity uint256
    #[serde(rename = "tokenId", skip_serializing_if = "Option::is_none")]
    pub token_id: Option<String>,
}

impl InterfacesIerc721ApproveRequestContractParams {
    pub fn new() -> InterfacesIerc721ApproveRequestContractParams {
        InterfacesIerc721ApproveRequestContractParams {
            param_0: None,
            param_1: None,
            to: None,
            token_id: None,
        }
    }
}

