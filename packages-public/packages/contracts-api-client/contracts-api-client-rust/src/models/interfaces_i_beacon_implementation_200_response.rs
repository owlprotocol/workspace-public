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
pub struct InterfacesIBeaconImplementation200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: serde_json::Value,
    #[serde(rename = "result")]
    pub result: Box<crate::models::InterfacesIBeaconImplementation200ResponseResult>,
}

impl InterfacesIBeaconImplementation200Response {
    pub fn new(contract_params: serde_json::Value, result: crate::models::InterfacesIBeaconImplementation200ResponseResult) -> InterfacesIBeaconImplementation200Response {
        InterfacesIBeaconImplementation200Response {
            contract_params,
            result: Box::new(result),
        }
    }
}


