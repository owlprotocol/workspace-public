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
pub struct InterfacesIerc1820SetInterfaceImplementer200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1820SetInterfaceImplementerRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIerc1820SetInterfaceImplementer200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc1820SetInterfaceImplementerRequestContractParams, tx_hash: String) -> InterfacesIerc1820SetInterfaceImplementer200Response {
        InterfacesIerc1820SetInterfaceImplementer200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}


