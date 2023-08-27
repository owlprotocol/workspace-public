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
pub struct DeployTokenUriRequestContractParams {
    /// An ethereum address
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<String>,
    /// A string
    #[serde(rename = "1", skip_serializing_if = "Option::is_none")]
    pub param_1: Option<String>,
    /// An ethereum address
    #[serde(rename = "2", skip_serializing_if = "Option::is_none")]
    pub param_2: Option<String>,
    /// A string
    #[serde(rename = "3", skip_serializing_if = "Option::is_none")]
    pub param_3: Option<String>,
    /// An ethereum address
    #[serde(rename = "_admin", skip_serializing_if = "Option::is_none")]
    pub _admin: Option<String>,
    /// A string
    #[serde(rename = "_contractUri", skip_serializing_if = "Option::is_none")]
    pub _contract_uri: Option<String>,
    /// An ethereum address
    #[serde(rename = "_uriRole", skip_serializing_if = "Option::is_none")]
    pub _uri_role: Option<String>,
    /// A string
    #[serde(rename = "_uri", skip_serializing_if = "Option::is_none")]
    pub _uri: Option<String>,
}

impl DeployTokenUriRequestContractParams {
    pub fn new() -> DeployTokenUriRequestContractParams {
        DeployTokenUriRequestContractParams {
            param_0: None,
            param_1: None,
            param_2: None,
            param_3: None,
            _admin: None,
            _contract_uri: None,
            _uri_role: None,
            _uri: None,
        }
    }
}

