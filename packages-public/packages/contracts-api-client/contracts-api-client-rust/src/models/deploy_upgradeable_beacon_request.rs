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
pub struct DeployUpgradeableBeaconRequest {
    #[serde(rename = "deployParams")]
    pub deploy_params: Box<crate::models::DeployBeaconProxyRequestDeployParams>,
    #[serde(rename = "contractParams")]
    pub contract_params: Box<crate::models::DeployUpgradeableBeaconRequestContractParams>,
}

impl DeployUpgradeableBeaconRequest {
    pub fn new(deploy_params: crate::models::DeployBeaconProxyRequestDeployParams, contract_params: crate::models::DeployUpgradeableBeaconRequestContractParams) -> DeployUpgradeableBeaconRequest {
        DeployUpgradeableBeaconRequest {
            deploy_params: Box::new(deploy_params),
            contract_params: Box::new(contract_params),
        }
    }
}


