import { firestore, getFirebaseResource, getFirebaseResourceFactory } from "../../admin/index.js";
import { uuidDecodeId, uuidEncodeId } from "../../resource.js";
import { itemCompositePath, itemPath, itemSubcollection } from "../collections.js";
import { ItemCompositeId, ItemData, ItemId } from "../models/index.js";

/**
 * To keep patterns consistent, top-level collections are still functions
 * but we have them be a constant result to avoid unecessary gc.
 * */
const itemResourceInternal = getFirebaseResource<ItemData, ItemId>(firestore, itemPath, {
    encodeId: uuidEncodeId,
    decodeId: uuidDecodeId,
    validateDataPartial: (item) => item,
});
export const itemResource = () => itemResourceInternal;

/**
 * We recommend using zod to encode/decode ids and validate data
 * However, the library does not lock you into a specific implementation
 */
const itemCompositeResourceInternal = getFirebaseResource<ItemData, ItemCompositeId>(firestore, itemCompositePath, {
    encodeId: (idParams) => (typeof idParams === "string" ? idParams : `${idParams.idPrefix}-${idParams.idSuffix}`),
    decodeId: (id) => {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    validateDataPartial: (itemComposite) => itemComposite,
});
export const itemCompositeResource = () => itemCompositeResourceInternal;

/**
 * Subcollections are collections tied to a document path
 * This subcollections is similar to itemComposite but
 * instead of `/itemComposite/{idPrefix}-{idSuffix}`
 * items will be at `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
export const itemSubcollectionResource = getFirebaseResourceFactory<Required<ItemId>, ItemData, ItemCompositeId>(
    firestore,
    itemSubcollection,
    {
        encodeId: (idParams) => (typeof idParams === "string" ? idParams : `${idParams.idPrefix}-${idParams.idSuffix}`),
        decodeId: (id) => {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        validateDataPartial: (itemComposite) => itemComposite,
    },
);

/**
 * Item resource with LRU Cache enabled up to 10 items
 * */
const itemResourceCachedInternal = getFirebaseResource<ItemData, ItemId>(
    firestore,
    itemPath,
    {
        encodeId: uuidEncodeId,
        decodeId: uuidDecodeId,
        validateDataPartial: (item) => item,
    },
    { lruCacheSize: 10 },
);
export const itemResourceCached = () => itemResourceCachedInternal;
