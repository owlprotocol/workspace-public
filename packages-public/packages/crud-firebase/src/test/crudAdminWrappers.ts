import { omit } from "lodash-es";
import { firestore } from "../admin/config.js";
import { getFirebaseCRUD } from "../admin/crud.js";
import { ItemData, ItemCompositeId, ItemId } from "../models/Item.js";

export const itemsCRUD = getFirebaseCRUD<ItemData, ItemId, [owner: string]>(firestore, "items", undefined, {
    readAccessCheck: (item, itemId) => item.owner === itemId,
    setAccessCheck: (item, itemId) => item.owner === itemId,
    updateAccessCheck: (item, itemId) => item.owner === itemId,
    deleteAccessCheck: (item, itemId) => item.owner === itemId,
});

export const itemsCompositeCRUD = getFirebaseCRUD<ItemData, ItemCompositeId, [owner: string]>(
    firestore,
    "itemsComposite",
    {
        getId({ idPrefix, idSuffix }) {
            return `${idPrefix}-${idSuffix}`;
        },
        getIdParams(id: string) {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        validateData(item) {
            return omit(item, "idPrefix", "idSuffix");
        },
        validateId(idParams) {
            return idParams;
        },
    },
    {
        readAccessCheck: (item, itemId) => item.owner === itemId,
        setAccessCheck: (item, itemId) => item.owner === itemId,
        updateAccessCheck: (item, itemId) => item.owner === itemId,
        deleteAccessCheck: (item, itemId) => item.owner === itemId,
    },
);
