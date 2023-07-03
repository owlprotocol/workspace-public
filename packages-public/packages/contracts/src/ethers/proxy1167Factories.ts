import { NoInitFactories, InitializeFactories } from "./deterministicFactories.js";
import { mapValues, omit } from "../lodash.js";
import { proxy1167Factory } from "../utils/ERC1167Factory/getContractFactory.js";

export function getProxy1167Factories(factories: NoInitFactories, msgSender: string, cloneFactoryAddress: string) {
    const cloneFactory = factories.ERC1167Factory.attach(cloneFactoryAddress);
    const factories2 = omit(factories, "ERC1167Factory");

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            msgSender,
        });
    }) as NoInitFactories;
}

export function getProxy1167InitializeFactories(
    factories: NoInitFactories,
    msgSender: string,
    cloneFactoryAddress: string,
) {
    const cloneFactory = factories.ERC1167Factory.attach(cloneFactoryAddress);
    const factories2 = omit(factories, "ERC1167Factory", "Fallback", "Multicall2");

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            initSignature: "initialize",
            msgSender,
        });
    }) as InitializeFactories;
}
