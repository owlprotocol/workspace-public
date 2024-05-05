import { numberToHex, padHex, Address, Hash } from "viem";
import { ANVIL_MNEMONIC } from "./accounts.js";

/**
 * Convert number to address
 * @param n
 * @returns address
 */
export function numberToAddress(n: number | bigint): Address {
    return padHex(numberToHex(n), { size: 20 });
}

/**
 * Convert number bytes32 hex string (eg. hash)
 * @param n
 * @returns bytes32 hex
 */
export function numberToBytes32(n: number | bigint): Hash {
    return padHex(numberToHex(n), { size: 32 });
}

/**
 * Default ganache testing config with:
 * - wallet.mnemonic: default accounts aligned with anvil
 * - miner.instamine: "strict" better real-world simulation
 * - logging.quiet: avoid excessive loggic of rpc calls
 */
export const DEFAULT_GANACHE_CONFIG = {
    wallet: { mnemonic: ANVIL_MNEMONIC },
    //Instamine set to "strict" to better simulate real-world conditions.
    //This mining mode forces us to account for the fact that once a hash is returned, this does NOT mean the transaction is confirmed
    //Transaction is only mined once we request the receipt. This is better then just setting a block time as that would be non-deterministic
    //Also see https://github.com/trufflesuite/ganache/discussions/2111
    miner: { instamine: "strict" },
    logging: { quiet: true },
} as const;
