import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { Signer, utils } from "ethers";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { logDeployment } from "../../utils.js";
import * as Create2FactoryTx from "../../Create2FactoryTx.js";
import { CREATE2_FACTORY_ETH_COST } from "../../codegen/generateCreate2FactoryTx.js";

export async function deployCreate2FactoryWithTx(signer: Signer, networkName: string, create2FactoryDeployTx: string) {
    //Check if already deployed
    const create2FactoryAddress = CREATE2_FACTORY_ADDRESS;
    const name = "Create2Factory";
    const provider = signer.provider;
    if (!provider) throw new Error("signer.provider undefined");

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
        //fund address
        const deficit = CREATE2_FACTORY_ETH_COST.sub(balance);
        console.debug(
            `Funding Proxy factory deployer (${PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER}) with ${utils.formatEther(
                deficit,
            )} ETH`,
        );
        const tx = await signer.sendTransaction({
            to: PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER,
            value: deficit,
            gasLimit: 21000,
            type: 0,
        });
        await tx.wait(1);
    }

    //Stored deployment tx
    const tx = await provider.sendTransaction(create2FactoryDeployTx);
    await tx.wait(1);

    logDeployment(networkName, name, create2FactoryAddress, "deterministic", "deployed");
    return create2FactoryAddress;
}

export async function deployCreate2Factory(signer: Signer, networkName: string, networkChainId: number) {
    //Check if already deployed
    const create2FactoryAddress = CREATE2_FACTORY_ADDRESS;
    const name = "Create2Factory";
    const provider = signer.provider;
    if (!provider) throw new Error("signer.provider undefined");

    if ((await provider.getCode(create2FactoryAddress)) != "0x") {
        logDeployment(networkName, name, create2FactoryAddress, "deterministic", "exists");
        return create2FactoryAddress;
    }

    //Check cached deployment transactions
    const chainId = networkChainId;
    const chainIdTx: string | undefined = Create2FactoryTx[`tx${chainId}` as keyof typeof Create2FactoryTx];
    if (chainIdTx) {
        return deployCreate2FactoryWithTx(signer, networkName, chainIdTx);
    } else {
        throw new Error(`Proxy factory deploy transaction not found for chainId ${chainId}`);
    }
}
