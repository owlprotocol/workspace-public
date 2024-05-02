import { NODE_ENV, PRIVATE_KEY_UTILITY, isProductionOrStaging } from "@owlprotocol/envvars";
import { Hex } from "viem";
import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";

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
