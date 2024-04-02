export interface ApiKeyPersonalData {
    readonly owner: string;
    readonly apiKey: string;
    readonly expiry?: number;
}

export interface ApiKeyPersonal extends ApiKeyPersonalData {
    readonly id: string;
}
