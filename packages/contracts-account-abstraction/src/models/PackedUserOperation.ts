import {
    Address,
    Hash,
    Hex,
    bytesToHex,
    concatHex,
    encodeAbiParameters,
    getAddress,
    numberToHex,
    pad,
    slice,
    zeroAddress,
} from "viem";
import { UserOperation } from "viem/account-abstraction";

/**
 * PackedUserOp suitable for call to EntryPoint contract
 * //TODO: Move to `PackedUserOperation.ts`
 */
export interface PackedUserOperation {
    sender: Address;
    nonce: bigint;
    initCode: Hex;
    callData: Hex;
    accountGasLimits: Hash;
    preVerificationGas: bigint;
    gasFees: Hash;
    paymasterAndData: Hex;
    signature: Hex;
}

/**
 * Convert `UserOperationWithBigIntAsHex` to `PackedUserOperation`
 * @param userOp
 * @returns packedUserOperation
 */
export function toPackedUserOperation(userOp: UserOperation<"0.7", Hex>): PackedUserOperation {
    const accountGasLimits = packAccountGasLimits(userOp.verificationGasLimit, userOp.callGasLimit);
    const gasFees = packAccountGasLimits(userOp.maxPriorityFeePerGas, userOp.maxFeePerGas);
    let paymasterAndData: Hex = "0x";
    if (
        userOp.paymaster &&
        userOp.paymaster !== zeroAddress &&
        userOp.paymasterVerificationGasLimit &&
        userOp.paymasterPostOpGasLimit &&
        userOp.paymasterData
    ) {
        paymasterAndData = packPaymasterData(
            userOp.paymaster,
            userOp.paymasterVerificationGasLimit,
            userOp.paymasterPostOpGasLimit,
            userOp.paymasterData,
        );
    }

    const initCode =
        userOp.factory && userOp.factory != zeroAddress && userOp.factoryData
            ? concatHex([userOp.factory, userOp.factoryData])
            : "0x";
    return {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        callData: userOp.callData,
        accountGasLimits,
        initCode,
        preVerificationGas: BigInt(userOp.preVerificationGas),
        gasFees,
        paymasterAndData,
        signature: userOp.signature,
    };
}

/**
 * Convert `PackedUserOperation` to `UserOperationWithBigIntAsHex`
 * @param userOp
 * @returns packedUserOperation
 */
export function toUserOperationEncoded(packedUserOperation: PackedUserOperation): UserOperation<"0.7", Hex> {
    const { factory, factoryData } = unpackInitCode(packedUserOperation.initCode);

    const { callGasLimit, verificationGasLimit } = unpackAccountGasLimits(packedUserOperation.accountGasLimits);

    const { maxFeePerGas, maxPriorityFeePerGas } = unpackGasLimits(packedUserOperation.gasFees);

    const { paymaster, paymasterVerificationGasLimit, paymasterPostOpGasLimit, paymasterData } = unpackPaymasterAndData(
        packedUserOperation.paymasterAndData,
    );

    return {
        sender: packedUserOperation.sender,
        nonce: numberToHex(packedUserOperation.nonce),
        factory: factory ?? zeroAddress,
        factoryData: factoryData ?? "0x",
        callData: packedUserOperation.callData,
        callGasLimit: numberToHex(callGasLimit),
        verificationGasLimit: numberToHex(verificationGasLimit),
        preVerificationGas: numberToHex(packedUserOperation.preVerificationGas),
        maxFeePerGas: numberToHex(maxFeePerGas),
        maxPriorityFeePerGas: numberToHex(maxPriorityFeePerGas),
        paymaster: paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: numberToHex(paymasterVerificationGasLimit ?? 0n),
        paymasterPostOpGasLimit: numberToHex(paymasterPostOpGasLimit ?? 0n),
        paymasterData: paymasterData ?? "0x",
        signature: packedUserOperation.signature,
    };
}

/**
 * Return `PackedUserOperation` with random data for better gas estimation
 * @param packedUserOperation
 * @returns
 */
export function packedUserOperationToRandomDataUserOp(packedUserOperation: PackedUserOperation): PackedUserOperation {
    return {
        sender: packedUserOperation.sender,
        nonce: BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"),
        initCode: packedUserOperation.initCode,
        callData: packedUserOperation.callData,
        accountGasLimits: bytesToHex(new Uint8Array(32).fill(255)),
        preVerificationGas: BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"),
        gasFees: bytesToHex(new Uint8Array(32).fill(255)),
        paymasterAndData: bytesToHex(new Uint8Array(packedUserOperation.paymasterAndData.length).fill(255)),
        signature: bytesToHex(new Uint8Array(packedUserOperation.signature.length).fill(255)),
    };
}

//TODO: Rename packUserOp to `toPackedUserOperation()`
/**
 * //TODO: Bit weird to have this random data logic inside hear as obfuscates logic
 * Pack `PackedUserOperation` as bytes and add random user data for gas estimation
 * @param packedUserOperation
 * @returns
 */
export function packUserOperation(packedUserOperation: PackedUserOperation): Hex {
    const randomDataUserOp: PackedUserOperation = packedUserOperationToRandomDataUserOp(packedUserOperation);

    return encodeAbiParameters(
        [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "initCode",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "callData",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "accountGasLimits",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "gasFees",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "paymasterAndData",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        [
            randomDataUserOp.sender,
            randomDataUserOp.nonce, // need non zero bytes to get better estimations for preVerificationGas
            packedUserOperation.initCode,
            packedUserOperation.callData,
            randomDataUserOp.accountGasLimits, // need non zero bytes to get better estimations for preVerificationGas
            randomDataUserOp.preVerificationGas, // need non zero bytes to get better estimations for preVerificationGas
            randomDataUserOp.gasFees, // need non zero bytes to get better estimations for preVerificationGas
            randomDataUserOp.paymasterAndData,
            randomDataUserOp.signature,
        ],
    );
}

export function packAccountGasLimits(verificationGasLimit: Hex, callGasLimit: Hex): Hex {
    return concatHex([
        pad(verificationGasLimit, { dir: "left", size: 16 }),
        pad(callGasLimit, { dir: "left", size: 16 }),
    ]);
}

export function unpackInitCode(initCode: Hex) {
    if (initCode === "0x") {
        return {
            factory: null,
            factoryData: null,
        };
    }
    return {
        factory: getAddress(slice(initCode, 0, 20)),
        factoryData: slice(initCode, 20),
    };
}

export function unpackGasLimits(gasLimits: Hex) {
    return {
        maxPriorityFeePerGas: BigInt(slice(gasLimits, 0, 16)),
        maxFeePerGas: BigInt(slice(gasLimits, 16)),
    };
}

export function unpackPaymasterAndData(paymasterAndData: Hex) {
    if (paymasterAndData === "0x") {
        return {
            paymaster: null,
            paymasterVerificationGasLimit: null,
            paymasterPostOpGasLimit: null,
            paymasterData: null,
        };
    }
    return {
        paymaster: getAddress(slice(paymasterAndData, 0, 20)),
        paymasterVerificationGasLimit: BigInt(slice(paymasterAndData, 20, 36)),
        paymasterPostOpGasLimit: BigInt(slice(paymasterAndData, 36, 52)),
        paymasterData: slice(paymasterAndData, 52),
    };
}

/**
 *
 * paymasterAndData[:20] : address(this)
 * paymasterAndData[20:36] : paymasterVerificationGasLimit
 * paymasterAndData[36:52] : postOpGasLimit
 * paymasterAndData[52:] : paymasterData (custom data)
 * paymasterAndData[52:116] : abi.encode(validUntil, validAfter)
 * paymasterAndData[116:] : signature (64-65 bytex)
 * @param paymaster
 * @param paymasterVerificationGasLimit
 * @param postOpGasLimit
 * @param paymasterData
 * @returns
 */
export function packPaymasterData(
    paymaster: Address,
    paymasterVerificationGasLimit: Hex,
    postOpGasLimit: Hex,
    paymasterData: Hex,
): Hex {
    return concatHex([
        pad(paymaster, { dir: "left", size: 20 }),
        pad(paymasterVerificationGasLimit, { dir: "left", size: 16 }),
        pad(postOpGasLimit, { dir: "left", size: 16 }),
        paymasterData,
    ]);
}

export function unpackAccountGasLimits(accountGasLimits: string): {
    verificationGasLimit: number;
    callGasLimit: number;
} {
    return {
        verificationGasLimit: parseInt(accountGasLimits.slice(2, 34), 16),
        callGasLimit: parseInt(accountGasLimits.slice(34), 16),
    };
}
