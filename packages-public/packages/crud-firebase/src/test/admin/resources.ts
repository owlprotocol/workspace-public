import { itemCol, itemCompositeCol, itemSubCol } from "./collection.js";
import { firestore, getFirebaseResource } from "../../admin/index.js";
import { uuidDecodeId, uuidEncodeId } from "../../resource.js";
import { ItemCompositeId, ItemData, ItemId, encodeItemData, encodeItemDataPartial } from "../models/index.js";

/**
 * To keep patterns consistent, top-level collections are still functions
 * but we have them be a constant result to avoid unecessary gc.
 * */
export const itemResource = getFirebaseResource<ItemData, ItemId>(firestore, itemCol, {
    encodeId: uuidEncodeId,
    decodeId: uuidDecodeId,
    encodeDataPartial: encodeItemDataPartial,
    encodeData: encodeItemData,
});

/**
 * We recommend using zod to encode/decode ids and encode data
 * However, the library does not lock you into a specific implementation
 */
export const itemCompositeResource = getFirebaseResource<ItemData, ItemCompositeId>(firestore, itemCompositeCol, {
    encodeId: (idParams) => (typeof idParams === "string" ? idParams : `${idParams.idPrefix}-${idParams.idSuffix}`),
    decodeId: (id) => {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    encodeDataPartial: encodeItemDataPartial,
    encodeData: encodeItemData,
});

/**
 * Subcollections are collections tied to a document path
 * This subcollections is similar to itemComposite but
 * instead of `/itemComposite/{idPrefix}-{idSuffix}`
 * items will be at `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
export const itemSubcollectionResource = getFirebaseResource<ItemData, ItemCompositeId, Required<ItemId>>(
    firestore,
    itemSubCol,
    {
        encodeId: (idParams) => `${idParams.idPrefix}-${idParams.idSuffix}`,
        decodeId: (id) => {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        encodeDataPartial: encodeItemDataPartial,
        encodeData: encodeItemData,
    },
);

/**
 * Item resource with LRU Cache enabled up to 10 items
 * */
export const itemResourceCached = getFirebaseResource<ItemData, ItemId>(
    firestore,
    itemCol,
    {
        encodeId: uuidEncodeId,
        decodeId: uuidDecodeId,
        encodeDataPartial: encodeItemDataPartial,
        encodeData: encodeItemData,
    },
    { lruCacheSize: 10 },
);
