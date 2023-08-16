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

// checks if the InterfacesIERC1155MetadataURIUri200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &InterfacesIERC1155MetadataURIUri200Response{}

// InterfacesIERC1155MetadataURIUri200Response struct for InterfacesIERC1155MetadataURIUri200Response
type InterfacesIERC1155MetadataURIUri200Response struct {
	ContractParams InterfacesIERC1155MetadataURIUriRequestContractParams `json:"contractParams"`
	Result InterfacesIContractURIContractURI200ResponseResult `json:"result"`
}

// NewInterfacesIERC1155MetadataURIUri200Response instantiates a new InterfacesIERC1155MetadataURIUri200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewInterfacesIERC1155MetadataURIUri200Response(contractParams InterfacesIERC1155MetadataURIUriRequestContractParams, result InterfacesIContractURIContractURI200ResponseResult) *InterfacesIERC1155MetadataURIUri200Response {
	this := InterfacesIERC1155MetadataURIUri200Response{}
	this.ContractParams = contractParams
	this.Result = result
	return &this
}

// NewInterfacesIERC1155MetadataURIUri200ResponseWithDefaults instantiates a new InterfacesIERC1155MetadataURIUri200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewInterfacesIERC1155MetadataURIUri200ResponseWithDefaults() *InterfacesIERC1155MetadataURIUri200Response {
	this := InterfacesIERC1155MetadataURIUri200Response{}
	return &this
}

// GetContractParams returns the ContractParams field value
func (o *InterfacesIERC1155MetadataURIUri200Response) GetContractParams() InterfacesIERC1155MetadataURIUriRequestContractParams {
	if o == nil {
		var ret InterfacesIERC1155MetadataURIUriRequestContractParams
		return ret
	}

	return o.ContractParams
}

// GetContractParamsOk returns a tuple with the ContractParams field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MetadataURIUri200Response) GetContractParamsOk() (*InterfacesIERC1155MetadataURIUriRequestContractParams, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ContractParams, true
}

// SetContractParams sets field value
func (o *InterfacesIERC1155MetadataURIUri200Response) SetContractParams(v InterfacesIERC1155MetadataURIUriRequestContractParams) {
	o.ContractParams = v
}

// GetResult returns the Result field value
func (o *InterfacesIERC1155MetadataURIUri200Response) GetResult() InterfacesIContractURIContractURI200ResponseResult {
	if o == nil {
		var ret InterfacesIContractURIContractURI200ResponseResult
		return ret
	}

	return o.Result
}

// GetResultOk returns a tuple with the Result field value
// and a boolean to check if the value has been set.
func (o *InterfacesIERC1155MetadataURIUri200Response) GetResultOk() (*InterfacesIContractURIContractURI200ResponseResult, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Result, true
}

// SetResult sets field value
func (o *InterfacesIERC1155MetadataURIUri200Response) SetResult(v InterfacesIContractURIContractURI200ResponseResult) {
	o.Result = v
}

func (o InterfacesIERC1155MetadataURIUri200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o InterfacesIERC1155MetadataURIUri200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["contractParams"] = o.ContractParams
	toSerialize["result"] = o.Result
	return toSerialize, nil
}

type NullableInterfacesIERC1155MetadataURIUri200Response struct {
	value *InterfacesIERC1155MetadataURIUri200Response
	isSet bool
}

func (v NullableInterfacesIERC1155MetadataURIUri200Response) Get() *InterfacesIERC1155MetadataURIUri200Response {
	return v.value
}

func (v *NullableInterfacesIERC1155MetadataURIUri200Response) Set(val *InterfacesIERC1155MetadataURIUri200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableInterfacesIERC1155MetadataURIUri200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableInterfacesIERC1155MetadataURIUri200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableInterfacesIERC1155MetadataURIUri200Response(val *InterfacesIERC1155MetadataURIUri200Response) *NullableInterfacesIERC1155MetadataURIUri200Response {
	return &NullableInterfacesIERC1155MetadataURIUri200Response{value: val, isSet: true}
}

func (v NullableInterfacesIERC1155MetadataURIUri200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableInterfacesIERC1155MetadataURIUri200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


