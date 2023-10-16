import { getFirebaseHooks } from "../hooks/crud.js";
import { ItemCompositeId, ItemData } from "../models/Item.js";
import { firestore } from "../web/config.js";

export const itemsHooks = getFirebaseHooks<ItemData>(firestore, "items");
export const itemsCompositeHooks = getFirebaseHooks<ItemData, ItemCompositeId>(firestore, "itemsComposite", {
    getId({ idPrefix, idSuffix }) {
        return `${idPrefix}-${idSuffix}`;
    },
    getIdParams(id: string) {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    validateId(idParams) {
        return idParams;
    },
});
