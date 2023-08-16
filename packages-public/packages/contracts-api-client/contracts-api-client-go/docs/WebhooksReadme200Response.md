# WebhooksReadme200Response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Email** | **string** |  | 
**ApiKey** | **string** |  | 
**DfnsAddress** | Pointer to **string** |  | [optional] 
**DfnsId** | Pointer to **string** |  | [optional] 
**DfnsStatus** | Pointer to **string** |  | [optional] 
**GnosisTxHash** | Pointer to **string** |  | [optional] 
**GnosisAddress** | Pointer to **string** |  | [optional] 
**TopupTotals** | Pointer to **interface{}** |  | [optional] 
**Authorization** | **string** |  | 

## Methods

### NewWebhooksReadme200Response

`func NewWebhooksReadme200Response(email string, apiKey string, authorization string, ) *WebhooksReadme200Response`

NewWebhooksReadme200Response instantiates a new WebhooksReadme200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWebhooksReadme200ResponseWithDefaults

`func NewWebhooksReadme200ResponseWithDefaults() *WebhooksReadme200Response`

NewWebhooksReadme200ResponseWithDefaults instantiates a new WebhooksReadme200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEmail

`func (o *WebhooksReadme200Response) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *WebhooksReadme200Response) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *WebhooksReadme200Response) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetApiKey

`func (o *WebhooksReadme200Response) GetApiKey() string`

GetApiKey returns the ApiKey field if non-nil, zero value otherwise.

### GetApiKeyOk

`func (o *WebhooksReadme200Response) GetApiKeyOk() (*string, bool)`

GetApiKeyOk returns a tuple with the ApiKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApiKey

`func (o *WebhooksReadme200Response) SetApiKey(v string)`

SetApiKey sets ApiKey field to given value.


### GetDfnsAddress

`func (o *WebhooksReadme200Response) GetDfnsAddress() string`

GetDfnsAddress returns the DfnsAddress field if non-nil, zero value otherwise.

### GetDfnsAddressOk

`func (o *WebhooksReadme200Response) GetDfnsAddressOk() (*string, bool)`

GetDfnsAddressOk returns a tuple with the DfnsAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDfnsAddress

`func (o *WebhooksReadme200Response) SetDfnsAddress(v string)`

SetDfnsAddress sets DfnsAddress field to given value.

### HasDfnsAddress

`func (o *WebhooksReadme200Response) HasDfnsAddress() bool`

HasDfnsAddress returns a boolean if a field has been set.

### GetDfnsId

`func (o *WebhooksReadme200Response) GetDfnsId() string`

GetDfnsId returns the DfnsId field if non-nil, zero value otherwise.

### GetDfnsIdOk

`func (o *WebhooksReadme200Response) GetDfnsIdOk() (*string, bool)`

GetDfnsIdOk returns a tuple with the DfnsId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDfnsId

`func (o *WebhooksReadme200Response) SetDfnsId(v string)`

SetDfnsId sets DfnsId field to given value.

### HasDfnsId

`func (o *WebhooksReadme200Response) HasDfnsId() bool`

HasDfnsId returns a boolean if a field has been set.

### GetDfnsStatus

`func (o *WebhooksReadme200Response) GetDfnsStatus() string`

GetDfnsStatus returns the DfnsStatus field if non-nil, zero value otherwise.

### GetDfnsStatusOk

`func (o *WebhooksReadme200Response) GetDfnsStatusOk() (*string, bool)`

GetDfnsStatusOk returns a tuple with the DfnsStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDfnsStatus

`func (o *WebhooksReadme200Response) SetDfnsStatus(v string)`

SetDfnsStatus sets DfnsStatus field to given value.

### HasDfnsStatus

`func (o *WebhooksReadme200Response) HasDfnsStatus() bool`

HasDfnsStatus returns a boolean if a field has been set.

### GetGnosisTxHash

`func (o *WebhooksReadme200Response) GetGnosisTxHash() string`

GetGnosisTxHash returns the GnosisTxHash field if non-nil, zero value otherwise.

### GetGnosisTxHashOk

`func (o *WebhooksReadme200Response) GetGnosisTxHashOk() (*string, bool)`

GetGnosisTxHashOk returns a tuple with the GnosisTxHash field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGnosisTxHash

`func (o *WebhooksReadme200Response) SetGnosisTxHash(v string)`

SetGnosisTxHash sets GnosisTxHash field to given value.

### HasGnosisTxHash

`func (o *WebhooksReadme200Response) HasGnosisTxHash() bool`

HasGnosisTxHash returns a boolean if a field has been set.

### GetGnosisAddress

`func (o *WebhooksReadme200Response) GetGnosisAddress() string`

GetGnosisAddress returns the GnosisAddress field if non-nil, zero value otherwise.

### GetGnosisAddressOk

`func (o *WebhooksReadme200Response) GetGnosisAddressOk() (*string, bool)`

GetGnosisAddressOk returns a tuple with the GnosisAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGnosisAddress

`func (o *WebhooksReadme200Response) SetGnosisAddress(v string)`

SetGnosisAddress sets GnosisAddress field to given value.

### HasGnosisAddress

`func (o *WebhooksReadme200Response) HasGnosisAddress() bool`

HasGnosisAddress returns a boolean if a field has been set.

### GetTopupTotals

`func (o *WebhooksReadme200Response) GetTopupTotals() interface{}`

GetTopupTotals returns the TopupTotals field if non-nil, zero value otherwise.

### GetTopupTotalsOk

`func (o *WebhooksReadme200Response) GetTopupTotalsOk() (*interface{}, bool)`

GetTopupTotalsOk returns a tuple with the TopupTotals field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopupTotals

`func (o *WebhooksReadme200Response) SetTopupTotals(v interface{})`

SetTopupTotals sets TopupTotals field to given value.

### HasTopupTotals

`func (o *WebhooksReadme200Response) HasTopupTotals() bool`

HasTopupTotals returns a boolean if a field has been set.

### SetTopupTotalsNil

`func (o *WebhooksReadme200Response) SetTopupTotalsNil(b bool)`

 SetTopupTotalsNil sets the value for TopupTotals to be an explicit nil

### UnsetTopupTotals
`func (o *WebhooksReadme200Response) UnsetTopupTotals()`

UnsetTopupTotals ensures that no value is present for TopupTotals, not even an explicit nil
### GetAuthorization

`func (o *WebhooksReadme200Response) GetAuthorization() string`

GetAuthorization returns the Authorization field if non-nil, zero value otherwise.

### GetAuthorizationOk

`func (o *WebhooksReadme200Response) GetAuthorizationOk() (*string, bool)`

GetAuthorizationOk returns a tuple with the Authorization field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAuthorization

`func (o *WebhooksReadme200Response) SetAuthorization(v string)`

SetAuthorization sets Authorization field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


