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

// checks if the InterfacesIChainlinkAnyApiConsumerFulfillRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIChainlinkAnyApiConsumerFulfillRequest{}

// InterfacesIChainlinkAnyApiConsumerFulfillRequest struct for InterfacesIChainlinkAnyApiConsumerFulfillRequest
type InterfacesIChainlinkAnyApiConsumerFulfillRequest struct {
	ContractParams InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams `json:"contractParams"`
}

// NewInterfacesIChainlinkAnyApiConsumerFulfillRequest instantiates a new InterfacesIChainlinkAnyApiConsumerFulfillRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIChainlinkAnyApiConsumerFulfillRequest(contractParams InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams) *InterfacesIChainlinkAnyApiConsumerFulfillRequest {
	this := InterfacesIChainlinkAnyApiConsumerFulfillRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIChainlinkAnyApiConsumerFulfillRequestWithDefaults instantiates a new InterfacesIChainlinkAnyApiConsumerFulfillRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIChainlinkAnyApiConsumerFulfillRequestWithDefaults() *InterfacesIChainlinkAnyApiConsumerFulfillRequest {
	this := InterfacesIChainlinkAnyApiConsumerFulfillRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIChainlinkAnyApiConsumerFulfillRequest) GetContractParams() InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams {
	if o == nil {
		var ret InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiConsumerFulfillRequest) GetContractParamsOk() (*InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIChainlinkAnyApiConsumerFulfillRequest) SetContractParams(v InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIChainlinkAnyApiConsumerFulfillRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIChainlinkAnyApiConsumerFulfillRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest struct {
	value *InterfacesIChainlinkAnyApiConsumerFulfillRequest
	isSet bool
}

func (v NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) Get() *InterfacesIChainlinkAnyApiConsumerFulfillRequest {
	return v.value
}

func (v *NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) Set(val *InterfacesIChainlinkAnyApiConsumerFulfillRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIChainlinkAnyApiConsumerFulfillRequest(val *InterfacesIChainlinkAnyApiConsumerFulfillRequest) *NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest {
	return &NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest{value: val, isSet: true}
}

func (v NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIChainlinkAnyApiConsumerFulfillRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

