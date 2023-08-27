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

// checks if the InterfacesIERC20BalanceOf200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC20BalanceOf200Response{}

// InterfacesIERC20BalanceOf200Response struct for InterfacesIERC20BalanceOf200Response
type InterfacesIERC20BalanceOf200Response struct {
	ContractParams InterfacesIERC1820GetManagerRequestContractParams `json:"contractParams"`
	Result InterfacesIERC20Allowance200ResponseResult `json:"result"`
}

// NewInterfacesIERC20BalanceOf200Response instantiates a new InterfacesIERC20BalanceOf200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC20BalanceOf200Response(contractParams InterfacesIERC1820GetManagerRequestContractParams, result InterfacesIERC20Allowance200ResponseResult) *InterfacesIERC20BalanceOf200Response {
	this := InterfacesIERC20BalanceOf200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC20BalanceOf200ResponseWithDefaults instantiates a new InterfacesIERC20BalanceOf200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC20BalanceOf200ResponseWithDefaults() *InterfacesIERC20BalanceOf200Response {
	this := InterfacesIERC20BalanceOf200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC20BalanceOf200Response) GetContractParams() InterfacesIERC1820GetManagerRequestContractParams {
	if o == nil {
		var ret InterfacesIERC1820GetManagerRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20BalanceOf200Response) GetContractParamsOk() (*InterfacesIERC1820GetManagerRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC20BalanceOf200Response) SetContractParams(v InterfacesIERC1820GetManagerRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC20BalanceOf200Response) GetResult() InterfacesIERC20Allowance200ResponseResult {
	if o == nil {
		var ret InterfacesIERC20Allowance200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20BalanceOf200Response) GetResultOk() (*InterfacesIERC20Allowance200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC20BalanceOf200Response) SetResult(v InterfacesIERC20Allowance200ResponseResult) {
	o.Result = v
}

func (o InterfacesIERC20BalanceOf200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC20BalanceOf200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC20BalanceOf200Response struct {
	value *InterfacesIERC20BalanceOf200Response
	isSet bool
}

func (v NullableInterfacesIERC20BalanceOf200Response) Get() *InterfacesIERC20BalanceOf200Response {
	return v.value
}

func (v *NullableInterfacesIERC20BalanceOf200Response) Set(val *InterfacesIERC20BalanceOf200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC20BalanceOf200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC20BalanceOf200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC20BalanceOf200Response(val *InterfacesIERC20BalanceOf200Response) *NullableInterfacesIERC20BalanceOf200Response {
	return &NullableInterfacesIERC20BalanceOf200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC20BalanceOf200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC20BalanceOf200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

