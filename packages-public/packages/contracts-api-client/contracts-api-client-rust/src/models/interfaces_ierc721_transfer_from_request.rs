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
pub struct InterfacesIerc721TransferFromRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721TransferFromRequestContractParams>,
}

impl InterfacesIerc721TransferFromRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc721TransferFromRequestContractParams) -> InterfacesIerc721TransferFromRequest {
        InterfacesIerc721TransferFromRequest {
            contract_params: Box::new(contract_params),
        }
    }
}


