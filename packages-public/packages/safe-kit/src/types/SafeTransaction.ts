import type { MetaTransactionData, SafeTransactionData, SafeTransactionDataPartial } from "./SafeTransactionData.js";

/** Complete Safe Transaction, with signatures */
export interface SafeTransaction {
    readonly data: SafeTransactionData;
    readonly signatures: {
        readonly [signer: string]: string;
    };
}

export type SafeTransactionOptionalProps = Pick<
    SafeTransactionDataPartial,
    "safeTxGas" | "baseGas" | "gasPrice" | "gasToken" | "refundReceiver"
>;

export function isMetaTransactionArray(
    safeTransactions: SafeTransactionDataPartial | MetaTransactionData[],
): safeTransactions is MetaTransactionData[] {
    return (safeTransactions as MetaTransactionData[])?.length !== undefined;
}
