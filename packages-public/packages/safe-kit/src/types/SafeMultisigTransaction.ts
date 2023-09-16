import type { SafeTransaction } from "./SafeTransaction.js";

export type SafeMultisigConfirmationResponse = {
    readonly owner: string;
    readonly submissionDate: string;
    readonly transactionHash?: string;
    readonly confirmationType?: string;
    readonly signature: string;
    readonly signatureType?: string;
};

export type SafeMultisigConfirmationListResponse = {
    readonly count: number;
    readonly next?: string;
    readonly previous?: string;
    readonly results: SafeMultisigConfirmationResponse[];
};

export type SafeMultisigTransactionResponse = {
    readonly safe: string;
    readonly to: string;
    readonly value: string;
    readonly data?: string;
    readonly operation: number;
    readonly gasToken: string;
    readonly safeTxGas: number;
    readonly baseGas: number;
    readonly gasPrice: string;
    readonly refundReceiver?: string;
    readonly nonce: number;
    readonly executionDate: string;
    readonly submissionDate: string;
    readonly modified: string;
    readonly blockNumber?: number;
    readonly transactionHash: string;
    readonly safeTxHash: string;
    readonly executor?: string;
    readonly isExecuted: boolean;
    readonly isSuccessful?: boolean;
    readonly ethGasPrice?: string;
    readonly gasUsed?: number;
    readonly fee?: string;
    readonly origin: string;
    readonly dataDecoded?: string;
    readonly confirmationsRequired: number;
    readonly confirmations?: SafeMultisigConfirmationResponse[];
    readonly trusted: boolean;
    readonly signatures?: string;
};

export function isSafeMultisigTransactionResponse(
    safeTransaction: SafeTransaction | SafeMultisigTransactionResponse,
): safeTransaction is SafeMultisigTransactionResponse {
    return (safeTransaction as SafeMultisigTransactionResponse).isExecuted !== undefined;
}
