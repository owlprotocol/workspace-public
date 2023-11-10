export interface EthFunctionAbiId {
    readonly functionSighash: string;
}
export interface EthFunctionAbi extends EthFunctionAbiId {
    readonly functionFormat: string;
    readonly functionName: string;
}

export function getEthFunctionAbiId({ functionSighash }: EthFunctionAbiId): string {
    return functionSighash;
}

export function getEthFunctionAbiIdParams(id: string): EthFunctionAbiId {
    return { functionSighash: id };
}
