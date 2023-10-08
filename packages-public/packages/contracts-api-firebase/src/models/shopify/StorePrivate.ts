export interface StorePrivate {
    readonly id: string;
    readonly owner: string;
    readonly shopifyTokenId?: string;
    readonly shopifyToken?: string;
    readonly shopifyTokenState?: string;
    readonly shopifyTokenScope?: string;
    readonly shopifyDomain?: string;
}
