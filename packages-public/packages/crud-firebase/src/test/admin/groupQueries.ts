import { CollectionGroup } from "firebase-admin/firestore";
import { childrenColGroupPath } from "../collections.js";
import { ItemCompositeId, ItemData, ItemId } from "../models/index.js";
import { firestore, getFirebaseQueryResource } from "../../admin/index.js";

/**
 * Collection group query on `/children` path
 * will match the subcollection `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
const childrenColGroup = firestore.collectionGroup(childrenColGroupPath) as CollectionGroup<ItemData>;
export const childrenGroupQuery = getFirebaseQueryResource<ItemData, ItemCompositeId, Required<ItemId>>(
    childrenColGroup,
    {
        decodeId: (id) => {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        decodeParentDocId: (id: string) => {
            return { id };
        },
        validateDataPartial: (itemComposite) => itemComposite,
    },
);
