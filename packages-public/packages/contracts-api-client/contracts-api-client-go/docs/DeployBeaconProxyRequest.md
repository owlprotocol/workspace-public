# DeployBeaconProxyRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DeployParams** | [**DeployBeaconProxyRequestDeployParams**](DeployBeaconProxyRequestDeployParams.md) |  | 
**ContractParams** | [**DeployBeaconProxyRequestContractParams**](DeployBeaconProxyRequestContractParams.md) |  | 

## Methods

### NewDeployBeaconProxyRequest

`func NewDeployBeaconProxyRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployBeaconProxyRequestContractParams, ) *DeployBeaconProxyRequest`

NewDeployBeaconProxyRequest instantiates a new DeployBeaconProxyRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployBeaconProxyRequestWithDefaults

`func NewDeployBeaconProxyRequestWithDefaults() *DeployBeaconProxyRequest`

NewDeployBeaconProxyRequestWithDefaults instantiates a new DeployBeaconProxyRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDeployParams

`func (o *DeployBeaconProxyRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams`

GetDeployParams returns the DeployParams field if non-nil, zero value otherwise.

### GetDeployParamsOk

`func (o *DeployBeaconProxyRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool)`

GetDeployParamsOk returns a tuple with the DeployParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeployParams

`func (o *DeployBeaconProxyRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams)`

SetDeployParams sets DeployParams field to given value.


### GetContractParams

`func (o *DeployBeaconProxyRequest) GetContractParams() DeployBeaconProxyRequestContractParams`

GetContractParams returns the ContractParams field if non-nil, zero value otherwise.

### GetContractParamsOk

`func (o *DeployBeaconProxyRequest) GetContractParamsOk() (*DeployBeaconProxyRequestContractParams, bool)`

GetContractParamsOk returns a tuple with the ContractParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContractParams

`func (o *DeployBeaconProxyRequest) SetContractParams(v DeployBeaconProxyRequestContractParams)`

SetContractParams sets ContractParams field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


