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
pub struct InterfacesIerc721GetApproved200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721GetApprovedRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIerc721GetApproved200ResponseResult>,
}

impl InterfacesIerc721GetApproved200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc721GetApprovedRequestContractParams, result: crate::models::InterfacesIerc721GetApproved200ResponseResult) -> InterfacesIerc721GetApproved200Response {
        InterfacesIerc721GetApproved200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}

