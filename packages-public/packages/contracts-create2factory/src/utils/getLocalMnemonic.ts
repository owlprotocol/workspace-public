import { NODE_ENV, isProductionOrStaging } from "@owlprotocol/envvars";
import { mnemonicToAccount, HDAccount } from "viem/accounts";

/** Default mnemonic on most local test nodes */
export const ANVIL_MNEMONIC = "test test test test test test test test test test test junk";

/**
 * Get account from common test mnemonic, ensures safety by throwing if used in production/staging environment
 * @returns `LocalAccount<"hd", >`
 */
export function getLocalAccount(n: number = 0): HDAccount {
    if (isProductionOrStaging()) {
        throw new Error(`Never use getLocalAccount in production or staging! NODE_ENV is ${NODE_ENV}.`);
    }

    return mnemonicToAccount(ANVIL_MNEMONIC, { accountIndex: 0, addressIndex: n });
}
