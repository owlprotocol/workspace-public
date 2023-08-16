/*
Owl Contract Api

Specification for our API focused on contract interactions

API version: 0.0.1
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
)

// checks if the DeployChainlinkAnyApiClientRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DeployChainlinkAnyApiClientRequest{}

// DeployChainlinkAnyApiClientRequest struct for DeployChainlinkAnyApiClientRequest
type DeployChainlinkAnyApiClientRequest struct {
	DeployParams DeployBeaconProxyRequestDeployParams `json:"deployParams"`
	ContractParams DeployChainlinkAnyApiClientRequestContractParams `json:"contractParams"`
}

// NewDeployChainlinkAnyApiClientRequest instantiates a new DeployChainlinkAnyApiClientRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDeployChainlinkAnyApiClientRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployChainlinkAnyApiClientRequestContractParams) *DeployChainlinkAnyApiClientRequest {
	this := DeployChainlinkAnyApiClientRequest{}
	this.DeployParams = deployParams
	this.ContractParams = contractParams
	return &this
}

// NewDeployChainlinkAnyApiClientRequestWithDefaults instantiates a new DeployChainlinkAnyApiClientRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDeployChainlinkAnyApiClientRequestWithDefaults() *DeployChainlinkAnyApiClientRequest {
	this := DeployChainlinkAnyApiClientRequest{}
	return &this
}

// GetDeployParams returns the DeployParams field value
func (o *DeployChainlinkAnyApiClientRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams {
	if o == nil {
		var ret DeployBeaconProxyRequestDeployParams
		return ret
	}

	return o.DeployParams
}

// GetDeployParamsOk returns a tuple with the DeployParams field value
// and a boolean to check if the value has been set.
func (o *DeployChainlinkAnyApiClientRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.DeployParams, true
}

// SetDeployParams sets field value
func (o *DeployChainlinkAnyApiClientRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams) {
	o.DeployParams = v
}

// GetContractParams returns the ContractParams field value
func (o *DeployChainlinkAnyApiClientRequest) GetContractParams() DeployChainlinkAnyApiClientRequestContractParams {
	if o == nil {
		var ret DeployChainlinkAnyApiClientRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *DeployChainlinkAnyApiClientRequest) GetContractParamsOk() (*DeployChainlinkAnyApiClientRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *DeployChainlinkAnyApiClientRequest) SetContractParams(v DeployChainlinkAnyApiClientRequestContractParams) {
	o.ContractParams = v
}

func (o DeployChainlinkAnyApiClientRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DeployChainlinkAnyApiClientRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["deployParams"] = o.DeployParams
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableDeployChainlinkAnyApiClientRequest struct {
	value *DeployChainlinkAnyApiClientRequest
	isSet bool
}

func (v NullableDeployChainlinkAnyApiClientRequest) Get() *DeployChainlinkAnyApiClientRequest {
	return v.value
}

func (v *NullableDeployChainlinkAnyApiClientRequest) Set(val *DeployChainlinkAnyApiClientRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableDeployChainlinkAnyApiClientRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableDeployChainlinkAnyApiClientRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDeployChainlinkAnyApiClientRequest(val *DeployChainlinkAnyApiClientRequest) *NullableDeployChainlinkAnyApiClientRequest {
	return &NullableDeployChainlinkAnyApiClientRequest{value: val, isSet: true}
}

func (v NullableDeployChainlinkAnyApiClientRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDeployChainlinkAnyApiClientRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


