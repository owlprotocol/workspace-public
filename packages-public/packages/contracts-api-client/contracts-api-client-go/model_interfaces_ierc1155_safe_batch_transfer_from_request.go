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

// checks if the InterfacesIERC1155SafeBatchTransferFromRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155SafeBatchTransferFromRequest{}

// InterfacesIERC1155SafeBatchTransferFromRequest struct for InterfacesIERC1155SafeBatchTransferFromRequest
type InterfacesIERC1155SafeBatchTransferFromRequest struct {
	ContractParams InterfacesIERC1155SafeBatchTransferFromRequestContractParams `json:"contractParams"`
}

// NewInterfacesIERC1155SafeBatchTransferFromRequest instantiates a new InterfacesIERC1155SafeBatchTransferFromRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155SafeBatchTransferFromRequest(contractParams InterfacesIERC1155SafeBatchTransferFromRequestContractParams) *InterfacesIERC1155SafeBatchTransferFromRequest {
	this := InterfacesIERC1155SafeBatchTransferFromRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIERC1155SafeBatchTransferFromRequestWithDefaults instantiates a new InterfacesIERC1155SafeBatchTransferFromRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155SafeBatchTransferFromRequestWithDefaults() *InterfacesIERC1155SafeBatchTransferFromRequest {
	this := InterfacesIERC1155SafeBatchTransferFromRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC1155SafeBatchTransferFromRequest) GetContractParams() InterfacesIERC1155SafeBatchTransferFromRequestContractParams {
	if o == nil {
		var ret InterfacesIERC1155SafeBatchTransferFromRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155SafeBatchTransferFromRequest) GetContractParamsOk() (*InterfacesIERC1155SafeBatchTransferFromRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC1155SafeBatchTransferFromRequest) SetContractParams(v InterfacesIERC1155SafeBatchTransferFromRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIERC1155SafeBatchTransferFromRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155SafeBatchTransferFromRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIERC1155SafeBatchTransferFromRequest struct {
	value *InterfacesIERC1155SafeBatchTransferFromRequest
	isSet bool
}

func (v NullableInterfacesIERC1155SafeBatchTransferFromRequest) Get() *InterfacesIERC1155SafeBatchTransferFromRequest {
	return v.value
}

func (v *NullableInterfacesIERC1155SafeBatchTransferFromRequest) Set(val *InterfacesIERC1155SafeBatchTransferFromRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155SafeBatchTransferFromRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155SafeBatchTransferFromRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155SafeBatchTransferFromRequest(val *InterfacesIERC1155SafeBatchTransferFromRequest) *NullableInterfacesIERC1155SafeBatchTransferFromRequest {
	return &NullableInterfacesIERC1155SafeBatchTransferFromRequest{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155SafeBatchTransferFromRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155SafeBatchTransferFromRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

