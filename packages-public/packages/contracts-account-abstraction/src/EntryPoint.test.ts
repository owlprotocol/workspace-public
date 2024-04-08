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
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    ANVIL_MNEMONIC,
    getUtilityAccount,
} from "@owlprotocol/contracts-create2factory";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_SALT_V07 } from "./constants.js";

describe("EntryPoint.test.ts", function () {
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, Account>;

    beforeEach(async () => {
        const provider = ganache.provider({ wallet: { mnemonic: ANVIL_MNEMONIC }, logging: { quiet: true } });
        const transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getUtilityAccount(),
            chain: localhost,
            transport,
        });

        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });
    });

    test("EntryPoint", async () => {
        const deployParams = {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        };
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBe(ENTRYPOINT_ADDRESS_V07);

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
