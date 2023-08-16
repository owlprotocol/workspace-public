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

// checks if the DeployTokenDnaRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DeployTokenDnaRequest{}

// DeployTokenDnaRequest struct for DeployTokenDnaRequest
type DeployTokenDnaRequest struct {
	DeployParams DeployBeaconProxyRequestDeployParams `json:"deployParams"`
	ContractParams DeployTokenDnaRequestContractParams `json:"contractParams"`
}

// NewDeployTokenDnaRequest instantiates a new DeployTokenDnaRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDeployTokenDnaRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployTokenDnaRequestContractParams) *DeployTokenDnaRequest {
	this := DeployTokenDnaRequest{}
	this.DeployParams = deployParams
	this.ContractParams = contractParams
	return &this
}

// NewDeployTokenDnaRequestWithDefaults instantiates a new DeployTokenDnaRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDeployTokenDnaRequestWithDefaults() *DeployTokenDnaRequest {
	this := DeployTokenDnaRequest{}
	return &this
}

// GetDeployParams returns the DeployParams field value
func (o *DeployTokenDnaRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams {
	if o == nil {
		var ret DeployBeaconProxyRequestDeployParams
		return ret
	}

	return o.DeployParams
}

// GetDeployParamsOk returns a tuple with the DeployParams field value
// and a boolean to check if the value has been set.
func (o *DeployTokenDnaRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.DeployParams, true
}

// SetDeployParams sets field value
func (o *DeployTokenDnaRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams) {
	o.DeployParams = v
}

// GetContractParams returns the ContractParams field value
func (o *DeployTokenDnaRequest) GetContractParams() DeployTokenDnaRequestContractParams {
	if o == nil {
		var ret DeployTokenDnaRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *DeployTokenDnaRequest) GetContractParamsOk() (*DeployTokenDnaRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *DeployTokenDnaRequest) SetContractParams(v DeployTokenDnaRequestContractParams) {
	o.ContractParams = v
}

func (o DeployTokenDnaRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DeployTokenDnaRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["deployParams"] = o.DeployParams
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableDeployTokenDnaRequest struct {
	value *DeployTokenDnaRequest
	isSet bool
}

func (v NullableDeployTokenDnaRequest) Get() *DeployTokenDnaRequest {
	return v.value
}

func (v *NullableDeployTokenDnaRequest) Set(val *DeployTokenDnaRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableDeployTokenDnaRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableDeployTokenDnaRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDeployTokenDnaRequest(val *DeployTokenDnaRequest) *NullableDeployTokenDnaRequest {
	return &NullableDeployTokenDnaRequest{value: val, isSet: true}
}

func (v NullableDeployTokenDnaRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDeployTokenDnaRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


