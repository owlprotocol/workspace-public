import type { SafeSignature } from "./SafeSignature.js";

export enum OperationType {
    Call = 0, // 0
    DelegateCall = 1, // 1
}

export interface MetaTransactionData {
    /** Destination address */
    readonly to: string;
    /** Ether value */
    readonly value: string;
    /** Data payload */
    readonly data: string;
    /** Operation type */
    readonly operation?: OperationType;
}

export interface SafeTransactionData extends MetaTransactionData {
    /** Operation type */
    readonly operation: OperationType;
    /** Gas that should be used for the safe transaction */
    readonly safeTxGas: string;
    /** Gas costs for that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund) */
    readonly baseGas: string;
    /** Maximum gas price that should be used for this transaction */
    readonly gasPrice: string;
    /** Token address (or 0 if ETH) that is used for the payment */
    readonly gasToken: string;
    /** Address of receiver of gas payment (or 0 if tx.origin) */
    readonly refundReceiver: string;
    /** Transaction nonce. */
    readonly nonce: number;
}

export interface SafeTransactionDataPartial extends MetaTransactionData {
    readonly safeTxGas?: string;
    readonly baseGas?: string;
    readonly gasPrice?: string;
    readonly gasToken?: string;
    readonly refundReceiver?: string;
    readonly nonce?: number;
}

/** Complete Safe Transaction, with signatures */
export interface SafeTransaction {
    readonly data: SafeTransactionData;
    readonly signatures: {
        readonly [signer: string]: string;
    };
}

export type SafeTransactionOptionalProps = Pick<
    SafeTransactionDataPartial,
    "safeTxGas" | "baseGas" | "gasPrice" | "gasToken" | "refundReceiver" | "nonce"
>;

/**
 * Returns new safe transaction with added signature
 * @param tx
 * @param signature
 * @returns
 */
export function addSignature(tx: SafeTransaction, signature: SafeSignature): SafeTransaction {
    return {
        data: tx.data,
        signatures: {
            ...tx.signatures,
            [signature.signer.toLowerCase()]: signature.data,
        },
    };
}

/**
 * Concatenates all signatures as one, signers addresses are sorted
 * @param tx
 * @returns
 */
export function encodedSignatures(tx: SafeTransaction): string {
    const signers = Array.from(Object.keys(tx.signatures)).sort();
    return (
        "0x" +
        signers
            .map((signerAddress) => {
                //slice(2) to remove 0x prefix
                return tx.signatures[signerAddress].slice(2);
            })
            .join("")
    );
}

export function isMetaTransactionArray(
    safeTransactions: SafeTransactionDataPartial | MetaTransactionData[],
): safeTransactions is MetaTransactionData[] {
    return (safeTransactions as MetaTransactionData[])?.length !== undefined;
}

/**
 * @dev Eth Safe Transaction that uses factory patter to create new safe transactions
 */
export class EthSafeTransaction implements SafeTransaction {
    readonly data: SafeTransaction["data"];
    readonly signatures: SafeTransaction["signatures"];

    private constructor(safeTransaction: SafeTransaction) {
        this.data = safeTransaction.data;
        this.signatures = safeTransaction.signatures;
    }

    static create(safeTransaction: SafeTransaction) {
        return new EthSafeTransaction(safeTransaction);
    }

    /**
     * No mutation! Returns a new EthSafeTransaction
     * @param signature
     * @returns
     */
    addSignature(signature: SafeSignature): EthSafeTransaction {
        return EthSafeTransaction.create(addSignature(this, signature));
    }

    encodedSignatures(): string {
        return encodedSignatures(this);
    }
}
