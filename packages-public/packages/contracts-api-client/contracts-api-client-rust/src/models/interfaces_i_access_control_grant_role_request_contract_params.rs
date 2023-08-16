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
pub struct InterfacesIAccessControlGrantRoleRequestContractParams {
    /// A solidity bytes32
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// An ethereum address
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// A solidity bytes32
    #[serde(rename = "role", skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
    /// An ethereum address
    #[serde(rename = "account", skip_serializing_if = "Option::is_none")]
    pub account: Option<String>,
}

impl InterfacesIAccessControlGrantRoleRequestContractParams {
    pub fn new() -> InterfacesIAccessControlGrantRoleRequestContractParams {
        InterfacesIAccessControlGrantRoleRequestContractParams {
            param_0: None,
            param_1: None,
            role: None,
            account: None,
        }
    }
}


