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
pub struct InterfacesIerc1155SafeTransferFromRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// An ethereum address
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// A solidity uint256
    #[serde(rename = "2", skip_serializing_if = "Option::is_none")]
    pub param_2: Option<String>,
    /// A solidity uint256
    #[serde(rename = "3", skip_serializing_if = "Option::is_none")]
    pub param_3: Option<String>,
    /// An arbitrary length byte array
    #[serde(rename = "4", skip_serializing_if = "Option::is_none")]
    pub param_4: Option<String>,
    /// An ethereum address
    #[serde(rename = "from", skip_serializing_if = "Option::is_none")]
    pub from: Option<String>,
    /// An ethereum address
    #[serde(rename = "to", skip_serializing_if = "Option::is_none")]
    pub to: Option<String>,
    /// A solidity uint256
    #[serde(rename = "id", skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    /// A solidity uint256
    #[serde(rename = "amount", skip_serializing_if = "Option::is_none")]
    pub amount: Option<String>,
    /// An arbitrary length byte array
    #[serde(rename = "data", skip_serializing_if = "Option::is_none")]
    pub data: Option<String>,
}

impl InterfacesIerc1155SafeTransferFromRequestContractParams {
    pub fn new() -> InterfacesIerc1155SafeTransferFromRequestContractParams {
        InterfacesIerc1155SafeTransferFromRequestContractParams {
            param_0: None,
            param_1: None,
            param_2: None,
            param_3: None,
            param_4: None,
            from: None,
            to: None,
            id: None,
            amount: None,
            data: None,
        }
    }
}

