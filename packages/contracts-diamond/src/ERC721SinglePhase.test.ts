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
    parseEther,
    hexToBigInt,
} from "viem";
import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { ERC721SinglePhasePreset } from "./artifacts/ERC721SinglePhasePreset.js";
import { port } from "./test/constants.js";

const constructorAbi = {
    inputs: [
        {
            internalType: "address",
            name: "admin",
            type: "address",
        },
        {
            internalType: "string",
            name: "contractUri",
            type: "string",
        },
        {
            internalType: "string",
            name: "name",
            type: "string",
        },
        {
            internalType: "string",
            name: "symbol",
            type: "string",
        },
        {
            internalType: "string",
            name: "baseUri",
            type: "string",
        },
        {
            internalType: "address",
            name: "royaltyReceiver",
            type: "address",
        },
        {
            internalType: "uint96",
            name: "feeNumerator",
            type: "uint96",
        },
        {
            components: [
                {
                    internalType: "uint256",
                    name: "startTimestamp",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "endTimestamp",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "maxClaimableSupply",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "supplyClaimed",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "quantityLimitPerWallet",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "pricePerToken",
                    type: "uint256",
                },
                {
                    internalType: "address",
                    name: "currency",
                    type: "address",
                },
            ],
            internalType: "struct ERC721ClaimLib.ClaimCondition",
            name: "condition",
            type: "tuple",
        },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
};

const MAX_INT = hexToBigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

describe("ERC721SinglePhase.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Generated account on each test
    let adminWalletClient: WalletClient<Transport, Chain, Account>;
    let userWalletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        adminWalletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
    });

    beforeEach(async () => {
        userWalletClient = createWalletClient({
            account: privateKeyToAccount(generatePrivateKey()),
            chain: localhost,
            transport,
        });

        const hash = await adminWalletClient.sendTransaction({
            to: userWalletClient.account.address,
            value: parseEther("1"),
        });

        await publicClient.waitForTransactionReceipt({ hash });
    });

    test("deploy ERC721SinglePhase", async () => {
        // Deploy NFT
        const condition = {
            startTimestamp: 0n,
            endTimestamp: MAX_INT,
            maxClaimableSupply: 100n,
            supplyClaimed: 0n,
            quantityLimitPerWallet: 10n,
            pricePerToken: 1,
            currency: zeroAddress,
        };

        const hashDeploy = await adminWalletClient.deployContract({
            abi: [constructorAbi],
            args: [
                adminWalletClient.account.address,
                "contractUri",
                "name",
                "symbol",
                "baseUri",
                adminWalletClient.account.address,
                500n,
                condition,
            ],
            bytecode: ERC721SinglePhasePreset.bytecode,
        });

        const receiptDeploy = await publicClient.waitForTransactionReceipt({
            hash: hashDeploy,
        });

        const contractAddress = receiptDeploy.contractAddress!;

        // Mint token
        const { request, result } = await publicClient.simulateContract({
            account: userWalletClient.account,
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "mint",
            args: [userWalletClient.account.address],
            value: 1n,
        });
        const hash = await userWalletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });

        // Check owner
        const ownerOf = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "ownerOf",
            args: [result],
        });
        expect(ownerOf).toBe(userWalletClient.account.address);
    });
});
