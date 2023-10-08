export interface EthLog {
    readonly id: string;
    readonly networkId: string;
    readonly blockNumber: number;
    readonly logIndex: number;
    readonly blockHash: string;
    readonly transactionIndex: number;
    readonly transactionHash: string;
    readonly address: string;
    readonly data: string;
    readonly topics: string[];
    readonly topic0?: string;
    readonly topic1?: string;
    readonly topic2?: string;
    readonly topic3?: string;
    readonly eventName?: string;
    readonly eventFormat?: string;
    readonly dataDecoded?: any;
}
