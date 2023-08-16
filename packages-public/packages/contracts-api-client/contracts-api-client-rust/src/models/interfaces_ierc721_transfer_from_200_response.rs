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
pub struct InterfacesIerc721TransferFrom200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721TransferFromRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIerc721TransferFrom200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc721TransferFromRequestContractParams, tx_hash: String) -> InterfacesIerc721TransferFrom200Response {
        InterfacesIerc721TransferFrom200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}


