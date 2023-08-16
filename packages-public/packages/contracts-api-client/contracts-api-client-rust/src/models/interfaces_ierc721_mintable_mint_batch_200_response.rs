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
pub struct InterfacesIerc721MintableMintBatch200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721MintableMintBatchRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIerc721MintableMintBatch200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc721MintableMintBatchRequestContractParams, tx_hash: String) -> InterfacesIerc721MintableMintBatch200Response {
        InterfacesIerc721MintableMintBatch200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}


