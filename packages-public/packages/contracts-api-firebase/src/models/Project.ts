export interface Project {
    readonly id: string;
    readonly owner: string;
    readonly name: string;
    readonly description?: string;
    readonly shopifyAPIKey?: string;
    readonly storeName?: string;
}
