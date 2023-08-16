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

// checks if the InterfacesIERC1155MintableMintBatch200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155MintableMintBatch200Response{}

// InterfacesIERC1155MintableMintBatch200Response struct for InterfacesIERC1155MintableMintBatch200Response
type InterfacesIERC1155MintableMintBatch200Response struct {
	ContractParams InterfacesIERC1155MintableMintBatchRequestContractParams `json:"contractParams"`
	TxHash string `json:"txHash"`
}

// NewInterfacesIERC1155MintableMintBatch200Response instantiates a new InterfacesIERC1155MintableMintBatch200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155MintableMintBatch200Response(contractParams InterfacesIERC1155MintableMintBatchRequestContractParams, txHash string) *InterfacesIERC1155MintableMintBatch200Response {
	this := InterfacesIERC1155MintableMintBatch200Response{}
	this.ContractParams = contractParams
	this.TxHash = txHash
	return &this
}

// NewInterfacesIERC1155MintableMintBatch200ResponseWithDefaults instantiates a new InterfacesIERC1155MintableMintBatch200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155MintableMintBatch200ResponseWithDefaults() *InterfacesIERC1155MintableMintBatch200Response {
	this := InterfacesIERC1155MintableMintBatch200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC1155MintableMintBatch200Response) GetContractParams() InterfacesIERC1155MintableMintBatchRequestContractParams {
	if o == nil {
		var ret InterfacesIERC1155MintableMintBatchRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintBatch200Response) GetContractParamsOk() (*InterfacesIERC1155MintableMintBatchRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC1155MintableMintBatch200Response) SetContractParams(v InterfacesIERC1155MintableMintBatchRequestContractParams) {
	o.ContractParams = v
}

// GetTxHash returns the TxHash field value
func (o *InterfacesIERC1155MintableMintBatch200Response) GetTxHash() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.TxHash
}

// GetTxHashOk returns a tuple with the TxHash field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintBatch200Response) GetTxHashOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TxHash, true
}

// SetTxHash sets field value
func (o *InterfacesIERC1155MintableMintBatch200Response) SetTxHash(v string) {
	o.TxHash = v
}

func (o InterfacesIERC1155MintableMintBatch200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155MintableMintBatch200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["txHash"] = o.TxHash
	return toSerialize, nil
}

type NullableInterfacesIERC1155MintableMintBatch200Response struct {
	value *InterfacesIERC1155MintableMintBatch200Response
	isSet bool
}

func (v NullableInterfacesIERC1155MintableMintBatch200Response) Get() *InterfacesIERC1155MintableMintBatch200Response {
	return v.value
}

func (v *NullableInterfacesIERC1155MintableMintBatch200Response) Set(val *InterfacesIERC1155MintableMintBatch200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155MintableMintBatch200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155MintableMintBatch200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155MintableMintBatch200Response(val *InterfacesIERC1155MintableMintBatch200Response) *NullableInterfacesIERC1155MintableMintBatch200Response {
	return &NullableInterfacesIERC1155MintableMintBatch200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155MintableMintBatch200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155MintableMintBatch200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


