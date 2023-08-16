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

// checks if the DeployTokenURIDnaRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DeployTokenURIDnaRequestContractParams{}

// DeployTokenURIDnaRequestContractParams struct for DeployTokenURIDnaRequestContractParams
type DeployTokenURIDnaRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// A string
	Var1 *string `json:"1,omitempty"`
	// An ethereum address
	Var2 *string `json:"2,omitempty"`
	// A string
	Var3 *string `json:"3,omitempty"`
	// An ethereum address
	Var4 *string `json:"4,omitempty"`
	// An ethereum address
	Var5 *string `json:"5,omitempty"`
	// An ethereum address
	Admin *string `json:"_admin,omitempty"`
	// A string
	ContractUri *string `json:"_contractUri,omitempty"`
	// An ethereum address
	BaseUriRole *string `json:"_baseUriRole,omitempty"`
	// A string
	BaseUri *string `json:"_baseUri,omitempty"`
	// An ethereum address
	DnaProviderRole *string `json:"_dnaProviderRole,omitempty"`
	// An ethereum address
	DnaProvider *string `json:"_dnaProvider,omitempty"`
}

// NewDeployTokenURIDnaRequestContractParams instantiates a new DeployTokenURIDnaRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDeployTokenURIDnaRequestContractParams() *DeployTokenURIDnaRequestContractParams {
	this := DeployTokenURIDnaRequestContractParams{}
	return &this
}

// NewDeployTokenURIDnaRequestContractParamsWithDefaults instantiates a new DeployTokenURIDnaRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDeployTokenURIDnaRequestContractParamsWithDefaults() *DeployTokenURIDnaRequestContractParams {
	this := DeployTokenURIDnaRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetVar2 returns the Var2 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar2() string {
	if o == nil || IsNil(o.Var2) {
		var ret string
		return ret
	}
	return *o.Var2
}

// GetVar2Ok returns a tuple with the Var2 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar2Ok() (*string, bool) {
	if o == nil || IsNil(o.Var2) {
		return nil, false
	}
	return o.Var2, true
}

// HasVar2 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar2() bool {
	if o != nil && !IsNil(o.Var2) {
		return true
	}

	return false
}

// SetVar2 gets a reference to the given string and assigns it to the Var2 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar2(v string) {
	o.Var2 = &v
}

// GetVar3 returns the Var3 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar3() string {
	if o == nil || IsNil(o.Var3) {
		var ret string
		return ret
	}
	return *o.Var3
}

// GetVar3Ok returns a tuple with the Var3 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar3Ok() (*string, bool) {
	if o == nil || IsNil(o.Var3) {
		return nil, false
	}
	return o.Var3, true
}

// HasVar3 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar3() bool {
	if o != nil && !IsNil(o.Var3) {
		return true
	}

	return false
}

// SetVar3 gets a reference to the given string and assigns it to the Var3 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar3(v string) {
	o.Var3 = &v
}

// GetVar4 returns the Var4 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar4() string {
	if o == nil || IsNil(o.Var4) {
		var ret string
		return ret
	}
	return *o.Var4
}

// GetVar4Ok returns a tuple with the Var4 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar4Ok() (*string, bool) {
	if o == nil || IsNil(o.Var4) {
		return nil, false
	}
	return o.Var4, true
}

// HasVar4 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar4() bool {
	if o != nil && !IsNil(o.Var4) {
		return true
	}

	return false
}

// SetVar4 gets a reference to the given string and assigns it to the Var4 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar4(v string) {
	o.Var4 = &v
}

// GetVar5 returns the Var5 field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetVar5() string {
	if o == nil || IsNil(o.Var5) {
		var ret string
		return ret
	}
	return *o.Var5
}

// GetVar5Ok returns a tuple with the Var5 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetVar5Ok() (*string, bool) {
	if o == nil || IsNil(o.Var5) {
		return nil, false
	}
	return o.Var5, true
}

// HasVar5 returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasVar5() bool {
	if o != nil && !IsNil(o.Var5) {
		return true
	}

	return false
}

// SetVar5 gets a reference to the given string and assigns it to the Var5 field.
func (o *DeployTokenURIDnaRequestContractParams) SetVar5(v string) {
	o.Var5 = &v
}

// GetAdmin returns the Admin field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetAdmin() string {
	if o == nil || IsNil(o.Admin) {
		var ret string
		return ret
	}
	return *o.Admin
}

// GetAdminOk returns a tuple with the Admin field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetAdminOk() (*string, bool) {
	if o == nil || IsNil(o.Admin) {
		return nil, false
	}
	return o.Admin, true
}

// HasAdmin returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasAdmin() bool {
	if o != nil && !IsNil(o.Admin) {
		return true
	}

	return false
}

// SetAdmin gets a reference to the given string and assigns it to the Admin field.
func (o *DeployTokenURIDnaRequestContractParams) SetAdmin(v string) {
	o.Admin = &v
}

// GetContractUri returns the ContractUri field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetContractUri() string {
	if o == nil || IsNil(o.ContractUri) {
		var ret string
		return ret
	}
	return *o.ContractUri
}

// GetContractUriOk returns a tuple with the ContractUri field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetContractUriOk() (*string, bool) {
	if o == nil || IsNil(o.ContractUri) {
		return nil, false
	}
	return o.ContractUri, true
}

// HasContractUri returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasContractUri() bool {
	if o != nil && !IsNil(o.ContractUri) {
		return true
	}

	return false
}

// SetContractUri gets a reference to the given string and assigns it to the ContractUri field.
func (o *DeployTokenURIDnaRequestContractParams) SetContractUri(v string) {
	o.ContractUri = &v
}

// GetBaseUriRole returns the BaseUriRole field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetBaseUriRole() string {
	if o == nil || IsNil(o.BaseUriRole) {
		var ret string
		return ret
	}
	return *o.BaseUriRole
}

// GetBaseUriRoleOk returns a tuple with the BaseUriRole field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetBaseUriRoleOk() (*string, bool) {
	if o == nil || IsNil(o.BaseUriRole) {
		return nil, false
	}
	return o.BaseUriRole, true
}

// HasBaseUriRole returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasBaseUriRole() bool {
	if o != nil && !IsNil(o.BaseUriRole) {
		return true
	}

	return false
}

// SetBaseUriRole gets a reference to the given string and assigns it to the BaseUriRole field.
func (o *DeployTokenURIDnaRequestContractParams) SetBaseUriRole(v string) {
	o.BaseUriRole = &v
}

// GetBaseUri returns the BaseUri field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetBaseUri() string {
	if o == nil || IsNil(o.BaseUri) {
		var ret string
		return ret
	}
	return *o.BaseUri
}

// GetBaseUriOk returns a tuple with the BaseUri field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetBaseUriOk() (*string, bool) {
	if o == nil || IsNil(o.BaseUri) {
		return nil, false
	}
	return o.BaseUri, true
}

// HasBaseUri returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasBaseUri() bool {
	if o != nil && !IsNil(o.BaseUri) {
		return true
	}

	return false
}

// SetBaseUri gets a reference to the given string and assigns it to the BaseUri field.
func (o *DeployTokenURIDnaRequestContractParams) SetBaseUri(v string) {
	o.BaseUri = &v
}

// GetDnaProviderRole returns the DnaProviderRole field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetDnaProviderRole() string {
	if o == nil || IsNil(o.DnaProviderRole) {
		var ret string
		return ret
	}
	return *o.DnaProviderRole
}

// GetDnaProviderRoleOk returns a tuple with the DnaProviderRole field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetDnaProviderRoleOk() (*string, bool) {
	if o == nil || IsNil(o.DnaProviderRole) {
		return nil, false
	}
	return o.DnaProviderRole, true
}

// HasDnaProviderRole returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasDnaProviderRole() bool {
	if o != nil && !IsNil(o.DnaProviderRole) {
		return true
	}

	return false
}

// SetDnaProviderRole gets a reference to the given string and assigns it to the DnaProviderRole field.
func (o *DeployTokenURIDnaRequestContractParams) SetDnaProviderRole(v string) {
	o.DnaProviderRole = &v
}

// GetDnaProvider returns the DnaProvider field value if set, zero value otherwise.
func (o *DeployTokenURIDnaRequestContractParams) GetDnaProvider() string {
	if o == nil || IsNil(o.DnaProvider) {
		var ret string
		return ret
	}
	return *o.DnaProvider
}

// GetDnaProviderOk returns a tuple with the DnaProvider field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *DeployTokenURIDnaRequestContractParams) GetDnaProviderOk() (*string, bool) {
	if o == nil || IsNil(o.DnaProvider) {
		return nil, false
	}
	return o.DnaProvider, true
}

// HasDnaProvider returns a boolean if a field has been set.
func (o *DeployTokenURIDnaRequestContractParams) HasDnaProvider() bool {
	if o != nil && !IsNil(o.DnaProvider) {
		return true
	}

	return false
}

// SetDnaProvider gets a reference to the given string and assigns it to the DnaProvider field.
func (o *DeployTokenURIDnaRequestContractParams) SetDnaProvider(v string) {
	o.DnaProvider = &v
}

func (o DeployTokenURIDnaRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DeployTokenURIDnaRequestContractParams) ToMap() (map[string]interface{}, error) {
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
	if !IsNil(o.Var4) {
		toSerialize["4"] = o.Var4
	}
	if !IsNil(o.Var5) {
		toSerialize["5"] = o.Var5
	}
	if !IsNil(o.Admin) {
		toSerialize["_admin"] = o.Admin
	}
	if !IsNil(o.ContractUri) {
		toSerialize["_contractUri"] = o.ContractUri
	}
	if !IsNil(o.BaseUriRole) {
		toSerialize["_baseUriRole"] = o.BaseUriRole
	}
	if !IsNil(o.BaseUri) {
		toSerialize["_baseUri"] = o.BaseUri
	}
	if !IsNil(o.DnaProviderRole) {
		toSerialize["_dnaProviderRole"] = o.DnaProviderRole
	}
	if !IsNil(o.DnaProvider) {
		toSerialize["_dnaProvider"] = o.DnaProvider
	}
	return toSerialize, nil
}

type NullableDeployTokenURIDnaRequestContractParams struct {
	value *DeployTokenURIDnaRequestContractParams
	isSet bool
}

func (v NullableDeployTokenURIDnaRequestContractParams) Get() *DeployTokenURIDnaRequestContractParams {
	return v.value
}

func (v *NullableDeployTokenURIDnaRequestContractParams) Set(val *DeployTokenURIDnaRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableDeployTokenURIDnaRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableDeployTokenURIDnaRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDeployTokenURIDnaRequestContractParams(val *DeployTokenURIDnaRequestContractParams) *NullableDeployTokenURIDnaRequestContractParams {
	return &NullableDeployTokenURIDnaRequestContractParams{value: val, isSet: true}
}

func (v NullableDeployTokenURIDnaRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDeployTokenURIDnaRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


