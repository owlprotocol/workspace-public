import { firestore } from "../../web/config.js";
import { getColRef } from "../../web/document.js";
import { getColGroupRef } from "../../web/query.js";
import { itemCompositePath, itemPath, itemChildPath, itemChildGroupPath } from "../collections.js";
import { ItemData, ItemId } from "../models/Item.js";

export const itemCol = getColRef<ItemData>(firestore, itemPath);
export const itemCompositeCol = getColRef<ItemData>(firestore, itemCompositePath);

export const itemChildColGroup = getColGroupRef<ItemData>(firestore, itemChildGroupPath);
export const itemChildCol = (collectionId: Required<ItemId>) =>
    getColRef<ItemData>(firestore, itemChildPath(collectionId));
