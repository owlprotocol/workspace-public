import { bytesToHex, numberToHex, hexToBigInt, concat } from "viem";
import { getRandomValues } from "crypto";

//TODO: Add range checks
/**
 * Generates an ERC4337 nonce from a "key" & "nonce".
 * - If key & nonce undefined => generated random key with nonce 0
 * ERC4337 supports "2D" nonces that can live concurrently within various "keys"
 * Read more https://eips.ethereum.org/EIPS/eip-4337#semi-abstracted-nonce-support
 * @param param0
 */
export function getERC4337Nonce(parameters?: { key: bigint; nonce: bigint }): bigint {
    if (!parameters) {
        // Random key with nonce 0
        // 192 bits
        const key = bytesToHex(getRandomValues(new Uint8Array(24)));
        // 64 bits
        const nonce = numberToHex(0, { size: 8 });
        return hexToBigInt(concat([key, nonce]));
    } else {
        // 192 bits
        const key = numberToHex(parameters.key, { size: 24 });
        // 64 bits
        const nonce = numberToHex(parameters.nonce, { size: 8 });
        return hexToBigInt(concat([key, nonce]));
    }
}
