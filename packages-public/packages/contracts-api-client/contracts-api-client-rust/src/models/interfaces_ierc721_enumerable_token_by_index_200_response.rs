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
pub struct InterfacesIerc721EnumerableTokenByIndex200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc721EnumerableTokenByIndexRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIerc20Allowance200ResponseResult>,
}

impl InterfacesIerc721EnumerableTokenByIndex200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc721EnumerableTokenByIndexRequestContractParams, result: crate::models::InterfacesIerc20Allowance200ResponseResult) -> InterfacesIerc721EnumerableTokenByIndex200Response {
        InterfacesIerc721EnumerableTokenByIndex200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}

