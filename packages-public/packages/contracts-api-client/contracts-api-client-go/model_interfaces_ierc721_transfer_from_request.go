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

// checks if the InterfacesIERC721TransferFromRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721TransferFromRequest{}

// InterfacesIERC721TransferFromRequest struct for InterfacesIERC721TransferFromRequest
type InterfacesIERC721TransferFromRequest struct {
	ContractParams InterfacesIERC721TransferFromRequestContractParams `json:"contractParams"`
}

// NewInterfacesIERC721TransferFromRequest instantiates a new InterfacesIERC721TransferFromRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721TransferFromRequest(contractParams InterfacesIERC721TransferFromRequestContractParams) *InterfacesIERC721TransferFromRequest {
	this := InterfacesIERC721TransferFromRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIERC721TransferFromRequestWithDefaults instantiates a new InterfacesIERC721TransferFromRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721TransferFromRequestWithDefaults() *InterfacesIERC721TransferFromRequest {
	this := InterfacesIERC721TransferFromRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721TransferFromRequest) GetContractParams() InterfacesIERC721TransferFromRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721TransferFromRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721TransferFromRequest) GetContractParamsOk() (*InterfacesIERC721TransferFromRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721TransferFromRequest) SetContractParams(v InterfacesIERC721TransferFromRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIERC721TransferFromRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721TransferFromRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIERC721TransferFromRequest struct {
	value *InterfacesIERC721TransferFromRequest
	isSet bool
}

func (v NullableInterfacesIERC721TransferFromRequest) Get() *InterfacesIERC721TransferFromRequest {
	return v.value
}

func (v *NullableInterfacesIERC721TransferFromRequest) Set(val *InterfacesIERC721TransferFromRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721TransferFromRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721TransferFromRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721TransferFromRequest(val *InterfacesIERC721TransferFromRequest) *NullableInterfacesIERC721TransferFromRequest {
	return &NullableInterfacesIERC721TransferFromRequest{value: val, isSet: true}
}

func (v NullableInterfacesIERC721TransferFromRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721TransferFromRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

