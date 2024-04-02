import { PRIVATE_KEY_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { Signer, Wallet, utils } from "ethers";
import { allChains } from "@owlprotocol/chains";
import { writeFileSync } from "fs";
import { Create2Factory__factory } from "../typechain/ethers/index.js";

export const ETH_TX_BASE_GAS = 21000;
export const CREATE2_FACTORY_DEPLOY_GAS_LIMIT = 600000;
export const CREATE2_FACTORY_DEPLOY_GAS_PRICE = utils.parseUnits("100", "gwei");
//0.0621 ETH
export const CREATE2_FACTORY_ETH_COST = CREATE2_FACTORY_DEPLOY_GAS_PRICE.mul(
    CREATE2_FACTORY_DEPLOY_GAS_LIMIT + ETH_TX_BASE_GAS,
);
/**
 * Generates a Create2Factory deploy transaction with fixed config:
 * nonce: 0, make sure address is the same across networks
 * gasLimit: 600000, large enough
 * gasPrice: 100 gwei, high enough
 * type: 0 support non EIP1559 networks
 * @param signer
 * @param chainId
 * @returns
 */
export async function getCreate2FactoryDeployTransaction(signer: Signer, chainId: number) {
    return signer.signTransaction({
        data: Create2Factory__factory.bytecode,
        chainId,
        nonce: 0,
        gasPrice: CREATE2_FACTORY_DEPLOY_GAS_PRICE,
        gasLimit: CREATE2_FACTORY_DEPLOY_GAS_LIMIT,
        type: 0,
    });
}

export async function getCreate2FactoryTransactions() {
    const signer = new Wallet(PRIVATE_KEY_CREATE2FACTORY_DEPLOYER!);
    const entries = await Promise.all(
        allChains.map(async (c) => {
            return [c.chainId, await getCreate2FactoryDeployTransaction(signer, c.chainId)] as const;
        }),
    );
    return Object.fromEntries(entries);
}

export async function genCreate2FactoryTransactionsExports() {
    const transactions = await getCreate2FactoryTransactions();
    const exports = Object.entries(transactions)
        .map(([networkId, tx]) => {
            return `export const tx${networkId} = "${tx}";`;
        })
        .join("\n");
    const file = `/* eslint-disable */\n${exports}`;

    writeFileSync("src/Create2FactoryTx.ts", file);
}
