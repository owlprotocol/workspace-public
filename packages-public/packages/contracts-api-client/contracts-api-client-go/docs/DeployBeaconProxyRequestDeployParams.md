# DeployBeaconProxyRequestDeployParams

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**MsgSender** | Pointer to **string** | An ethereum address | [optional] 
**Salt** | Pointer to **string** | Salt parameter string to deploy different contracts with identical parameteres (default: 1) | [optional] [default to "0x1"]
**DeploymentMethod** | **string** |  | 
**BeaconAddress** | Pointer to **string** | The address of the beacon, if used in the deployment method | [optional] 
**BeaonAdmin** | Pointer to **string** | The admin address of the beacon, if a new beacon is deployed | [optional] 

## Methods

### NewDeployBeaconProxyRequestDeployParams

`func NewDeployBeaconProxyRequestDeployParams(deploymentMethod string, ) *DeployBeaconProxyRequestDeployParams`

NewDeployBeaconProxyRequestDeployParams instantiates a new DeployBeaconProxyRequestDeployParams object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployBeaconProxyRequestDeployParamsWithDefaults

`func NewDeployBeaconProxyRequestDeployParamsWithDefaults() *DeployBeaconProxyRequestDeployParams`

NewDeployBeaconProxyRequestDeployParamsWithDefaults instantiates a new DeployBeaconProxyRequestDeployParams object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMsgSender

`func (o *DeployBeaconProxyRequestDeployParams) GetMsgSender() string`

GetMsgSender returns the MsgSender field if non-nil, zero value otherwise.

### GetMsgSenderOk

`func (o *DeployBeaconProxyRequestDeployParams) GetMsgSenderOk() (*string, bool)`

GetMsgSenderOk returns a tuple with the MsgSender field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMsgSender

`func (o *DeployBeaconProxyRequestDeployParams) SetMsgSender(v string)`

SetMsgSender sets MsgSender field to given value.

### HasMsgSender

`func (o *DeployBeaconProxyRequestDeployParams) HasMsgSender() bool`

HasMsgSender returns a boolean if a field has been set.

### GetSalt

`func (o *DeployBeaconProxyRequestDeployParams) GetSalt() string`

GetSalt returns the Salt field if non-nil, zero value otherwise.

### GetSaltOk

`func (o *DeployBeaconProxyRequestDeployParams) GetSaltOk() (*string, bool)`

GetSaltOk returns a tuple with the Salt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSalt

`func (o *DeployBeaconProxyRequestDeployParams) SetSalt(v string)`

SetSalt sets Salt field to given value.

### HasSalt

`func (o *DeployBeaconProxyRequestDeployParams) HasSalt() bool`

HasSalt returns a boolean if a field has been set.

### GetDeploymentMethod

`func (o *DeployBeaconProxyRequestDeployParams) GetDeploymentMethod() string`

GetDeploymentMethod returns the DeploymentMethod field if non-nil, zero value otherwise.

### GetDeploymentMethodOk

`func (o *DeployBeaconProxyRequestDeployParams) GetDeploymentMethodOk() (*string, bool)`

GetDeploymentMethodOk returns a tuple with the DeploymentMethod field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeploymentMethod

`func (o *DeployBeaconProxyRequestDeployParams) SetDeploymentMethod(v string)`

SetDeploymentMethod sets DeploymentMethod field to given value.


### GetBeaconAddress

`func (o *DeployBeaconProxyRequestDeployParams) GetBeaconAddress() string`

GetBeaconAddress returns the BeaconAddress field if non-nil, zero value otherwise.

### GetBeaconAddressOk

`func (o *DeployBeaconProxyRequestDeployParams) GetBeaconAddressOk() (*string, bool)`

GetBeaconAddressOk returns a tuple with the BeaconAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBeaconAddress

`func (o *DeployBeaconProxyRequestDeployParams) SetBeaconAddress(v string)`

SetBeaconAddress sets BeaconAddress field to given value.

### HasBeaconAddress

`func (o *DeployBeaconProxyRequestDeployParams) HasBeaconAddress() bool`

HasBeaconAddress returns a boolean if a field has been set.

### GetBeaonAdmin

`func (o *DeployBeaconProxyRequestDeployParams) GetBeaonAdmin() string`

GetBeaonAdmin returns the BeaonAdmin field if non-nil, zero value otherwise.

### GetBeaonAdminOk

`func (o *DeployBeaconProxyRequestDeployParams) GetBeaonAdminOk() (*string, bool)`

GetBeaonAdminOk returns a tuple with the BeaonAdmin field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBeaonAdmin

`func (o *DeployBeaconProxyRequestDeployParams) SetBeaonAdmin(v string)`

SetBeaonAdmin sets BeaonAdmin field to given value.

### HasBeaonAdmin

`func (o *DeployBeaconProxyRequestDeployParams) HasBeaonAdmin() bool`

HasBeaonAdmin returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


