import { describe, test } from "vitest";
import { expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "abitype";
import { zodForAbiParamTuple } from "./abiParamTuple.js";

describe("abiParamArrayTest", function () {
    const tuple = {
        name: "target",
        type: "tuple",
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
        internalType: "struct Target",
    } as const; // satisfies AbiParamTuple;

    test("tuple", async () => {
        const zodTuple = zodForAbiParamTuple(tuple);
        expectType<
            z.ZodObject<{
                to: z.ZodEffects<z.ZodString, Address, Address>;
                amount: z.ZodBigInt;
            }>
        >(zodTuple);
    });

    /*
    const tupleNested = {
        name: "receipt",
        type: "tuple",
        components: [
            {
                name: "id",
                type: "uint256",
            },
            ...tuple
        ],
        internalType: "struct Receipt",
    } as const satisfies AbiParamTuple

    test('tuple nested', async () => {
        const zodTuple = zodForAbiParamTuple(tuple)
        expectType<z.ZodObject<{ to: z.ZodString, amount: z.ZodEffects<z.ZodBigInt, string, bigint> }>>(zodTuple)
    });
    */
});
