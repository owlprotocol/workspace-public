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

// checks if the InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams{}

// InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams struct for InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams
type InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// A solidity bytes4
	Var1 *string `json:"1,omitempty"`
	// An ethereum address
	Account *string `json:"account,omitempty"`
	// A solidity bytes4
	InterfaceId *string `json:"interfaceId,omitempty"`
}

// NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams instantiates a new InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams() *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams {
	this := InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams{}
	return &this
}

// NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParamsWithDefaults instantiates a new InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1820ImplementsERC165InterfaceRequestContractParamsWithDefaults() *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams {
	this := InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetAccount returns the Account field value if set, zero value otherwise.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetAccount() string {
	if o == nil || IsNil(o.Account) {
		var ret string
		return ret
	}
	return *o.Account
}

// GetAccountOk returns a tuple with the Account field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetAccountOk() (*string, bool) {
	if o == nil || IsNil(o.Account) {
		return nil, false
	}
	return o.Account, true
}

// HasAccount returns a boolean if a field has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) HasAccount() bool {
	if o != nil && !IsNil(o.Account) {
		return true
	}

	return false
}

// SetAccount gets a reference to the given string and assigns it to the Account field.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) SetAccount(v string) {
	o.Account = &v
}

// GetInterfaceId returns the InterfaceId field value if set, zero value otherwise.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetInterfaceId() string {
	if o == nil || IsNil(o.InterfaceId) {
		var ret string
		return ret
	}
	return *o.InterfaceId
}

// GetInterfaceIdOk returns a tuple with the InterfaceId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) GetInterfaceIdOk() (*string, bool) {
	if o == nil || IsNil(o.InterfaceId) {
		return nil, false
	}
	return o.InterfaceId, true
}

// HasInterfaceId returns a boolean if a field has been set.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) HasInterfaceId() bool {
	if o != nil && !IsNil(o.InterfaceId) {
		return true
	}

	return false
}

// SetInterfaceId gets a reference to the given string and assigns it to the InterfaceId field.
func (o *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) SetInterfaceId(v string) {
	o.InterfaceId = &v
}

func (o InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Var0) {
		toSerialize["0"] = o.Var0
	}
	if !IsNil(o.Var1) {
		toSerialize["1"] = o.Var1
	}
	if !IsNil(o.Account) {
		toSerialize["account"] = o.Account
	}
	if !IsNil(o.InterfaceId) {
		toSerialize["interfaceId"] = o.InterfaceId
	}
	return toSerialize, nil
}

type NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams struct {
	value *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) Get() *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) Set(val *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams(val *InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) *NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams {
	return &NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1820ImplementsERC165InterfaceRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

