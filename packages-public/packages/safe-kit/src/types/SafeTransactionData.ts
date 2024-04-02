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
}
