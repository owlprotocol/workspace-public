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
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { port } from "./test/constants.js";
import { MyContract } from "./artifacts/MyContract.js";

describe("MyContract.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}/1`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });

        //Deploy DeterministicDeployer
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
    });

    test("MyContract", async () => {
        const deployParams = {
            salt: zeroHash,
            bytecode: MyContract.bytecode,
        };
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBeDefined();

        //Deploy new
        const resultDeploy = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
        expect(resultDeploy.address).toBe(address);

        //Wait for receipt
        const hash = resultDeploy.hash;
        if (hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing
        const resultGet = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
        expect(resultGet.existed).toBe(true);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.address).toBe(address);
    });
});
