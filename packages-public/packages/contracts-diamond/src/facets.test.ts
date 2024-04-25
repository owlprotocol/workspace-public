import { describe, test, expect, beforeEach } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    CustomTransport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    zeroAddress,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployCreate2Factory,
    getOrDeployContracts,
    ANVIL_MNEMONIC,
    getLocalAccount,
    getOrDeployDeterministicDeployer,
    getDeployAddress,
    getOrDeployImplementations,
} from "@owlprotocol/contracts-create2factory";
import { MyContract } from "@owlprotocol/contracts-create2factory/artifacts/MyContract";
import { ERC721PresetDiamondSpec } from "./diamondSpec.js";
import {
    FacetCutAction,
    getAbiFunctionSelectors,
    getDiamondDeployData,
    getERC721DiamondDeployData,
    getERC721ImplementationDeployParams,
} from "./facets.js";
import { DiamondCutFacet } from "./artifacts/DiamondCutFacet.js";
import { DiamondLoupeFacet } from "./artifacts/DiamondLoupeFacet.js";
import { IDiamondLoupe } from "./artifacts/IDiamondLoupe.js";
import { IDiamondCut } from "./artifacts/IDiamondCut.js";
import { ERC721MintableAutoIdBaseURIFacet } from "./artifacts/ERC721MintableAutoIdBaseURIFacet.js";

describe("facets.test.ts", function () {
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
        const { hash: hash0 } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash0! });
        //Deploy Create2Factory
        const { hash: hash1 } = await getOrDeployCreate2Factory({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash1! });
    });

    test.skip("deploy implementations - manual", async () => {
        //Deploy new
        const msgSender = zeroAddress;
        const contracts = [
            ...Object.values(ERC721PresetDiamondSpec.facets).map((f) => {
                return { bytecode: f.bytecode, initData: "0x" as const, salt: zeroHash };
            }),
            ...Object.values(ERC721PresetDiamondSpec.initializers).map((f) => {
                return { bytecode: f.bytecode, initData: "0x" as const, salt: zeroHash };
            }),
        ];
        const resultDeploy = await getOrDeployContracts({ publicClient, walletClient }, msgSender, contracts);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.addresses[0].exists).toBe(false);

        //Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
        //receipt.contractAddress null since using factory
        expect(receipt.contractAddress).toBe(null);

        //Get existing
        const resultGet = await getOrDeployContracts({ publicClient, walletClient }, msgSender, contracts);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.addresses[0].exists).toBe(true);
    });

    test.skip("deploy implementations - wrapper", async () => {
        //Deploy new
        const resultDeploy = await getERC721ImplementationDeployParams({ publicClient });
        expect(resultDeploy.deployTransaction).toBeDefined();
        expect(resultDeploy.addresses[0].exists).toBe(false);

        const hash = await walletClient.sendTransaction(resultDeploy.deployTransaction!);
        await publicClient.waitForTransactionReceipt({ hash });

        const resultGet = await getERC721ImplementationDeployParams({ publicClient });
        expect(resultGet.deployTransaction).toBeUndefined();
        expect(resultGet.addresses[0].exists).toBe(true);
    });

    test.skip("deploy Hello World diamond", async () => {
        //Deploy implementations
        const resultDeployFacets = await getOrDeployImplementations({ publicClient, walletClient }, [
            { bytecode: DiamondCutFacet.bytecode },
            { bytecode: DiamondLoupeFacet.bytecode },
            { bytecode: MyContract.bytecode },
        ]);
        expect(resultDeployFacets.hash).toBeDefined();
        expect(resultDeployFacets.addresses[0].address).toBe(DiamondCutFacet.implementation);
        expect(resultDeployFacets.addresses[1].address).toBe(DiamondLoupeFacet.implementation);
        await publicClient.waitForTransactionReceipt({ hash: resultDeployFacets.hash! });

        //Deploy diamond
        const facets = [
            {
                facetAddress: DiamondCutFacet.implementation,
                functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
            },
            {
                facetAddress: DiamondLoupeFacet.implementation,
                functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
            },
        ];
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, {
            facets,
            initializers: [],
        });
        const diamondAddress = getDeployAddress(zeroAddress, {
            salt: zeroHash,
            bytecode: diamondDeployData.deployData,
            initData: "0x",
        });

        const resultDeploy = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
            {
                salt: zeroHash,
                bytecode: diamondDeployData.deployData,
                initData: "0x",
            },
        ]);
        expect(resultDeploy.hash).toBeDefined();
        expect(resultDeploy.addresses[0].address).toBe(diamondAddress);

        //Loupe diamond
        const facets0 = await publicClient.readContract({
            address: diamondAddress,
            abi: IDiamondLoupe.abi,
            functionName: "facets",
        });
        expect(facets0.length).toBe(2);
        expect(facets0).to.deep.eq(facets);

        //Cut diamond
        const facetAdd = {
            facetAddress: MyContract.implementation,
            functionSelectors: getAbiFunctionSelectors(MyContract.abi),
        };
        await walletClient.writeContract({
            address: diamondAddress,
            abi: IDiamondCut.abi,
            functionName: "diamondCut",
            args: [[{ ...facetAdd, action: FacetCutAction.Add }], zeroAddress, "0x"],
        });

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

    test.skip("deploy ERC721 diamond, no init", async () => {
        //Deploy implementations
        const resultDeployFacets = await getOrDeployImplementations({ publicClient, walletClient }, [
            { bytecode: DiamondCutFacet.bytecode },
            { bytecode: DiamondLoupeFacet.bytecode },
            { bytecode: ERC721MintableAutoIdBaseURIFacet.bytecode },
        ]);
        await publicClient.waitForTransactionReceipt({ hash: resultDeployFacets.hash! });

        const facets = Object.values(ERC721PresetDiamondSpec.facets).map((f) => {
            return {
                facetAddress: f.implementation,
                functionSelectors: getAbiFunctionSelectors(f.abi),
            };
        });
        const diamondDeployData = getDiamondDeployData(walletClient.account.address, { facets, initializers: [] });

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
    });

    test("deploy ERC721 diamond", async () => {
        const deployFacets = await getERC721ImplementationDeployParams({ publicClient });
        await walletClient.sendTransaction(deployFacets.deployTransaction!);

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
    });
});
