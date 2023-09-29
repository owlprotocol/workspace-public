import { PUBLIC_ADDRESS_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { getAnvilSigner } from "@owlprotocol/utils-ethers";
import { utils } from "ethers";
import { ERC1167FactoryAddress } from "../utils/ERC1167Factory/getAddress.js";
import { RunTimeEnvironment, logDeployment } from "../utils.js";
import * as ProxyFactoryTx from "../ProxyFactoryTx.js";
import { PROXY_FACTORY_ETH_COST } from "../codegen/generateProxyFactoryTx.js";

export const ProxyFactoryDeploy = async ({ provider, network }: Omit<RunTimeEnvironment, "signer">) => {
    //Check if already deployed
    const cloneFactoryAddress = ERC1167FactoryAddress;
    const name = "ERC1167Factory";

    if ((await provider.getCode(cloneFactoryAddress)) != "0x") {
        logDeployment(network.name, name, cloneFactoryAddress, "deterministic", "exists");
        return cloneFactoryAddress;
    }

    const nonce = await provider.getTransactionCount(PUBLIC_ADDRESS_FACTORY_DEPLOYER);
    if (nonce != 0) {
        throw new Error(
            `FactoryDeployer not deployed at ${cloneFactoryAddress} and signerAddress ${PUBLIC_ADDRESS_FACTORY_DEPLOYER}.nonce = ${nonce} > 0`,
        );
    }

    const balance = await provider.getBalance(PUBLIC_ADDRESS_FACTORY_DEPLOYER);
    if (balance.lt(PROXY_FACTORY_ETH_COST)) {
        if (network.name != "localhost") {
            throw new Error(
                `Proxy factory deployer (${PUBLIC_ADDRESS_FACTORY_DEPLOYER}) balance too low (< ${balance} wei). Please fund deployer`,
            );
        } else {
            //Localhost, fund address
            const deficit = PROXY_FACTORY_ETH_COST.sub(balance);
            console.debug(
                `Running on localhost, funding Proxy factory deployer (${PUBLIC_ADDRESS_FACTORY_DEPLOYER}) with ${utils.formatEther(
                    deficit,
                )} ETH`,
            );
            const signer = getAnvilSigner(1).connect(provider);
            const tx = await signer.sendTransaction({
                to: PUBLIC_ADDRESS_FACTORY_DEPLOYER,
                value: deficit,
                gasLimit: 21000,
                type: network.config.eip1559 ? 2 : 0,
            });
            await tx.wait(1);
        }
    }

    //Check cached deployment transactions
    const chainId = network.config.chainId;
    const chainIdTx: string | undefined = ProxyFactoryTx[`tx${chainId}` as keyof typeof ProxyFactoryTx];
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

ProxyFactoryDeploy.tags = ["ProxyFactory"];
ProxyFactoryDeploy.dependencies = [] as string[];
