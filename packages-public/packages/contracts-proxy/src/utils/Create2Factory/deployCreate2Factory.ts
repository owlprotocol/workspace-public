import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { getAnvilSigner } from "@owlprotocol/utils-ethers";
import { utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { logDeployment } from "../../utils.js";
import * as Create2FactoryTx from "../../Create2FactoryTx.js";
import { CREATE2_FACTORY_ETH_COST } from "../../codegen/generateCreate2FactoryTx.js";

export async function deployCreate2Factory(provider: Provider, networkName: string, networkChainId: number) {
    //Check if already deployed
    const create2FactoryAddress = CREATE2_FACTORY_ADDRESS;
    const name = "Create2Factory";

    if ((await provider.getCode(create2FactoryAddress)) != "0x") {
        logDeployment(networkName, name, create2FactoryAddress, "deterministic", "exists");
        return create2FactoryAddress;
    }

    const nonce = await provider.getTransactionCount(PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER);
    if (nonce != 0) {
        throw new Error(
            `FactoryDeployer not deployed at ${create2FactoryAddress} and signerAddress ${PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER}.nonce = ${nonce} > 0`,
        );
    }

    const balance = await provider.getBalance(PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER);
    if (balance.lt(CREATE2_FACTORY_ETH_COST)) {
        if (networkName != "localhost") {
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
                type: 0,
            });
            await tx.wait(1);
        }
    }

    //Check cached deployment transactions
    const chainId = networkChainId;
    const chainIdTx: string | undefined = Create2FactoryTx[`tx${chainId}` as keyof typeof Create2FactoryTx];
    if (chainIdTx) {
        //Stored deployment tx
        const tx = await provider.sendTransaction(chainIdTx);
        await tx.wait(1);
    } else {
        throw new Error(`Proxy factory deploy transaction not found for chainId ${chainId}`);
    }

    logDeployment(networkName, name, create2FactoryAddress, "deterministic", "deployed");
    return create2FactoryAddress;
}
