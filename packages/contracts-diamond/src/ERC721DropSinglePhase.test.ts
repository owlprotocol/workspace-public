import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Account,
    Address,
    Chain,
    PublicClient,
    Transport,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    parseEther,
    numberToHex,
} from "viem";
import { localhost } from "viem/chains";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { ERC721DropPreset } from "./artifacts/ERC721DropPreset.js";
import { port } from "./test/constants.js";
import { getLocalAccount } from "@owlprotocol/viem-utils";

describe("ERC721DropPreset with Single Valid and Invalid User", () => {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    let adminWalletClient: WalletClient<Transport, Chain, Account>;
    let contractAddress: Address;

    const userWalletClients: WalletClient<Transport, Chain, Account>[] = [];
    let tree: StandardMerkleTree<any>;

    let validAddress: Address;
    let invalidAddress: Address;
    const maxClaimable = 3n;

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

        for (let i = 0; i < 2; i++) {
            const userWalletClient = createWalletClient({
                account: privateKeyToAccount(generatePrivateKey()),
                chain: localhost,
                transport,
            });
            userWalletClients.push(userWalletClient);

            const fundHash = await adminWalletClient.sendTransaction({
                to: userWalletClient.account.address,
                value: parseEther("1"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundHash });
        }

        validAddress = userWalletClients[0].account.address;
        invalidAddress = userWalletClients[1].account.address;

        const values = [[validAddress, numberToHex(maxClaimable)]];
        tree = StandardMerkleTree.of(values, ["address", "uint256"]);

        const hashDeploy = await adminWalletClient.deployContract({
            abi: ERC721DropPreset.abi,
            args: [
                adminWalletClient.account.address,
                "contractUri",
                "Token",
                "MYT",
                "baseUri",
                adminWalletClient.account.address,
                500n,
                tree.root as Address,
            ],
            bytecode: ERC721DropPreset.bytecode,
        });

        const receiptDeploy = await publicClient.waitForTransactionReceipt({ hash: hashDeploy });
        contractAddress = receiptDeploy.contractAddress!;
    });

    test("Mint and batch mint with the valid user in the Merkle Tree", async () => {
        const proof = tree.getProof(0) as Address[];

        const { request } = await publicClient.simulateContract({
            account: userWalletClients[0].account,
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "mintWithProof",
            args: [validAddress, maxClaimable, proof],
        });

        const hash = await userWalletClients[0].writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });

        const ownerOf = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "ownerOf",
            args: [1n],
        });

        expect(ownerOf).toBe(validAddress);

        const { request: batchRequest } = await publicClient.simulateContract({
            account: userWalletClients[0].account,
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "mintBatchWithProof",
            args: [[validAddress], maxClaimable, proof],
        });

        const batchHash = await userWalletClients[0].writeContract(batchRequest);
        await publicClient.waitForTransactionReceipt({ hash: batchHash });

        const ownerOfBatch = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "ownerOf",
            args: [2n],
        });

        expect(ownerOfBatch).toBe(validAddress);

        const claimed = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "getAccountClaimed",
            args: [validAddress],
        });
        expect(claimed).toBe(2n);
    });

    test("Mint with the invalid user not in the Merkle Tree should fail", async () => {
        const emptyProof: Address[] = [];

        await expect(
            publicClient.simulateContract({
                account: userWalletClients[1].account,
                address: contractAddress,
                abi: ERC721DropPreset.abi,
                functionName: "mintWithProof",
                args: [invalidAddress, maxClaimable, emptyProof],
            }),
        ).rejects.toThrowError("InvalidProof");
    });

    test("Verify getMerkleRoot", async () => {
        const merkleRoot = await publicClient.readContract({
            address: contractAddress,
            abi: ERC721DropPreset.abi,
            functionName: "getMerkleRoot",
        });

        expect(merkleRoot).toBe(tree.root);
    });
});
