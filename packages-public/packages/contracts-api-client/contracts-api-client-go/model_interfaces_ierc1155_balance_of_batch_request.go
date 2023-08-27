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

// checks if the InterfacesIERC1155BalanceOfBatchRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155BalanceOfBatchRequest{}

// InterfacesIERC1155BalanceOfBatchRequest struct for InterfacesIERC1155BalanceOfBatchRequest
type InterfacesIERC1155BalanceOfBatchRequest struct {
	ContractParams InterfacesIERC1155BalanceOfBatchRequestContractParams `json:"contractParams"`
}

// NewInterfacesIERC1155BalanceOfBatchRequest instantiates a new InterfacesIERC1155BalanceOfBatchRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155BalanceOfBatchRequest(contractParams InterfacesIERC1155BalanceOfBatchRequestContractParams) *InterfacesIERC1155BalanceOfBatchRequest {
	this := InterfacesIERC1155BalanceOfBatchRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIERC1155BalanceOfBatchRequestWithDefaults instantiates a new InterfacesIERC1155BalanceOfBatchRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155BalanceOfBatchRequestWithDefaults() *InterfacesIERC1155BalanceOfBatchRequest {
	this := InterfacesIERC1155BalanceOfBatchRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC1155BalanceOfBatchRequest) GetContractParams() InterfacesIERC1155BalanceOfBatchRequestContractParams {
	if o == nil {
		var ret InterfacesIERC1155BalanceOfBatchRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155BalanceOfBatchRequest) GetContractParamsOk() (*InterfacesIERC1155BalanceOfBatchRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC1155BalanceOfBatchRequest) SetContractParams(v InterfacesIERC1155BalanceOfBatchRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIERC1155BalanceOfBatchRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155BalanceOfBatchRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIERC1155BalanceOfBatchRequest struct {
	value *InterfacesIERC1155BalanceOfBatchRequest
	isSet bool
}

func (v NullableInterfacesIERC1155BalanceOfBatchRequest) Get() *InterfacesIERC1155BalanceOfBatchRequest {
	return v.value
}

func (v *NullableInterfacesIERC1155BalanceOfBatchRequest) Set(val *InterfacesIERC1155BalanceOfBatchRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155BalanceOfBatchRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155BalanceOfBatchRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155BalanceOfBatchRequest(val *InterfacesIERC1155BalanceOfBatchRequest) *NullableInterfacesIERC1155BalanceOfBatchRequest {
	return &NullableInterfacesIERC1155BalanceOfBatchRequest{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155BalanceOfBatchRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155BalanceOfBatchRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

