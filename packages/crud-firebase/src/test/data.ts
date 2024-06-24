import { Item, ItemComposite, ItemData } from "./models/Item.js";

const uuid1 = "00000000-0000-0000-0000-000000000001";

export const testItemData: ItemData = {
    name: "john",
    value: "0",
    count: 0,
    owner: uuid1,
    map: {
        keyA: "valueA",
    },
    objectArray: [{ name: "A" }, { name: "B" }],
};

export function getTestItem(id: number): Item {
    return { id: `${100 + id}`, ...testItemData };
}

export function getTestItemComposite(id: number): ItemComposite {
    return { idPrefix: "A", idSuffix: `${200 + id}`, ...testItemData };
}

export const testItemId = uuid1;
export const testItem: Item = {
    id: testItemId,
    ...testItemData,
};

export const testItemComposite: ItemComposite = {
    idPrefix: "A",
    idSuffix: "1",
    ...testItemData,
};
