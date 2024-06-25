import { describe, test } from "vitest";
import { expectType } from "ts-expect";
//import { assert } from 'chai';
//import { boolZod } from "../solidity/bool.js";
import { z } from "zod";
import { zodForAbiParamArray } from "./abiParamArray.js";

describe("abiParamArrayTest", function () {
    test("bool[]", async () => {
        expectType<z.ZodArray<z.ZodBoolean>>(zodForAbiParamArray("bool[]"));
        //assert.equal(z.array(boolZod), zodForAbiParamArray("bool[]"))
    });
    test("bool[][]", async () => {
        expectType<z.ZodArray<z.ZodArray<z.ZodBoolean>>>(zodForAbiParamArray("bool[][]"));
    });
});
