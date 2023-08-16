

# DeployBeaconProxyRequestDeployParams


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**msgSender** | **String** | An ethereum address |  [optional] |
|**salt** | **String** | Salt parameter string to deploy different contracts with identical parameteres (default: 1) |  [optional] |
|**deploymentMethod** | [**DeploymentMethodEnum**](#DeploymentMethodEnum) |  |  |
|**beaconAddress** | **String** | The address of the beacon, if used in the deployment method |  [optional] |
|**beaonAdmin** | **String** | The admin address of the beacon, if a new beacon is deployed |  [optional] |



## Enum: DeploymentMethodEnum

| Name | Value |
|---- | -----|
| DETERMINISTIC | &quot;DETERMINISTIC&quot; |
| ERC1167 | &quot;ERC1167&quot; |
| BEACON_OWL | &quot;BEACON_OWL&quot; |
| BEACON_EXISTING | &quot;BEACON_EXISTING&quot; |
| BEACON_NEW | &quot;BEACON_NEW&quot; |



