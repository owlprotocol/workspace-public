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
pub struct InterfacesIBeaconProxySetBeacon200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIBeaconProxySetBeaconRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIBeaconProxySetBeacon200Response {
    pub fn new(contract_params: crate::models::InterfacesIBeaconProxySetBeaconRequestContractParams, tx_hash: String) -> InterfacesIBeaconProxySetBeacon200Response {
        InterfacesIBeaconProxySetBeacon200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}

