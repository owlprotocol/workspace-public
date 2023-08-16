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

// checks if the InterfacesIERC721BalanceOfRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721BalanceOfRequest{}

// InterfacesIERC721BalanceOfRequest struct for InterfacesIERC721BalanceOfRequest
type InterfacesIERC721BalanceOfRequest struct {
	ContractParams InterfacesIERC721BalanceOfRequestContractParams `json:"contractParams"`
}

// NewInterfacesIERC721BalanceOfRequest instantiates a new InterfacesIERC721BalanceOfRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721BalanceOfRequest(contractParams InterfacesIERC721BalanceOfRequestContractParams) *InterfacesIERC721BalanceOfRequest {
	this := InterfacesIERC721BalanceOfRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIERC721BalanceOfRequestWithDefaults instantiates a new InterfacesIERC721BalanceOfRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721BalanceOfRequestWithDefaults() *InterfacesIERC721BalanceOfRequest {
	this := InterfacesIERC721BalanceOfRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721BalanceOfRequest) GetContractParams() InterfacesIERC721BalanceOfRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721BalanceOfRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721BalanceOfRequest) GetContractParamsOk() (*InterfacesIERC721BalanceOfRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721BalanceOfRequest) SetContractParams(v InterfacesIERC721BalanceOfRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIERC721BalanceOfRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721BalanceOfRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIERC721BalanceOfRequest struct {
	value *InterfacesIERC721BalanceOfRequest
	isSet bool
}

func (v NullableInterfacesIERC721BalanceOfRequest) Get() *InterfacesIERC721BalanceOfRequest {
	return v.value
}

func (v *NullableInterfacesIERC721BalanceOfRequest) Set(val *InterfacesIERC721BalanceOfRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721BalanceOfRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721BalanceOfRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721BalanceOfRequest(val *InterfacesIERC721BalanceOfRequest) *NullableInterfacesIERC721BalanceOfRequest {
	return &NullableInterfacesIERC721BalanceOfRequest{value: val, isSet: true}
}

func (v NullableInterfacesIERC721BalanceOfRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721BalanceOfRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


