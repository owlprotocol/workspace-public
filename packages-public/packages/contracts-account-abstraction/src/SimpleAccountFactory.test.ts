import { describe, test, beforeEach, expect } from "vitest";
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
    encodeDeployData,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import {
    ANVIL_MNEMONIC,
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
    getLocalAccount,
} from "@owlprotocol/contracts-create2factory";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { ENTRYPOINT_ADDRESS_V07, SIMPLE_ACCOUNT_FACTORY_ADDRESS } from "./constants.js";

describe("SimpleAccountFactory.test.ts", function () {
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
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });
    });

    test("deploy", async () => {
        const deployParams = {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: SimpleAccountFactory.abi,
                bytecode: SimpleAccountFactory.bytecode,
                args: [ENTRYPOINT_ADDRESS_V07],
            }),
        };
        //Check SimpleAccountFactory address matches expected
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBe(SIMPLE_ACCOUNT_FACTORY_ADDRESS);

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
