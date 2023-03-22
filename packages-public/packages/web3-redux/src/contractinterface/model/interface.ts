import type { AbiItem } from "web3-utils";

export interface ContractInterfaceId {
    readonly interfaceId: string;
}

export interface ContractInterface extends ContractInterfaceId {
    readonly abi: AbiItem[];
}

export function validateId({ interfaceId }: ContractInterfaceId): ContractInterfaceId {
    return { interfaceId };
}

export function toPrimaryKey({ interfaceId }: ContractInterfaceId): [string] {
    return [interfaceId];
}

export const ContractInterfaceIndex = "interfaceId";
