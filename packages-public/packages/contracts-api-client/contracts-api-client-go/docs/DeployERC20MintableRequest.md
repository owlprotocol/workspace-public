# DeployERC20MintableRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DeployParams** | [**DeployBeaconProxyRequestDeployParams**](DeployBeaconProxyRequestDeployParams.md) |  | 
**ContractParams** | [**DeployERC20MintableRequestContractParams**](DeployERC20MintableRequestContractParams.md) |  | 

## Methods

### NewDeployERC20MintableRequest

`func NewDeployERC20MintableRequest(deployParams DeployBeaconProxyRequestDeployParams, contractParams DeployERC20MintableRequestContractParams, ) *DeployERC20MintableRequest`

NewDeployERC20MintableRequest instantiates a new DeployERC20MintableRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployERC20MintableRequestWithDefaults

`func NewDeployERC20MintableRequestWithDefaults() *DeployERC20MintableRequest`

NewDeployERC20MintableRequestWithDefaults instantiates a new DeployERC20MintableRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDeployParams

`func (o *DeployERC20MintableRequest) GetDeployParams() DeployBeaconProxyRequestDeployParams`

GetDeployParams returns the DeployParams field if non-nil, zero value otherwise.

### GetDeployParamsOk

`func (o *DeployERC20MintableRequest) GetDeployParamsOk() (*DeployBeaconProxyRequestDeployParams, bool)`

GetDeployParamsOk returns a tuple with the DeployParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeployParams

`func (o *DeployERC20MintableRequest) SetDeployParams(v DeployBeaconProxyRequestDeployParams)`

SetDeployParams sets DeployParams field to given value.


### GetContractParams

`func (o *DeployERC20MintableRequest) GetContractParams() DeployERC20MintableRequestContractParams`

GetContractParams returns the ContractParams field if non-nil, zero value otherwise.

### GetContractParamsOk

`func (o *DeployERC20MintableRequest) GetContractParamsOk() (*DeployERC20MintableRequestContractParams, bool)`

GetContractParamsOk returns a tuple with the ContractParams field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContractParams

`func (o *DeployERC20MintableRequest) SetContractParams(v DeployERC20MintableRequestContractParams)`

SetContractParams sets ContractParams field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


