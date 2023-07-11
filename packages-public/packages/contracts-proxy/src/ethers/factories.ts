import type { ContractFactory, Signer } from "ethers";
import { mapValues, omit } from "../lodash.js";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";
import { deployDeterministicFactory } from "../utils/ERC1167Factory/deployDeterministic.js";
import { cloneDeterministicFactory } from "../utils/ERC1167Factory/cloneDeterministic.js";
import { beaconProxyFactory } from "../utils/ERC1167Factory/beaconProxyFactory.js";
import { beaconFactory } from "../utils/ERC1167Factory/beaconFactory.js";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { CustomFactory } from "../utils/ERC1167Factory/factory.js";

//Proxies
export const ERC1167FactoryFactory = new contracts.erc1167.ERC1167Factory__factory();
export const BeaconProxyFactory = new contracts.beacon.BeaconProxy__factory();
export const UpgradeableBeaconFactory = new contracts.beacon.UpgradeableBeacon__factory();

export const factories = {
    BeaconProxy: BeaconProxyFactory,
    UpgradeableBeacon: UpgradeableBeaconFactory,
} as const;

//Connect general KV object of factories
export function connectFactories<F extends { [k: string]: ContractFactory | CustomFactory }>(factories: F, signer: Signer) {
    return mapValues(factories, (f) => f.connect(signer)) as typeof factories;
}

//Generate factories
export function getFactoriesWithSigner<F extends { [k: string]: ContractFactory }>(
    factories: F,
    signer?: Signer | undefined,
    beaconAdmin = BEACON_ADMIN
) {
    /** Basic factories */
    const factoriesConnected = connectFactories(factories, signer as any);
    //console.debug("factoriesConnected")

    /** Factories that deploy standalone implementations */
    const factoriesImplementations = mapValues(factoriesConnected, (f) => {
        return deployDeterministicFactory({
            contractFactory: f,
        }, signer);
    }) as { [K in keyof typeof factoriesConnected]: ReturnType<typeof deployDeterministicFactory<typeof factoriesConnected[K]>> }
    //console.debug("factoriesImplementations")

    /** Factories that deploy and initialize a smart contract */
    const factoriesDeterministic = mapValues(factoriesConnected, (f: any) => {
        return deployDeterministicFactory({
            contractFactory: f,
            initSignature: "initialize"
        }, signer);
    }) as { [K in keyof typeof factoriesConnected]: ReturnType<typeof deployDeterministicFactory<typeof factoriesConnected[K], "initialize">> }
    //console.debug("factoriesDeterministic")

    /** Factories that clone an implementation using ERC1167 */
    const factoriesClone = mapValues(factoriesImplementations, (f: any, name) => {
        return cloneDeterministicFactory({
            contractFactory: f,
            initSignature: "initialize",
            implementationAddress: f.getAddress()
        }, signer);
    }) as { [K in keyof typeof factoriesConnected]: ReturnType<typeof cloneDeterministicFactory<typeof factoriesConnected[K], "initialize">> }
    //console.debug("factoriesClone")

    /** Factories that deploy UpgradeableBeacons using standard implemenation addresses, and default beacon admin */
    const factoriesBeacons = mapValues(factoriesImplementations, (f: any) => {
        return beaconFactory({
            implementationAddress: f.getAddress(),
            beaconAdmin
        }, signer);
    }) as { [K in keyof typeof factoriesConnected]: ReturnType<typeof beaconFactory> }
    //console.debug("factoriesBeacons")

    /** Factories that deploy BeaconProxies using the standard Owl Protocol-managed beacons */
    const factoriesBeaconProxies = mapValues(factoriesBeacons, (f: any, k) => {
        return beaconProxyFactory({
            contractFactory: factories[k],
            initSignature: "initialize",
            beaconAddress: f.getAddress()
        }, signer);
    }) as { [K in keyof typeof factoriesConnected]: ReturnType<typeof beaconProxyFactory<typeof factoriesConnected[K], "initialize">> }

    return {
        factories: factoriesConnected,
        factoriesImplementations,
        factoriesDeterministic,
        factoriesClone,
        factoriesBeacons,
        factoriesBeaconProxies
    }
}

//Can't deploy with these but useful for getting addresses
const factories2 = getFactoriesWithSigner(factories);
export const factoriesImplementations = factories2.factoriesImplementations
export const factoriesDeterministic = factories2.factoriesDeterministic
export const factoriesClone = factories2.factoriesClone
export const factoriesBeacons = factories2.factoriesBeacons
export const factoriesBeaconProxies = factories2.factoriesBeaconProxies
