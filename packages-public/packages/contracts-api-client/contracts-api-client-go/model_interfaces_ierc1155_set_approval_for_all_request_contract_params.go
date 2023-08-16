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

// checks if the InterfacesIERC1155SetApprovalForAllRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155SetApprovalForAllRequestContractParams{}

// InterfacesIERC1155SetApprovalForAllRequestContractParams struct for InterfacesIERC1155SetApprovalForAllRequestContractParams
type InterfacesIERC1155SetApprovalForAllRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// An solidity boolean
	Var1 *bool `json:"1,omitempty"`
	// An ethereum address
	Operator *string `json:"operator,omitempty"`
	// An solidity boolean
	Approved *bool `json:"approved,omitempty"`
}

// NewInterfacesIERC1155SetApprovalForAllRequestContractParams instantiates a new InterfacesIERC1155SetApprovalForAllRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155SetApprovalForAllRequestContractParams() *InterfacesIERC1155SetApprovalForAllRequestContractParams {
	this := InterfacesIERC1155SetApprovalForAllRequestContractParams{}
	return &this
}

// NewInterfacesIERC1155SetApprovalForAllRequestContractParamsWithDefaults instantiates a new InterfacesIERC1155SetApprovalForAllRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155SetApprovalForAllRequestContractParamsWithDefaults() *InterfacesIERC1155SetApprovalForAllRequestContractParams {
	this := InterfacesIERC1155SetApprovalForAllRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetVar1() bool {
	if o == nil || IsNil(o.Var1) {
		var ret bool
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetVar1Ok() (*bool, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given bool and assigns it to the Var1 field.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) SetVar1(v bool) {
	o.Var1 = &v
}

// GetOperator returns the Operator field value if set, zero value otherwise.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetOperator() string {
	if o == nil || IsNil(o.Operator) {
		var ret string
		return ret
	}
	return *o.Operator
}

// GetOperatorOk returns a tuple with the Operator field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetOperatorOk() (*string, bool) {
	if o == nil || IsNil(o.Operator) {
		return nil, false
	}
	return o.Operator, true
}

// HasOperator returns a boolean if a field has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) HasOperator() bool {
	if o != nil && !IsNil(o.Operator) {
		return true
	}

	return false
}

// SetOperator gets a reference to the given string and assigns it to the Operator field.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) SetOperator(v string) {
	o.Operator = &v
}

// GetApproved returns the Approved field value if set, zero value otherwise.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetApproved() bool {
	if o == nil || IsNil(o.Approved) {
		var ret bool
		return ret
	}
	return *o.Approved
}

// GetApprovedOk returns a tuple with the Approved field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) GetApprovedOk() (*bool, bool) {
	if o == nil || IsNil(o.Approved) {
		return nil, false
	}
	return o.Approved, true
}

// HasApproved returns a boolean if a field has been set.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) HasApproved() bool {
	if o != nil && !IsNil(o.Approved) {
		return true
	}

	return false
}

// SetApproved gets a reference to the given bool and assigns it to the Approved field.
func (o *InterfacesIERC1155SetApprovalForAllRequestContractParams) SetApproved(v bool) {
	o.Approved = &v
}

func (o InterfacesIERC1155SetApprovalForAllRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155SetApprovalForAllRequestContractParams) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Var0) {
		toSerialize["0"] = o.Var0
	}
	if !IsNil(o.Var1) {
		toSerialize["1"] = o.Var1
	}
	if !IsNil(o.Operator) {
		toSerialize["operator"] = o.Operator
	}
	if !IsNil(o.Approved) {
		toSerialize["approved"] = o.Approved
	}
	return toSerialize, nil
}

type NullableInterfacesIERC1155SetApprovalForAllRequestContractParams struct {
	value *InterfacesIERC1155SetApprovalForAllRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) Get() *InterfacesIERC1155SetApprovalForAllRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) Set(val *InterfacesIERC1155SetApprovalForAllRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155SetApprovalForAllRequestContractParams(val *InterfacesIERC1155SetApprovalForAllRequestContractParams) *NullableInterfacesIERC1155SetApprovalForAllRequestContractParams {
	return &NullableInterfacesIERC1155SetApprovalForAllRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155SetApprovalForAllRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


