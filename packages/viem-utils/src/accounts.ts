import {
    NODE_ENV,
    isProductionOrStaging,
    PRIVATE_KEY_PAYMASTER_SIGNER,
    PRIVATE_KEY_UTILITY,
    PRIVATE_KEY_RELAYER,
} from "@owlprotocol/envvars";
import { Hex, LocalAccount, NonceManager } from "viem";
import { mnemonicToAccount, HDAccount, privateKeyToAccount } from "viem/accounts";

/** Default mnemonic on most local test nodes */
export const ANVIL_MNEMONIC = "test test test test test test test test test test test junk";

/**
 * Get account from common test mnemonic, ensures safety by throwing if used in production/staging environment
 * @returns `LocalAccount<"hd">`
 */
export function getLocalAccount(n = 0, options: { nonceManager?: NonceManager } = {}): HDAccount {
    if (isProductionOrStaging()) {
        throw new Error(`Never use getLocalAccount in production or staging! NODE_ENV is ${NODE_ENV}.`);
    }

    return mnemonicToAccount(ANVIL_MNEMONIC, { accountIndex: 0, addressIndex: n, ...options });
}

/**
 * Get paymaster signer account for signing UserOps for gas sponsoring by VerifyingPaymaster
 * @returns `LocalAccount<"privateKey">`
 *  - local `0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69` (pkey 0x0...3)
 *  - staging `0x6efA2F40d59e3DA02e56Ff5a1daB6201b86f8aCF`
 *  - prod `0x9B5F05f70868526A75004ae9bB999F676Fe3D84a`
 */
export function getPaymasterSignerAccount(options: { nonceManager?: NonceManager } = {}): LocalAccount<
    "privateKey",
    | "0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69" //local
    | "0x6efA2F40d59e3DA02e56Ff5a1daB6201b86f8aCF" //staging
    | "0x9B5F05f70868526A75004ae9bB999F676Fe3D84a" //prod
> {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_PAYMASTER_SIGNER) {
            throw new Error(`Missing PRIVATE_KEY_PAYMASTER_SIGNER with NODE_ENV (${NODE_ENV}).`);
        }
        if (PRIVATE_KEY_PAYMASTER_SIGNER.startsWith("0x00000000000000000000000000000000")) {
            throw new Error(
                `Using insecure PRIVATE_KEY_PAYMASTER_SIGNER ${PRIVATE_KEY_UTILITY} with NODE_ENV (${NODE_ENV}).`,
            );
        }

        return privateKeyToAccount(PRIVATE_KEY_UTILITY! as Hex, options) as any;
    } else {
        // Address  (pkey 0x0...3)
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000003";
        return privateKeyToAccount(pKey, options) as any;
    }
}

/**
 * Get utility account for deploying core contracts required by our infra.
 * @returns `LocalAccount<"privateKey">`
 *  - local `0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF` (pkey 0x0...2)
 *  - staging `0xAAb6f44B46f19d061582727B66C9a0c84C97a2F6`
 *  - prod `0xa2E8B0AE8B5A51d494eCf7E35F3734A6CEd7eeCf`
 */
export function getUtilityAccount(options: { nonceManager?: NonceManager } = {}): LocalAccount<
    "privateKey",
    | "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF" //local
    | "0xAAb6f44B46f19d061582727B66C9a0c84C97a2F6" //staging
    | "0xa2E8B0AE8B5A51d494eCf7E35F3734A6CEd7eeCf" //prod
> {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_UTILITY) {
            throw new Error(`Missing PRIVATE_KEY_RELAYER with NODE_ENV (${NODE_ENV}).`);
        }
        if (PRIVATE_KEY_UTILITY.startsWith("0x00000000000000000000000000000000")) {
            throw new Error(`Using insecure PRIVATE_KEY_RELAYER ${PRIVATE_KEY_UTILITY} with NODE_ENV (${NODE_ENV}).`);
        }

        return privateKeyToAccount(PRIVATE_KEY_UTILITY! as Hex, options) as any;
    } else {
        // Address 0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF (pkey 0x0...2)
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000002";
        return privateKeyToAccount(pKey, options) as any;
    }
}

/**
 * Get relayer account for ERC4337 bundler.
 * @returns `LocalAccount<"privateKey">`
 *  - local `0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf` (pkey 0x0...1)
 *  - staging `0x09CC3599Ec5f8E3C4DaF1603088432943831bEee`
 *  - prod `0x29bec0bBFf2DD197B032C2a84eD7ee79989A7831`
 */
export function getRelayerAccount(options: { nonceManager?: NonceManager } = {}): LocalAccount<
    "privateKey",
    | "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf" //local
    | "0x09CC3599Ec5f8E3C4DaF1603088432943831bEee" //staging
    | "0x29bec0bBFf2DD197B032C2a84eD7ee79989A7831" //prod
> {
    if (isProductionOrStaging()) {
        if (!PRIVATE_KEY_RELAYER) {
            throw new Error(`Missing PRIVATE_KEY_RELAYER with NODE_ENV (${NODE_ENV}).`);
        }
        if (PRIVATE_KEY_RELAYER.startsWith("0x00000000000000000000000000000000")) {
            throw new Error(`Using insecure PRIVATE_KEY_RELAYER ${PRIVATE_KEY_RELAYER} with NODE_ENV (${NODE_ENV}).`);
        }

        return privateKeyToAccount(PRIVATE_KEY_RELAYER! as Hex, options) as any;
    } else {
        // Address 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf (pkey 0x...1)
        const pKey: Hex = "0x0000000000000000000000000000000000000000000000000000000000000001";
        return privateKeyToAccount(pKey, options) as any;
    }
}
