import { PRIVATE_KEY_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { privateKeyToAccount, LocalAccount } from "viem/accounts";
import { generateBarrelFileForDir } from "@owlprotocol/utils";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
import { Create2Factory } from "../artifacts/Create2Factory.js";
import { CREATE2_FACTORY_PRESIGN_GAS_LIMIT, CREATE2_FACTORY_PRESIGN_GAS_PRICE } from "../Create2Factory/constants.js";

/**
 * Get Create2FactoryDeployer signer
 * @param signer
 */
export function getCreate2FactoryDeployer(signer?: LocalAccount | undefined): LocalAccount {
    if (signer) return signer;
    if (!PRIVATE_KEY_CREATE2FACTORY_DEPLOYER) {
        throw new Error(
            "PRIVATE_KEY_CREATE2FACTORY_DEPLOYER undefined! This is required to generate pre-signed transactions",
        );
    }

    let privateKey = PRIVATE_KEY_CREATE2FACTORY_DEPLOYER;
    if (!privateKey.startsWith("0x")) privateKey = "0x" + privateKey;
    return privateKeyToAccount(privateKey as `0x${string}`) as unknown as LocalAccount;
}
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
export async function getCreate2FactoryDeployTransaction(
    signer: LocalAccount,
    chainId: number,
    gasPrice = CREATE2_FACTORY_PRESIGN_GAS_PRICE,
    gas = CREATE2_FACTORY_PRESIGN_GAS_LIMIT,
) {
    return signer.signTransaction({
        data: Create2Factory.bytecode,
        chainId,
        nonce: 0,
        gasPrice,
        gas,
        type: "legacy",
    });
}

export async function genCreate2FactoryTransactionsExports(
    chainIds: number[] = [1337],
    transactionsDir = "./src/transactions",
    signer?: LocalAccount,
) {
    if (!existsSync(transactionsDir)) {
        mkdirSync(transactionsDir);
    }

    const signerDefined = getCreate2FactoryDeployer(signer);

    await Promise.all(
        chainIds.map(async (chainId) => {
            const transaction = await getCreate2FactoryDeployTransaction(signerDefined, chainId);
            const fileContent = `/* eslint-disable prettier/prettier */
export const tx${chainId} = "${transaction}";`;
            return writeFile(join(transactionsDir, `${chainId}.ts`), fileContent);
        }),
    );

    generateBarrelFileForDir(transactionsDir);
}

/**
 * Generate `.txt` files with signed transactions
 * @param path
 * @param fromNetworkId
 * @param toNetworkId
 */
export async function genCreate2FactoryTransactionFiles(
    path: string,
    fromNetworkId: number,
    toNetworkId: number,
    gasPrice = CREATE2_FACTORY_PRESIGN_GAS_PRICE,
    signer?: LocalAccount,
) {
    const signerDefined = getCreate2FactoryDeployer(signer);

    if (!existsSync(path)) {
        mkdirSync(path);
    }

    const batchSize = 1000;
    for (let i = fromNetworkId; i < toNetworkId + 1; i++) {
        if (i % batchSize == 1) {
            //check if batch written to
            if (existsSync(join(path, `${i}.txt`))) {
                console.debug(`${i}/${toNetworkId} exists => ${i + batchSize}/${toNetworkId}`);
                i += batchSize - 1;
                continue;
            }
        }

        const tx = await getCreate2FactoryDeployTransaction(signerDefined, i, gasPrice);
        writeFileSync(join(path, `${i}.txt`), tx);

        if (i % batchSize == 0) {
            //batch finised, log
            console.debug(`${i}/${toNetworkId}`);
        }
    }
}
