export interface ProjectApiKeyPersonalData {
    readonly projectId: string;
    readonly apiKey: string;
    readonly createdAt: number;
    readonly expiry?: number;
}

export interface ProjectApiKeyPersonal extends ProjectApiKeyPersonalData {
    readonly id: string;
}
