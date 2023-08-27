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
pub struct InterfacesIerc1155SafeBatchTransferFromRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1155SafeBatchTransferFromRequestContractParams>,
}

impl InterfacesIerc1155SafeBatchTransferFromRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc1155SafeBatchTransferFromRequestContractParams) -> InterfacesIerc1155SafeBatchTransferFromRequest {
        InterfacesIerc1155SafeBatchTransferFromRequest {
            contract_params: Box::new(contract_params),
        }
    }
}

