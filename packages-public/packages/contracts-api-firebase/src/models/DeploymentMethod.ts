//Generate factories
export enum DeploymentMethod {
    /* Regular deterministic deployment */
    DETERMINISTIC = "DETERMINISTIC",
    /* Minimal proxy deployment, reduces upfront gas cost */
    ERC1167 = "ERC1167",
    /* Beacon proxy deployment, upgradeable, uses Owl Protocol default beacons */
    BEACON_OWL = "BEACON_OWL",
    /* Beacon proxy deployment, upgradeable, uses existing beacon */
    BEACON_EXISTING = "BEACON_EXISTING",
    /* Beacon proxy deployment, upgradeable, deploys new beacon */
    BEACON_NEW = "BEACON_NEW",
}
