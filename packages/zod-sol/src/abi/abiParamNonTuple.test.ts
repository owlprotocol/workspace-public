import { describe, test, assert } from "vitest";
import { expectType } from "ts-expect";
import { z } from "zod";
import { zodForAbiParamNonTuple } from "./abiParamNonTuple.js";
import { boolZod } from "../solidity/bool.js";

describe("abiParamNonTuple", function () {
    test("bool", async () => {
        expectType<z.ZodBoolean>(zodForAbiParamNonTuple("bool"));
        assert.equal(boolZod, zodForAbiParamNonTuple("bool"));
    });
});
