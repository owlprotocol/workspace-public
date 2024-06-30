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
import { DETERMINISTIC_DEPLOYER_ADDRESS } from "./constants.js";
import { getOrDeployDeterministicDeployer } from "./deployDeterministicDeployer.js";
import { getOrDeployDeterministicContract } from "./getTransaction.js";
import { getDeployDeterministicAddress } from "./getAddress.js";
import { getLocalAccount } from "../accounts.js";
//Copied artifact just for testing contract deployment
import { MyContract } from "../artifacts/MyContract.js";

describe("DeterministicDeployer.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http("http://localhost:8545/1");
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

    test("getOrDeployDeterministicContract", async () => {
        //Deploy DeterministicDeployer
        const resultDeployDeterministicDeployer = await getOrDeployDeterministicDeployer({
            publicClient,
            walletClient,
        });
        expect(resultDeployDeterministicDeployer.address).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);

        //Wait for receipt
        if (resultDeployDeterministicDeployer.hash) {
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: resultDeployDeterministicDeployer.hash,
            });
            expect(receipt.contractAddress).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);
        }

        //Get existing DeterministicDeployer
        const resultGetDeterministicDeployer = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        expect(resultGetDeterministicDeployer.existed).toBe(true);
        expect(resultGetDeterministicDeployer.hash).toBeUndefined();
        expect(resultGetDeterministicDeployer.address).toBe(DETERMINISTIC_DEPLOYER_ADDRESS);

        //Deploy MyContract
        const deployParams = {
            salt: zeroHash,
            bytecode: MyContract.bytecode,
        };
        const address = getDeployDeterministicAddress(deployParams);

        const resultDeployMyContract = await getOrDeployDeterministicContract(
            { publicClient, walletClient },
            deployParams,
        );
        expect(resultDeployMyContract.address).toBe(address);

        //Wait for receipt
        if (resultDeployMyContract.hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeployMyContract.hash! });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing MyContract
        const resultGetMyContract = await getOrDeployDeterministicContract(
            { publicClient, walletClient },
            deployParams,
        );
        expect(resultGetMyContract.existed).toBe(true);
        expect(resultGetMyContract.hash).toBeUndefined();
        expect(resultGetMyContract.address).toBe(address);

        const hello = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
        });
        expect(hello).toBe("Hello World");
    });
});
