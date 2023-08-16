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

// checks if the InterfacesITokenDnaGetDnaBatch200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesITokenDnaGetDnaBatch200Response{}

// InterfacesITokenDnaGetDnaBatch200Response struct for InterfacesITokenDnaGetDnaBatch200Response
type InterfacesITokenDnaGetDnaBatch200Response struct {
	ContractParams InterfacesITokenDnaGetDnaBatchRequestContractParams `json:"contractParams"`
	Result InterfacesITokenDnaGetDnaBatch200ResponseResult `json:"result"`
}

// NewInterfacesITokenDnaGetDnaBatch200Response instantiates a new InterfacesITokenDnaGetDnaBatch200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesITokenDnaGetDnaBatch200Response(contractParams InterfacesITokenDnaGetDnaBatchRequestContractParams, result InterfacesITokenDnaGetDnaBatch200ResponseResult) *InterfacesITokenDnaGetDnaBatch200Response {
	this := InterfacesITokenDnaGetDnaBatch200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesITokenDnaGetDnaBatch200ResponseWithDefaults instantiates a new InterfacesITokenDnaGetDnaBatch200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesITokenDnaGetDnaBatch200ResponseWithDefaults() *InterfacesITokenDnaGetDnaBatch200Response {
	this := InterfacesITokenDnaGetDnaBatch200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesITokenDnaGetDnaBatch200Response) GetContractParams() InterfacesITokenDnaGetDnaBatchRequestContractParams {
	if o == nil {
		var ret InterfacesITokenDnaGetDnaBatchRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesITokenDnaGetDnaBatch200Response) GetContractParamsOk() (*InterfacesITokenDnaGetDnaBatchRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesITokenDnaGetDnaBatch200Response) SetContractParams(v InterfacesITokenDnaGetDnaBatchRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesITokenDnaGetDnaBatch200Response) GetResult() InterfacesITokenDnaGetDnaBatch200ResponseResult {
	if o == nil {
		var ret InterfacesITokenDnaGetDnaBatch200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesITokenDnaGetDnaBatch200Response) GetResultOk() (*InterfacesITokenDnaGetDnaBatch200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesITokenDnaGetDnaBatch200Response) SetResult(v InterfacesITokenDnaGetDnaBatch200ResponseResult) {
	o.Result = v
}

func (o InterfacesITokenDnaGetDnaBatch200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesITokenDnaGetDnaBatch200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesITokenDnaGetDnaBatch200Response struct {
	value *InterfacesITokenDnaGetDnaBatch200Response
	isSet bool
}

func (v NullableInterfacesITokenDnaGetDnaBatch200Response) Get() *InterfacesITokenDnaGetDnaBatch200Response {
	return v.value
}

func (v *NullableInterfacesITokenDnaGetDnaBatch200Response) Set(val *InterfacesITokenDnaGetDnaBatch200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesITokenDnaGetDnaBatch200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesITokenDnaGetDnaBatch200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesITokenDnaGetDnaBatch200Response(val *InterfacesITokenDnaGetDnaBatch200Response) *NullableInterfacesITokenDnaGetDnaBatch200Response {
	return &NullableInterfacesITokenDnaGetDnaBatch200Response{value: val, isSet: true}
}

func (v NullableInterfacesITokenDnaGetDnaBatch200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesITokenDnaGetDnaBatch200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


