export interface StorePrivateData {
    readonly owner: string;
    readonly shopifyTokenId?: string;
    readonly shopifyToken?: string;
    readonly shopifyTokenState?: string;
    readonly shopifyTokenScope?: string;
    readonly shopifyDomain?: string;
}

export interface StorePrivate extends StorePrivateData {
    readonly id: string;
}
