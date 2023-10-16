import { Item, ItemComposite } from "../models/Item.js";

const uuid1 = "00000000-0000-0000-0000-000000000001";

export const testItemId = uuid1;
export const testItem: Item = {
    id: testItemId,
    name: "john",
    value: "0",
    owner: testItemId,
    map: {
        keyA: "valueA",
    },
};

export const testItemComposite: ItemComposite = {
    idPrefix: "A",
    idSuffix: "1",
    name: "john",
    value: "0",
    owner: testItemId,
    map: {
        keyA: "valueA",
    },
};
