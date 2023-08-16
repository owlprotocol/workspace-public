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
pub struct InterfacesIerc1820GetManager200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1820GetManagerRequestContractParams>,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIBeaconImplementation200ResponseResult>,
}

impl InterfacesIerc1820GetManager200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc1820GetManagerRequestContractParams, result: crate::models::InterfacesIBeaconImplementation200ResponseResult) -> InterfacesIerc1820GetManager200Response {
        InterfacesIerc1820GetManager200Response {
            contract_params: Box::new(contract_params),
            result: Box::new(result),
        }
    }
}


