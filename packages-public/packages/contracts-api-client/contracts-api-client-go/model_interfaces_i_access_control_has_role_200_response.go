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

// checks if the InterfacesIAccessControlHasRole200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIAccessControlHasRole200Response{}

// InterfacesIAccessControlHasRole200Response struct for InterfacesIAccessControlHasRole200Response
type InterfacesIAccessControlHasRole200Response struct {
	ContractParams InterfacesIAccessControlGrantRoleRequestContractParams `json:"contractParams"`
	Result InterfacesIERC165SupportsInterface200ResponseResult `json:"result"`
}

// NewInterfacesIAccessControlHasRole200Response instantiates a new InterfacesIAccessControlHasRole200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIAccessControlHasRole200Response(contractParams InterfacesIAccessControlGrantRoleRequestContractParams, result InterfacesIERC165SupportsInterface200ResponseResult) *InterfacesIAccessControlHasRole200Response {
	this := InterfacesIAccessControlHasRole200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIAccessControlHasRole200ResponseWithDefaults instantiates a new InterfacesIAccessControlHasRole200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIAccessControlHasRole200ResponseWithDefaults() *InterfacesIAccessControlHasRole200Response {
	this := InterfacesIAccessControlHasRole200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIAccessControlHasRole200Response) GetContractParams() InterfacesIAccessControlGrantRoleRequestContractParams {
	if o == nil {
		var ret InterfacesIAccessControlGrantRoleRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIAccessControlHasRole200Response) GetContractParamsOk() (*InterfacesIAccessControlGrantRoleRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIAccessControlHasRole200Response) SetContractParams(v InterfacesIAccessControlGrantRoleRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIAccessControlHasRole200Response) GetResult() InterfacesIERC165SupportsInterface200ResponseResult {
	if o == nil {
		var ret InterfacesIERC165SupportsInterface200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIAccessControlHasRole200Response) GetResultOk() (*InterfacesIERC165SupportsInterface200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIAccessControlHasRole200Response) SetResult(v InterfacesIERC165SupportsInterface200ResponseResult) {
	o.Result = v
}

func (o InterfacesIAccessControlHasRole200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIAccessControlHasRole200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIAccessControlHasRole200Response struct {
	value *InterfacesIAccessControlHasRole200Response
	isSet bool
}

func (v NullableInterfacesIAccessControlHasRole200Response) Get() *InterfacesIAccessControlHasRole200Response {
	return v.value
}

func (v *NullableInterfacesIAccessControlHasRole200Response) Set(val *InterfacesIAccessControlHasRole200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIAccessControlHasRole200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIAccessControlHasRole200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIAccessControlHasRole200Response(val *InterfacesIAccessControlHasRole200Response) *NullableInterfacesIAccessControlHasRole200Response {
	return &NullableInterfacesIAccessControlHasRole200Response{value: val, isSet: true}
}

func (v NullableInterfacesIAccessControlHasRole200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIAccessControlHasRole200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

