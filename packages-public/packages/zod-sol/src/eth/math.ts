import { Hex } from "viem";
import { ZodIssueCode, ZodTooBigIssue, ZodTooSmallIssue, z } from "zod";

/**
 * Math zod
 *
 * Strict zod validators for convert between various numerical representations
 *  - hex (hexadecimal string, starts with "0x")
 *  - decimal (decimal string)
 *  - number (JS number,  Number.MIN_SAFE_INTEGER <= n <= Number.MAX_SAFE_INTEGER)
 *  - bigint (JS bigint, no min or max)
 *
 * This is preferable to zod.coerce which can have unpredictable behaviour due to
 * using JS coercion. We also simplify the zod validator types using type
 * narrowing (eg. `as unknown as z.ZodEffects<...>`)
 */

/**
 *  Any type that can be used where a numeric value is needed.
 */
export type Numeric = number | bigint;

/**
 *  Any type that can be used where a big number is needed.
 */
export type BigNumberish = string | Numeric;

/**
 * Hex or decimal string (no zod union for openapi support)
 */
export const hexOrDecimalStringZod = z
    .string()
    .regex(/^[0-9]+$|^0x[a-fA-F0-9]+$/)
    .describe("A hex or decimal string");

/***** Number *****/
/**
 * Match hex/decimal
 * Transform to number
 * @throws `ZodIssueCode.too_big` if `n > Number.MAX_SAFE_INTEGER`
 * @throws `ZodIssueCode.too_small` if `n < Number.MIN_SAFE_INTEGER`
 */
export const numberStringZod = hexOrDecimalStringZod
    .refine((n) => BigInt(n) <= BigInt(Number.MAX_SAFE_INTEGER), {
        code: ZodIssueCode.too_big,
        maximum: Number.MAX_SAFE_INTEGER,
        inclusive: true,
        exact: true,
        type: "number",
    } as ZodTooBigIssue)
    .refine((n) => BigInt(n) >= BigInt(Number.MIN_SAFE_INTEGER), {
        code: ZodIssueCode.too_small,
        minimum: Number.MIN_SAFE_INTEGER,
        inclusive: true,
        exact: true,
        type: "number",
    } as ZodTooSmallIssue)
    .transform((n) => Number(n))
    .describe("A number hex or decimal string") as unknown as z.ZodEffects<z.ZodString, number, string>;

/**
 * Match number/hex/decimal
 * Transform to number
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 * @throws `ZodIssueCode.too_big` if `n > Number.MAX_SAFE_INTEGER`
 * @throws `ZodIssueCode.too_small` if `n < Number.MIN_SAFE_INTEGER`
 */
export const numberLikeZod = z.union([z.number(), numberStringZod]) as unknown as z.ZodEffects<
    z.ZodUnion<[z.ZodNumber, z.ZodString]>,
    number,
    number | string
>;

/**
 * Match number/hex/decimal
 * Transform to hex
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 * @throws `ZodIssueCode.too_big` if `n > Number.MAX_SAFE_INTEGER`
 * @throws `ZodIssueCode.too_small` if `n < Number.MIN_SAFE_INTEGER`
 */
export const numberLikeToHexZod = numberLikeZod.transform(
    (n) => ("0x" + n.toString(16)) as Hex,
) as unknown as z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, Hex, number | string>;

/**
 * Match number/hex/decimal
 * Transform to decimal
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 * @throws `ZodIssueCode.too_big` if `n > Number.MAX_SAFE_INTEGER`
 * @throws `ZodIssueCode.too_small` if `n < Number.MIN_SAFE_INTEGER`
 */
export const numberLikeToDecimalZod = numberLikeZod.transform((n) => n.toString(10)) as unknown as z.ZodEffects<
    z.ZodUnion<[z.ZodNumber, z.ZodString]>,
    string,
    number | string
>;

/***** BigInt *****/
/**
 * Match hex/decimal
 * Transform to bigint
 */
export const bigIntStringZod = hexOrDecimalStringZod
    .describe("A bigint hex or decimal string")
    .transform((n) => BigInt(n));

/**
 * Match bigint/number/hex/decimal
 * Transform to bigint
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 */
export const bigIntLikeZod = z.union([
    z.bigint(),
    z.number().transform((n) => BigInt(n)),
    bigIntStringZod,
]) as unknown as z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>, bigint, bigint | number | string>;

/**
 * Match bigint/number/hex/decimal
 * Transform to hex
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 */
export const bigIntLikeToHexZod = bigIntLikeZod.transform(
    (n) => ("0x" + n.toString(16)) as Hex,
) as unknown as z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>, Hex, bigint | number | string>;

/**
 * Match bigint/number/hex/decimal
 * Transform to decimal
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 */
export const bigIntLikeToDecimalZod = bigIntLikeZod.transform((n) => n.toString(10)) as unknown as z.ZodEffects<
    z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>,
    string,
    bigint | number | string
>;

/***** Quantity, represents bigint in Eth models *****/
/**
 * Zod validator encoding QuantityInput => QuantityEncoded
 */
export const quantityEncodeZod = bigIntLikeToHexZod;
/**
 * Zod validator encoding QuantityInput|QuantityEncoded => QuantityDecoded
 */
export const quantityDecodeZod = bigIntLikeZod;

/***** Index, represents number in Eth models *****/
/**
 * Zod validator encoding IndexInput => IndexEncoded
 */
export const indexEncodeZod = numberLikeToHexZod;
/**
 * Zod validator encoding IndexInput|IndexEncoded => IndexDecoded
 */
export const indexDecodeZod = numberLikeZod;
