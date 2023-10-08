export interface EthTransaction {
    readonly id: string;
    readonly networkId: string;
    readonly from: string;
    readonly to: string;
    readonly data: string;
    readonly hash: string;
    readonly gas: string;
    readonly effectiveGasPrice: string;
    readonly blockNumber: number;
    readonly blockHash: string;
    readonly confirmations: number;
    /** Tx cost */
    readonly ethCost: string;
    readonly usdCost: string;
}
