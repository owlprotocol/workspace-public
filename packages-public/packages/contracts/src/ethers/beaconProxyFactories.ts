import type { InitializeFactories, NoInitFactories, ProxyInitializeFactories } from "./deterministicFactories.js";
import type { ERC1167Factory } from "../typechain/ethers/contracts/proxy/ERC1167/ERC1167Factory.js";
import { mapValues, omit } from "../lodash.js";
import { beaconProxyFactory } from "../utils/ERC1167Factory/getBeaconProxyFactory.js";

export function getBeaconProxyFactories(
    deterministicFactories: NoInitFactories,
    cloneFactory: ERC1167Factory,
    beaconFactory: InitializeFactories["UpgradeableBeacon"],
    msgSender: string,
    beaconAdmin: string,
) {
    const factories2 = omit(
        deterministicFactories,
        "ERC1167Factory",
        "BeaconProxy",
        "UpgradeableBeacon",
        "Fallback",
        "Multicall2",
        "ERC1820Registry",
    ) as Omit<
        typeof deterministicFactories,
        "ERC1167Factory" | "BeaconProxy" | "UpgradeableBeacon" | "Fallback" | "ERC1820Registry"
    >;

    return mapValues(factories2, (f: any) => {
        const implementationAddress = f.getAddress() as string;
        const beaconAddress = beaconFactory.getAddress(beaconAdmin, implementationAddress);

        return beaconProxyFactory({
            contractFactory: f,
            cloneFactory,
            msgSender,
            beaconAddress,
            initSignature: "initialize",
        });
    }) as any as ProxyInitializeFactories;
}
