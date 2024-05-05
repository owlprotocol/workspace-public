import { NODE_ENV, isProductionOrStaging, PRIVATE_KEY_UTILITY, PRIVATE_KEY_RELAYER } from "@owlprotocol/envvars";
import { Hex } from "viem";
import { mnemonicToAccount, HDAccount, privateKeyToAccount, PrivateKeyAccount } from "viem/accounts";

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

/**
 * Get utility account for deploying core contracts required by our infra.
 * This was formerly known as the "relayer" but no longer really the case
 * as we use an ERC4337 bundler (except in local dev).
 * @returns `LocalAccount<"privateKey", 0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF (local) | 0xa2E8B0AE8B5A51d494eCf7E35F3734A6CEd7eeCf (prod)
 */
export function getUtilityAccount(): PrivateKeyAccount {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_UTILITY) {
            throw new Error(`Missing PRIVATE_KEY_RELAYER with NODE_ENV (${NODE_ENV}).`);
        }
        if (PRIVATE_KEY_UTILITY.startsWith("0x00000000000000000000000000000000")) {
            throw new Error(`Using insecure PRIVATE_KEY_RELAYER ${PRIVATE_KEY_UTILITY} with NODE_ENV (${NODE_ENV}).`);
        }

        return privateKeyToAccount(PRIVATE_KEY_UTILITY! as Hex);
    } else {
        // Address 0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF (pkey 0x0..2)
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000002";
        return privateKeyToAccount(pKey);
    }
}

/**
 * Get utility account for deploying core contracts required by our infra.
 * This was formerly known as the "relayer" but no longer really the case
 * as we use an ERC4337 bundler (except in local dev).
 * @returns `LocalAccount<"privateKey", 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf (local) | 0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC (prod)>`
 */
export function getRelayerAccount(): PrivateKeyAccount {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_RELAYER) {
            throw new Error(`Missing PRIVATE_KEY_RELAYER with NODE_ENV (${NODE_ENV}).`);
        }
        if (PRIVATE_KEY_RELAYER.startsWith("0x00000000000000000000000000000000")) {
            throw new Error(`Using insecure PRIVATE_KEY_RELAYER ${PRIVATE_KEY_RELAYER} with NODE_ENV (${NODE_ENV}).`);
        }

        return privateKeyToAccount(PRIVATE_KEY_RELAYER! as Hex);
    } else {
        // Address 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf (pkey 0x..1)
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000001";
        return privateKeyToAccount(pKey);
    }
}
