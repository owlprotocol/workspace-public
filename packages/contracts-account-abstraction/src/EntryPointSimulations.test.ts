import { describe, test, expect, beforeAll } from "vitest";
import { createPublicClient, createWalletClient, http, zeroHash, hexToBytes, nonceManager } from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { port } from "./test/constants.js";
import { EntryPointSimulations } from "./artifacts/EntryPointSimulations.js";

describe("EntryPointSimulations.test.ts", function () {
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

    test("EntryPointSimulations - codesize", async () => {
        const codeSize = hexToBytes(EntryPointSimulations.bytecode).length;
        expect(codeSize).toBeLessThanOrEqual(24576);
    });

    describe("deploy", () => {
        beforeAll(async () => {
            //Deploy Deterministic Deployer first
            const { hash } = await getOrDeployDeterministicDeployer(walletClient);
            if (hash) {
                await publicClient.waitForTransactionReceipt({ hash });
            }
        });

        test("EntryPointSimulations", async () => {
            const deployParams = {
                salt: zeroHash,
                bytecode: EntryPointSimulations.bytecode,
            };
            const address = getDeployDeterministicAddress(deployParams);

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
});
