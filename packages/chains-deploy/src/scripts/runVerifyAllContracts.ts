import { verifyContract } from "@owlprotocol/viem-utils";
import { Address, encodeAbiParameters } from "viem";
import { apeChain } from "@owlprotocol/chains";
import { getMailboxAddressFromChainId } from "@owlprotocol/contracts-hyperlane";
import { getChainEnvvars } from "@owlprotocol/envvars";
import { ENTRYPOINT_ADDRESS_V07 } from "@owlprotocol/contracts-account-abstraction";
import { getAllContractAddresses } from "../getAllContractAddresses.js";
import { addressToMailboxConstructorArgsMap, addressToMetadataMap, allMetadata } from "../setupChainContracts.js";

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

        await verifyContract({
            apiUrl,
            apiKey,
            contractAddress: address,
            metadata: contractMetadata,
            constructorArguments,
            settings,
        });
        console.log(`Verified ${contractAlias} at ${address}`);
    }
}

// TODO: cleanup this script
(async () => {
    const network = apeChain;

    const chainEnvVars = getChainEnvvars(network.chainId);
    const apiUrl = chainEnvVars.explorerApi;
    const apiKey = chainEnvVars.explorerApiKey;

    const mailboxAddress = await getMailboxAddressFromChainId(network.chainId);
    if (apiUrl && apiKey) {
        await verifyAllContracts(apiUrl, apiKey, mailboxAddress);
    } else {
        console.error("API URL or API Key missing, unable to proceed with verification.");
    }
})();
