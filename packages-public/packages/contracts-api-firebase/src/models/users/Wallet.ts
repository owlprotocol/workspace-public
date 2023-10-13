export enum DfnsWalletStatus {
    Active = "Active",
    Creating = "Creating",
    Failed = "Failed",
}

export interface DfnsWalletReadOnly {
    readonly id: string;
    readonly address?: string;
    readonly status: DfnsWalletStatus;
    readonly owner: string;
    readonly walletId: string;
}
export interface SafeWalletReadOnly {
    readonly id: string;
    readonly networkId: string;
    readonly address: string;
    readonly owner: string;
}
