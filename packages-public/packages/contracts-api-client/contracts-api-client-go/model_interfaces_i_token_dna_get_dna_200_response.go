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

// checks if the InterfacesITokenDnaGetDna200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesITokenDnaGetDna200Response{}

// InterfacesITokenDnaGetDna200Response struct for InterfacesITokenDnaGetDna200Response
type InterfacesITokenDnaGetDna200Response struct {
	ContractParams InterfacesIERC721GetApprovedRequestContractParams `json:"contractParams"`
	Result InterfacesITokenDnaGetDna200ResponseResult `json:"result"`
}

// NewInterfacesITokenDnaGetDna200Response instantiates a new InterfacesITokenDnaGetDna200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesITokenDnaGetDna200Response(contractParams InterfacesIERC721GetApprovedRequestContractParams, result InterfacesITokenDnaGetDna200ResponseResult) *InterfacesITokenDnaGetDna200Response {
	this := InterfacesITokenDnaGetDna200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesITokenDnaGetDna200ResponseWithDefaults instantiates a new InterfacesITokenDnaGetDna200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesITokenDnaGetDna200ResponseWithDefaults() *InterfacesITokenDnaGetDna200Response {
	this := InterfacesITokenDnaGetDna200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesITokenDnaGetDna200Response) GetContractParams() InterfacesIERC721GetApprovedRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721GetApprovedRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesITokenDnaGetDna200Response) GetContractParamsOk() (*InterfacesIERC721GetApprovedRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesITokenDnaGetDna200Response) SetContractParams(v InterfacesIERC721GetApprovedRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesITokenDnaGetDna200Response) GetResult() InterfacesITokenDnaGetDna200ResponseResult {
	if o == nil {
		var ret InterfacesITokenDnaGetDna200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesITokenDnaGetDna200Response) GetResultOk() (*InterfacesITokenDnaGetDna200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesITokenDnaGetDna200Response) SetResult(v InterfacesITokenDnaGetDna200ResponseResult) {
	o.Result = v
}

func (o InterfacesITokenDnaGetDna200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesITokenDnaGetDna200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesITokenDnaGetDna200Response struct {
	value *InterfacesITokenDnaGetDna200Response
	isSet bool
}

func (v NullableInterfacesITokenDnaGetDna200Response) Get() *InterfacesITokenDnaGetDna200Response {
	return v.value
}

func (v *NullableInterfacesITokenDnaGetDna200Response) Set(val *InterfacesITokenDnaGetDna200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesITokenDnaGetDna200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesITokenDnaGetDna200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesITokenDnaGetDna200Response(val *InterfacesITokenDnaGetDna200Response) *NullableInterfacesITokenDnaGetDna200Response {
	return &NullableInterfacesITokenDnaGetDna200Response{value: val, isSet: true}
}

func (v NullableInterfacesITokenDnaGetDna200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesITokenDnaGetDna200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


