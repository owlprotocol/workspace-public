import { ethers, utils } from "ethers";
import {
    PRIVATE_KEY_ANVIL,
    PUBLIC_ADDRESS_0_LOCAL,
    PUBLIC_ADDRESS_1_LOCAL,
    PUBLIC_ADDRESS_FACTORY_DEPLOYER,
    PUBLIC_ADDRESS_RELAYER_LOCAL,
} from "@owlprotocol/envvars";
import { RunTimeEnvironment } from "../utils.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const BalancesDeploy = async ({ provider, network }: Omit<RunTimeEnvironment, "signer">) => {
    if (network.name == "localhost") {
        const anvil = new ethers.Wallet(PRIVATE_KEY_ANVIL, provider);
        //Fund accounts on anvil
        const addressList = [
            PUBLIC_ADDRESS_FACTORY_DEPLOYER,
            PUBLIC_ADDRESS_0_LOCAL,
            PUBLIC_ADDRESS_1_LOCAL,
            PUBLIC_ADDRESS_RELAYER_LOCAL,
        ];

        for (const address of addressList) {
            const balance = await provider.getBalance(address);
            if (balance.lt(ethers.utils.parseEther("10.0"))) {
                const tx = await anvil.sendTransaction({
                    to: address,
                    value: utils.parseEther("10.0").sub(balance),
                    gasLimit: 21000,
                    type: network.config.eip1559 ? 2 : 0,
                });
                await tx.wait(1);
            }
        }
    }
};

BalancesDeploy.tags = ["Balances"];
BalancesDeploy.dependencies = [] as string[];
