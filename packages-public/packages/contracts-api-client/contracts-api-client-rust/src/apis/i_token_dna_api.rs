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


/// struct for typed errors of method [`interfaces_i_token_dna_get_dna`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesITokenDnaGetDnaError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_i_token_dna_get_dna_batch`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesITokenDnaGetDnaBatchError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_i_token_dna_set_dna`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesITokenDnaSetDnaError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_i_token_dna_set_dna_batch`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesITokenDnaSetDnaBatchError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}


/// Read `getDna(tokenId)` on an instance of `ITokenDna`
pub async fn interfaces_i_token_dna_get_dna(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_get_approved_request: crate::models::InterfacesIerc721GetApprovedRequest) -> Result<crate::models::InterfacesITokenDnaGetDna200Response, Error<InterfacesITokenDnaGetDnaError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/ITokenDna/read/{address}/getDna", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_get_approved_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesITokenDnaGetDnaError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `getDnaBatch(tokenId)` on an instance of `ITokenDna`
pub async fn interfaces_i_token_dna_get_dna_batch(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_i_token_dna_get_dna_batch_request: crate::models::InterfacesITokenDnaGetDnaBatchRequest) -> Result<crate::models::InterfacesITokenDnaGetDnaBatch200Response, Error<InterfacesITokenDnaGetDnaBatchError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/ITokenDna/read/{address}/getDnaBatch", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_i_token_dna_get_dna_batch_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesITokenDnaGetDnaBatchError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `setDna(tokenId,dna)` on an instance of `ITokenDna`
pub async fn interfaces_i_token_dna_set_dna(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_i_token_dna_set_dna_request: crate::models::InterfacesITokenDnaSetDnaRequest) -> Result<crate::models::InterfacesITokenDnaSetDna200Response, Error<InterfacesITokenDnaSetDnaError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/ITokenDna/write/{address}/setDna", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_i_token_dna_set_dna_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesITokenDnaSetDnaError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `setDnaBatch(tokenId,dna)` on an instance of `ITokenDna`
pub async fn interfaces_i_token_dna_set_dna_batch(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_i_token_dna_set_dna_batch_request: crate::models::InterfacesITokenDnaSetDnaBatchRequest) -> Result<crate::models::InterfacesITokenDnaSetDnaBatch200Response, Error<InterfacesITokenDnaSetDnaBatchError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/ITokenDna/write/{address}/setDnaBatch", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_i_token_dna_set_dna_batch_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesITokenDnaSetDnaBatchError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

