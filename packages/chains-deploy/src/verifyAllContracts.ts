import { ENTRYPOINT_ADDRESS_V07 } from "@owlprotocol/contracts-account-abstraction";
import { SolcMetadata, verifyContract } from "@owlprotocol/viem-utils";
import { Address, encodeAbiParameters } from "viem";
import * as HyperlaneMetadata from "@owlprotocol/contracts-hyperlane/solc-metadata";
import * as ERC4337Metadata from "@owlprotocol/contracts-account-abstraction/solc-metadata";
import * as DiamondMetadata from "@owlprotocol/contracts-diamond/solc-metadata";
import * as Create2FactoryMetadata from "@owlprotocol/contracts-create2factory/solc-metadata";
import { getAllContractAddresses } from "./getAllContractAddresses.js";

export const allMetadata: Record<string, SolcMetadata> = {
    ...HyperlaneMetadata,
    ...ERC4337Metadata,
    ...DiamondMetadata,
    ...Create2FactoryMetadata,
};

export const addressToMetadataMap: Record<string, string> = {
    // Core Contracts
    erc165: "ERC165Facet",
    accessControlRecursive: "AccessControlRecursiveFacet",
    contractUri: "ContractURIFacet",
    erc2981: "ERC2981Facet",
    // Diamond Facets
    diamondCut: "DiamondCutFacet",
    diamondLoupe: "DiamondLoupeFacet",
    diamondInit: "DiamondInit",
    diamondInitMulti: "DiamondInitMulti",
    // ERC721 Facets
    erc721: "ERC721Facet",
    erc721MintableAutoId: "ERC721MintableAutoIdFacet",
    erc721BaseUri: "ERC721BaseURIFacet",
    erc721PresetInit: "ERC721MintableAutoIdBaseURIFacetInit",
    // Create2Factory
    create2Factory: "Create2Factory",
    // ERC4337 Contracts
    entrypoint: "EntryPoint",
    simpleAccountFactory: "SimpleAccountFactory",
    entrypointSimulations: "EntryPointSimulations",
    pimlicoEntrypointSimulations: "PimlicoEntryPointSimulations",
    // Hyperlane Contracts
    hypNative: "HypNative",
    hypErc20: "HypERC20",
    hypErc20Fast: "FastHypERC20",
};

const mailboxToConstructorArgs = (mailboxAddress: Address) =>
    encodeAbiParameters([{ name: "_mailbox", type: "address" }], [mailboxAddress]).slice(2);

const defaultDecimals = 18;
const decimalsAndMailboxToConstructorArgs = (mailboxAddress: Address) =>
    encodeAbiParameters(
        [
            { name: "__decimals", type: "uint8" },
            { name: "_mailbox", type: "address" },
        ],
        [defaultDecimals, mailboxAddress],
    ).slice(2);

export const addressToMailboxConstructorArgsMap = {
    hypNative: mailboxToConstructorArgs,
    hypErc20: decimalsAndMailboxToConstructorArgs,
    hypErc20Fast: decimalsAndMailboxToConstructorArgs,
};

export async function verifyAllContracts(apiUrl: string, apiKey: string, mailboxAddress: Address | null) {
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
        if (
            mailboxAddress &&
            (contractAlias === "hypNative" || contractAlias === "hypErc20" || contractAlias === "hypErc20Fast")
        ) {
            constructorArguments = addressToMailboxConstructorArgsMap[contractAlias](mailboxAddress);
        } else if (contractAlias == "simpleAccountFactory") {
            // NOTE: constructor args in etherscan don't accept the "0x" prefix
            constructorArguments = encodeAbiParameters(
                [{ name: "_entryPoint", type: "address" }],
                [ENTRYPOINT_ADDRESS_V07],
            ).slice(2);
        } else if (contractAlias == "pimlicoEntrypointSimulations") {
            constructorArguments = encodeAbiParameters(
                [{ name: "_eps", type: "address" }],
                [addresses["entrypointSimulations"]],
            ).slice(2);
        }

        let settings;
        if (contractAlias === "entrypointSimulations") {
            // Taken from packages-public/packages/contracts-account-abstraction/hardhat.config.ts
            settings = {
                evmVersion: "paris",
                viaIR: true,
                optimizer: {
                    enabled: true,
                    runs: 10000,
                    details: { yul: true },
                },
            };
        }

        try {
            await verifyContract({
                apiUrl,
                apiKey,
                contractAddress: address,
                metadata: contractMetadata,
                constructorArguments,
                settings,
            });
            console.log(`✅ Verified ${contractAlias} at ${address}`);
        } catch (e) {
            console.error(`❌ Failed to verify ${contractAlias} at ${address}: ${e}`);
        }
    }
}
