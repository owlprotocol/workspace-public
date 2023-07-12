import * as contracts from "../typechain/ethers/factories/contracts/index.js";

//Proxies
export const ERC1167FactoryFactory = new contracts.erc1167.ERC1167Factory__factory();
export const BeaconProxyFactory = new contracts.beacon.BeaconProxy__factory();
export const UpgradeableBeaconFactory = new contracts.beacon.UpgradeableBeacon__factory();

export const factories = {
    BeaconProxy: BeaconProxyFactory,
    UpgradeableBeacon: UpgradeableBeaconFactory,
} as const;




