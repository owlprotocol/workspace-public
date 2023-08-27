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
pub struct InterfacesIerc20AllowanceRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// An ethereum address
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// An ethereum address
    #[serde(rename = "owner", skip_serializing_if = "Option::is_none")]
    pub owner: Option<String>,
    /// An ethereum address
    #[serde(rename = "spender", skip_serializing_if = "Option::is_none")]
    pub spender: Option<String>,
}

impl InterfacesIerc20AllowanceRequestContractParams {
    pub fn new() -> InterfacesIerc20AllowanceRequestContractParams {
        InterfacesIerc20AllowanceRequestContractParams {
            param_0: None,
            param_1: None,
            owner: None,
            spender: None,
        }
    }
}

