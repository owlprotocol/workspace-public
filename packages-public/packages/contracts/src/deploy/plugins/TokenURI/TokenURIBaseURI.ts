import log from "loglevel";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { TokenURIBaseURIInitializeArgs, flattenInitArgsTokenURIBaseURI } from "../../../utils/TokenURIBaseURI.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";

interface Params extends RunTimeEnvironment {
    instances: number;
}
export const TokenURIBaseURIDeploy = async ({ provider, signers, network, instances }: Params) => {
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
    const beaconProxyFactories = getBeaconProxyFactories(
        deterministicFactories,
        cloneFactory,
        beaconFactory,
        signerAddress,
        BEACON_ADMIN,
    );
    const TokenURIBaseURIFactory = beaconProxyFactories.TokenURIBaseURI;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: TokenURIBaseURIInitializeArgs } = {};
    for (let i = 0; i < instances; i++) {
        const name = `TokenURIBaseURI-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsTokenURIBaseURI(initArgs);
        const address = TokenURIBaseURIFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await TokenURIBaseURIFactory.exists(...args)) {
                return {
                    address,
                    contract: TokenURIBaseURIFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await TokenURIBaseURIFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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

TokenURIBaseURIDeploy.tags = ["TokenURIBaseURI"];
TokenURIBaseURIDeploy.dependencies = ["Implementations", "UpgradeableBeacon"];
