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

// checks if the InterfacesIERC1155MintableMintRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155MintableMintRequestContractParams{}

// InterfacesIERC1155MintableMintRequestContractParams struct for InterfacesIERC1155MintableMintRequestContractParams
type InterfacesIERC1155MintableMintRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// A solidity uint256
	Var1 *string `json:"1,omitempty"`
	// A solidity uint256
	Var2 *string `json:"2,omitempty"`
	// An arbitrary length byte array
	Var3 *string `json:"3,omitempty"`
	// An ethereum address
	To *string `json:"to,omitempty"`
	// A solidity uint256
	Id *string `json:"id,omitempty"`
	// A solidity uint256
	Amount *string `json:"amount,omitempty"`
	// An arbitrary length byte array
	Data *string `json:"data,omitempty"`
}

// NewInterfacesIERC1155MintableMintRequestContractParams instantiates a new InterfacesIERC1155MintableMintRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155MintableMintRequestContractParams() *InterfacesIERC1155MintableMintRequestContractParams {
	this := InterfacesIERC1155MintableMintRequestContractParams{}
	return &this
}

// NewInterfacesIERC1155MintableMintRequestContractParamsWithDefaults instantiates a new InterfacesIERC1155MintableMintRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155MintableMintRequestContractParamsWithDefaults() *InterfacesIERC1155MintableMintRequestContractParams {
	this := InterfacesIERC1155MintableMintRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetVar2 returns the Var2 field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar2() string {
	if o == nil || IsNil(o.Var2) {
		var ret string
		return ret
	}
	return *o.Var2
}

// GetVar2Ok returns a tuple with the Var2 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar2Ok() (*string, bool) {
	if o == nil || IsNil(o.Var2) {
		return nil, false
	}
	return o.Var2, true
}

// HasVar2 returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasVar2() bool {
	if o != nil && !IsNil(o.Var2) {
		return true
	}

	return false
}

// SetVar2 gets a reference to the given string and assigns it to the Var2 field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetVar2(v string) {
	o.Var2 = &v
}

// GetVar3 returns the Var3 field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar3() string {
	if o == nil || IsNil(o.Var3) {
		var ret string
		return ret
	}
	return *o.Var3
}

// GetVar3Ok returns a tuple with the Var3 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetVar3Ok() (*string, bool) {
	if o == nil || IsNil(o.Var3) {
		return nil, false
	}
	return o.Var3, true
}

// HasVar3 returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasVar3() bool {
	if o != nil && !IsNil(o.Var3) {
		return true
	}

	return false
}

// SetVar3 gets a reference to the given string and assigns it to the Var3 field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetVar3(v string) {
	o.Var3 = &v
}

// GetTo returns the To field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetTo() string {
	if o == nil || IsNil(o.To) {
		var ret string
		return ret
	}
	return *o.To
}

// GetToOk returns a tuple with the To field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetToOk() (*string, bool) {
	if o == nil || IsNil(o.To) {
		return nil, false
	}
	return o.To, true
}

// HasTo returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasTo() bool {
	if o != nil && !IsNil(o.To) {
		return true
	}

	return false
}

// SetTo gets a reference to the given string and assigns it to the To field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetTo(v string) {
	o.To = &v
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetId() string {
	if o == nil || IsNil(o.Id) {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetIdOk() (*string, bool) {
	if o == nil || IsNil(o.Id) {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasId() bool {
	if o != nil && !IsNil(o.Id) {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetId(v string) {
	o.Id = &v
}

// GetAmount returns the Amount field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetAmount() string {
	if o == nil || IsNil(o.Amount) {
		var ret string
		return ret
	}
	return *o.Amount
}

// GetAmountOk returns a tuple with the Amount field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetAmountOk() (*string, bool) {
	if o == nil || IsNil(o.Amount) {
		return nil, false
	}
	return o.Amount, true
}

// HasAmount returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasAmount() bool {
	if o != nil && !IsNil(o.Amount) {
		return true
	}

	return false
}

// SetAmount gets a reference to the given string and assigns it to the Amount field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetAmount(v string) {
	o.Amount = &v
}

// GetData returns the Data field value if set, zero value otherwise.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetData() string {
	if o == nil || IsNil(o.Data) {
		var ret string
		return ret
	}
	return *o.Data
}

// GetDataOk returns a tuple with the Data field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) GetDataOk() (*string, bool) {
	if o == nil || IsNil(o.Data) {
		return nil, false
	}
	return o.Data, true
}

// HasData returns a boolean if a field has been set.
func (o *InterfacesIERC1155MintableMintRequestContractParams) HasData() bool {
	if o != nil && !IsNil(o.Data) {
		return true
	}

	return false
}

// SetData gets a reference to the given string and assigns it to the Data field.
func (o *InterfacesIERC1155MintableMintRequestContractParams) SetData(v string) {
	o.Data = &v
}

func (o InterfacesIERC1155MintableMintRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155MintableMintRequestContractParams) ToMap() (map[string]interface{}, error) {
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
	if !IsNil(o.Var3) {
		toSerialize["3"] = o.Var3
	}
	if !IsNil(o.To) {
		toSerialize["to"] = o.To
	}
	if !IsNil(o.Id) {
		toSerialize["id"] = o.Id
	}
	if !IsNil(o.Amount) {
		toSerialize["amount"] = o.Amount
	}
	if !IsNil(o.Data) {
		toSerialize["data"] = o.Data
	}
	return toSerialize, nil
}

type NullableInterfacesIERC1155MintableMintRequestContractParams struct {
	value *InterfacesIERC1155MintableMintRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC1155MintableMintRequestContractParams) Get() *InterfacesIERC1155MintableMintRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC1155MintableMintRequestContractParams) Set(val *InterfacesIERC1155MintableMintRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155MintableMintRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155MintableMintRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155MintableMintRequestContractParams(val *InterfacesIERC1155MintableMintRequestContractParams) *NullableInterfacesIERC1155MintableMintRequestContractParams {
	return &NullableInterfacesIERC1155MintableMintRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155MintableMintRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155MintableMintRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


