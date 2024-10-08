import { UserOperation, formatUserOperation, formatUserOperationRequest } from "viem/account-abstraction";
import { Hex } from "viem";

/**
 * Used for paymaster gas estimations/hash computation with SimpleAccount or VerifyingPaymaster
 */
export const dummySignature =
    "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";

/**
 * Encode UserOp for RPC (BigInt as hex)
 * @param userOp
 * @returns
 */
export function encodeUserOp(userOp: UserOperation<"0.7">): UserOperation<"0.7", Hex> {
    return formatUserOperationRequest(userOp);
}

/**
 * Decode UserOp from RPC (Hex to BigInt)
 * @param userOp
 * @returns
 */
export function decodeUserOp(userOp: UserOperation<"0.7", Hex>): UserOperation<"0.7"> {
    return formatUserOperation(userOp);
}
