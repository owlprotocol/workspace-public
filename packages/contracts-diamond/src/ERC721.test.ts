import { describe, test, expect, beforeAll, beforeEach } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    zeroAddress,
    zeroHash,
    parseEther,
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployCreate2Factory,
    getOrDeployContracts,
    getDeployAddress,
} from "@owlprotocol/contracts-create2factory";
import { getLocalAccount, getOrDeployDeterministicDeployer } from "@owlprotocol/viem-utils";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { topupAddress } from "@owlprotocol/viem-utils";
import { symbol as symbolAbi } from "./artifacts/IERC721Metadata.js";
import { port } from "./test/constants.js";
import { getERC721DiamondDeployData, getERC721ImplementationDeployParams } from "./ERC721.js";

describe("ERC721.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Fixed account with funding `getLocalAccount(0)`
    let localWalletClient: WalletClient<Transport, Chain, Account>;
    // Generated account on each test
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        localWalletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
        //Deploy DeterministicDeployer
        const { hash: hash0 } = await getOrDeployDeterministicDeployer({
            publicClient,
            walletClient: localWalletClient,
        });
        if (hash0) {
            await publicClient.waitForTransactionReceipt({ hash: hash0 });
        }
        //Deploy Create2Factory
        const { hash: hash1 } = await getOrDeployCreate2Factory({ publicClient, walletClient: localWalletClient });
        if (hash1) {
            await publicClient.waitForTransactionReceipt({ hash: hash1 });
        }
        //Deploy implementations
        const { deployTransaction } = await getERC721ImplementationDeployParams({ publicClient });
        if (deployTransaction) {
            const deployFacetsHash = await localWalletClient.sendTransaction(deployTransaction);
            await publicClient.waitForTransactionReceipt({ hash: deployFacetsHash });
        }
    });

    beforeEach(async () => {
        walletClient = createWalletClient({
            account: privateKeyToAccount(generatePrivateKey()),
            chain: localhost,
            transport,
        });

        //Top-up EOA address
        const { hash } = await topupAddress({
            publicClient,
            walletClient: localWalletClient,
            address: walletClient.account.address,
            minBalance: parseEther("10"),
            targetBalance: parseEther("10"),
        });
        expect(hash, "Generated EOA address should have 0 balance").toBeDefined();
        await publicClient.waitForTransactionReceipt({ hash: hash! });
    });

    test("deploy ERC721 diamond", async () => {
        const diamondDeployData = getERC721DiamondDeployData({
            admin: walletClient.account.address,
            contractUri: "",
            name: "Test",
            symbol: "TEST",
            baseUri: "",
            royaltyReceiver: walletClient.account.address,
            feeNumerator: 500n,
        });

        const diamondAddress = getDeployAddress(zeroAddress, {
            salt: zeroHash,
            bytecode: diamondDeployData.deployData,
            initData: "0x",
        });

        const diamondBytecode = await publicClient.getBytecode({ address: diamondAddress });
        expect(diamondBytecode).toBeUndefined();

        const resultDeploy = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
            {
                salt: zeroHash,
                bytecode: diamondDeployData.deployData,
                initData: "0x",
            },
        ]);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.addresses[0].address).toBe(diamondAddress);

        const symbol = await publicClient.readContract({
            address: diamondAddress,
            abi: [symbolAbi],
            functionName: "symbol",
        });

        expect(symbol).toBe("TEST");
    });
});
