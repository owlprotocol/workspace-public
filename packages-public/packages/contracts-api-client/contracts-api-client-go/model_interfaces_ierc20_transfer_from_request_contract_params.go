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

// checks if the InterfacesIERC20TransferFromRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC20TransferFromRequestContractParams{}

// InterfacesIERC20TransferFromRequestContractParams struct for InterfacesIERC20TransferFromRequestContractParams
type InterfacesIERC20TransferFromRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// An ethereum address
	Var1 *string `json:"1,omitempty"`
	// A solidity uint256
	Var2 *string `json:"2,omitempty"`
	// An ethereum address
	From *string `json:"from,omitempty"`
	// An ethereum address
	To *string `json:"to,omitempty"`
	// A solidity uint256
	Amount *string `json:"amount,omitempty"`
}

// NewInterfacesIERC20TransferFromRequestContractParams instantiates a new InterfacesIERC20TransferFromRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC20TransferFromRequestContractParams() *InterfacesIERC20TransferFromRequestContractParams {
	this := InterfacesIERC20TransferFromRequestContractParams{}
	return &this
}

// NewInterfacesIERC20TransferFromRequestContractParamsWithDefaults instantiates a new InterfacesIERC20TransferFromRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC20TransferFromRequestContractParamsWithDefaults() *InterfacesIERC20TransferFromRequestContractParams {
	this := InterfacesIERC20TransferFromRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetVar2 returns the Var2 field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar2() string {
	if o == nil || IsNil(o.Var2) {
		var ret string
		return ret
	}
	return *o.Var2
}

// GetVar2Ok returns a tuple with the Var2 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetVar2Ok() (*string, bool) {
	if o == nil || IsNil(o.Var2) {
		return nil, false
	}
	return o.Var2, true
}

// HasVar2 returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasVar2() bool {
	if o != nil && !IsNil(o.Var2) {
		return true
	}

	return false
}

// SetVar2 gets a reference to the given string and assigns it to the Var2 field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetVar2(v string) {
	o.Var2 = &v
}

// GetFrom returns the From field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetFrom() string {
	if o == nil || IsNil(o.From) {
		var ret string
		return ret
	}
	return *o.From
}

// GetFromOk returns a tuple with the From field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetFromOk() (*string, bool) {
	if o == nil || IsNil(o.From) {
		return nil, false
	}
	return o.From, true
}

// HasFrom returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasFrom() bool {
	if o != nil && !IsNil(o.From) {
		return true
	}

	return false
}

// SetFrom gets a reference to the given string and assigns it to the From field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetFrom(v string) {
	o.From = &v
}

// GetTo returns the To field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetTo() string {
	if o == nil || IsNil(o.To) {
		var ret string
		return ret
	}
	return *o.To
}

// GetToOk returns a tuple with the To field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetToOk() (*string, bool) {
	if o == nil || IsNil(o.To) {
		return nil, false
	}
	return o.To, true
}

// HasTo returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasTo() bool {
	if o != nil && !IsNil(o.To) {
		return true
	}

	return false
}

// SetTo gets a reference to the given string and assigns it to the To field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetTo(v string) {
	o.To = &v
}

// GetAmount returns the Amount field value if set, zero value otherwise.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetAmount() string {
	if o == nil || IsNil(o.Amount) {
		var ret string
		return ret
	}
	return *o.Amount
}

// GetAmountOk returns a tuple with the Amount field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) GetAmountOk() (*string, bool) {
	if o == nil || IsNil(o.Amount) {
		return nil, false
	}
	return o.Amount, true
}

// HasAmount returns a boolean if a field has been set.
func (o *InterfacesIERC20TransferFromRequestContractParams) HasAmount() bool {
	if o != nil && !IsNil(o.Amount) {
		return true
	}

	return false
}

// SetAmount gets a reference to the given string and assigns it to the Amount field.
func (o *InterfacesIERC20TransferFromRequestContractParams) SetAmount(v string) {
	o.Amount = &v
}

func (o InterfacesIERC20TransferFromRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC20TransferFromRequestContractParams) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Var0) {
		toSerialize["0"] = o.Var0
	}
	if !IsNil(o.Var1) {
		toSerialize["1"] = o.Var1
	}
	if !IsNil(o.Var2) {
		toSerialize["2"] = o.Var2
	}
	if !IsNil(o.From) {
		toSerialize["from"] = o.From
	}
	if !IsNil(o.To) {
		toSerialize["to"] = o.To
	}
	if !IsNil(o.Amount) {
		toSerialize["amount"] = o.Amount
	}
	return toSerialize, nil
}

type NullableInterfacesIERC20TransferFromRequestContractParams struct {
	value *InterfacesIERC20TransferFromRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC20TransferFromRequestContractParams) Get() *InterfacesIERC20TransferFromRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC20TransferFromRequestContractParams) Set(val *InterfacesIERC20TransferFromRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC20TransferFromRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC20TransferFromRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC20TransferFromRequestContractParams(val *InterfacesIERC20TransferFromRequestContractParams) *NullableInterfacesIERC20TransferFromRequestContractParams {
	return &NullableInterfacesIERC20TransferFromRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC20TransferFromRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC20TransferFromRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

