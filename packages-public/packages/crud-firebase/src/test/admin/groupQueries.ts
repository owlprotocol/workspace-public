import { itemSubGroupPath } from "../collections.js";
import { ItemCompositeId, ItemData, ItemId } from "../models/index.js";
import { firestore, getFirebaseQueryResource } from "../../admin/index.js";
import { Query } from "../../query.js";

/**
 * Collection group query on `/children` path
 * will match the subcollection `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
const childrenColGroup = firestore.collectionGroup(itemSubGroupPath) as unknown as Query<"admin", ItemData>;
export const childrenGroupQuery = getFirebaseQueryResource<
    ItemData,
    ItemCompositeId,
    Required<ItemId>,
    ItemData,
    ItemData,
    Query<"admin", ItemData>
>(childrenColGroup, {
    decodeId: (id) => {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    decodeParentDocId: (id: string) => {
        return { id };
    },
    encodeDataPartial: (itemComposite) => itemComposite,
});
