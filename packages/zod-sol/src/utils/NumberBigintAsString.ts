import { TypeEqual, expectType } from "ts-expect";

/**
 * Recursively cast all types in `T` that match `number | bigint` to `0x${string}`
 *
 * @template T
 * @example ```typescript
 * type A = { a: number; b: bigint; c: string };
 * type B = NumberBigintAsHex<A>;
 * expectType<TypeEqual<B, { a: `0x${string}`; b: `0x${string}`; c: string }>>(true);
 * ```
 */
export type NumberBigintAsHex<T> = CastType<T, number | bigint, `0x${string}`>;

/**
 * Recursively cast all types in `T` that match `From` to `To`
 *
 * @template T
 * @template From
 * @template To
 * @example ```typescript
 * type A = { a: number; b: bigint; c: string };
 * type B = CastType<A, number | bigint, `0x${string}`>;
 * expectType<TypeEqual<B, { a: `0x${string}`; b: `0x${string}`; c: string }>>(true);
 * ```
 */
export type CastType<T, From, To> = T extends From
    ? To
    : T extends (infer R)[]
    ? CastType<R, From, To>[]
    : T extends Record<string, any>
    ? { [K in keyof T]: CastType<T[K], From, To> }
    : T;

type A = { a: number; b: bigint; c: string };
type B = CastType<A, number | bigint, `0x${string}`>;
expectType<TypeEqual<B, { a: `0x${string}`; b: `0x${string}`; c: string }>>(true);
