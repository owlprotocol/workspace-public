# DeployTokenDnaRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DeployParams** | [**DeployBeaconProxyRequestDeployParams**](DeployBeaconProxyRequestDeployParams.md) |  | 
**ContractParams** | [**DeployTokenDnaRequestContractParams**](DeployTokenDnaRequestContractParams.md) |  | 

## Methods

### NewDeployTokenDnaRequest

`func NewDeployTokenDnaRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployTokenDnaRequestContractParams, ) *DeployTokenDnaRequest`

NewDeployTokenDnaRequest instantiates a new DeployTokenDnaRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployTokenDnaRequestWithDefaults

`func NewDeployTokenDnaRequestWithDefaults() *DeployTokenDnaRequest`

NewDeployTokenDnaRequestWithDefaults instantiates a new DeployTokenDnaRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDeployParams

`func (o *DeployTokenDnaRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams`

GetDeployParams returns the DeployParams field if non-nil, zero value otherwise.

### GetDeployParamsOk

`func (o *DeployTokenDnaRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool)`

GetDeployParamsOk returns a tuple with the DeployParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeployParams

`func (o *DeployTokenDnaRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams)`

SetDeployParams sets DeployParams field to given value.


### GetContractParams

`func (o *DeployTokenDnaRequest) GetContractParams() DeployTokenDnaRequestContractParams`

GetContractParams returns the ContractParams field if non-nil, zero value otherwise.

### GetContractParamsOk

`func (o *DeployTokenDnaRequest) GetContractParamsOk() (*DeployTokenDnaRequestContractParams, bool)`

GetContractParamsOk returns a tuple with the ContractParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContractParams

`func (o *DeployTokenDnaRequest) SetContractParams(v DeployTokenDnaRequestContractParams)`

SetContractParams sets ContractParams field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


