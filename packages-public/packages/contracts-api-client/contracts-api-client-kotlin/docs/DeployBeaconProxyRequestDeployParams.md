
# DeployBeaconProxyRequestDeployParams

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**deploymentMethod** | [**inline**](#DeploymentMethod) |  | 
**msgSender** | **kotlin.String** | An ethereum address |  [optional]
**salt** | **kotlin.String** | Salt parameter string to deploy different contracts with identical parameteres (default: 1) |  [optional]
**beaconAddress** | **kotlin.String** | The address of the beacon, if used in the deployment method |  [optional]
**beaonAdmin** | **kotlin.String** | The admin address of the beacon, if a new beacon is deployed |  [optional]


<a id="DeploymentMethod"></a>
## Enum: deploymentMethod
Name | Value
---- | -----
deploymentMethod | DETERMINISTIC, ERC1167, BEACON_OWL, BEACON_EXISTING, BEACON_NEW



