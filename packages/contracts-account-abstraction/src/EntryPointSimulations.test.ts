import { describe, test, expect, beforeEach } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    CustomTransport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    zeroHash,
    hexToBytes,
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    DEFAULT_GANACHE_CONFIG,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { EntryPointSimulations } from "./artifacts/EntryPointSimulations.js";

describe("EntryPointSimulations.test.ts", function () {
    test("EntryPointSimulations - codesize", async () => {
        const codeSize = hexToBytes(EntryPointSimulations.bytecode).length;
        expect(codeSize).toBeLessThanOrEqual(24576);
    });

    describe("deploy", () => {
        let publicClient: PublicClient<CustomTransport, Chain>;
        let walletClient: WalletClient<CustomTransport, Chain, Account>;

        beforeEach(async () => {
            const provider = ganache.provider(DEFAULT_GANACHE_CONFIG);
            const transport = custom(provider);
            //const transport = http(localhost.rpcUrls.default.http[0]);
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
            const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
            await publicClient.waitForTransactionReceipt({ hash: hash! });
        });

        test("EntryPointSimulations", async () => {
            const deployParams = {
                salt: zeroHash,
                bytecode: EntryPointSimulations.bytecode,
            };
            const address = getDeployDeterministicAddress(deployParams);

            //Deploy new
            const resultDeploy = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
            expect(resultDeploy.existed).toBe(false);
            expect(resultDeploy.hash).toBeDefined();
            expect(resultDeploy.address).toBe(address);

            //Wait for receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);

            //Get existing
            const resultGet = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
            expect(resultGet.existed).toBe(true);
            expect(resultGet.hash).toBeUndefined();
            expect(resultGet.address).toBe(address);
        });
    });
});
