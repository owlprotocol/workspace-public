import { describe, test, expect, beforeAll } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    zeroHash,
    hexToBytes,
} from "viem";
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
    test("EntryPointSimulations - codesize", async () => {
        const codeSize = hexToBytes(EntryPointSimulations.bytecode).length;
        expect(codeSize).toBeLessThanOrEqual(24576);
    });

    describe("deploy", () => {
        let publicClient: PublicClient<Transport, Chain>;
        let walletClient: WalletClient<Transport, Chain, Account>;

        beforeAll(async () => {
            const transport = http(`http://127.0.0.1:${port}`);
            publicClient = createPublicClient({
                chain: localhost,
                transport,
            });
            walletClient = createWalletClient({
                account: getLocalAccount(0),
                chain: localhost,
                transport,
            });

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
