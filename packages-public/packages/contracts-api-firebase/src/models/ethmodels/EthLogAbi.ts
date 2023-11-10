export interface EthLogAbiId {
    readonly eventSighash: string;
    readonly indexedFieldsCount: number;
}
export interface EthLogAbi extends EthLogAbiId {
    readonly eventFormat: string;
    readonly eventName: string;
}

export function getEthLogAbiId({ eventSighash, indexedFieldsCount }: EthLogAbiId): string {
    return [eventSighash, indexedFieldsCount].join("-");
}

export function getEthLogAbiIdParams(id: string): EthLogAbiId {
    const [eventSighash, indexedFieldsCount] = id.split("-");
    return { eventSighash, indexedFieldsCount: parseInt(indexedFieldsCount) };
}
