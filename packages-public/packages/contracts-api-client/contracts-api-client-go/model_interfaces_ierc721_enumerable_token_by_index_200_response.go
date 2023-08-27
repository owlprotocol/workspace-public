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

// checks if the InterfacesIERC721EnumerableTokenByIndex200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721EnumerableTokenByIndex200Response{}

// InterfacesIERC721EnumerableTokenByIndex200Response struct for InterfacesIERC721EnumerableTokenByIndex200Response
type InterfacesIERC721EnumerableTokenByIndex200Response struct {
	ContractParams InterfacesIERC721EnumerableTokenByIndexRequestContractParams `json:"contractParams"`
	Result InterfacesIERC20Allowance200ResponseResult `json:"result"`
}

// NewInterfacesIERC721EnumerableTokenByIndex200Response instantiates a new InterfacesIERC721EnumerableTokenByIndex200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721EnumerableTokenByIndex200Response(contractParams InterfacesIERC721EnumerableTokenByIndexRequestContractParams, result InterfacesIERC20Allowance200ResponseResult) *InterfacesIERC721EnumerableTokenByIndex200Response {
	this := InterfacesIERC721EnumerableTokenByIndex200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC721EnumerableTokenByIndex200ResponseWithDefaults instantiates a new InterfacesIERC721EnumerableTokenByIndex200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721EnumerableTokenByIndex200ResponseWithDefaults() *InterfacesIERC721EnumerableTokenByIndex200Response {
	this := InterfacesIERC721EnumerableTokenByIndex200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) GetContractParams() InterfacesIERC721EnumerableTokenByIndexRequestContractParams {
	if o == nil {
		var ret InterfacesIERC721EnumerableTokenByIndexRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) GetContractParamsOk() (*InterfacesIERC721EnumerableTokenByIndexRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) SetContractParams(v InterfacesIERC721EnumerableTokenByIndexRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) GetResult() InterfacesIERC20Allowance200ResponseResult {
	if o == nil {
		var ret InterfacesIERC20Allowance200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) GetResultOk() (*InterfacesIERC20Allowance200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC721EnumerableTokenByIndex200Response) SetResult(v InterfacesIERC20Allowance200ResponseResult) {
	o.Result = v
}

func (o InterfacesIERC721EnumerableTokenByIndex200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721EnumerableTokenByIndex200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC721EnumerableTokenByIndex200Response struct {
	value *InterfacesIERC721EnumerableTokenByIndex200Response
	isSet bool
}

func (v NullableInterfacesIERC721EnumerableTokenByIndex200Response) Get() *InterfacesIERC721EnumerableTokenByIndex200Response {
	return v.value
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndex200Response) Set(val *InterfacesIERC721EnumerableTokenByIndex200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721EnumerableTokenByIndex200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndex200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721EnumerableTokenByIndex200Response(val *InterfacesIERC721EnumerableTokenByIndex200Response) *NullableInterfacesIERC721EnumerableTokenByIndex200Response {
	return &NullableInterfacesIERC721EnumerableTokenByIndex200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC721EnumerableTokenByIndex200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721EnumerableTokenByIndex200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

