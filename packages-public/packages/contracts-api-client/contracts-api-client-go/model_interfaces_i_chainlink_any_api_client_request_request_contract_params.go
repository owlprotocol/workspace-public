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

// checks if the InterfacesIChainlinkAnyApiClientRequestRequestContractParams type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIChainlinkAnyApiClientRequestRequestContractParams{}

// InterfacesIChainlinkAnyApiClientRequestRequestContractParams struct for InterfacesIChainlinkAnyApiClientRequestRequestContractParams
type InterfacesIChainlinkAnyApiClientRequestRequestContractParams struct {
	// An ethereum address
	Var0 *string `json:"0,omitempty"`
	// An arbitrary length byte array
	Var1 *string `json:"1,omitempty"`
	// A solidity bytes32
	Var2 *string `json:"2,omitempty"`
	// A string
	Var3 *string `json:"3,omitempty"`
	// A string
	Var4 *string `json:"4,omitempty"`
	// A solidity uint256
	Var5 *string `json:"5,omitempty"`
	// An ethereum address
	FulfillAddress *string `json:"fulfillAddress,omitempty"`
	// An arbitrary length byte array
	FulfillPrefixData *string `json:"fulfillPrefixData,omitempty"`
	// A solidity bytes32
	ReqJobId *string `json:"reqJobId,omitempty"`
	// A string
	ReqUrl *string `json:"reqUrl,omitempty"`
	// A string
	ReqPath *string `json:"reqPath,omitempty"`
	// A solidity uint256
	ReqFee *string `json:"reqFee,omitempty"`
}

// NewInterfacesIChainlinkAnyApiClientRequestRequestContractParams instantiates a new InterfacesIChainlinkAnyApiClientRequestRequestContractParams object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIChainlinkAnyApiClientRequestRequestContractParams() *InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
	this := InterfacesIChainlinkAnyApiClientRequestRequestContractParams{}
	return &this
}

// NewInterfacesIChainlinkAnyApiClientRequestRequestContractParamsWithDefaults instantiates a new InterfacesIChainlinkAnyApiClientRequestRequestContractParams object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIChainlinkAnyApiClientRequestRequestContractParamsWithDefaults() *InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
	this := InterfacesIChainlinkAnyApiClientRequestRequestContractParams{}
	return &this
}

// GetVar0 returns the Var0 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar0() string {
	if o == nil || IsNil(o.Var0) {
		var ret string
		return ret
	}
	return *o.Var0
}

// GetVar0Ok returns a tuple with the Var0 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar0Ok() (*string, bool) {
	if o == nil || IsNil(o.Var0) {
		return nil, false
	}
	return o.Var0, true
}

// HasVar0 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar0() bool {
	if o != nil && !IsNil(o.Var0) {
		return true
	}

	return false
}

// SetVar0 gets a reference to the given string and assigns it to the Var0 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar0(v string) {
	o.Var0 = &v
}

// GetVar1 returns the Var1 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar1() string {
	if o == nil || IsNil(o.Var1) {
		var ret string
		return ret
	}
	return *o.Var1
}

// GetVar1Ok returns a tuple with the Var1 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar1Ok() (*string, bool) {
	if o == nil || IsNil(o.Var1) {
		return nil, false
	}
	return o.Var1, true
}

// HasVar1 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar1() bool {
	if o != nil && !IsNil(o.Var1) {
		return true
	}

	return false
}

// SetVar1 gets a reference to the given string and assigns it to the Var1 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar1(v string) {
	o.Var1 = &v
}

// GetVar2 returns the Var2 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar2() string {
	if o == nil || IsNil(o.Var2) {
		var ret string
		return ret
	}
	return *o.Var2
}

// GetVar2Ok returns a tuple with the Var2 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar2Ok() (*string, bool) {
	if o == nil || IsNil(o.Var2) {
		return nil, false
	}
	return o.Var2, true
}

// HasVar2 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar2() bool {
	if o != nil && !IsNil(o.Var2) {
		return true
	}

	return false
}

// SetVar2 gets a reference to the given string and assigns it to the Var2 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar2(v string) {
	o.Var2 = &v
}

// GetVar3 returns the Var3 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar3() string {
	if o == nil || IsNil(o.Var3) {
		var ret string
		return ret
	}
	return *o.Var3
}

// GetVar3Ok returns a tuple with the Var3 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar3Ok() (*string, bool) {
	if o == nil || IsNil(o.Var3) {
		return nil, false
	}
	return o.Var3, true
}

// HasVar3 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar3() bool {
	if o != nil && !IsNil(o.Var3) {
		return true
	}

	return false
}

// SetVar3 gets a reference to the given string and assigns it to the Var3 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar3(v string) {
	o.Var3 = &v
}

// GetVar4 returns the Var4 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar4() string {
	if o == nil || IsNil(o.Var4) {
		var ret string
		return ret
	}
	return *o.Var4
}

// GetVar4Ok returns a tuple with the Var4 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar4Ok() (*string, bool) {
	if o == nil || IsNil(o.Var4) {
		return nil, false
	}
	return o.Var4, true
}

// HasVar4 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar4() bool {
	if o != nil && !IsNil(o.Var4) {
		return true
	}

	return false
}

// SetVar4 gets a reference to the given string and assigns it to the Var4 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar4(v string) {
	o.Var4 = &v
}

// GetVar5 returns the Var5 field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar5() string {
	if o == nil || IsNil(o.Var5) {
		var ret string
		return ret
	}
	return *o.Var5
}

// GetVar5Ok returns a tuple with the Var5 field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetVar5Ok() (*string, bool) {
	if o == nil || IsNil(o.Var5) {
		return nil, false
	}
	return o.Var5, true
}

// HasVar5 returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasVar5() bool {
	if o != nil && !IsNil(o.Var5) {
		return true
	}

	return false
}

// SetVar5 gets a reference to the given string and assigns it to the Var5 field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetVar5(v string) {
	o.Var5 = &v
}

// GetFulfillAddress returns the FulfillAddress field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetFulfillAddress() string {
	if o == nil || IsNil(o.FulfillAddress) {
		var ret string
		return ret
	}
	return *o.FulfillAddress
}

// GetFulfillAddressOk returns a tuple with the FulfillAddress field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetFulfillAddressOk() (*string, bool) {
	if o == nil || IsNil(o.FulfillAddress) {
		return nil, false
	}
	return o.FulfillAddress, true
}

// HasFulfillAddress returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasFulfillAddress() bool {
	if o != nil && !IsNil(o.FulfillAddress) {
		return true
	}

	return false
}

// SetFulfillAddress gets a reference to the given string and assigns it to the FulfillAddress field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetFulfillAddress(v string) {
	o.FulfillAddress = &v
}

// GetFulfillPrefixData returns the FulfillPrefixData field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetFulfillPrefixData() string {
	if o == nil || IsNil(o.FulfillPrefixData) {
		var ret string
		return ret
	}
	return *o.FulfillPrefixData
}

// GetFulfillPrefixDataOk returns a tuple with the FulfillPrefixData field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetFulfillPrefixDataOk() (*string, bool) {
	if o == nil || IsNil(o.FulfillPrefixData) {
		return nil, false
	}
	return o.FulfillPrefixData, true
}

// HasFulfillPrefixData returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasFulfillPrefixData() bool {
	if o != nil && !IsNil(o.FulfillPrefixData) {
		return true
	}

	return false
}

// SetFulfillPrefixData gets a reference to the given string and assigns it to the FulfillPrefixData field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetFulfillPrefixData(v string) {
	o.FulfillPrefixData = &v
}

// GetReqJobId returns the ReqJobId field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqJobId() string {
	if o == nil || IsNil(o.ReqJobId) {
		var ret string
		return ret
	}
	return *o.ReqJobId
}

// GetReqJobIdOk returns a tuple with the ReqJobId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqJobIdOk() (*string, bool) {
	if o == nil || IsNil(o.ReqJobId) {
		return nil, false
	}
	return o.ReqJobId, true
}

// HasReqJobId returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasReqJobId() bool {
	if o != nil && !IsNil(o.ReqJobId) {
		return true
	}

	return false
}

// SetReqJobId gets a reference to the given string and assigns it to the ReqJobId field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetReqJobId(v string) {
	o.ReqJobId = &v
}

// GetReqUrl returns the ReqUrl field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqUrl() string {
	if o == nil || IsNil(o.ReqUrl) {
		var ret string
		return ret
	}
	return *o.ReqUrl
}

// GetReqUrlOk returns a tuple with the ReqUrl field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqUrlOk() (*string, bool) {
	if o == nil || IsNil(o.ReqUrl) {
		return nil, false
	}
	return o.ReqUrl, true
}

// HasReqUrl returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasReqUrl() bool {
	if o != nil && !IsNil(o.ReqUrl) {
		return true
	}

	return false
}

// SetReqUrl gets a reference to the given string and assigns it to the ReqUrl field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetReqUrl(v string) {
	o.ReqUrl = &v
}

// GetReqPath returns the ReqPath field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqPath() string {
	if o == nil || IsNil(o.ReqPath) {
		var ret string
		return ret
	}
	return *o.ReqPath
}

// GetReqPathOk returns a tuple with the ReqPath field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqPathOk() (*string, bool) {
	if o == nil || IsNil(o.ReqPath) {
		return nil, false
	}
	return o.ReqPath, true
}

// HasReqPath returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasReqPath() bool {
	if o != nil && !IsNil(o.ReqPath) {
		return true
	}

	return false
}

// SetReqPath gets a reference to the given string and assigns it to the ReqPath field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetReqPath(v string) {
	o.ReqPath = &v
}

// GetReqFee returns the ReqFee field value if set, zero value otherwise.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqFee() string {
	if o == nil || IsNil(o.ReqFee) {
		var ret string
		return ret
	}
	return *o.ReqFee
}

// GetReqFeeOk returns a tuple with the ReqFee field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) GetReqFeeOk() (*string, bool) {
	if o == nil || IsNil(o.ReqFee) {
		return nil, false
	}
	return o.ReqFee, true
}

// HasReqFee returns a boolean if a field has been set.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) HasReqFee() bool {
	if o != nil && !IsNil(o.ReqFee) {
		return true
	}

	return false
}

// SetReqFee gets a reference to the given string and assigns it to the ReqFee field.
func (o *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) SetReqFee(v string) {
	o.ReqFee = &v
}

func (o InterfacesIChainlinkAnyApiClientRequestRequestContractParams) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIChainlinkAnyApiClientRequestRequestContractParams) ToMap() (map[string]interface{}, error) {
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
	if !IsNil(o.FulfillAddress) {
		toSerialize["fulfillAddress"] = o.FulfillAddress
	}
	if !IsNil(o.FulfillPrefixData) {
		toSerialize["fulfillPrefixData"] = o.FulfillPrefixData
	}
	if !IsNil(o.ReqJobId) {
		toSerialize["reqJobId"] = o.ReqJobId
	}
	if !IsNil(o.ReqUrl) {
		toSerialize["reqUrl"] = o.ReqUrl
	}
	if !IsNil(o.ReqPath) {
		toSerialize["reqPath"] = o.ReqPath
	}
	if !IsNil(o.ReqFee) {
		toSerialize["reqFee"] = o.ReqFee
	}
	return toSerialize, nil
}

type NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams struct {
	value *InterfacesIChainlinkAnyApiClientRequestRequestContractParams
	isSet bool
}

func (v NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) Get() *InterfacesIChainlinkAnyApiClientRequestRequestContractParams {
	return v.value
}

func (v *NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) Set(val *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams(val *InterfacesIChainlinkAnyApiClientRequestRequestContractParams) *NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams {
	return &NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams{value: val, isSet: true}
}

func (v NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIChainlinkAnyApiClientRequestRequestContractParams) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

