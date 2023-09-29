import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { getAnvilSigner } from "@owlprotocol/utils-ethers";
import { utils } from "ethers";
import { RunTimeEnvironment, logDeployment } from "../utils.js";
import * as Create2FactoryTx from "../Create2FactoryTx.js";
import { CREATE2_FACTORY_ETH_COST } from "../codegen/generateCreate2FactoryTx.js";
import { CREATE2_FACTORY_ADDRESS } from "../utils/Create2Factory/Create2FactoryAddress.js";

export const Create2FactoryDeploy = async ({ provider, network }: Omit<RunTimeEnvironment, "signer">) => {
    //Check if already deployed
    const cloneFactoryAddress = CREATE2_FACTORY_ADDRESS;
    const name = "Create2Factory";

    if ((await provider.getCode(cloneFactoryAddress)) != "0x") {
        logDeployment(network.name, name, cloneFactoryAddress, "deterministic", "exists");
        return cloneFactoryAddress;
    }

    const nonce = await provider.getTransactionCount(PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER);
    if (nonce != 0) {
        throw new Error(
            `FactoryDeployer not deployed at ${cloneFactoryAddress} and signerAddress ${PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER}.nonce = ${nonce} > 0`,
        );
    }

    const balance = await provider.getBalance(PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER);
    if (balance.lt(CREATE2_FACTORY_ETH_COST)) {
        if (network.name != "localhost") {
            throw new Error(
                `Proxy factory deployer (${PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER}) balance too low (< ${balance} wei). Please fund deployer`,
            );
        } else {
            //Localhost, fund address
            const deficit = CREATE2_FACTORY_ETH_COST.sub(balance);
            console.debug(
                `Running on localhost, funding Proxy factory deployer (${PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER}) with ${utils.formatEther(
                    deficit,
                )} ETH`,
            );
            const signer = getAnvilSigner(1).connect(provider);
            const tx = await signer.sendTransaction({
                to: PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER,
                value: deficit,
                gasLimit: 21000,
                type: network.config.eip1559 ? 2 : 0,
            });
            await tx.wait(1);
        }
    }

    //Check cached deployment transactions
    const chainId = network.config.chainId;
    const chainIdTx: string | undefined = Create2FactoryTx[`tx${chainId}` as keyof typeof Create2FactoryTx];
    if (chainIdTx) {
        //Stored deployment tx
        const tx = await provider.sendTransaction(chainIdTx);
        await tx.wait(1);
    } else {
        throw new Error(`Proxy factory deploy transaction not found for chainId ${chainId}`);
    }

    logDeployment(network.name, name, cloneFactoryAddress, "deterministic", "deployed");
    return cloneFactoryAddress;
};

Create2FactoryDeploy.tags = ["Create2Factory"];
Create2FactoryDeploy.dependencies = [] as string[];
