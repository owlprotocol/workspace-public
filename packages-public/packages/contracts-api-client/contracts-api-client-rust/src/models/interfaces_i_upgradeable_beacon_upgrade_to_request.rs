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
pub struct InterfacesIUpgradeableBeaconUpgradeToRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIUpgradeableBeaconUpgradeToRequestContractParams>,
}

impl InterfacesIUpgradeableBeaconUpgradeToRequest {
    pub fn new(contract_params: crate::models::InterfacesIUpgradeableBeaconUpgradeToRequestContractParams) -> InterfacesIUpgradeableBeaconUpgradeToRequest {
        InterfacesIUpgradeableBeaconUpgradeToRequest {
            contract_params: Box::new(contract_params),
        }
    }
}


