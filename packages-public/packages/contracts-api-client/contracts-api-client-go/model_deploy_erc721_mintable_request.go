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

// checks if the DeployERC721MintableRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DeployERC721MintableRequest{}

// DeployERC721MintableRequest struct for DeployERC721MintableRequest
type DeployERC721MintableRequest struct {
	DeployParams DeployBeaconProxyRequestDeployParams `json:"deployParams"`
	ContractParams DeployERC721MintableRequestContractParams `json:"contractParams"`
}

// NewDeployERC721MintableRequest instantiates a new DeployERC721MintableRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDeployERC721MintableRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployERC721MintableRequestContractParams) *DeployERC721MintableRequest {
	this := DeployERC721MintableRequest{}
	this.DeployParams = deployParams
	this.ContractParams = contractParams
	return &this
}

// NewDeployERC721MintableRequestWithDefaults instantiates a new DeployERC721MintableRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDeployERC721MintableRequestWithDefaults() *DeployERC721MintableRequest {
	this := DeployERC721MintableRequest{}
	return &this
}

// GetDeployParams returns the DeployParams field value
func (o *DeployERC721MintableRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams {
	if o == nil {
		var ret DeployBeaconProxyRequestDeployParams
		return ret
	}

	return o.DeployParams
}

// GetDeployParamsOk returns a tuple with the DeployParams field value
// and a boolean to check if the value has been set.
func (o *DeployERC721MintableRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.DeployParams, true
}

// SetDeployParams sets field value
func (o *DeployERC721MintableRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams) {
	o.DeployParams = v
}

// GetContractParams returns the ContractParams field value
func (o *DeployERC721MintableRequest) GetContractParams() DeployERC721MintableRequestContractParams {
	if o == nil {
		var ret DeployERC721MintableRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *DeployERC721MintableRequest) GetContractParamsOk() (*DeployERC721MintableRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *DeployERC721MintableRequest) SetContractParams(v DeployERC721MintableRequestContractParams) {
	o.ContractParams = v
}

func (o DeployERC721MintableRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DeployERC721MintableRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["deployParams"] = o.DeployParams
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableDeployERC721MintableRequest struct {
	value *DeployERC721MintableRequest
	isSet bool
}

func (v NullableDeployERC721MintableRequest) Get() *DeployERC721MintableRequest {
	return v.value
}

func (v *NullableDeployERC721MintableRequest) Set(val *DeployERC721MintableRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableDeployERC721MintableRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableDeployERC721MintableRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDeployERC721MintableRequest(val *DeployERC721MintableRequest) *NullableDeployERC721MintableRequest {
	return &NullableDeployERC721MintableRequest{value: val, isSet: true}
}

func (v NullableDeployERC721MintableRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDeployERC721MintableRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


