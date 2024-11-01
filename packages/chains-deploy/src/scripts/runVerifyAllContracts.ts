import { verifyContract } from "@owlprotocol/viem-utils";
import { Address } from "viem";
import { sepolia } from "@owlprotocol/chains";
import { SlocMetadata } from "@owlprotocol/viem-utils";
import { getMailboxAddressFromChainId } from "@owlprotocol/contracts-hyperlane";
import * as HyperlaneMetadata from "@owlprotocol/contracts-hyperlane/solc-metadata";
import * as ERC4337Metadata from "@owlprotocol/contracts-account-abstraction/solc-metadata";
import * as DiamondMetadata from "@owlprotocol/contracts-diamond/solc-metadata";
import * as Create2FactoryMetadata from "@owlprotocol/contracts-create2factory/solc-metadata";
import { getAllContractAddresses } from "../getAllContractAddresses.js";

const allMetadata: Record<string, SlocMetadata> = {
    ...HyperlaneMetadata,
    ...ERC4337Metadata,
    ...DiamondMetadata,
    ...Create2FactoryMetadata,
};

const addressToMetadataMap: Record<string, string> = {
    diamondCut: "DiamondCutFacet",
    diamondLoupe: "DiamondLoupeFacet",
    diamondInit: "DiamondInit",
    diamondInitMulti: "DiamondInitMulti",
};

async function verifyAllContracts(apiUrl: string, apiKey: string, mailboxAddress: Address | null) {
    const addresses = getAllContractAddresses({ mailboxAddress });

    for (const [contractAlias, metadataKey] of Object.entries(addressToMetadataMap)) {
        const address = addresses[contractAlias];
        const contractMetadata = allMetadata[metadataKey];

        if (!address) {
            console.warn(`Address for ${contractAlias} not found, skipping.`);
            continue;
        }
        if (!contractMetadata) {
            console.warn(`Metadata for ${metadataKey} not found, skipping.`);
            continue;
        }

        await verifyContract({
            apiUrl,
            apiKey,
            contractAddress: address,
            metadata: contractMetadata,
        });
        console.log(`Verified ${contractAlias} at ${address}`);
    }
}

(async () => {
    const network = sepolia;
    const apiUrl = network.blockExplorers?.default?.apiUrl;
    const apiKey = "xxx";
    const mailboxAddress = await getMailboxAddressFromChainId(network.chainId);
    if (apiUrl && apiKey) {
        await verifyAllContracts(apiUrl, apiKey, mailboxAddress);
    } else {
        console.error("API URL or API Key missing, unable to proceed with verification.");
    }
})();
