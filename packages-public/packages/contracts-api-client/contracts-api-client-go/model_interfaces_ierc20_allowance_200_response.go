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

// checks if the InterfacesIERC20Allowance200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC20Allowance200Response{}

// InterfacesIERC20Allowance200Response struct for InterfacesIERC20Allowance200Response
type InterfacesIERC20Allowance200Response struct {
	ContractParams InterfacesIERC20AllowanceRequestContractParams `json:"contractParams"`
	Result InterfacesIERC20Allowance200ResponseResult `json:"result"`
}

// NewInterfacesIERC20Allowance200Response instantiates a new InterfacesIERC20Allowance200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC20Allowance200Response(contractParams InterfacesIERC20AllowanceRequestContractParams, result InterfacesIERC20Allowance200ResponseResult) *InterfacesIERC20Allowance200Response {
	this := InterfacesIERC20Allowance200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC20Allowance200ResponseWithDefaults instantiates a new InterfacesIERC20Allowance200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC20Allowance200ResponseWithDefaults() *InterfacesIERC20Allowance200Response {
	this := InterfacesIERC20Allowance200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC20Allowance200Response) GetContractParams() InterfacesIERC20AllowanceRequestContractParams {
	if o == nil {
		var ret InterfacesIERC20AllowanceRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20Allowance200Response) GetContractParamsOk() (*InterfacesIERC20AllowanceRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC20Allowance200Response) SetContractParams(v InterfacesIERC20AllowanceRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC20Allowance200Response) GetResult() InterfacesIERC20Allowance200ResponseResult {
	if o == nil {
		var ret InterfacesIERC20Allowance200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20Allowance200Response) GetResultOk() (*InterfacesIERC20Allowance200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC20Allowance200Response) SetResult(v InterfacesIERC20Allowance200ResponseResult) {
	o.Result = v
}

func (o InterfacesIERC20Allowance200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC20Allowance200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC20Allowance200Response struct {
	value *InterfacesIERC20Allowance200Response
	isSet bool
}

func (v NullableInterfacesIERC20Allowance200Response) Get() *InterfacesIERC20Allowance200Response {
	return v.value
}

func (v *NullableInterfacesIERC20Allowance200Response) Set(val *InterfacesIERC20Allowance200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC20Allowance200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC20Allowance200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC20Allowance200Response(val *InterfacesIERC20Allowance200Response) *NullableInterfacesIERC20Allowance200Response {
	return &NullableInterfacesIERC20Allowance200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC20Allowance200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC20Allowance200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


