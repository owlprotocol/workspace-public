import { zeroAddress, zeroHash, encodeAbiParameters, Address, Hex, keccak256 } from "viem";

export const DEFAULT_SALT = zeroHash;
export const DEFAULT_MSG_SENDER = zeroAddress;
export const DEFAULT_INIT_DATA = "0x";

export interface SaltArgs {
    msgSender: Address;
    salt: Hex;
    initData: Hex;
}
export function getSalt(saltArgs: SaltArgs): Hex {
    const { msgSender, salt, initData } = saltArgs;

    const data = encodeAbiParameters(
        [{ type: "address" }, { type: "bytes32" }, { type: "bytes" }],
        [msgSender, salt, initData],
    );
    return keccak256(data);
}

/**
 * Return saltArgs with defaults
 * @param saltArgs
 * @returns
 */
export function getSaltArgs(saltArgs?: Partial<SaltArgs>): SaltArgs {
    const { msgSender = DEFAULT_MSG_SENDER, salt = DEFAULT_SALT, initData = DEFAULT_INIT_DATA } = saltArgs ?? {};

    return { msgSender, salt, initData };
}
