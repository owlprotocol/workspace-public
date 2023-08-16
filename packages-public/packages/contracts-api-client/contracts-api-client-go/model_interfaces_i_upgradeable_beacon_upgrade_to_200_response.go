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

// checks if the InterfacesIUpgradeableBeaconUpgradeTo200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIUpgradeableBeaconUpgradeTo200Response{}

// InterfacesIUpgradeableBeaconUpgradeTo200Response struct for InterfacesIUpgradeableBeaconUpgradeTo200Response
type InterfacesIUpgradeableBeaconUpgradeTo200Response struct {
	ContractParams InterfacesIUpgradeableBeaconUpgradeToRequestContractParams `json:"contractParams"`
	TxHash string `json:"txHash"`
}

// NewInterfacesIUpgradeableBeaconUpgradeTo200Response instantiates a new InterfacesIUpgradeableBeaconUpgradeTo200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIUpgradeableBeaconUpgradeTo200Response(contractParams InterfacesIUpgradeableBeaconUpgradeToRequestContractParams, txHash string) *InterfacesIUpgradeableBeaconUpgradeTo200Response {
	this := InterfacesIUpgradeableBeaconUpgradeTo200Response{}
	this.ContractParams = contractParams
	this.TxHash = txHash
	return &this
}

// NewInterfacesIUpgradeableBeaconUpgradeTo200ResponseWithDefaults instantiates a new InterfacesIUpgradeableBeaconUpgradeTo200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIUpgradeableBeaconUpgradeTo200ResponseWithDefaults() *InterfacesIUpgradeableBeaconUpgradeTo200Response {
	this := InterfacesIUpgradeableBeaconUpgradeTo200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) GetContractParams() InterfacesIUpgradeableBeaconUpgradeToRequestContractParams {
	if o == nil {
		var ret InterfacesIUpgradeableBeaconUpgradeToRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) GetContractParamsOk() (*InterfacesIUpgradeableBeaconUpgradeToRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) SetContractParams(v InterfacesIUpgradeableBeaconUpgradeToRequestContractParams) {
	o.ContractParams = v
}

// GetTxHash returns the TxHash field value
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) GetTxHash() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.TxHash
}

// GetTxHashOk returns a tuple with the TxHash field value
// and a boolean to check if the value has been set.
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) GetTxHashOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TxHash, true
}

// SetTxHash sets field value
func (o *InterfacesIUpgradeableBeaconUpgradeTo200Response) SetTxHash(v string) {
	o.TxHash = v
}

func (o InterfacesIUpgradeableBeaconUpgradeTo200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIUpgradeableBeaconUpgradeTo200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["txHash"] = o.TxHash
	return toSerialize, nil
}

type NullableInterfacesIUpgradeableBeaconUpgradeTo200Response struct {
	value *InterfacesIUpgradeableBeaconUpgradeTo200Response
	isSet bool
}

func (v NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) Get() *InterfacesIUpgradeableBeaconUpgradeTo200Response {
	return v.value
}

func (v *NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) Set(val *InterfacesIUpgradeableBeaconUpgradeTo200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIUpgradeableBeaconUpgradeTo200Response(val *InterfacesIUpgradeableBeaconUpgradeTo200Response) *NullableInterfacesIUpgradeableBeaconUpgradeTo200Response {
	return &NullableInterfacesIUpgradeableBeaconUpgradeTo200Response{value: val, isSet: true}
}

func (v NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIUpgradeableBeaconUpgradeTo200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


