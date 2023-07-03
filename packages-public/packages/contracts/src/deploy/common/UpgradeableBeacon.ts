import log from "loglevel";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { mapValues, omit, zipObject } from "../../lodash.js";

import { logDeployment, RunTimeEnvironment } from "../utils.js";
import { getFactories } from "../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
    NoInitFactories,
} from "../../ethers/deterministicFactories.js";
import { ERC1167FactoryAddress } from "../../utils/ERC1167Factory/index.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const UpgradeableBeaconDeploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const cloneFactoryAddress = ERC1167FactoryAddress;

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(cloneFactoryAddress);
    const deterministicFactories = getDeterministicFactories(factories, cloneFactoryAddress);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(
        factories,
        cloneFactory,
        signerAddress,
    );
    const UpgradeableBeaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const implementationFactories = omit(
        deterministicFactories,
        "UpgradeableBeacon",
        "BeaconProxy",
        "Multicall2",
    ) as NoInitFactories;

    const promises = mapValues(implementationFactories, async (factory) => {
        const implementationAddress = factory.getAddress();
        const address = UpgradeableBeaconFactory.getAddress(BEACON_ADMIN, implementationAddress);

        try {
            if (await UpgradeableBeaconFactory.exists(BEACON_ADMIN, implementationAddress)) {
                return {
                    address,
                    contract: UpgradeableBeaconFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await UpgradeableBeaconFactory.deploy(BEACON_ADMIN, implementationAddress, {
                        nonce: nonce++,
                        gasLimit: 10e6,
                        type: (network.config.eip1559 as boolean) ? 2 : 0,
                    }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = zipObject(Object.keys(promises), await Promise.all(Object.values(promises)));

    mapValues(results, ({ address, error, deployed }, name: string) => {
        if (error) {
            logDeployment(network.name, name, address, "beacon", "failed");
            log.error(error);
        } else {
            logDeployment(network.name, name, address, "beacon", deployed ? "deployed" : "exists");
        }
    });

    return results;
};

UpgradeableBeaconDeploy.tags = ["UpgradeableBeacon"];
UpgradeableBeaconDeploy.dependencies = ["Implementations"];
