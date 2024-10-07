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
    Address,
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
    let contractAddress: Address;
    const userWalletClients: WalletClient<Transport, Chain, Account>[] = [];

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
        userWalletClients.length = 0;

        // Create 3 user wallets
        for (let i = 0; i < 3; i++) {
            const userWalletClient = createWalletClient({
                account: privateKeyToAccount(generatePrivateKey()),
                chain: localhost,
                transport,
            });
            userWalletClients.push(userWalletClient);

            const hash = await adminWalletClient.sendTransaction({
                to: userWalletClient.account.address,
                value: parseEther("10"),
            });
            await publicClient.waitForTransactionReceipt({ hash });
        }

        const condition = {
            startTimestamp: 0n,
            endTimestamp: MAX_INT,
            maxClaimableSupply: 6n,
            supplyClaimed: 0n,
            quantityLimitPerWallet: 3n,
            pricePerToken: parseEther("1"),
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

        const receiptDeploy = await publicClient.waitForTransactionReceipt({ hash: hashDeploy });
        contractAddress = receiptDeploy.contractAddress!;
    });

    test("batch mint tokens and verify supplyClaimed", async () => {
        const recipientAddresses = userWalletClients.map((client) => client.account.address);
        const userWalletClient = userWalletClients[0];

        const { request } = await publicClient.simulateContract({
            account: userWalletClient.account,
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "mintBatch",
            args: [recipientAddresses],
            value: parseEther("3"),
        });

        const hash = await userWalletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });

        for (let i = 0; i < recipientAddresses.length; i++) {
            const ownerOf = await publicClient.readContract({
                address: contractAddress,
                abi: ERC721SinglePhasePreset.abi,
                functionName: "ownerOf",
                args: [BigInt(i + 1)],
            });

            expect(ownerOf).toBe(recipientAddresses[i]);
        }

        const claimCondition = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "getClaimCondition",
        });

        expect(claimCondition.supplyClaimed).toBe(BigInt(recipientAddresses.length));
    });

    test("should preserve supplyClaimed when updating claim conditions", async () => {
        const userWalletClient = userWalletClients[0];

        const { request } = await publicClient.simulateContract({
            account: userWalletClient.account,
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "mint",
            args: [userWalletClient.account.address],
            value: parseEther("1"),
        });

        const mintHash = await userWalletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash: mintHash });

        const initialCondition = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "getClaimCondition",
        });

        expect(initialCondition.supplyClaimed).toBe(1n);

        const updatedCondition = {
            startTimestamp: 0n,
            endTimestamp: MAX_INT,
            maxClaimableSupply: 20n,
            supplyClaimed: 0n,
            quantityLimitPerWallet: 5n,
            pricePerToken: parseEther("1"),
            currency: zeroAddress,
        };

        await adminWalletClient.writeContract({
            abi: ERC721SinglePhasePreset.abi,
            address: contractAddress,
            functionName: "setClaimCondition",
            args: [updatedCondition],
        });

        const conditionFromContract = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721SinglePhasePreset.abi,
            functionName: "getClaimCondition",
        });

        expect(conditionFromContract.maxClaimableSupply).toBe(updatedCondition.maxClaimableSupply);
        expect(conditionFromContract.quantityLimitPerWallet).toBe(updatedCondition.quantityLimitPerWallet);
        expect(conditionFromContract.supplyClaimed).toBe(1n);
    });

    test("should revert when minting exceeds quantityLimitPerWallet", async () => {
        const userWalletClient = userWalletClients[0];

        await expect(
            publicClient.simulateContract({
                account: userWalletClient.account,
                address: contractAddress,
                abi: ERC721SinglePhasePreset.abi,
                functionName: "mintBatch",
                args: [new Array(4).fill(userWalletClient.account.address)],
                value: parseEther("4"),
            }),
        ).rejects.toThrowError("ExceedsWalletLimit");
    });
    test("should revert when non-admin tries to update claim conditions", async () => {
        const nonAdminWalletClient = userWalletClients[0];

        await expect(
            nonAdminWalletClient.writeContract({
                abi: ERC721SinglePhasePreset.abi,
                address: contractAddress,
                functionName: "setClaimCondition",
                args: [
                    {
                        startTimestamp: 0n,
                        endTimestamp: MAX_INT,
                        maxClaimableSupply: 10n,
                        supplyClaimed: 0n,
                        quantityLimitPerWallet: 5n,
                        pricePerToken: 1n,
                        currency: zeroAddress,
                    },
                ],
            }),
        ).rejects.toThrowError("AccessControlRecursive: account");
    });
    test("should revert when minting exceeds maxClaimableSupply using a single mintBatch call", async () => {
        const userWalletClient = userWalletClients[0];

        const recipients = [
            ...new Array(3).fill(userWalletClients[0].account.address),
            ...new Array(2).fill(userWalletClients[1].account.address),
            ...new Array(2).fill(userWalletClients[2].account.address),
        ];

        await expect(
            publicClient.simulateContract({
                account: userWalletClient.account,
                address: contractAddress,
                abi: ERC721SinglePhasePreset.abi,
                functionName: "mintBatch",
                args: [recipients],
                value: parseEther("7"),
            }),
        ).rejects.toThrowError("ExceedsMaxClaimableSupply");
    });
});
