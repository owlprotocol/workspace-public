import { describe, test, beforeEach, expect } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    encodeDeployData,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import { entryPoint07Address } from "viem/account-abstraction";

import {
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { port } from "./test/constants.js";
import { SIMPLE_ACCOUNT_FACTORY_ADDRESS } from "./constants.js";

describe("SimpleAccountFactory.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeEach(async () => {
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

    test("deploy", async () => {
        const deployParams = {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: SimpleAccountFactory.abi,
                bytecode: SimpleAccountFactory.bytecode,
                args: [entryPoint07Address],
            }),
        };
        //Check SimpleAccountFactory address matches expected
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBe(SIMPLE_ACCOUNT_FACTORY_ADDRESS);

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
