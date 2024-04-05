import { PRIVATE_KEY_RELAYER, isProductionOrStaging } from "@owlprotocol/envvars";
import { Hex } from "viem";
import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";

/**
 * Get utility account for deploying core contracts required by our infra.
 * This was formerly known as the "relayer" but no longer really the case
 * as we use an ERC4337 bundler (except in local dev).
 * @returns LocalAccount
 */
export function getRelayerAccount(): PrivateKeyAccount {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_RELAYER) {
            throw new Error("missing PRIVATE_KEY_RELAYER");
        }
        return privateKeyToAccount(PRIVATE_KEY_RELAYER! as Hex);
    } else {
        // Address 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000001";
        return privateKeyToAccount(pKey);
    }
}
