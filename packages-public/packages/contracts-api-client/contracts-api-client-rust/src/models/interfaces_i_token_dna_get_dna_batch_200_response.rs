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
pub struct InterfacesITokenDnaGetDnaBatch200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesITokenDnaGetDnaBatchRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesITokenDnaGetDnaBatch200ResponseResult>,
}

impl InterfacesITokenDnaGetDnaBatch200Response {
    pub fn new(contract_params: crate::models::InterfacesITokenDnaGetDnaBatchRequestContractParams, result: crate::models::InterfacesITokenDnaGetDnaBatch200ResponseResult) -> InterfacesITokenDnaGetDnaBatch200Response {
        InterfacesITokenDnaGetDnaBatch200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}

