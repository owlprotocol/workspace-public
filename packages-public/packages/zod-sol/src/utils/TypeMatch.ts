/**
 * Construct a type with the properties T[key] of T except for those in type K[key].
 * Useful for debugging TypeOf or TypeEqual checks.
 */
export type OmitWithTypeMatch<T, U> = {
    [K in keyof T as K extends keyof U ? (U[K] extends T[K] ? never : K) : K]: T[K];
};
