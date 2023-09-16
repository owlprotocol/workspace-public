import { Signer, TypedDataSigner } from "@ethersproject/abstract-signer";
import type { SafeSignature } from "../types/SafeSignature.js";
import type { OperationType, SafeTransactionData } from "../types/SafeTransaction.js";

export interface SafeTransactionEIP712Args {
    readonly safeAddress: string;
    readonly chainId: number;
    readonly safeTransactionData: SafeTransactionData;
}

export interface Eip712MessageTypes {
    readonly EIP712Domain: {
        type: string;
        name: string;
    }[];
    readonly SafeTx: {
        type: string;
        name: string;
    }[];
}

export interface GenerateTypedData {
    readonly types: Eip712MessageTypes;
    readonly domain: {
        chainId?: number;
        verifyingContract: string;
    };
    readonly primaryType: string;
    readonly message: {
        readonly to: string;
        readonly value: string;
        readonly data: string;
        readonly operation: OperationType;
        readonly safeTxGas: string;
        readonly baseGas: string;
        readonly gasPrice: string;
        readonly gasToken: string;
        readonly refundReceiver: string;
        readonly nonce: number;
    };
}

export const EIP712_DOMAIN = [
    {
        type: "uint256",
        name: "chainId",
    },
    {
        type: "address",
        name: "verifyingContract",
    },
];

// This function returns the types structure for signing off-chain messages according to EIP-712
export function getEip712MessageTypes(): {
    EIP712Domain: typeof EIP712_DOMAIN;
    SafeTx: Array<{ type: string; name: string }>;
} {
    return {
        EIP712Domain: EIP712_DOMAIN,
        SafeTx: [
            { type: "address", name: "to" },
            { type: "uint256", name: "value" },
            { type: "bytes", name: "data" },
            { type: "uint8", name: "operation" },
            { type: "uint256", name: "safeTxGas" },
            { type: "uint256", name: "baseGas" },
            { type: "uint256", name: "gasPrice" },
            { type: "address", name: "gasToken" },
            { type: "address", name: "refundReceiver" },
            { type: "uint256", name: "nonce" },
        ],
    };
}

export function generateTypedData({
    safeAddress,
    chainId,
    safeTransactionData,
}: SafeTransactionEIP712Args): GenerateTypedData {
    const typedData: GenerateTypedData = {
        types: getEip712MessageTypes(),
        domain: {
            verifyingContract: safeAddress,
            chainId,
        },
        primaryType: "SafeTx",
        message: {
            ...safeTransactionData,
            value: safeTransactionData.value,
            safeTxGas: safeTransactionData.safeTxGas,
            baseGas: safeTransactionData.baseGas,
            gasPrice: safeTransactionData.gasPrice,
            nonce: safeTransactionData.nonce,
        },
    };
    return typedData;
}

/**
 * Generate EIP721 Signature
 * @param signer
 * @param safeTransactionEIP712Args
 * @returns SafeSignature
 */
export async function generateEIP712Signature(
    signer: Signer & TypedDataSigner,
    safeTransactionEIP712Args: SafeTransactionEIP712Args,
): Promise<SafeSignature> {
    const signerAddress = await signer.getAddress();

    const typedData = generateTypedData(safeTransactionEIP712Args);

    const signature = await signer._signTypedData(
        typedData.domain,
        { SafeTx: typedData.types.SafeTx },
        typedData.message,
    );

    return {
        signer: signerAddress,
        data: signature,
    };
}
