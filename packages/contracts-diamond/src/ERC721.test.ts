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
    zeroHash,
    parseEther,
} from "viem";
import { localhost } from "viem/chains";
import {
    getDeployDeterministicAddress,
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { topupAddress } from "@owlprotocol/viem-utils";

import { symbol as symbolAbi } from "./artifacts/IERC721Metadata.js";
import { port } from "./test/constants.js";

import { getERC721DiamondDeployData } from "./ERC721.js";
import { setupERC721Facets } from "./setupERC721Facets.js";
import { setupDiamondFacets } from "./setupDiamondFacets.js";

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
        const { hash: hash0 } = await getOrDeployDeterministicDeployer(localWalletClient);
        if (hash0) {
            await publicClient.waitForTransactionReceipt({ hash: hash0 });
        }

        //Deploy Diamond facets
        const resultDeployDiamondFacets = await setupDiamondFacets(localWalletClient);
        //Deploy ERC721 facets
        const resultDeploERC721Facets = await setupERC721Facets(localWalletClient);

        const transactions = [...resultDeployDiamondFacets.transactions, ...resultDeploERC721Facets.transactions];
        await Promise.all(transactions.map((hash) => publicClient.waitForTransactionReceipt({ hash })));
    });

    beforeEach(async () => {
        walletClient = createWalletClient({
            account: privateKeyToAccount(generatePrivateKey()),
            chain: localhost,
            transport,
        });

        //Top-up EOA address
        const { hash } = await topupAddress(localWalletClient, {
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

        const diamondAddress = getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: diamondDeployData.deployData,
        });

        const resultDeploy = await getOrDeployDeterministicContract(walletClient, {
            salt: zeroHash,
            bytecode: diamondDeployData.deployData,
        });
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.address).toBe(diamondAddress);
        if (resultDeploy.hash) {
            await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash });
        }

        const diamondBytecode2 = await publicClient.getCode({ address: diamondAddress });
        expect(diamondBytecode2).toBeDefined();

        const symbol = await publicClient.readContract({
            address: diamondAddress,
            abi: [symbolAbi],
            functionName: "symbol",
        });
        expect(symbol).toBe("TEST");
    });
});
