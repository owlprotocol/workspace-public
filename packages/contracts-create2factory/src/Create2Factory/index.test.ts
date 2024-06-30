import { describe, test, expect, beforeAll } from "vitest";
import {
    Account,
    Chain,
    Transport,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    getCreate2Address,
    zeroAddress,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import { DETERMINISTIC_DEPLOYER_ADDRESS, getOrDeployDeterministicDeployer } from "@owlprotocol/viem-utils";
import { getOrDeployCreate2Factory } from "./deployCreate2Factory.js";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { getOrDeployContracts } from "./getTransaction.js";
import { getDeployAddress } from "./getAddress.js";
import { getLocalAccount } from "../utils/index.js";
import { MyContract } from "../artifacts/MyContract.js";
import { Create2Factory } from "../artifacts/Create2Factory.js";

describe("deployCreate2Factory.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http("http://localhost:8545/1");
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

    test("CREATE2_FACTORY_ADDRESS", () => {
        const address = getCreate2Address({
            from: DETERMINISTIC_DEPLOYER_ADDRESS,
            salt: zeroHash,
            bytecode: Create2Factory.bytecode,
        });
        expect(CREATE2_FACTORY_ADDRESS).toBe(address);
    });

    test("getOrDeployContracts", async () => {
        //Deploy Create2Factory
        const resultDeployCreate2Factory = await getOrDeployCreate2Factory({
            publicClient,
            walletClient,
        });
        expect(resultDeployCreate2Factory.address).toBe(CREATE2_FACTORY_ADDRESS);

        //Wait for receipt
        if (resultDeployCreate2Factory.hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeployCreate2Factory.hash });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing Create2Factory
        const resultGetCreate2Factory = await getOrDeployCreate2Factory({ publicClient, walletClient });
        expect(resultGetCreate2Factory.existed).toBe(true);
        expect(resultGetCreate2Factory.hash).toBeUndefined();
        expect(resultGetCreate2Factory.address).toBe(CREATE2_FACTORY_ADDRESS);

        //Deploy MyContract
        const msgSender = zeroAddress;
        const contractArgs = { bytecode: MyContract.bytecode, initData: "0x" as Hex, salt: zeroHash };
        const address = getDeployAddress(msgSender, contractArgs);

        const resultDeployMyContract = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
            contractArgs,
        ]);
        expect(resultDeployMyContract.addresses[0].address).toBe(address);

        //Wait for receipt
        if (resultDeployMyContract.hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeployMyContract.hash });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing MyContract
        const resultGetMyContract = await getOrDeployContracts({ publicClient, walletClient }, msgSender, [
            contractArgs,
        ]);
        expect(resultGetMyContract.hash).toBeUndefined();
        expect(resultGetMyContract.addresses[0].address).toBe(address);
        expect(resultGetMyContract.addresses[0].exists).toBe(true);

        const hello = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
        });
        expect(hello).toBe("Hello World");
    });
});
