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

// checks if the UsersMe200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &UsersMe200Response{}

// UsersMe200Response struct for UsersMe200Response
type UsersMe200Response struct {
	Email string `json:"email"`
	ApiKey string `json:"apiKey"`
	DfnsAddress *string `json:"dfnsAddress,omitempty"`
	DfnsId *string `json:"dfnsId,omitempty"`
	DfnsStatus *string `json:"dfnsStatus,omitempty"`
	GnosisTxHash *string `json:"gnosisTxHash,omitempty"`
	GnosisAddress *string `json:"gnosisAddress,omitempty"`
	TopupTotals interface{} `json:"topupTotals,omitempty"`
}

// NewUsersMe200Response instantiates a new UsersMe200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewUsersMe200Response(email string, apiKey string) *UsersMe200Response {
	this := UsersMe200Response{}
	this.Email = email
	this.ApiKey = apiKey
	return &this
}

// NewUsersMe200ResponseWithDefaults instantiates a new UsersMe200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewUsersMe200ResponseWithDefaults() *UsersMe200Response {
	this := UsersMe200Response{}
	return &this
}

// GetEmail returns the Email field value
func (o *UsersMe200Response) GetEmail() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Email
}

// GetEmailOk returns a tuple with the Email field value
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetEmailOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Email, true
}

// SetEmail sets field value
func (o *UsersMe200Response) SetEmail(v string) {
	o.Email = v
}

// GetApiKey returns the ApiKey field value
func (o *UsersMe200Response) GetApiKey() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.ApiKey
}

// GetApiKeyOk returns a tuple with the ApiKey field value
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetApiKeyOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ApiKey, true
}

// SetApiKey sets field value
func (o *UsersMe200Response) SetApiKey(v string) {
	o.ApiKey = v
}

// GetDfnsAddress returns the DfnsAddress field value if set, zero value otherwise.
func (o *UsersMe200Response) GetDfnsAddress() string {
	if o == nil || IsNil(o.DfnsAddress) {
		var ret string
		return ret
	}
	return *o.DfnsAddress
}

// GetDfnsAddressOk returns a tuple with the DfnsAddress field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetDfnsAddressOk() (*string, bool) {
	if o == nil || IsNil(o.DfnsAddress) {
		return nil, false
	}
	return o.DfnsAddress, true
}

// HasDfnsAddress returns a boolean if a field has been set.
func (o *UsersMe200Response) HasDfnsAddress() bool {
	if o != nil && !IsNil(o.DfnsAddress) {
		return true
	}

	return false
}

// SetDfnsAddress gets a reference to the given string and assigns it to the DfnsAddress field.
func (o *UsersMe200Response) SetDfnsAddress(v string) {
	o.DfnsAddress = &v
}

// GetDfnsId returns the DfnsId field value if set, zero value otherwise.
func (o *UsersMe200Response) GetDfnsId() string {
	if o == nil || IsNil(o.DfnsId) {
		var ret string
		return ret
	}
	return *o.DfnsId
}

// GetDfnsIdOk returns a tuple with the DfnsId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetDfnsIdOk() (*string, bool) {
	if o == nil || IsNil(o.DfnsId) {
		return nil, false
	}
	return o.DfnsId, true
}

// HasDfnsId returns a boolean if a field has been set.
func (o *UsersMe200Response) HasDfnsId() bool {
	if o != nil && !IsNil(o.DfnsId) {
		return true
	}

	return false
}

// SetDfnsId gets a reference to the given string and assigns it to the DfnsId field.
func (o *UsersMe200Response) SetDfnsId(v string) {
	o.DfnsId = &v
}

// GetDfnsStatus returns the DfnsStatus field value if set, zero value otherwise.
func (o *UsersMe200Response) GetDfnsStatus() string {
	if o == nil || IsNil(o.DfnsStatus) {
		var ret string
		return ret
	}
	return *o.DfnsStatus
}

// GetDfnsStatusOk returns a tuple with the DfnsStatus field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetDfnsStatusOk() (*string, bool) {
	if o == nil || IsNil(o.DfnsStatus) {
		return nil, false
	}
	return o.DfnsStatus, true
}

// HasDfnsStatus returns a boolean if a field has been set.
func (o *UsersMe200Response) HasDfnsStatus() bool {
	if o != nil && !IsNil(o.DfnsStatus) {
		return true
	}

	return false
}

// SetDfnsStatus gets a reference to the given string and assigns it to the DfnsStatus field.
func (o *UsersMe200Response) SetDfnsStatus(v string) {
	o.DfnsStatus = &v
}

// GetGnosisTxHash returns the GnosisTxHash field value if set, zero value otherwise.
func (o *UsersMe200Response) GetGnosisTxHash() string {
	if o == nil || IsNil(o.GnosisTxHash) {
		var ret string
		return ret
	}
	return *o.GnosisTxHash
}

// GetGnosisTxHashOk returns a tuple with the GnosisTxHash field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetGnosisTxHashOk() (*string, bool) {
	if o == nil || IsNil(o.GnosisTxHash) {
		return nil, false
	}
	return o.GnosisTxHash, true
}

// HasGnosisTxHash returns a boolean if a field has been set.
func (o *UsersMe200Response) HasGnosisTxHash() bool {
	if o != nil && !IsNil(o.GnosisTxHash) {
		return true
	}

	return false
}

// SetGnosisTxHash gets a reference to the given string and assigns it to the GnosisTxHash field.
func (o *UsersMe200Response) SetGnosisTxHash(v string) {
	o.GnosisTxHash = &v
}

// GetGnosisAddress returns the GnosisAddress field value if set, zero value otherwise.
func (o *UsersMe200Response) GetGnosisAddress() string {
	if o == nil || IsNil(o.GnosisAddress) {
		var ret string
		return ret
	}
	return *o.GnosisAddress
}

// GetGnosisAddressOk returns a tuple with the GnosisAddress field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UsersMe200Response) GetGnosisAddressOk() (*string, bool) {
	if o == nil || IsNil(o.GnosisAddress) {
		return nil, false
	}
	return o.GnosisAddress, true
}

// HasGnosisAddress returns a boolean if a field has been set.
func (o *UsersMe200Response) HasGnosisAddress() bool {
	if o != nil && !IsNil(o.GnosisAddress) {
		return true
	}

	return false
}

// SetGnosisAddress gets a reference to the given string and assigns it to the GnosisAddress field.
func (o *UsersMe200Response) SetGnosisAddress(v string) {
	o.GnosisAddress = &v
}

// GetTopupTotals returns the TopupTotals field value if set, zero value otherwise (both if not set or set to explicit null).
func (o *UsersMe200Response) GetTopupTotals() interface{} {
	if o == nil {
		var ret interface{}
		return ret
	}
	return o.TopupTotals
}

// GetTopupTotalsOk returns a tuple with the TopupTotals field value if set, nil otherwise
// and a boolean to check if the value has been set.
// NOTE: If the value is an explicit nil, `nil, true` will be returned
func (o *UsersMe200Response) GetTopupTotalsOk() (*interface{}, bool) {
	if o == nil || IsNil(o.TopupTotals) {
		return nil, false
	}
	return &o.TopupTotals, true
}

// HasTopupTotals returns a boolean if a field has been set.
func (o *UsersMe200Response) HasTopupTotals() bool {
	if o != nil && IsNil(o.TopupTotals) {
		return true
	}

	return false
}

// SetTopupTotals gets a reference to the given interface{} and assigns it to the TopupTotals field.
func (o *UsersMe200Response) SetTopupTotals(v interface{}) {
	o.TopupTotals = v
}

func (o UsersMe200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o UsersMe200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["email"] = o.Email
	toSerialize["apiKey"] = o.ApiKey
	if !IsNil(o.DfnsAddress) {
		toSerialize["dfnsAddress"] = o.DfnsAddress
	}
	if !IsNil(o.DfnsId) {
		toSerialize["dfnsId"] = o.DfnsId
	}
	if !IsNil(o.DfnsStatus) {
		toSerialize["dfnsStatus"] = o.DfnsStatus
	}
	if !IsNil(o.GnosisTxHash) {
		toSerialize["gnosisTxHash"] = o.GnosisTxHash
	}
	if !IsNil(o.GnosisAddress) {
		toSerialize["gnosisAddress"] = o.GnosisAddress
	}
	if o.TopupTotals != nil {
		toSerialize["topupTotals"] = o.TopupTotals
	}
	return toSerialize, nil
}

type NullableUsersMe200Response struct {
	value *UsersMe200Response
	isSet bool
}

func (v NullableUsersMe200Response) Get() *UsersMe200Response {
	return v.value
}

func (v *NullableUsersMe200Response) Set(val *UsersMe200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableUsersMe200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableUsersMe200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableUsersMe200Response(val *UsersMe200Response) *NullableUsersMe200Response {
	return &NullableUsersMe200Response{value: val, isSet: true}
}

func (v NullableUsersMe200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableUsersMe200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


