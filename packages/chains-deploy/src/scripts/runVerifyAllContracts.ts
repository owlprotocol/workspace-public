import { verifyContract } from "@owlprotocol/viem-utils";
import { Address, encodeAbiParameters } from "viem";
import { sepolia } from "@owlprotocol/chains";
import { SlocMetadata } from "@owlprotocol/viem-utils";
import { getMailboxAddressFromChainId } from "@owlprotocol/contracts-hyperlane";
import * as HyperlaneMetadata from "@owlprotocol/contracts-hyperlane/solc-metadata";
import * as ERC4337Metadata from "@owlprotocol/contracts-account-abstraction/solc-metadata";
import * as DiamondMetadata from "@owlprotocol/contracts-diamond/solc-metadata";
import * as Create2FactoryMetadata from "@owlprotocol/contracts-create2factory/solc-metadata";
import { NETWORK_11155111_EXPLORER_API_KEY } from "@owlprotocol/envvars";
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
    hypNative: "HypNative",
};

const mailboxToConstructorArgs = (mailboxAddress: Address) =>
    encodeAbiParameters([{ name: "_mailbox", type: "address" }], [mailboxAddress]).slice(2);

// TODO: Make this cleaner
const addressToConstructorArgsMap = {
    hypNative: mailboxToConstructorArgs,
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

        let constructorArguments;
        if (contractAlias === "hypNative" && mailboxAddress) {
            constructorArguments = addressToConstructorArgsMap.hypNative(mailboxAddress);
        }

        await verifyContract({
            apiUrl,
            apiKey,
            contractAddress: address,
            metadata: contractMetadata,
            constructorArguments,
        });
        console.log(`Verified ${contractAlias} at ${address}`);
    }
}

(async () => {
    const network = sepolia;
    const apiUrl = network.blockExplorers?.default?.apiUrl;
    const apiKey = NETWORK_11155111_EXPLORER_API_KEY;
    const mailboxAddress = await getMailboxAddressFromChainId(network.chainId);
    if (apiUrl && apiKey) {
        await verifyAllContracts(apiUrl, apiKey, mailboxAddress);
    } else {
        console.error("API URL or API Key missing, unable to proceed with verification.");
    }
})();
