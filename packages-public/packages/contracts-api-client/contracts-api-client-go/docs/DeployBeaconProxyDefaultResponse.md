# DeployBeaconProxyDefaultResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | **string** |  | 
**Code** | **string** |  | 
**Issues** | Pointer to [**[]DeployBeaconProxyDefaultResponseIssuesInner**](DeployBeaconProxyDefaultResponseIssuesInner.md) |  | [optional] 

## Methods

### NewDeployBeaconProxyDefaultResponse

`func NewDeployBeaconProxyDefaultResponse(message string, code string, ) *DeployBeaconProxyDefaultResponse`

NewDeployBeaconProxyDefaultResponse instantiates a new DeployBeaconProxyDefaultResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDeployBeaconProxyDefaultResponseWithDefaults

`func NewDeployBeaconProxyDefaultResponseWithDefaults() *DeployBeaconProxyDefaultResponse`

NewDeployBeaconProxyDefaultResponseWithDefaults instantiates a new DeployBeaconProxyDefaultResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *DeployBeaconProxyDefaultResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *DeployBeaconProxyDefaultResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *DeployBeaconProxyDefaultResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetCode

`func (o *DeployBeaconProxyDefaultResponse) GetCode() string`

GetCode returns the Code field if non-nil, zero value otherwise.

### GetCodeOk

`func (o *DeployBeaconProxyDefaultResponse) GetCodeOk() (*string, bool)`

GetCodeOk returns a tuple with the Code field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCode

`func (o *DeployBeaconProxyDefaultResponse) SetCode(v string)`

SetCode sets Code field to given value.


### GetIssues

`func (o *DeployBeaconProxyDefaultResponse) GetIssues() []DeployBeaconProxyDefaultResponseIssuesInner`

GetIssues returns the Issues field if non-nil, zero value otherwise.

### GetIssuesOk

`func (o *DeployBeaconProxyDefaultResponse) GetIssuesOk() (*[]DeployBeaconProxyDefaultResponseIssuesInner, bool)`

GetIssuesOk returns a tuple with the Issues field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssues

`func (o *DeployBeaconProxyDefaultResponse) SetIssues(v []DeployBeaconProxyDefaultResponseIssuesInner)`

SetIssues sets Issues field to given value.

### HasIssues

`func (o *DeployBeaconProxyDefaultResponse) HasIssues() bool`

HasIssues returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


