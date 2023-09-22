export interface StorePrivate {
    readonly id: string;
    readonly owner: string;
    readonly shopifyToken?: string;
    readonly shopifyDomain?: string;
}
