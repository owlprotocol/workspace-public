import { describe, test, expect, beforeEach } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    CustomTransport,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    getCreate2Address,
    zeroAddress,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import { getOrDeployCreate2Factory } from "./deployCreate2Factory.js";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { getOrDeployContracts } from "./getTransaction.js";
import { getDeployAddress } from "./getAddress.js";
import { ANVIL_MNEMONIC, getLocalAccount } from "../utils/getLocalMnemonic.js";
import { DETERMINISTIC_DEPLOYER_ADDRESS, getOrDeployDeterministicDeployer } from "../DeterministicDeployer/index.js";
import { MyContract } from "../artifacts/MyContract.js";
import { Create2Factory } from "../artifacts/Create2Factory.js";

describe("deployCreate2Factory.test.ts", function () {
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, Account>;

    beforeEach(async () => {
        const provider = ganache.provider({ wallet: { mnemonic: ANVIL_MNEMONIC }, logging: { quiet: true } });
        publicClient = createPublicClient({
            chain: localhost,
            transport: custom(provider),
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport: custom(provider),
        });

        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });
    });

    test("CREATE2_FACTORY_ADDRESS", () => {
        const address = getCreate2Address({
            from: DETERMINISTIC_DEPLOYER_ADDRESS,
            salt: zeroHash,
            bytecode: Create2Factory.bytecode,
        });
        expect(CREATE2_FACTORY_ADDRESS).toBe(address);
    });

    test("getOrDeployCreate2Factory", async () => {
        //Deploy new
        const resultDeploy = await getOrDeployCreate2Factory({ publicClient, walletClient });
        expect(resultDeploy.existed).toBe(false);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.address).toBe(CREATE2_FACTORY_ADDRESS);

        //Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
        //receipt.contractAddress null since using factory
        expect(receipt.contractAddress).toBe(null);

        //Get existing
        const resultGet = await getOrDeployCreate2Factory({ publicClient, walletClient });
        expect(resultGet.existed).toBe(true);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.address).toBe(CREATE2_FACTORY_ADDRESS);
    });

    test("getOrDeployContracts", async () => {
        //Deploy Create2Factory
        const { hash } = await getOrDeployCreate2Factory({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });

        //Deploy hello world contract
        const msgSender = zeroAddress;
        const contractArgs = { bytecode: MyContract.bytecode, initData: "0x" as Hex, salt: zeroHash };
        const address = getDeployAddress(msgSender, contractArgs);

        //Deploy new
        const resultDeploy = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [contractArgs]);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.addresses[0].address).toBe(address);
        expect(resultDeploy.addresses[0].exists).toBe(false);

        //Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
        //receipt.contractAddress null since using factory
        expect(receipt.contractAddress).toBe(null);

        //Get existing
        const resultGet = await getOrDeployContracts({ publicClient, walletClient }, msgSender, [contractArgs]);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.addresses[0].address).toBe(address);
        expect(resultGet.addresses[0].exists).toBe(true);

        const hello = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
        });
        expect(hello).toBe("Hello World");
    });
});
