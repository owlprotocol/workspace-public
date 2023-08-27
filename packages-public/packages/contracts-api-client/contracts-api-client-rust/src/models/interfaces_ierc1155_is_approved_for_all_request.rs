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
pub struct InterfacesIerc1155IsApprovedForAllRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1155IsApprovedForAllRequestContractParams>,
}

impl InterfacesIerc1155IsApprovedForAllRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc1155IsApprovedForAllRequestContractParams) -> InterfacesIerc1155IsApprovedForAllRequest {
        InterfacesIerc1155IsApprovedForAllRequest {
            contract_params: Box::new(contract_params),
        }
    }
}

