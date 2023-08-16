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
pub struct InterfacesIerc20ApproveRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// A solidity uint256
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// An ethereum address
    #[serde(rename = "spender", skip_serializing_if = "Option::is_none")]
    pub spender: Option<String>,
    /// A solidity uint256
    #[serde(rename = "amount", skip_serializing_if = "Option::is_none")]
    pub amount: Option<String>,
}

impl InterfacesIerc20ApproveRequestContractParams {
    pub fn new() -> InterfacesIerc20ApproveRequestContractParams {
        InterfacesIerc20ApproveRequestContractParams {
            param_0: None,
            param_1: None,
            spender: None,
            amount: None,
        }
    }
}


