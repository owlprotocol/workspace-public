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

// checks if the InterfacesIERC721SafeTransferFromRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC721SafeTransferFromRequestContractParams{}

// InterfacesIERC721SafeTransferFromRequestContractParams struct for InterfacesIERC721SafeTransferFromRequestContractParams
type InterfacesIERC721SafeTransferFromRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// An ethereum address
	Var1 *string `json:"1,omitempty"`
	// A solidity uint256
	Var2 *string `json:"2,omitempty"`
	// An arbitrary length byte array
	Var3 *string `json:"3,omitempty"`
	// An ethereum address
	From *string `json:"from,omitempty"`
	// An ethereum address
	To *string `json:"to,omitempty"`
	// A solidity uint256
	TokenId *string `json:"tokenId,omitempty"`
	// An arbitrary length byte array
	Data *string `json:"data,omitempty"`
}

// NewInterfacesIERC721SafeTransferFromRequestContractParams instantiates a new InterfacesIERC721SafeTransferFromRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC721SafeTransferFromRequestContractParams() *InterfacesIERC721SafeTransferFromRequestContractParams {
	this := InterfacesIERC721SafeTransferFromRequestContractParams{}
	return &this
}

// NewInterfacesIERC721SafeTransferFromRequestContractParamsWithDefaults instantiates a new InterfacesIERC721SafeTransferFromRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC721SafeTransferFromRequestContractParamsWithDefaults() *InterfacesIERC721SafeTransferFromRequestContractParams {
	this := InterfacesIERC721SafeTransferFromRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetVar2 returns the Var2 field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar2() string {
	if o == nil || IsNil(o.Var2) {
		var ret string
		return ret
	}
	return *o.Var2
}

// GetVar2Ok returns a tuple with the Var2 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar2Ok() (*string, bool) {
	if o == nil || IsNil(o.Var2) {
		return nil, false
	}
	return o.Var2, true
}

// HasVar2 returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasVar2() bool {
	if o != nil && !IsNil(o.Var2) {
		return true
	}

	return false
}

// SetVar2 gets a reference to the given string and assigns it to the Var2 field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetVar2(v string) {
	o.Var2 = &v
}

// GetVar3 returns the Var3 field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar3() string {
	if o == nil || IsNil(o.Var3) {
		var ret string
		return ret
	}
	return *o.Var3
}

// GetVar3Ok returns a tuple with the Var3 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetVar3Ok() (*string, bool) {
	if o == nil || IsNil(o.Var3) {
		return nil, false
	}
	return o.Var3, true
}

// HasVar3 returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasVar3() bool {
	if o != nil && !IsNil(o.Var3) {
		return true
	}

	return false
}

// SetVar3 gets a reference to the given string and assigns it to the Var3 field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetVar3(v string) {
	o.Var3 = &v
}

// GetFrom returns the From field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetFrom() string {
	if o == nil || IsNil(o.From) {
		var ret string
		return ret
	}
	return *o.From
}

// GetFromOk returns a tuple with the From field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetFromOk() (*string, bool) {
	if o == nil || IsNil(o.From) {
		return nil, false
	}
	return o.From, true
}

// HasFrom returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasFrom() bool {
	if o != nil && !IsNil(o.From) {
		return true
	}

	return false
}

// SetFrom gets a reference to the given string and assigns it to the From field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetFrom(v string) {
	o.From = &v
}

// GetTo returns the To field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetTo() string {
	if o == nil || IsNil(o.To) {
		var ret string
		return ret
	}
	return *o.To
}

// GetToOk returns a tuple with the To field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetToOk() (*string, bool) {
	if o == nil || IsNil(o.To) {
		return nil, false
	}
	return o.To, true
}

// HasTo returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasTo() bool {
	if o != nil && !IsNil(o.To) {
		return true
	}

	return false
}

// SetTo gets a reference to the given string and assigns it to the To field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetTo(v string) {
	o.To = &v
}

// GetTokenId returns the TokenId field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetTokenId() string {
	if o == nil || IsNil(o.TokenId) {
		var ret string
		return ret
	}
	return *o.TokenId
}

// GetTokenIdOk returns a tuple with the TokenId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetTokenIdOk() (*string, bool) {
	if o == nil || IsNil(o.TokenId) {
		return nil, false
	}
	return o.TokenId, true
}

// HasTokenId returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasTokenId() bool {
	if o != nil && !IsNil(o.TokenId) {
		return true
	}

	return false
}

// SetTokenId gets a reference to the given string and assigns it to the TokenId field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetTokenId(v string) {
	o.TokenId = &v
}

// GetData returns the Data field value if set, zero value otherwise.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetData() string {
	if o == nil || IsNil(o.Data) {
		var ret string
		return ret
	}
	return *o.Data
}

// GetDataOk returns a tuple with the Data field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) GetDataOk() (*string, bool) {
	if o == nil || IsNil(o.Data) {
		return nil, false
	}
	return o.Data, true
}

// HasData returns a boolean if a field has been set.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) HasData() bool {
	if o != nil && !IsNil(o.Data) {
		return true
	}

	return false
}

// SetData gets a reference to the given string and assigns it to the Data field.
func (o *InterfacesIERC721SafeTransferFromRequestContractParams) SetData(v string) {
	o.Data = &v
}

func (o InterfacesIERC721SafeTransferFromRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC721SafeTransferFromRequestContractParams) ToMap() (map[string]interface{}, error) {
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
	if !IsNil(o.From) {
		toSerialize["from"] = o.From
	}
	if !IsNil(o.To) {
		toSerialize["to"] = o.To
	}
	if !IsNil(o.TokenId) {
		toSerialize["tokenId"] = o.TokenId
	}
	if !IsNil(o.Data) {
		toSerialize["data"] = o.Data
	}
	return toSerialize, nil
}

type NullableInterfacesIERC721SafeTransferFromRequestContractParams struct {
	value *InterfacesIERC721SafeTransferFromRequestContractParams
	isSet bool
}

func (v NullableInterfacesIERC721SafeTransferFromRequestContractParams) Get() *InterfacesIERC721SafeTransferFromRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIERC721SafeTransferFromRequestContractParams) Set(val *InterfacesIERC721SafeTransferFromRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC721SafeTransferFromRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC721SafeTransferFromRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC721SafeTransferFromRequestContractParams(val *InterfacesIERC721SafeTransferFromRequestContractParams) *NullableInterfacesIERC721SafeTransferFromRequestContractParams {
	return &NullableInterfacesIERC721SafeTransferFromRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIERC721SafeTransferFromRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC721SafeTransferFromRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


