import { apeChain } from "@owlprotocol/chains";
import { getMailboxAddressFromChainId } from "@owlprotocol/contracts-hyperlane";
import { getChainEnvvars } from "@owlprotocol/envvars";
import { verifyAllContracts } from "../verifyAllContracts.js";

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
