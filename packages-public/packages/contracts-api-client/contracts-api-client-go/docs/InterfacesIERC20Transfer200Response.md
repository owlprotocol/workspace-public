# InterfacesIERC20Transfer200Response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ContractParams** | [**InterfacesIERC20TransferRequestContractParams**](InterfacesIERC20TransferRequestContractParams.md) |  | 
**TxHash** | **string** |  | 

## Methods

### NewInterfacesIERC20Transfer200Response

`func NewInterfacesIERC20Transfer200Response(contractParams InterfacesIERC20TransferRequestContractParams, txHash string, ) *InterfacesIERC20Transfer200Response`

NewInterfacesIERC20Transfer200Response instantiates a new InterfacesIERC20Transfer200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInterfacesIERC20Transfer200ResponseWithDefaults

`func NewInterfacesIERC20Transfer200ResponseWithDefaults() *InterfacesIERC20Transfer200Response`

NewInterfacesIERC20Transfer200ResponseWithDefaults instantiates a new InterfacesIERC20Transfer200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetContractParams

`func (o *InterfacesIERC20Transfer200Response) GetContractParams() InterfacesIERC20TransferRequestContractParams`

GetContractParams returns the ContractParams field if non-nil, zero value otherwise.

### GetContractParamsOk

`func (o *InterfacesIERC20Transfer200Response) GetContractParamsOk() (*InterfacesIERC20TransferRequestContractParams, bool)`

GetContractParamsOk returns a tuple with the ContractParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContractParams

`func (o *InterfacesIERC20Transfer200Response) SetContractParams(v InterfacesIERC20TransferRequestContractParams)`

SetContractParams sets ContractParams field to given value.


### GetTxHash

`func (o *InterfacesIERC20Transfer200Response) GetTxHash() string`

GetTxHash returns the TxHash field if non-nil, zero value otherwise.

### GetTxHashOk

`func (o *InterfacesIERC20Transfer200Response) GetTxHashOk() (*string, bool)`

GetTxHashOk returns a tuple with the TxHash field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxHash

`func (o *InterfacesIERC20Transfer200Response) SetTxHash(v string)`

SetTxHash sets TxHash field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


