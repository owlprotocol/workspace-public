export interface EthLogId {
    readonly networkId: string;
    readonly blockNumber: number;
    readonly logIndex: number;
}

export function getEthLogId({ networkId, blockNumber, logIndex }: EthLogId): string {
    return [networkId, blockNumber, logIndex].join("-");
}

export function getEthLogIdParams(id: string): EthLogId {
    const [networkId, blockNumber, logIndex] = id.split("-");
    return { networkId, blockNumber: parseInt(blockNumber), logIndex: parseInt(logIndex) };
}

export interface EthLog<T = any> extends EthLogId {
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
    readonly dataDecoded?: T;
}
