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
pub struct InterfacesIerc1155MintableMint200Response {
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::InterfacesIerc1155MintableMintRequestContractParams>,
    #[serde(rename = "txHash")]
    pub tx_hash: String,
}

impl InterfacesIerc1155MintableMint200Response {
    pub fn new(contract_params: crate::models::InterfacesIerc1155MintableMintRequestContractParams, tx_hash: String) -> InterfacesIerc1155MintableMint200Response {
        InterfacesIerc1155MintableMint200Response {
            contract_params: Box::new(contract_params),
            tx_hash,
        }
    }
}


