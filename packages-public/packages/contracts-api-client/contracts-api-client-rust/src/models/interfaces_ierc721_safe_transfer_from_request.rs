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
pub struct InterfacesIerc721SafeTransferFromRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721SafeTransferFromRequestContractParams>,
}

impl InterfacesIerc721SafeTransferFromRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc721SafeTransferFromRequestContractParams) -> InterfacesIerc721SafeTransferFromRequest {
        InterfacesIerc721SafeTransferFromRequest {
            contract_params: Box::new(contract_params),
        }
    }
}


