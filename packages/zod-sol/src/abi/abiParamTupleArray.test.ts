import { describe, it } from "vitest";
import { expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "abitype";
import { zodForAbiParamTupleArray } from "./abiParamTupleArray.js";

describe("abiParamArrayTest", function () {
    const tuple1D = {
        name: "target",
        type: "tuple[]",
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        internalType: "struct Target[]",
    } as const; // satisfies AbiParamTupleArray;

    it("tuple[]", async () => {
        const zodTuple = zodForAbiParamTupleArray(tuple1D);
        expectType<
            z.ZodArray<
                z.ZodObject<{
                    to: z.ZodEffects<z.ZodString, Address, Address>;
                    amount: z.ZodBigInt;
                }>
            >
        >(zodTuple);
    });

    const tuple2D = {
        name: "target",
        type: "tuple[][]",
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        internalType: "struct Target[]",
    } as const; // satisfies AbiParamTupleArray;

    it("tuple[][]", async () => {
        const zodTuple = zodForAbiParamTupleArray(tuple2D);
        expectType<
            z.ZodArray<
                z.ZodArray<
                    z.ZodObject<{
                        to: z.ZodEffects<z.ZodString, Address, Address>;
                        amount: z.ZodBigInt;
                    }>
                >
            >
        >(zodTuple);
    });
});
