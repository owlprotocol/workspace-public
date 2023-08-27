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


/// struct for typed errors of method [`interfaces_ierc721_enumerable_approve`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableApproveError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_balance_of`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableBalanceOfError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_get_approved`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableGetApprovedError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_is_approved_for_all`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableIsApprovedForAllError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_owner_of`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableOwnerOfError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_safe_transfer_from`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableSafeTransferFromError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_set_approval_for_all`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableSetApprovalForAllError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_supports_interface`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableSupportsInterfaceError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_token_by_index`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableTokenByIndexError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_token_of_owner_by_index`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableTokenOfOwnerByIndexError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_total_supply`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableTotalSupplyError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`interfaces_ierc721_enumerable_transfer_from`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum InterfacesIerc721EnumerableTransferFromError {
    DefaultResponse(crate::models::DeployBeaconProxyDefaultResponse),
    UnknownValue(serde_json::Value),
}


/// Write `approve(to,tokenId)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_approve(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_approve_request: crate::models::InterfacesIerc721ApproveRequest) -> Result<crate::models::InterfacesIerc721Approve200Response, Error<InterfacesIerc721EnumerableApproveError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/write/{address}/approve", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_approve_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableApproveError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `balanceOf(owner)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_balance_of(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_balance_of_request: crate::models::InterfacesIerc721BalanceOfRequest) -> Result<crate::models::InterfacesIerc721BalanceOf200Response, Error<InterfacesIerc721EnumerableBalanceOfError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_balance_of_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableBalanceOfError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `getApproved(tokenId)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_get_approved(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_get_approved_request: crate::models::InterfacesIerc721GetApprovedRequest) -> Result<crate::models::InterfacesIerc721GetApproved200Response, Error<InterfacesIerc721EnumerableGetApprovedError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/getApproved", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
        let local_var_entity: Option<InterfacesIerc721EnumerableGetApprovedError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_is_approved_for_all(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_is_approved_for_all_request: crate::models::InterfacesIerc721IsApprovedForAllRequest) -> Result<crate::models::InterfacesIerc721IsApprovedForAll200Response, Error<InterfacesIerc721EnumerableIsApprovedForAllError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_is_approved_for_all_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableIsApprovedForAllError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `ownerOf(tokenId)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_owner_of(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_get_approved_request: crate::models::InterfacesIerc721GetApprovedRequest) -> Result<crate::models::InterfacesIerc721OwnerOf200Response, Error<InterfacesIerc721EnumerableOwnerOfError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
        let local_var_entity: Option<InterfacesIerc721EnumerableOwnerOfError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_safe_transfer_from(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_safe_transfer_from_request: crate::models::InterfacesIerc721SafeTransferFromRequest) -> Result<crate::models::InterfacesIerc721SafeTransferFrom200Response, Error<InterfacesIerc721EnumerableSafeTransferFromError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_safe_transfer_from_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableSafeTransferFromError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_set_approval_for_all(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_set_approval_for_all_request: crate::models::InterfacesIerc721SetApprovalForAllRequest) -> Result<crate::models::InterfacesIerc721SetApprovalForAll200Response, Error<InterfacesIerc721EnumerableSetApprovalForAllError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_set_approval_for_all_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableSetApprovalForAllError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `supportsInterface(interfaceId)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_supports_interface(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc165_supports_interface_request: crate::models::InterfacesIerc165SupportsInterfaceRequest) -> Result<crate::models::InterfacesIerc165SupportsInterface200Response, Error<InterfacesIerc721EnumerableSupportsInterfaceError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc165_supports_interface_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableSupportsInterfaceError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `tokenByIndex(index)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_token_by_index(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_enumerable_token_by_index_request: crate::models::InterfacesIerc721EnumerableTokenByIndexRequest) -> Result<crate::models::InterfacesIerc721EnumerableTokenByIndex200Response, Error<InterfacesIerc721EnumerableTokenByIndexError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_enumerable_token_by_index_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableTokenByIndexError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `tokenOfOwnerByIndex(owner,index)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_token_of_owner_by_index(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_enumerable_token_of_owner_by_index_request: crate::models::InterfacesIerc721EnumerableTokenOfOwnerByIndexRequest) -> Result<crate::models::InterfacesIerc721EnumerableTokenOfOwnerByIndex200Response, Error<InterfacesIerc721EnumerableTokenOfOwnerByIndexError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_enumerable_token_of_owner_by_index_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableTokenOfOwnerByIndexError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Read `totalSupply()` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_total_supply(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_i_beacon_implementation_request: crate::models::InterfacesIBeaconImplementationRequest) -> Result<crate::models::InterfacesIerc20TotalSupply200Response, Error<InterfacesIerc721EnumerableTotalSupplyError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_i_beacon_implementation_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableTotalSupplyError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}

/// Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Enumerable`
pub async fn interfaces_ierc721_enumerable_transfer_from(configuration: &configuration::Configuration, network_id: &str, address: &str, interfaces_ierc721_transfer_from_request: crate::models::InterfacesIerc721TransferFromRequest) -> Result<crate::models::InterfacesIerc721TransferFrom200Response, Error<InterfacesIerc721EnumerableTransferFromError>> {
    let local_var_configuration = configuration;

    let local_var_client = &local_var_configuration.client;

    let local_var_uri_str = format!("{}/{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom", local_var_configuration.base_path, networkId=crate::apis::urlencode(network_id), address=crate::apis::urlencode(address));
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
    local_var_req_builder = local_var_req_builder.json(&interfaces_ierc721_transfer_from_request);

    let local_var_req = local_var_req_builder.build()?;
    let local_var_resp = local_var_client.execute(local_var_req).await?;

    let local_var_status = local_var_resp.status();
    let local_var_content = local_var_resp.text().await?;

    if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
        serde_json::from_str(&local_var_content).map_err(Error::from)
    } else {
        let local_var_entity: Option<InterfacesIerc721EnumerableTransferFromError> = serde_json::from_str(&local_var_content).ok();
        let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
        Err(Error::ResponseError(local_var_error))
    }
}
