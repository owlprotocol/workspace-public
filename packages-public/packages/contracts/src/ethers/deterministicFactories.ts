import type { Factories } from "./factories.js";
import { factories } from "./factories.js";
import type { ERC1167Factory } from "../typechain/ethers/contracts/proxy/ERC1167/ERC1167Factory.js";
import { mapValues, omit } from "../lodash.js";
import { deterministicFactory } from "../utils/ERC1167Factory/getContractFactory.js";
import { CustomFactory } from "../utils/ERC1167Factory/factory.js";
import { ERC1167FactoryAddress } from "../utils/ERC1167Factory/getAddress.js";

export type F_Initialize = Omit<
    Factories,
    "ERC1167Factory" | "Fallback" | "Multicall2" | "ERC1820Registry" | "BlockNumber"
>;
export type F_ProxyInitialize = Omit<F_Initialize, "UpgradeableBeacon" | "BeaconProxy">;

export type NoInitFactories = {
    [K in keyof Factories]: CustomFactory<ReturnType<Factories[K]["attach"]>>;
};

export type InitializeFactories = {
    [K in keyof F_Initialize]: CustomFactory<ReturnType<F_Initialize[K]["attach"]>, "initialize">;
};

export type ProxyInitializeFactories = {
    [K in keyof F_ProxyInitialize]: CustomFactory<ReturnType<F_ProxyInitialize[K]["attach"]>, "initialize">;
};

export function getDeterministicFactories(factories: Factories, cloneFactoryAddress: string): NoInitFactories {
    const cloneFactory = factories.ERC1167Factory.attach(cloneFactoryAddress);
    const factories2 = omit(factories, "ERC1167Factory", "Multicall2");

    return mapValues(factories2, (f: any) => {
        return deterministicFactory({
            contractFactory: f,
            cloneFactory,
        });
    }) as NoInitFactories;
}

export const implementationFactories = getDeterministicFactories(factories, ERC1167FactoryAddress);
export const implementationAddresses = mapValues(implementationFactories, (f) => f.getAddress());

export function getDeterministicInitializeFactories(
    factories: Factories,
    cloneFactory: ERC1167Factory,
    msgSender: string,
): InitializeFactories {
    const factories2 = omit(factories, "ERC1167Factory", "Fallback", "Multicall2", "ERC1820Registry") as F_Initialize;

    return mapValues(factories2, (f: any) => {
        return deterministicFactory({
            contractFactory: f,
            cloneFactory,
            initSignature: "initialize",
            msgSender,
        });
    }) as InitializeFactories;
}
