/**
 * Common base types between firebase & firebase-admin
 */

/** Primitive types. */
export type Primitive = string | number | boolean | undefined | null;

/**
 * An options object that configures the behavior of {@link @firebase/firestore/lite#(setDoc:1)}, {@link
 * @firebase/firestore/lite#(WriteBatch.set:1)} and {@link @firebase/firestore/lite#(Transaction.set:1)} calls. These calls can be
 * configured to perform granular merges instead of overwriting the target
 * documents in their entirety by providing a `SetOptions` with `merge: true`.
 *
 * @param merge - Changes the behavior of a `setDoc()` call to only replace the
 * values specified in its data argument. Fields omitted from the `setDoc()`
 * call remain untouched. If your input sets any field to an empty map, all
 * nested fields are overwritten.
 * @param mergeFields - Changes the behavior of `setDoc()` calls to only replace
 * the specified field paths. Any field path that is not specified is ignored
 * and remains untouched. If your input sets any field to an empty map, all
 * nested fields are overwritten.
 */
export type SetOptions =
    | {
          readonly merge?: boolean;
      }
    | {
          readonly mergeFields?: Array<string>;
      };

/**
 * Update data (for use with {@link (updateDoc:1)}) that consists of field paths
 * (e.g. 'foo' or 'foo.baz') mapped to values. Fields that contain dots
 * reference nested fields within the document. FieldValues can be passed in
 * as property values.
 */
export type UpdateData<T> = T extends Primitive
    ? T
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends {}
    ? {
          [K in keyof T]?: UpdateData<T[K]>;
      } & NestedUpdateFields<T>
    : Partial<T>;

/**
 * For each field (e.g. 'bar'), find all nested keys (e.g. {'bar.baz': T1,
 * 'bar.qux': T2}). Intersect them together to make a single map containing
 * all possible keys that are all marked as optional
 */
export type NestedUpdateFields<T extends Record<string, unknown>> = UnionToIntersection<
    {
        [K in keyof T & string]: ChildUpdateFields<K, T[K]>;
    }[keyof T & string]
>;

/**
 * Helper for calculating the nested fields for a given type T1. This is needed
 * to distribute union types such as `undefined | {...}` (happens for optional
 * props) or `{a: A} | {b: B}`.
 *
 * In this use case, `V` is used to distribute the union types of `T[K]` on
 * `Record`, since `T[K]` is evaluated as an expression and not distributed.
 *
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
 */
export type ChildUpdateFields<K extends string, V> = V extends Record<string, unknown>
    ? AddPrefixToKeys<K, UpdateData<V>>
    : never;

/**
 * Returns a new map where every key is prefixed with the outer key appended
 * to a dot.
 */
export type AddPrefixToKeys<Prefix extends string, T extends Record<string, unknown>> = {
    [K in keyof T & string as `${Prefix}.${K}`]+?: string extends K ? any : T[K];
};

/**
 * Given a union type `U = T1 | T2 | ...`, returns an intersected type
 * `(T1 & T2 & ...)`.
 *
 * Uses distributive conditional types and inference from conditional types.
 * This works because multiple candidates for the same type variable in
 * contra-variant positions causes an intersection type to be inferred.
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types
 * https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

/**
 * The direction of a `Query.orderBy()` clause is specified as 'desc' or 'asc'
 * (descending or ascending).
 */
export type OrderByDirection = "desc" | "asc";

/**
 * Filter conditions in a `Query.where()` clause are specified using the
 * strings '<', '<=', '==', '!=', '>=', '>', 'array-contains', 'in', 'not-in',
 * and 'array-contains-any'.
 */
export type WhereFilterOp =
    | "<"
    | "<="
    | "=="
    | "!="
    | ">="
    | ">"
    | "array-contains"
    | "in"
    | "not-in"
    | "array-contains-any";
