import { omit } from "lodash-es";
import { ItemData, ItemCompositeId, ItemId } from "../models/Item.js";
import { firestore } from "../web/config.js";
import { getFirebaseCRUD } from "../web/crud.js";

export const itemsCRUD = getFirebaseCRUD<ItemData, ItemId>(firestore, "items");
export const itemsCompositeCRUD = getFirebaseCRUD<ItemData, ItemCompositeId>(firestore, "itemsComposite", {
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
});
