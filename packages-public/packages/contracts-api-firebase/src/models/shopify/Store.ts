export interface StoreData {
    readonly owner: string;
    readonly storeName: string;
    readonly storeDomain?: string;
}

export interface Store extends StoreData {
    readonly id: string;
}
