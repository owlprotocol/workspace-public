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

// checks if the InterfacesIERC721OwnerOf200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721OwnerOf200Response{}

// InterfacesIERC721OwnerOf200Response struct for InterfacesIERC721OwnerOf200Response
type InterfacesIERC721OwnerOf200Response struct {
	ContractParams InterfacesIERC721GetApprovedRequestContractParams `json:"contractParams"`
	Result InterfacesIERC721BalanceOfRequestContractParams `json:"result"`
}

// NewInterfacesIERC721OwnerOf200Response instantiates a new InterfacesIERC721OwnerOf200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721OwnerOf200Response(contractParams InterfacesIERC721GetApprovedRequestContractParams, result InterfacesIERC721BalanceOfRequestContractParams) *InterfacesIERC721OwnerOf200Response {
	this := InterfacesIERC721OwnerOf200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC721OwnerOf200ResponseWithDefaults instantiates a new InterfacesIERC721OwnerOf200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721OwnerOf200ResponseWithDefaults() *InterfacesIERC721OwnerOf200Response {
	this := InterfacesIERC721OwnerOf200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721OwnerOf200Response) GetContractParams() InterfacesIERC721GetApprovedRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721GetApprovedRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721OwnerOf200Response) GetContractParamsOk() (*InterfacesIERC721GetApprovedRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721OwnerOf200Response) SetContractParams(v InterfacesIERC721GetApprovedRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC721OwnerOf200Response) GetResult() InterfacesIERC721BalanceOfRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721BalanceOfRequestContractParams
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721OwnerOf200Response) GetResultOk() (*InterfacesIERC721BalanceOfRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC721OwnerOf200Response) SetResult(v InterfacesIERC721BalanceOfRequestContractParams) {
	o.Result = v
}

func (o InterfacesIERC721OwnerOf200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721OwnerOf200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC721OwnerOf200Response struct {
	value *InterfacesIERC721OwnerOf200Response
	isSet bool
}

func (v NullableInterfacesIERC721OwnerOf200Response) Get() *InterfacesIERC721OwnerOf200Response {
	return v.value
}

func (v *NullableInterfacesIERC721OwnerOf200Response) Set(val *InterfacesIERC721OwnerOf200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721OwnerOf200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721OwnerOf200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721OwnerOf200Response(val *InterfacesIERC721OwnerOf200Response) *NullableInterfacesIERC721OwnerOf200Response {
	return &NullableInterfacesIERC721OwnerOf200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC721OwnerOf200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721OwnerOf200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


