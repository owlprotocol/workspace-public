import { utils } from "ethers";
import log from "loglevel";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { ERC20MintableInitializeArgs, flattenInitArgsERC20Mintable } from "../../../utils/ERC20Mintable.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";

interface Params extends RunTimeEnvironment {
    tokens: number;
    balanceTarget: number;
}
export const ERC20MintableDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");
    const cloneFactoryAddress = ERC1167FactoryAddress;

    const balanceTargetWei = utils.parseUnits(`${balanceTarget}`);

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
    //ERROR HERE
    const beaconProxyFactories = getBeaconProxyFactories(
        deterministicFactories,
        cloneFactory,
        beaconFactory,
        signerAddress,
    );
    const ERC20MintableFactory = beaconProxyFactories.ERC20Mintable;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC20MintableInitializeArgs } = {};
    for (let i = 0; i < tokens; i++) {
        const name = `ERC20Mintable-${i}`;
        deployments[name] = {
            admin: signerAddress,
            name,
            symbol: `TOK${i}`,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    //Deploy
    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC20Mintable(initArgs);
        const address = ERC20MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC20MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC20MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC20MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error, deployed: false };
        }
    });

    const results = await awaitAllObj(promises);

    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!;
            const balance = await contract.balanceOf(signerAddress);
            const deficit = balanceTargetWei.sub(balance);
            if (deficit.gt(utils.parseUnits("0"))) {
                const tx = await contract.mint(signerAddress, deficit, { nonce: nonce++ });
                return tx.wait();
            }
        }
    });
    await awaitAllObj(promisesMint);

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

ERC20MintableDeploy.tags = ["ERC20Mintable"];
ERC20MintableDeploy.dependencies = ["Implementations", "ERC1820", "UpgradeableBeacon"];
