import { Collection } from "@owlprotocol/contracts-sdk";
import { appRouter } from "../router";

async function deployERC721() {
    const router = appRouter.createCaller({});
    let contractAddress: string;
    try {
        const deployResult = await router.collection.postCollection({
            symbol: "MY",
            name: "My collection",
            networkId: "80001",
            admin: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
            contractType: "ERC721AutoId" as Collection.NFTContractType,
            dnaType: "NONE" as Collection.DNAType,
            dnaSchemaUrl:
                "https://leovigna.mypinata.cloud/ipfs/QmbUcD2MRhHYVwEw3YEX3izMzVvZfT49CGfLhqdVRVcnZd",
        });
        contractAddress = deployResult.contractAddress;
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (!contractAddress) {
        console.log("No contract address");
        return;
    }

    try {
        const mintResult = await router.abi.ERC721MintableAutoId.safeMint({
            networkId: "80001",
            address: contractAddress,
            contractParameters: {
                to: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
            },
        });
        console.log(mintResult.result);
    } catch (e) {
        console.log(e);
        throw e;
    }

    try {
        const result = await router.abi.ERC721MintableAutoId.tokenURI({
            networkId: "80001",
            address: contractAddress,
            contractParameters: {
                tokenId: "1",
            },
        });
        console.log(result.result);
    } catch (e) {
        console.log(e);
        throw e;
    }
}
