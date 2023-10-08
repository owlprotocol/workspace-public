export interface InviteCodeReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly code: string;
    readonly usageMax: number;
    readonly usageRemaining: number;
    readonly usageTotal: number;
}
