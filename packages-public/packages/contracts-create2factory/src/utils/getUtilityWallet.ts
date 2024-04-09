import { PRIVATE_KEY_UTILITY, isProductionOrStaging } from "@owlprotocol/envvars";
import { Hex } from "viem";
import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";

/** Default mnemonic on most local test nodes */
export const ANVIL_MNEMONIC = "test test test test test test test test test test test junk";

/**
 * Get utility account for deploying core contracts required by our infra.
 * This was formerly known as the "relayer" but no longer really the case
 * as we use an ERC4337 bundler (except in local dev).
 * @returns LocalAccount
 */
export function getUtilityAccount(): PrivateKeyAccount {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_UTILITY) {
            throw new Error("missing PRIVATE_KEY_UTILITY");
        }
        return privateKeyToAccount(PRIVATE_KEY_UTILITY! as Hex);
    } else {
        //Anvil account 10, address 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
        const pKey: Hex = "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6";
        return privateKeyToAccount(pKey);
    }
}