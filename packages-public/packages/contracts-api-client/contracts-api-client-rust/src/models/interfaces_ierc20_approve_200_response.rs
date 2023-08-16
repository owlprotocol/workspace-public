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
pub struct InterfacesIerc20Approve200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc20ApproveRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIerc20Approve200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc20ApproveRequestContractParams, tx_hash: String) -> InterfacesIerc20Approve200Response {
        InterfacesIerc20Approve200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}


