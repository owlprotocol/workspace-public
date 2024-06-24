import { describe, test } from "vitest";
import { expectType, TypeEqual, TypeOf } from "ts-expect";
import { MapType, OmitWithTypeMatch } from "./types.js";

describe("types.test.ts", () => {
    test("MapType", async () => {
        type A = { a: number; b: bigint; c: string };
        type B = MapType<A, number | bigint, `0x${string}`>;
        expectType<TypeEqual<B, { a: `0x${string}`; b: `0x${string}`; c: string }>>(true);
    });

    test("OmitWithTypeMatch", async () => {
        type A = { a: number; b: bigint; c: string };
        type B = Record<never, never>;
        type C = A & B;

        expectType<TypeOf<C, A>>(true);
        expectType<TypeOf<A, C>>(true);
        expectType<TypeEqual<A, C>>(false);

        type D = OmitWithTypeMatch<C, A>;
        expectType<TypeEqual<D, B>>(true);
    });
});
