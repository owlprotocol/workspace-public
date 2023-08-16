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
pub struct InterfacesIerc20Allowance200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc20AllowanceRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIerc20Allowance200ResponseResult>,
}

impl InterfacesIerc20Allowance200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc20AllowanceRequestContractParams, result: crate::models::InterfacesIerc20Allowance200ResponseResult) -> InterfacesIerc20Allowance200Response {
        InterfacesIerc20Allowance200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}


