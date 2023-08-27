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
pub struct InterfacesIerc1820GetInterfaceImplementerRequest {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1820GetInterfaceImplementerRequestContractParams>,
}

impl InterfacesIerc1820GetInterfaceImplementerRequest {
    pub fn new(contract_params: crate::models::InterfacesIerc1820GetInterfaceImplementerRequestContractParams) -> InterfacesIerc1820GetInterfaceImplementerRequest {
        InterfacesIerc1820GetInterfaceImplementerRequest {
            contract_params: Box::new(contract_params),
        }
    }
}

