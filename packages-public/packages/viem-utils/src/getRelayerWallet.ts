import { NODE_ENV, PRIVATE_KEY_RELAYER, isProductionOrStaging } from "@owlprotocol/envvars";
import { Hex } from "viem";
import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";

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
