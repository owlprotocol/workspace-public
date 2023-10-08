export interface ApiKeyPersonal {
    readonly id: string;
    readonly owner: string;
    readonly apiKey: string;
    readonly expiry?: number;
}
