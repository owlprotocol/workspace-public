import { PRIVATE_KEY_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { Signer, Wallet, utils } from "ethers";
import { allChains } from "@owlprotocol/chains";
import { writeFileSync } from "fs";
import { ERC1167Factory__factory } from "../typechain/ethers/index.js";

/**
 * Generates a proxy factory deploy transaction with fixed config:
 * nonce: 0, make sure address is the same across networks
 * gasLimit: 600000, large enough
 * gasPrice: 100 gwei, high enough
 * type: 0 support non EIP1559 networks
 * @param signer
 * @param chainId
 * @returns
 */
export async function proxyFactoryDeployTx(signer: Signer, chainId: number) {
    return signer.signTransaction({
        data: ERC1167Factory__factory.bytecode,
        chainId,
        nonce: 0,
        gasPrice: utils.parseUnits("100", "gwei").toNumber(),
        gasLimit: 600000,
        type: 0,
    });
}

export async function getProxyFactoryTransactions() {
    const signer = new Wallet(PRIVATE_KEY_FACTORY_DEPLOYER!);
    const entries = await Promise.all(
        allChains.map(async (c) => {
            return [c.chainId, await proxyFactoryDeployTx(signer, c.chainId)] as const;
        }),
    );
    return Object.fromEntries(entries);
}

export async function genProxyFactoryTransactionsExports() {
    const transactions = await getProxyFactoryTransactions();
    const exports = Object.entries(transactions)
        .map(([networkId, tx]) => {
            return `export const tx${networkId} = "${tx}";`;
        })
        .join("\n");
    const file = `/* eslint-disable */\n${exports}`;

    writeFileSync("src/ProxyFactoryTx.ts", file);
}
