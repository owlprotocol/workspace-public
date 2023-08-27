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

// checks if the InterfacesIERC721MintableMintBatchRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721MintableMintBatchRequestContractParams{}

// InterfacesIERC721MintableMintBatchRequestContractParams struct for InterfacesIERC721MintableMintBatchRequestContractParams
type InterfacesIERC721MintableMintBatchRequestContractParams struct {
	Var0 []string `json:"0,omitempty"`
	Var1 []string `json:"1,omitempty"`
	To []string `json:"to,omitempty"`
	TokenId []string `json:"tokenId,omitempty"`
}

// NewInterfacesIERC721MintableMintBatchRequestContractParams instantiates a new InterfacesIERC721MintableMintBatchRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721MintableMintBatchRequestContractParams() *InterfacesIERC721MintableMintBatchRequestContractParams {
	this := InterfacesIERC721MintableMintBatchRequestContractParams{}
	return &this
}

// NewInterfacesIERC721MintableMintBatchRequestContractParamsWithDefaults instantiates a new InterfacesIERC721MintableMintBatchRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721MintableMintBatchRequestContractParamsWithDefaults() *InterfacesIERC721MintableMintBatchRequestContractParams {
	this := InterfacesIERC721MintableMintBatchRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetVar0() []string {
	if o == nil || IsNil(o.Var0) {
		var ret []string
		return ret
	}
	return o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetVar0Ok() ([]string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given []string and assigns it to the Var0 field.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) SetVar0(v []string) {
	o.Var0 = v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetVar1() []string {
	if o == nil || IsNil(o.Var1) {
		var ret []string
		return ret
	}
	return o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetVar1Ok() ([]string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given []string and assigns it to the Var1 field.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) SetVar1(v []string) {
	o.Var1 = v
}

// GetTo returns the To field value if set, zero value otherwise.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetTo() []string {
	if o == nil || IsNil(o.To) {
		var ret []string
		return ret
	}
	return o.To
}

// GetToOk returns a tuple with the To field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetToOk() ([]string, bool) {
	if o == nil || IsNil(o.To) {
		return nil, false
	}
	return o.To, true
}

// HasTo returns a boolean if a field has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) HasTo() bool {
	if o != nil && !IsNil(o.To) {
		return true
	}

	return false
}

// SetTo gets a reference to the given []string and assigns it to the To field.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) SetTo(v []string) {
	o.To = v
}

// GetTokenId returns the TokenId field value if set, zero value otherwise.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetTokenId() []string {
	if o == nil || IsNil(o.TokenId) {
		var ret []string
		return ret
	}
	return o.TokenId
}

// GetTokenIdOk returns a tuple with the TokenId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) GetTokenIdOk() ([]string, bool) {
	if o == nil || IsNil(o.TokenId) {
		return nil, false
	}
	return o.TokenId, true
}

// HasTokenId returns a boolean if a field has been set.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) HasTokenId() bool {
	if o != nil && !IsNil(o.TokenId) {
		return true
	}

	return false
}

// SetTokenId gets a reference to the given []string and assigns it to the TokenId field.
func (o *InterfacesIERC721MintableMintBatchRequestContractParams) SetTokenId(v []string) {
	o.TokenId = v
}

func (o InterfacesIERC721MintableMintBatchRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721MintableMintBatchRequestContractParams) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Var0) {
		toSerialize["0"] = o.Var0
	}
	if !IsNil(o.Var1) {
		toSerialize["1"] = o.Var1
	}
	if !IsNil(o.To) {
		toSerialize["to"] = o.To
	}
	if !IsNil(o.TokenId) {
		toSerialize["tokenId"] = o.TokenId
	}
	return toSerialize, nil
}

type NullableInterfacesIERC721MintableMintBatchRequestContractParams struct {
	value *InterfacesIERC721MintableMintBatchRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC721MintableMintBatchRequestContractParams) Get() *InterfacesIERC721MintableMintBatchRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC721MintableMintBatchRequestContractParams) Set(val *InterfacesIERC721MintableMintBatchRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721MintableMintBatchRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721MintableMintBatchRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721MintableMintBatchRequestContractParams(val *InterfacesIERC721MintableMintBatchRequestContractParams) *NullableInterfacesIERC721MintableMintBatchRequestContractParams {
	return &NullableInterfacesIERC721MintableMintBatchRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC721MintableMintBatchRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721MintableMintBatchRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

