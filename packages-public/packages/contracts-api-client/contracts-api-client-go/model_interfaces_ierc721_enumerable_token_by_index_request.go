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

// checks if the InterfacesIERC721EnumerableTokenByIndexRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721EnumerableTokenByIndexRequest{}

// InterfacesIERC721EnumerableTokenByIndexRequest struct for InterfacesIERC721EnumerableTokenByIndexRequest
type InterfacesIERC721EnumerableTokenByIndexRequest struct {
	ContractParams InterfacesIERC721EnumerableTokenByIndexRequestContractParams `json:"contractParams"`
}

// NewInterfacesIERC721EnumerableTokenByIndexRequest instantiates a new InterfacesIERC721EnumerableTokenByIndexRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721EnumerableTokenByIndexRequest(contractParams InterfacesIERC721EnumerableTokenByIndexRequestContractParams) *InterfacesIERC721EnumerableTokenByIndexRequest {
	this := InterfacesIERC721EnumerableTokenByIndexRequest{}
	this.ContractParams = contractParams
	return &this
}

// NewInterfacesIERC721EnumerableTokenByIndexRequestWithDefaults instantiates a new InterfacesIERC721EnumerableTokenByIndexRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721EnumerableTokenByIndexRequestWithDefaults() *InterfacesIERC721EnumerableTokenByIndexRequest {
	this := InterfacesIERC721EnumerableTokenByIndexRequest{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721EnumerableTokenByIndexRequest) GetContractParams() InterfacesIERC721EnumerableTokenByIndexRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721EnumerableTokenByIndexRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721EnumerableTokenByIndexRequest) GetContractParamsOk() (*InterfacesIERC721EnumerableTokenByIndexRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721EnumerableTokenByIndexRequest) SetContractParams(v InterfacesIERC721EnumerableTokenByIndexRequestContractParams) {
	o.ContractParams = v
}

func (o InterfacesIERC721EnumerableTokenByIndexRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721EnumerableTokenByIndexRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	return toSerialize, nil
}

type NullableInterfacesIERC721EnumerableTokenByIndexRequest struct {
	value *InterfacesIERC721EnumerableTokenByIndexRequest
	isSet bool
}

func (v NullableInterfacesIERC721EnumerableTokenByIndexRequest) Get() *InterfacesIERC721EnumerableTokenByIndexRequest {
	return v.value
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndexRequest) Set(val *InterfacesIERC721EnumerableTokenByIndexRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721EnumerableTokenByIndexRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndexRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721EnumerableTokenByIndexRequest(val *InterfacesIERC721EnumerableTokenByIndexRequest) *NullableInterfacesIERC721EnumerableTokenByIndexRequest {
	return &NullableInterfacesIERC721EnumerableTokenByIndexRequest{value: val, isSet: true}
}

func (v NullableInterfacesIERC721EnumerableTokenByIndexRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndexRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


