export interface EthTransactionId {
    readonly networkId: string;
    readonly hash: string;
}

export function getEthTransactionId({ networkId, hash }: EthTransactionId): string {
    return [networkId, hash].join("-");
}

export function getEthTransactionIdParams(id: string): EthTransactionId {
    const [networkId, hash] = id.split("-");
    return { networkId, hash };
}

export interface EthTransaction extends EthTransactionId {
    readonly from: string;
    readonly to: string;
    readonly data: string;
    readonly gas: string;
    readonly effectiveGasPrice: string;
    readonly blockNumber: number;
    readonly blockHash: string;
    readonly confirmations: number;
    /** Tx cost */
    readonly ethCost: string;
    readonly usdCost: string;
}
