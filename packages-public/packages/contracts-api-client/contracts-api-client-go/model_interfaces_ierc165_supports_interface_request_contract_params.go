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

// checks if the InterfacesIERC165SupportsInterfaceRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC165SupportsInterfaceRequestContractParams{}

// InterfacesIERC165SupportsInterfaceRequestContractParams struct for InterfacesIERC165SupportsInterfaceRequestContractParams
type InterfacesIERC165SupportsInterfaceRequestContractParams struct {
	// A solidity bytes4
	Var0 *string `json:"0,omitempty"`
	// A solidity bytes4
	InterfaceId *string `json:"interfaceId,omitempty"`
}

// NewInterfacesIERC165SupportsInterfaceRequestContractParams instantiates a new InterfacesIERC165SupportsInterfaceRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC165SupportsInterfaceRequestContractParams() *InterfacesIERC165SupportsInterfaceRequestContractParams {
	this := InterfacesIERC165SupportsInterfaceRequestContractParams{}
	return &this
}

// NewInterfacesIERC165SupportsInterfaceRequestContractParamsWithDefaults instantiates a new InterfacesIERC165SupportsInterfaceRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC165SupportsInterfaceRequestContractParamsWithDefaults() *InterfacesIERC165SupportsInterfaceRequestContractParams {
	this := InterfacesIERC165SupportsInterfaceRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetInterfaceId returns the InterfaceId field value if set, zero value otherwise.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) GetInterfaceId() string {
	if o == nil || IsNil(o.InterfaceId) {
		var ret string
		return ret
	}
	return *o.InterfaceId
}

// GetInterfaceIdOk returns a tuple with the InterfaceId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) GetInterfaceIdOk() (*string, bool) {
	if o == nil || IsNil(o.InterfaceId) {
		return nil, false
	}
	return o.InterfaceId, true
}

// HasInterfaceId returns a boolean if a field has been set.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) HasInterfaceId() bool {
	if o != nil && !IsNil(o.InterfaceId) {
		return true
	}

	return false
}

// SetInterfaceId gets a reference to the given string and assigns it to the InterfaceId field.
func (o *InterfacesIERC165SupportsInterfaceRequestContractParams) SetInterfaceId(v string) {
	o.InterfaceId = &v
}

func (o InterfacesIERC165SupportsInterfaceRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC165SupportsInterfaceRequestContractParams) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Var0) {
		toSerialize["0"] = o.Var0
	}
	if !IsNil(o.InterfaceId) {
		toSerialize["interfaceId"] = o.InterfaceId
	}
	return toSerialize, nil
}

type NullableInterfacesIERC165SupportsInterfaceRequestContractParams struct {
	value *InterfacesIERC165SupportsInterfaceRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC165SupportsInterfaceRequestContractParams) Get() *InterfacesIERC165SupportsInterfaceRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC165SupportsInterfaceRequestContractParams) Set(val *InterfacesIERC165SupportsInterfaceRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC165SupportsInterfaceRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC165SupportsInterfaceRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC165SupportsInterfaceRequestContractParams(val *InterfacesIERC165SupportsInterfaceRequestContractParams) *NullableInterfacesIERC165SupportsInterfaceRequestContractParams {
	return &NullableInterfacesIERC165SupportsInterfaceRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC165SupportsInterfaceRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC165SupportsInterfaceRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

