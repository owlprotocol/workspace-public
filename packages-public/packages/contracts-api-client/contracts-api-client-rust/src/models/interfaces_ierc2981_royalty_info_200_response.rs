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
pub struct InterfacesIerc2981RoyaltyInfo200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc2981RoyaltyInfoRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIerc2981RoyaltyInfo200ResponseResult>,
}

impl InterfacesIerc2981RoyaltyInfo200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc2981RoyaltyInfoRequestContractParams, result: crate::models::InterfacesIerc2981RoyaltyInfo200ResponseResult) -> InterfacesIerc2981RoyaltyInfo200Response {
        InterfacesIerc2981RoyaltyInfo200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}


