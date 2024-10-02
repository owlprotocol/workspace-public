import { Address, Hex, padHex, keccak256, encodePacked, ByteArray, getCreate2Address } from "viem";

export interface GetInterchainAccountSaltParams {
    origin: number;
    owner: Address;
    router: Address;
    ism: Address;
}

/**
 * Salt computation for Interchain Account
 */
export function getInterchainAccountSalt(params: GetInterchainAccountSaltParams): Hex {
    const { origin, owner, router, ism } = params;

    const ownerBytes32 = padHex(owner, { size: 32 });
    const routerBytes32 = padHex(router, { size: 32 });
    const ismBytes32 = padHex(ism, { size: 32 });

    return keccak256(
        encodePacked(["uint32", "bytes32", "bytes32", "bytes32"], [origin, ownerBytes32, routerBytes32, ismBytes32]),
    );
}

export type GetInterchainAccountParams = {
    origin: number;
    owner: Address;
    router: Address;
    ism: Address;
} & (
    | {
          bytecode: ByteArray | Hex;
          from: Address;
      }
    | {
          bytecodeHash: ByteArray | Hex;
          from: Address;
      }
);
/**
 * Off-chain address computation for Interchain Account
 * @param params
 */
export function getInterchainAccount(params: GetInterchainAccountParams): Address {
    const salt = getInterchainAccountSalt(params);

    return getCreate2Address({ ...params, salt });
}
