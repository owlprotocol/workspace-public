import type { UpdateData, Primitive } from "firebase/firestore";
import { flattenDeep } from "lodash-es";

/**
 * Convert a nested object, key-value object (depth=1), or primitive Firestore Update data format.
 *  - primitive: return primitive
 *  - key-value: return key-value
 *  - nested: return key-value (for depth=1 keys) & key.subkey (for depth>1) recursively
 *
 * Example:
 * ```typescript
 * const item = { key: 1, parent: { child: 2 }}
 * const itemUpdateExpected = { key: 1, "parent.child": 2 }
 * const itemUpdate = getFirestoreUpdateData(item)
 * assert.equal(itemUpdate, itemUpdateExpected)
 * ```
 *
 * @param item
 * @param key
 * @returns
 */
export function getFirestoreUpdateData<T extends Primitive | Record<string, any>>(item: T): UpdateData<T> {
    //Primitives
    if (typeof item === "string") return item as UpdateData<T>;
    else if (typeof item === "number") return item as UpdateData<T>;
    else if (typeof item === "boolean") return item as UpdateData<T>;
    else if (typeof item === "undefined") return item as UpdateData<T>;
    else if (item === null) return item as UpdateData<T>;

    //Key-value & Nested
    //Convert to list of entires as [key, value] or [key.subkey.subsubkey..., value]
    const entries = Object.entries(item).map(([key, value]) => {
        //Key-value
        //technically theoretically correct recurstion would call [key, getFirestoreUpdateData(value)] but we skip this
        if (typeof value === "string") return [key, value];
        else if (typeof value === "number") return [key, value];
        else if (typeof value === "boolean") return [key, value];
        else if (typeof value === "undefined") return [key, value];
        else if (value === null) return [key, value];

        //Nested
        const valueUpdate = getFirestoreUpdateData<Record<string, any>>(value!);
        const valueEntries = Object.entries(valueUpdate).map(([keyChild, value]) => [`${key}.${keyChild}`, value]);

        return valueEntries;
    });

    const entriesFlat = entries
        .filter((entryOrEntryArrayOrEmpty) => entryOrEntryArrayOrEmpty.length != 0)
        .map((entryOrEntryArray) =>
            Array.isArray(entryOrEntryArray[0]) ? flattenDeep(entryOrEntryArray) : entryOrEntryArray,
        );
    const itemUpdate = Object.fromEntries(entriesFlat);
    return itemUpdate as UpdateData<T>;
}