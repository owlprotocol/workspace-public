import { describe, test, expect, beforeAll } from "vitest";
import { createPublicClient, createWalletClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { entryPoint07Address } from "viem/account-abstraction";
import { port } from "./test/constants.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { ENTRYPOINT_SALT_V07 } from "./constants.js";

describe("EntryPoint.test.ts", function () {
    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);
    const publicClient = createPublicClient({
        chain,
        transport,
    });
    const walletClient = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain,
        transport,
    });

    beforeAll(async () => {
        //Deploy DeterministicDeployer
        const { hash } = await getOrDeployDeterministicDeployer(walletClient);
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
    });

    test("EntryPoint", async () => {
        const deployParams = {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        };
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBe(entryPoint07Address);

        //Deploy new
        const resultDeploy = await getOrDeployDeterministicContract(walletClient, deployParams);
        expect(resultDeploy.address).toBe(address);

        //Wait for receipt
        const hash = resultDeploy.hash;
        if (hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing
        const resultGet = await getOrDeployDeterministicContract(walletClient, deployParams);
        expect(resultGet.existed).toBe(true);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.address).toBe(address);
    });
});
