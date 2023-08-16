# DeployTokenURIRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DeployParams** | [**DeployBeaconProxyRequestDeployParams**](DeployBeaconProxyRequestDeployParams.md) |  | 
**ContractParams** | [**DeployTokenURIRequestContractParams**](DeployTokenURIRequestContractParams.md) |  | 

## Methods

### NewDeployTokenURIRequest

`func NewDeployTokenURIRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployTokenURIRequestContractParams, ) *DeployTokenURIRequest`

NewDeployTokenURIRequest instantiates a new DeployTokenURIRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployTokenURIRequestWithDefaults

`func NewDeployTokenURIRequestWithDefaults() *DeployTokenURIRequest`

NewDeployTokenURIRequestWithDefaults instantiates a new DeployTokenURIRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDeployParams

`func (o *DeployTokenURIRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams`

GetDeployParams returns the DeployParams field if non-nil, zero value otherwise.

### GetDeployParamsOk

`func (o *DeployTokenURIRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool)`

GetDeployParamsOk returns a tuple with the DeployParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeployParams

`func (o *DeployTokenURIRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams)`

SetDeployParams sets DeployParams field to given value.


### GetContractParams

`func (o *DeployTokenURIRequest) GetContractParams() DeployTokenURIRequestContractParams`

GetContractParams returns the ContractParams field if non-nil, zero value otherwise.

### GetContractParamsOk

`func (o *DeployTokenURIRequest) GetContractParamsOk() (*DeployTokenURIRequestContractParams, bool)`

GetContractParamsOk returns a tuple with the ContractParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContractParams

`func (o *DeployTokenURIRequest) SetContractParams(v DeployTokenURIRequestContractParams)`

SetContractParams sets ContractParams field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


