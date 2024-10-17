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
    getDeployDeterministicAddress,
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { topupAddress } from "@owlprotocol/viem-utils";
import { port } from "./test/constants.js";

import { DiamondCutFacet } from "./artifacts/DiamondCutFacet.js";
import { DiamondLoupeFacet } from "./artifacts/DiamondLoupeFacet.js";
import { IDiamondLoupe } from "./artifacts/IDiamondLoupe.js";
import { IDiamondCut } from "./artifacts/IDiamondCut.js";
import { MyContract } from "./artifacts/MyContract.js";

import { getAbiFunctionSelectors, getDiamondDeployData } from "./Diamond.js";
import { FacetCutAction } from "./DiamondCut.js";
import { diamondFacets, setupDiamondFacets } from "./setupDiamondFacets.js";
import { DiamondInit } from "./artifacts/DiamondInit.js";

describe("Diamond.test.ts", function () {
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
        await Promise.all(
            resultDeployDiamondFacets.transactions.map((hash) => publicClient.waitForTransactionReceipt({ hash })),
        );

        //Deploy MyContract facet
        const facet = await getOrDeployDeterministicContract(localWalletClient, {
            salt: zeroHash,
            bytecode: MyContract.bytecode,
        });
        if (facet.hash) {
            await publicClient.waitForTransactionReceipt({ hash: facet.hash });
        }
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

    test("Diamond - no init", async () => {
        //Deploy diamond
        const facets = [
            {
                facetAddress: diamondFacets.diamondCut,
                functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
            },
            {
                facetAddress: diamondFacets.diamondLoupe,
                functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
            },
        ];
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, {
            facets,
            initializers: [],
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
        const diamondBytecode = await publicClient.getCode({ address: diamondAddress });
        expect(diamondBytecode).toBeDefined();

        //Diamond Loupe
        const facets0 = await publicClient.readContract({
            address: diamondAddress,
            abi: IDiamondLoupe.abi,
            functionName: "facets",
        });
        expect(facets0.length).toBe(2);
        expect(facets0).to.deep.eq(facets);
    });

    test("Diamond - single init", async () => {
        //Deploy diamond
        const facets = [
            {
                facetAddress: diamondFacets.diamondCut,
                functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
            },
            {
                facetAddress: diamondFacets.diamondLoupe,
                functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
            },
        ];
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, {
            facets,
            initializers: [
                // Diamond ERC165 initializer
                {
                    abi: DiamondInit.abi,
                    address: diamondFacets.diamondInit,
                    functionName: "initialize",
                    args: [],
                },
            ],
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
        const diamondBytecode = await publicClient.getCode({ address: diamondAddress });
        expect(diamondBytecode).toBeDefined();
    });

    test("Diamond - multi init", async () => {
        //Deploy diamond
        const facets = [
            {
                facetAddress: diamondFacets.diamondCut,
                functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
            },
            {
                facetAddress: diamondFacets.diamondLoupe,
                functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
            },
        ];
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, {
            facets,
            initializers: [
                // Diamond ERC165 initializer
                {
                    abi: DiamondInit.abi,
                    address: diamondFacets.diamondInit,
                    functionName: "initialize",
                    args: [],
                },
                {
                    abi: DiamondInit.abi,
                    address: diamondFacets.diamondInit,
                    functionName: "initialize",
                    args: [],
                },
            ],
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
        const diamondBytecode = await publicClient.getCode({ address: diamondAddress });
        expect(diamondBytecode).toBeDefined();
    });

    test("MyContract - diamondCut", async () => {
        //Deploy diamond
        const facets = [
            {
                facetAddress: diamondFacets.diamondCut,
                functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
            },
            {
                facetAddress: diamondFacets.diamondLoupe,
                functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
            },
        ];
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, {
            facets,
            initializers: [],
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
        const diamondBytecode = await publicClient.getCode({ address: diamondAddress });
        expect(diamondBytecode).toBeDefined();

        //Diamond Cut
        const facetAdd = {
            facetAddress: getDeployDeterministicAddress({
                salt: zeroHash,
                bytecode: MyContract.bytecode,
            }),
            functionSelectors: getAbiFunctionSelectors(MyContract.abi),
        };
        await walletClient.writeContract({
            address: diamondAddress,
            abi: IDiamondCut.abi,
            functionName: "diamondCut",
            args: [[{ ...facetAdd, action: FacetCutAction.Add }], zeroAddress, "0x"],
        });

        //Diamond Loupe
        const facets1 = await publicClient.readContract({
            address: diamondAddress,
            abi: IDiamondLoupe.abi,
            functionName: "facets",
        });
        expect(facets1.length).toBe(3);
        expect(facets1).to.deep.eq([...facets, facetAdd]);

        const hello = await publicClient.readContract({
            address: diamondAddress,
            abi: MyContract.abi,
            functionName: "helloWorld",
        });
        expect(hello).toBe("Hello World");
    });
});
