import { addressZod } from "@owlprotocol/zod-sol";

export enum DfnsWalletStatus {
    Active = "Active",
    Creating = "Creating",
    Failed = "Failed",
}

export interface DfnsWalletReadOnlyData {
    readonly address?: string;
    readonly status: DfnsWalletStatus;
    readonly owner: string;
    readonly walletId: string;
}

export interface DfnsWalletReadOnly extends DfnsWalletReadOnlyData {
    readonly id: string;
}

export interface SafeWalletId {
    readonly networkId: string;
    readonly address: string;
}

export function getSafeWalletId({ networkId, address }: SafeWalletId): string {
    return [networkId, address].join("-");
}

export function getSafeWalletIdParams(id: string): SafeWalletId {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}

export function validateSafeWalletId({ networkId, address }: SafeWalletId): SafeWalletId {
    return { networkId, address: addressZod.parse(address) };
}

export interface SafeWalletReadOnly extends SafeWalletId {
    readonly owner: string;
}
