import { HDAccount, mnemonicToAccount, NonceManager } from "viem/accounts";

/** Default mnemonic on most local test nodes */
export const ANVIL_MNEMONIC = "test test test test test test test test test test test junk";

/**
 * Get account from common test mnemonic
 * @returns `LocalAccount<"hd">`
 */
export function getAnvilAccount(n = 0, options: { nonceManager?: NonceManager } = {}): HDAccount {
    return mnemonicToAccount(ANVIL_MNEMONIC, { accountIndex: 0, addressIndex: n, ...options });
}

export const port = 8556;
