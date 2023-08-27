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

// checks if the DeployTokenURIRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DeployTokenURIRequest{}

// DeployTokenURIRequest struct for DeployTokenURIRequest
type DeployTokenURIRequest struct {
	DeployParams DeployBeaconProxyRequestDeployParams `json:"deployParams"`
	ContractParams DeployTokenURIRequestContractParams `json:"contractParams"`
}

// NewDeployTokenURIRequest instantiates a new DeployTokenURIRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDeployTokenURIRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployTokenURIRequestContractParams) *DeployTokenURIRequest {
	this := DeployTokenURIRequest{}
	this.DeployParams = deployParams
	this.ContractParams = contractParams
	return &this
}

// NewDeployTokenURIRequestWithDefaults instantiates a new DeployTokenURIRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDeployTokenURIRequestWithDefaults() *DeployTokenURIRequest {
	this := DeployTokenURIRequest{}
	return &this
}

// GetDeployParams returns the DeployParams field value
func (o *DeployTokenURIRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams {
	if o == nil {
		var ret DeployBeaconProxyRequestDeployParams
		return ret
	}

	return o.DeployParams
}

// GetDeployParamsOk returns a tuple with the DeployParams field value
// and a boolean to check if the value has been set.
func (o *DeployTokenURIRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.DeployParams, true
}

// SetDeployParams sets field value
func (o *DeployTokenURIRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams) {
	o.DeployParams = v
}

// GetContractParams returns the ContractParams field value
func (o *DeployTokenURIRequest) GetContractParams() DeployTokenURIRequestContractParams {
	if o == nil {
		var ret DeployTokenURIRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *DeployTokenURIRequest) GetContractParamsOk() (*DeployTokenURIRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *DeployTokenURIRequest) SetContractParams(v DeployTokenURIRequestContractParams) {
	o.ContractParams = v
}

func (o DeployTokenURIRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DeployTokenURIRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["deployParams"] = o.DeployParams
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableDeployTokenURIRequest struct {
	value *DeployTokenURIRequest
	isSet bool
}

func (v NullableDeployTokenURIRequest) Get() *DeployTokenURIRequest {
	return v.value
}

func (v *NullableDeployTokenURIRequest) Set(val *DeployTokenURIRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableDeployTokenURIRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableDeployTokenURIRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDeployTokenURIRequest(val *DeployTokenURIRequest) *NullableDeployTokenURIRequest {
	return &NullableDeployTokenURIRequest{value: val, isSet: true}
}

func (v NullableDeployTokenURIRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDeployTokenURIRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

