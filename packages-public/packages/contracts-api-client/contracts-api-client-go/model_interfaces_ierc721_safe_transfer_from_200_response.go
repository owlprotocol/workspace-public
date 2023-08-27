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

// checks if the InterfacesIERC721SafeTransferFrom200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721SafeTransferFrom200Response{}

// InterfacesIERC721SafeTransferFrom200Response struct for InterfacesIERC721SafeTransferFrom200Response
type InterfacesIERC721SafeTransferFrom200Response struct {
	ContractParams InterfacesIERC721SafeTransferFromRequestContractParams `json:"contractParams"`
	TxHash string `json:"txHash"`
}

// NewInterfacesIERC721SafeTransferFrom200Response instantiates a new InterfacesIERC721SafeTransferFrom200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721SafeTransferFrom200Response(contractParams InterfacesIERC721SafeTransferFromRequestContractParams, txHash string) *InterfacesIERC721SafeTransferFrom200Response {
	this := InterfacesIERC721SafeTransferFrom200Response{}
	this.ContractParams = contractParams
	this.TxHash = txHash
	return &this
}

// NewInterfacesIERC721SafeTransferFrom200ResponseWithDefaults instantiates a new InterfacesIERC721SafeTransferFrom200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721SafeTransferFrom200ResponseWithDefaults() *InterfacesIERC721SafeTransferFrom200Response {
	this := InterfacesIERC721SafeTransferFrom200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721SafeTransferFrom200Response) GetContractParams() InterfacesIERC721SafeTransferFromRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721SafeTransferFromRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFrom200Response) GetContractParamsOk() (*InterfacesIERC721SafeTransferFromRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721SafeTransferFrom200Response) SetContractParams(v InterfacesIERC721SafeTransferFromRequestContractParams) {
	o.ContractParams = v
}

// GetTxHash returns the TxHash field value
func (o *InterfacesIERC721SafeTransferFrom200Response) GetTxHash() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.TxHash
}

// GetTxHashOk returns a tuple with the TxHash field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFrom200Response) GetTxHashOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TxHash, true
}

// SetTxHash sets field value
func (o *InterfacesIERC721SafeTransferFrom200Response) SetTxHash(v string) {
	o.TxHash = v
}

func (o InterfacesIERC721SafeTransferFrom200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721SafeTransferFrom200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["txHash"] = o.TxHash
	return toSerialize, nil
}

type NullableInterfacesIERC721SafeTransferFrom200Response struct {
	value *InterfacesIERC721SafeTransferFrom200Response
	isSet bool
}

func (v NullableInterfacesIERC721SafeTransferFrom200Response) Get() *InterfacesIERC721SafeTransferFrom200Response {
	return v.value
}

func (v *NullableInterfacesIERC721SafeTransferFrom200Response) Set(val *InterfacesIERC721SafeTransferFrom200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721SafeTransferFrom200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721SafeTransferFrom200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721SafeTransferFrom200Response(val *InterfacesIERC721SafeTransferFrom200Response) *NullableInterfacesIERC721SafeTransferFrom200Response {
	return &NullableInterfacesIERC721SafeTransferFrom200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC721SafeTransferFrom200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721SafeTransferFrom200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

