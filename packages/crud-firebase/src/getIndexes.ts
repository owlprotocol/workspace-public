/**
 * Ful `firebase.indexes.json` definition
 */
export interface IndexesFieldOverridesJson {
    //TODO: Explore composite indexes
    indexes: [];
    fieldOverrides: FieldOverride[];
}

/** Field index type */
export type FieldIndex<
    order extends "ASCENDING" | "DESCENDING" = "ASCENDING" | "DESCENDING",
    queryScope extends "COLLECTION" | "COLLECTION_GROUP" = "COLLECTION" | "COLLECTION_GROUP",
> = { order: order; queryScope: queryScope };

/** Base field override, can contain any set of indexes */
export interface BaseFieldOverride {
    collectionGroup: string;
    fieldPath: string;
    ttl: boolean;
    indexes: FieldIndex[];
}

/** Ignore field from all indexing */
export interface IgnoreFieldOverride {
    collectionGroup: string;
    fieldPath: string;
    ttl: false;
    indexes: [];
}

/** Index field for collection */
export interface CollectionFieldOverride {
    collectionGroup: string;
    fieldPath: string;
    ttl: false;
    indexes: [FieldIndex<"ASCENDING", "COLLECTION">];
}

/** Index field for collection & collection group */
export interface CollectionGroupFieldOverride {
    collectionGroup: string;
    fieldPath: string;
    ttl: false;
    indexes: [FieldIndex<"ASCENDING", "COLLECTION">, FieldIndex<"ASCENDING", "COLLECTION_GROUP">];
}

/** Field index override */
export type FieldOverride =
    | IgnoreFieldOverride
    | CollectionFieldOverride
    | CollectionGroupFieldOverride
    | BaseFieldOverride;

/**
 * Short-hand notation of `"IGNORE" | "COLLECTION" | "COLLECTION_GROUP"` will generate relevant index,
 * or we can pass a set of custom indexes.
 */
export type FieldOverrideDef = "IGNORE" | "COLLECTION" | "COLLECTION_GROUP" | { ttl?: boolean; indexes: FieldIndex[] };

/**
 * Schema to define field overrides. Uses the `FieldOverrideDef` shorthand notation
 */
export type FieldOverridesSchema<K extends string = string> = Record<K, FieldOverrideDef>;

/**
 * Convert shorthand `FieldOverrideDef` to proper `FieldOverride`
 * @param collectionGroup collection group
 * @param fieldPath field path
 * @param fieldOverrideDef field override definition
 * @returns field override with `indexes` and `ttl`
 */
export function toFieldOverride(
    collectionGroup: string,
    fieldPath: string,
    fieldOverrideDef: FieldOverrideDef,
): FieldOverride {
    if (typeof fieldOverrideDef === "object") {
        return {
            collectionGroup,
            fieldPath,
            ttl: fieldOverrideDef.ttl ?? false,
            indexes: fieldOverrideDef.indexes,
        };
    } else if (fieldOverrideDef === "IGNORE") {
        return {
            collectionGroup,
            fieldPath,
            ttl: false,
            indexes: [],
        } as IgnoreFieldOverride;
    } else if (fieldOverrideDef === "COLLECTION") {
        return {
            collectionGroup,
            fieldPath,
            ttl: false,
            indexes: [{ order: "ASCENDING", queryScope: "COLLECTION" }],
        } as CollectionFieldOverride;
    } else if (fieldOverrideDef === "COLLECTION_GROUP") {
        return {
            collectionGroup,
            fieldPath,
            ttl: false,
            indexes: [
                { order: "ASCENDING", queryScope: "COLLECTION" },
                { order: "ASCENDING", queryScope: "COLLECTION_GROUP" },
            ],
        } as CollectionGroupFieldOverride;
    } else {
        throw new Error(`Invalid fieldOverrideDef ${fieldOverrideDef}`);
    }
}
