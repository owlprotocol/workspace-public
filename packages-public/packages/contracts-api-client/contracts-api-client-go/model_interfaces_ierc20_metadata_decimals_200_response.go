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

// checks if the InterfacesIERC20MetadataDecimals200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC20MetadataDecimals200Response{}

// InterfacesIERC20MetadataDecimals200Response struct for InterfacesIERC20MetadataDecimals200Response
type InterfacesIERC20MetadataDecimals200Response struct {
	ContractParams map[string]interface{} `json:"contractParams"`
	Result InterfacesIERC20MetadataDecimals200ResponseResult `json:"result"`
}

// NewInterfacesIERC20MetadataDecimals200Response instantiates a new InterfacesIERC20MetadataDecimals200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC20MetadataDecimals200Response(contractParams map[string]interface{}, result InterfacesIERC20MetadataDecimals200ResponseResult) *InterfacesIERC20MetadataDecimals200Response {
	this := InterfacesIERC20MetadataDecimals200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC20MetadataDecimals200ResponseWithDefaults instantiates a new InterfacesIERC20MetadataDecimals200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC20MetadataDecimals200ResponseWithDefaults() *InterfacesIERC20MetadataDecimals200Response {
	this := InterfacesIERC20MetadataDecimals200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC20MetadataDecimals200Response) GetContractParams() map[string]interface{} {
	if o == nil {
		var ret map[string]interface{}
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20MetadataDecimals200Response) GetContractParamsOk() (map[string]interface{}, bool) {
	if o == nil {
		return map[string]interface{}{}, false
	}
	return o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC20MetadataDecimals200Response) SetContractParams(v map[string]interface{}) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC20MetadataDecimals200Response) GetResult() InterfacesIERC20MetadataDecimals200ResponseResult {
	if o == nil {
		var ret InterfacesIERC20MetadataDecimals200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20MetadataDecimals200Response) GetResultOk() (*InterfacesIERC20MetadataDecimals200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC20MetadataDecimals200Response) SetResult(v InterfacesIERC20MetadataDecimals200ResponseResult) {
	o.Result = v
}

func (o InterfacesIERC20MetadataDecimals200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC20MetadataDecimals200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC20MetadataDecimals200Response struct {
	value *InterfacesIERC20MetadataDecimals200Response
	isSet bool
}

func (v NullableInterfacesIERC20MetadataDecimals200Response) Get() *InterfacesIERC20MetadataDecimals200Response {
	return v.value
}

func (v *NullableInterfacesIERC20MetadataDecimals200Response) Set(val *InterfacesIERC20MetadataDecimals200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC20MetadataDecimals200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC20MetadataDecimals200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC20MetadataDecimals200Response(val *InterfacesIERC20MetadataDecimals200Response) *NullableInterfacesIERC20MetadataDecimals200Response {
	return &NullableInterfacesIERC20MetadataDecimals200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC20MetadataDecimals200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC20MetadataDecimals200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

