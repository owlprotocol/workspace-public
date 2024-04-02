export interface InviteCodeReadOnlyData {
    readonly owner: string;
    readonly code: string;
    readonly usageMax: number;
    readonly usageRemaining: number;
    readonly usageTotal: number;
}

export interface InviteCodeReadOnly extends InviteCodeReadOnlyData {
    readonly id: string;
}
