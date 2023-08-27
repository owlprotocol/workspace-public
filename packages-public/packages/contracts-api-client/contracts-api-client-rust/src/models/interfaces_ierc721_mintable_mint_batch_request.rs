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
pub struct InterfacesIerc721MintableMintBatchRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721MintableMintBatchRequestContractParams>,
}

impl InterfacesIerc721MintableMintBatchRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc721MintableMintBatchRequestContractParams) -> InterfacesIerc721MintableMintBatchRequest {
        InterfacesIerc721MintableMintBatchRequest {
            contract_params: Box::new(contract_params),
        }
    }
}

