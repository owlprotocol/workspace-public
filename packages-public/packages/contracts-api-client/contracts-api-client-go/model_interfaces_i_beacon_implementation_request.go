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

// checks if the InterfacesIBeaconImplementationRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIBeaconImplementationRequest{}

// InterfacesIBeaconImplementationRequest struct for InterfacesIBeaconImplementationRequest
type InterfacesIBeaconImplementationRequest struct {
	ContractParams map[string]interface{} `json:"contractParams"`
}

// NewInterfacesIBeaconImplementationRequest instantiates a new InterfacesIBeaconImplementationRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIBeaconImplementationRequest(contractParams map[string]interface{}) *InterfacesIBeaconImplementationRequest {
	this := InterfacesIBeaconImplementationRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIBeaconImplementationRequestWithDefaults instantiates a new InterfacesIBeaconImplementationRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIBeaconImplementationRequestWithDefaults() *InterfacesIBeaconImplementationRequest {
	this := InterfacesIBeaconImplementationRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIBeaconImplementationRequest) GetContractParams() map[string]interface{} {
	if o == nil {
		var ret map[string]interface{}
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIBeaconImplementationRequest) GetContractParamsOk() (map[string]interface{}, bool) {
	if o == nil {
		return map[string]interface{}{}, false
	}
	return o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIBeaconImplementationRequest) SetContractParams(v map[string]interface{}) {
	o.ContractParams = v
}

func (o InterfacesIBeaconImplementationRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIBeaconImplementationRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIBeaconImplementationRequest struct {
	value *InterfacesIBeaconImplementationRequest
	isSet bool
}

func (v NullableInterfacesIBeaconImplementationRequest) Get() *InterfacesIBeaconImplementationRequest {
	return v.value
}

func (v *NullableInterfacesIBeaconImplementationRequest) Set(val *InterfacesIBeaconImplementationRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIBeaconImplementationRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIBeaconImplementationRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIBeaconImplementationRequest(val *InterfacesIBeaconImplementationRequest) *NullableInterfacesIBeaconImplementationRequest {
	return &NullableInterfacesIBeaconImplementationRequest{value: val, isSet: true}
}

func (v NullableInterfacesIBeaconImplementationRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIBeaconImplementationRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


