import { mapValues } from "../lodash.js";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";

//Implementations
export const factoryClasses =  {
    BeaconProxy: contracts.beacon.BeaconProxy__factory,
    UpgradeableBeacon: contracts.beacon.UpgradeableBeacon__factory
} as const

export const factories = mapValues(factoryClasses, (f) => new f()) as {
    [K in keyof typeof factoryClasses]: InstanceType<typeof factoryClasses[K]>
}

export const abis = mapValues(factoryClasses, (f) =>  f.abi) as {
    [K in keyof typeof factoryClasses]: typeof factoryClasses[K]["abi"]
}

//Interfaces
export const factoryInterfaceClasses =  {
    IBeacon: contracts.beacon.IBeacon__factory,
    IBeaconProxy: contracts.beacon.IBeaconProxy__factory,
    IUpgradeableBeacon: contracts.beacon.IUpgradeableBeacon__factory
} as const

export const factoriesInterface = mapValues(factoryInterfaceClasses, (f) => new f()) as {
    [K in keyof typeof factoryInterfaceClasses]: InstanceType<typeof factoryInterfaceClasses[K]>
}

export const abisInterface = mapValues(factoryInterfaceClasses, (f) =>  f.abi) as {
    [K in keyof typeof factoryInterfaceClasses]: typeof factoryInterfaceClasses[K]["abi"]
}

//Proxies
export const ERC1167FactoryFactory = new contracts.erc1167.ERC1167Factory__factory();
export const BeaconProxyFactory = factories.BeaconProxy
export const UpgradeableBeaconFactory = factories.UpgradeableBeacon
