import { DfnsWalletStatus, SafeWalletId } from "../index.js";

export interface ProjectDfnsWalletReadOnlyData {
    readonly address?: string;
    readonly status: DfnsWalletStatus;
    readonly projectId: string;
    readonly walletId: string;
}

export interface ProjectDfnsWalletReadOnly extends ProjectDfnsWalletReadOnlyData {
    readonly id: string;
}

export interface ProjectSafeWalletReadOnly extends SafeWalletId {
    readonly projectId: string;
}
