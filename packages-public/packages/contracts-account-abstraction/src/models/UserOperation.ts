import { EntryPointVersion, UserOperation } from "permissionless/types";
import { Address, Hash, Hex, numberToHex, zeroAddress } from "viem";
import { PartialBy } from "@owlprotocol/utils/types";

/**
 * Used for paymaster gas estimations/hash computation with SimpleAccount or VerifyingPaymaster
 */
export const dummySignature =
    "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";

//TODO: Use zod validators for more robustness
/**
 * Hex encoded UserOperation. Paymaster data always defined but set to Solidity null defaults (zero address, zero, zero bytes etc...)
 */
export type UserOperationWithBigIntAsHex<entryPointVersion extends EntryPointVersion> = entryPointVersion extends "v0.6"
    ? {
          sender: Address;
          nonce: Hex;
          initCode: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymasterAndData: Hex;
          signature: Hex;
          factory?: never;
          factoryData?: never;
          paymaster?: never;
          paymasterVerificationGasLimit?: never;
          paymasterPostOpGasLimit?: never;
          paymasterData?: never;
      }
    : {
          sender: Address;
          nonce: Hex;
          factory: Address;
          factoryData: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymaster: Address;
          paymasterVerificationGasLimit: Hex;
          paymasterPostOpGasLimit: Hex;
          paymasterData: Hex;
          signature: Hex;
          initCode?: never;
          paymasterAndData?: never;
      };

//Not exported by permissionnless
/**
 * Hex encoded UserOperation receipt
 */
export type UserOperationReceiptWithBigIntAsHex = {
    userOpHash: Hash;
    sender: Address;
    nonce: Hex;
    actualGasUsed: Hex;
    actualGasCost: Hex;
    success: boolean;
    receipt: {
        transactionHash: Hex;
        transactionIndex: Hex;
        blockHash: Hash;
        blockNumber: Hex;
        from: Address;
        to: Address | null;
        cumulativeGasUsed: Hex;
        status: "0x0" | "0x1";
        gasUsed: Hex;
        contractAddress: Address | null | undefined;
        logsBloom: Hex;
        effectiveGasPrice: Hex;
    };
    logs: {
        data: Hex;
        blockNumber: Hex;
        blockHash: Hash;
        transactionHash: Hash;
        logIndex: Hex;
        transactionIndex: Hex;
        address: Address;
        topics: Hex[];
    }[];
};

/**
 * Encode UserOp for RPC (BigInt as hex)
 * @param userOp
 * @returns
 */
export function encodeUserOp(userOp: UserOperation<"v0.7">): UserOperationWithBigIntAsHex<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: numberToHex(userOp.nonce),
        factory: userOp.factory ?? zeroAddress,
        factoryData: userOp.factoryData ?? "0x",
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: numberToHex(userOp.callGasLimit),
        verificationGasLimit: numberToHex(userOp.verificationGasLimit),
        preVerificationGas: numberToHex(userOp.preVerificationGas),
        maxFeePerGas: numberToHex(userOp.maxFeePerGas),
        maxPriorityFeePerGas: numberToHex(userOp.maxPriorityFeePerGas),
        paymaster: userOp.paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterPostOpGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterData: userOp.paymasterData ?? "0x",
    };
}

/**
 * Decode UserOp from RPC (Hex to BigInt)
 * @param userOp
 * @returns
 */
export function decodeUserOp(userOp: UserOperationWithBigIntAsHex<"v0.7">): UserOperation<"v0.7"> {
    const userOpDecoded: UserOperation<"v0.7"> = {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        factory: userOp.factory != zeroAddress ? userOp.factory : undefined,
        factoryData: userOp.factory != zeroAddress && userOp.factoryData != "0x" ? userOp.factoryData : undefined,
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: BigInt(userOp.callGasLimit),
        verificationGasLimit: BigInt(userOp.verificationGasLimit),
        preVerificationGas: BigInt(userOp.preVerificationGas),
        maxFeePerGas: BigInt(userOp.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(userOp.maxPriorityFeePerGas),
    };

    //Set paymaster values if defined
    if (userOp.paymaster != zeroAddress) {
        userOpDecoded.paymaster = userOp.paymaster;
    }
    if (userOp.paymasterVerificationGasLimit != "0x0") {
        userOpDecoded.paymasterVerificationGasLimit = BigInt(userOp.paymasterVerificationGasLimit);
    }
    if (userOp.paymasterPostOpGasLimit != "0x0") {
        userOpDecoded.paymasterPostOpGasLimit = BigInt(userOp.paymasterPostOpGasLimit);
    }
    if (userOp.paymasterData != "0x") {
        userOpDecoded.paymasterData = userOp.paymasterData;
    }
    return userOpDecoded;
}

/**
 * UserOperation with partial gas data
 */
export type UserOperationPartialGas<entryPointVersion extends EntryPointVersion> = entryPointVersion extends "v0.6"
    ? PartialBy<UserOperation<"v0.6">, "callGasLimit" | "preVerificationGas" | "verificationGasLimit">
    : PartialBy<
          UserOperation<"v0.7">,
          | "callGasLimit"
          | "preVerificationGas"
          | "verificationGasLimit"
          | "paymasterVerificationGasLimit"
          | "paymasterPostOpGasLimit"
      >;

/**
 * Hex encoded UserOperation with partial gas data
 */
export type UserOperationWithBigIntAsHexPartialGas<entryPointVersion extends EntryPointVersion> =
    entryPointVersion extends "v0.6"
        ? PartialBy<
              UserOperationWithBigIntAsHex<"v0.6">,
              "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
          >
        : PartialBy<
              UserOperationWithBigIntAsHex<"v0.7">,
              | "callGasLimit"
              | "preVerificationGas"
              | "verificationGasLimit"
              | "paymasterVerificationGasLimit"
              | "paymasterPostOpGasLimit"
          >;

/**
 * Encode UserOp with partial gas data for RPC (BigInt as hex)
 * @param userOp
 * @returns
 */
export function encodeUserOpPartialGas(
    userOp: UserOperationPartialGas<"v0.7">,
): UserOperationWithBigIntAsHexPartialGas<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: numberToHex(userOp.nonce),
        factory: userOp.factory ?? zeroAddress,
        factoryData: userOp.factoryData ?? "0x",
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: userOp.callGasLimit ? numberToHex(userOp.callGasLimit) : undefined,
        verificationGasLimit: userOp.verificationGasLimit ? numberToHex(userOp.verificationGasLimit) : undefined,
        preVerificationGas: userOp.preVerificationGas ? numberToHex(userOp.preVerificationGas) : undefined,
        maxFeePerGas: numberToHex(userOp.maxFeePerGas),
        maxPriorityFeePerGas: numberToHex(userOp.maxPriorityFeePerGas),
        paymaster: userOp.paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterPostOpGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterData: userOp.paymasterData ?? "0x",
    };
}

/**
 * Decode UserOp with partial gas data from RPC (Hex to BigInt)
 * @param userOp
 * @returns
 */
export function decodeUserOpPartialGas(
    userOp: UserOperationWithBigIntAsHexPartialGas<"v0.7">,
): UserOperationPartialGas<"v0.7"> {
    const userOpDecoded: UserOperationPartialGas<"v0.7"> = {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        factory: userOp.factory != zeroAddress ? userOp.factory : undefined,
        factoryData: userOp.factory != zeroAddress && userOp.factoryData != "0x" ? userOp.factoryData : undefined,
        signature: userOp.signature,
        callData: userOp.callData,
        maxFeePerGas: BigInt(userOp.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(userOp.maxPriorityFeePerGas),
    };

    //Set gas values if defined
    if (userOp.callGasLimit && userOp.callGasLimit != "0x0") {
        userOpDecoded.callGasLimit = BigInt(userOp.callGasLimit);
    }
    if (userOp.verificationGasLimit && userOp.verificationGasLimit != "0x0") {
        userOpDecoded.verificationGasLimit = BigInt(userOp.verificationGasLimit);
    }
    if (userOp.preVerificationGas && userOp.preVerificationGas != "0x0") {
        userOpDecoded.preVerificationGas = BigInt(userOp.preVerificationGas);
    }

    //Set paymaster values if defined
    if (userOp.paymaster != zeroAddress) {
        userOpDecoded.paymaster = userOp.paymaster;
    }
    if (userOp.paymasterVerificationGasLimit && userOp.paymasterVerificationGasLimit != "0x0") {
        userOpDecoded.paymasterVerificationGasLimit = BigInt(userOp.paymasterVerificationGasLimit);
    }
    if (userOp.paymasterPostOpGasLimit && userOp.paymasterPostOpGasLimit != "0x0") {
        userOpDecoded.paymasterPostOpGasLimit = BigInt(userOp.paymasterPostOpGasLimit);
    }
    if (userOp.paymasterData != "0x") {
        userOpDecoded.paymasterData = userOp.paymasterData;
    }

    return userOpDecoded;
}
