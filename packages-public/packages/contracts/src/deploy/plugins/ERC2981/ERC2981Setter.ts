import log from "loglevel";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { ERC2981SetterInitializeArgs, flattenInitArgsERC2981Setter } from "../../../utils/ERC2981Setter.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";
import { BEACON_ADMIN } from "@owlprotocol/envvars";

interface Params extends RunTimeEnvironment {
    instances: number;
}
export const ERC2981SetterDeploy = async ({ provider, signers, network, instances }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");
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
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;

    //ERRORs out bc beacon is assumed to use same signer
    //TODO: Refactor
    const beaconProxyFactories = getBeaconProxyFactories(
        deterministicFactories,
        cloneFactory,
        beaconFactory,
        signerAddress,
        BEACON_ADMIN
    );
    const ERC2981SetterFactory = beaconProxyFactories.ERC2981Setter;


    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC2981SetterInitializeArgs } = {};
    for (let i = 0; i < instances; i++) {
        const name = `ERC2981Setter-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC2981Setter(initArgs);
        const address = ERC2981SetterFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC2981SetterFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC2981SetterFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC2981SetterFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises);
    return mapValues(results, (r, k) => {
        if (r.error) {
            logDeployment(network.name, k, r.address, "beacon-proxy", "failed");
            log.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, "beacon-proxy", r.deployed ? "deployed" : "exists");
        }
        return r;
    });
};

ERC2981SetterDeploy.tags = ["ERC2981Setter"];
ERC2981SetterDeploy.dependencies = ["Implementations", "UpgradeableBeacon"];
