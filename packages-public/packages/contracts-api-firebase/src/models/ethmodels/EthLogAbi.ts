export interface EthLogAbiData {
    readonly eventSighash: string;
    readonly eventName: string;
    readonly eventFormat: string;
}

export interface EthLogAbi extends EthLogAbiData {
    readonly id: string;
}
