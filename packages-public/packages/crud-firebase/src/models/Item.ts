export interface ItemData {
    readonly name: string;
    readonly value: string;
    readonly owner: string;
    readonly map: {
        [k: string]: string;
    };
}

export interface ItemId {
    readonly id?: string;
}

export type Item = ItemData & Required<ItemId>;

export interface ItemCompositeId {
    readonly idPrefix: string;
    readonly idSuffix: string;
}

export type ItemComposite = ItemData & Required<ItemCompositeId>;

export interface ItemPersonal {
    readonly id: string;
    readonly valuePrivate: string;
}

export interface ItemPrivate {
    readonly id: string;
    readonly valuePersonal: string;
}
