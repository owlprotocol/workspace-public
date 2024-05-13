import { describe, test, expect, beforeEach } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import { DETERMINISTIC_DEPLOYER_ADDRESS } from "./constants.js";
import { getOrDeployDeterministicDeployer } from "./deployDeterministicDeployer.js";
import { getOrDeployDeterministicContract } from "./getTransaction.js";
import { getDeployDeterministicAddress } from "./getAddress.js";
import { DEFAULT_GANACHE_CONFIG } from "../utils.js";
import { getLocalAccount } from "../accounts.js";
//Copied artifact just for testing contract deployment
import { MyContract } from "../artifacts/MyContract.js";

describe("DeterministicDeployer.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeEach(async () => {
        const provider = ganache.provider(DEFAULT_GANACHE_CONFIG);
        const transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        }) as unknown as PublicClient<Transport, Chain>;

        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        }) as unknown as WalletClient<Transport, Chain, Account>;
    });

    test("getOrDeployDeterministicDeployer", async () => {
        console.debug(await publicClient.getBalance({ address: walletClient.account.address }));
        //Deploy new
        const resultDeploy = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        expect(resultDeploy.existed).toBe(false);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.address).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);

        //Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
        expect(receipt.contractAddress).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);

        //Get existing
        const resultGet = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        expect(resultGet.existed).toBe(true);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.address).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);
    });

    test("getOrDeployDeterministicContract", async () => {
        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });

        //Deploy hello world contract
        const deployParams = {
            salt: zeroHash,
            bytecode: MyContract.bytecode,
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

        const hello = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
        });
        expect(hello).toBe("Hello World");
    });
});