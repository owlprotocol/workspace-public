/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */


use reqwest;

use crate::apis::ResponseContent;
use super::{Error, configuration};


/// struct for typed errors of method [`interfaces_ierc2981_setter_set_default_royalty`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc2981SetterSetDefaultRoyaltyError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc2981_setter_set_token_royalty`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc2981SetterSetTokenRoyaltyError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}


/// Write `setDefaultRoyalty(receiver,feeNumerator)` on an instance of `IERC2981Setter`
pub async fn interfaces_ierc2981_setter_set_default_royalty(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc2981_setter_set_default_royalty_request: crate::models::InterfacesIerc2981SetterSetDefaultRoyaltyRequest) -> Result<crate::models::InterfacesIerc2981SetterSetDefaultRoyalty200Response, Error<InterfacesIerc2981SetterSetDefaultRoyaltyError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
    let mut local_var_req_builder = local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

    if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
        local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
    }
    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.header("x-api-key", local_var_value);
    };
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc2981_setter_set_default_royalty_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc2981SetterSetDefaultRoyaltyError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `setTokenRoyalty(tokenId,receiver,feeNumerator)` on an instance of `IERC2981Setter`
pub async fn interfaces_ierc2981_setter_set_token_royalty(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc2981_setter_set_token_royalty_request: crate::models::InterfacesIerc2981SetterSetTokenRoyaltyRequest) -> Result<crate::models::InterfacesIerc2981SetterSetTokenRoyalty200Response, Error<InterfacesIerc2981SetterSetTokenRoyaltyError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
    let mut local_var_req_builder = local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

    if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
        local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
    }
    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.header("x-api-key", local_var_value);
    };
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc2981_setter_set_token_royalty_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc2981SetterSetTokenRoyaltyError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}
