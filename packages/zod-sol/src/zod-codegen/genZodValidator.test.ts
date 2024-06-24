import { describe, test, assert } from "vitest";
import { zeroAddress } from "viem";
import {
    genZodForAbiParamArray,
    genZodForAbiParamNonTuple,
    genZodForAbiParamTuple,
    genZodForAbiParamTupleArray,
    genZodValidatorForAbi,
    genZodValidatorForContract,
    genZodValidatorForFunction,
} from "./genZodValidator.js";
import { fnAbis } from "../fnAbis.js";

describe("genZodValidatorTest", function () {
    describe("genZodForAbiParamNonTuple", () => {
        test("uint256", () => {
            assert.equal(genZodForAbiParamNonTuple("uint256"), "zSol.uint256Zod");
        });
    });

    describe("genZodForAbiParamArray", () => {
        test("uint256[]", () => {
            assert.equal(genZodForAbiParamArray("uint256[]"), "z.array(zSol.uint256Zod)");
        });
    });

    describe("genZodForAbiParamTuple", () => {
        test("(address, uint256)", () => {
            const expected = 'z.object({ "0": zSol.addressZod, "1": zSol.uint256Zod })';
            assert.equal(
                genZodForAbiParamTuple({
                    type: "tuple",
                    components: [{ type: "address" }, { type: "uint256" }],
                }),
                expected,
            );
        });

        test("(address to, uint256 amount)", () => {
            const expected = `z.object({ "to": zSol.addressZod, "amount": zSol.uint256Zod })`;
            assert.equal(
                genZodForAbiParamTuple({
                    type: "tuple",
                    components: [
                        { name: "to", type: "address" },
                        { name: "amount", type: "uint256" },
                    ],
                }),
                expected,
            );
        });
    });

    describe("genZodForAbiParamTupleArray", () => {
        test("(address, uint256)", () => {
            const expected = 'z.array(z.object({ "0": zSol.addressZod, "1": zSol.uint256Zod }))';
            assert.equal(
                genZodForAbiParamTupleArray({
                    type: "tuple[]",
                    components: [{ type: "address" }, { type: "uint256" }],
                }),
                expected,
            );
        });

        test("(address to, uint256 amount)", () => {
            const expected = `z.array(z.object({ "to": zSol.addressZod, "amount": zSol.uint256Zod }))`;
            assert.equal(
                genZodForAbiParamTupleArray({
                    type: "tuple[]",
                    components: [
                        { name: "to", type: "address" },
                        { name: "amount", type: "uint256" },
                    ],
                }),
                expected,
            );
        });
    });

    describe("genZodValidatorForFunction", () => {
        test("fnAbis.uint256", () => {
            const expected = `{ inputs: z.object({ "amount": zSol.uint256Zod }),
    inputsArrayify: z.object({ "amount": zSol.uint256Zod }).transform((val) => [val["amount"]] as const),
    inputsDefined: z.object({ "amount": zSol.uint256Zod }),
    inputsDefinedArrayify: z.object({ "amount": zSol.uint256Zod }).transform((val) => [val["amount"]] as const),
    inputsExample: {"amount":"0"},
    outputs: z.object({  }),
    outputsExample: {}
}`;
            assert.equal(genZodValidatorForFunction(fnAbis.uint256.inputs, fnAbis.uint256.outputs), expected);
        });

        test("fnAbis.empty", () => {
            const expected = `{ inputs: z.object({  }).optional(),
    inputsArrayify: z.object({  }).transform((_) => [] as const).optional(),
    inputsDefined: z.object({  }).optional(),
    inputsDefinedArrayify: z.object({  }).transform((_) => [] as const).optional(),
    inputsExample: {},
    outputs: z.object({  }),
    outputsExample: {}
}`;
            assert.equal(genZodValidatorForFunction(fnAbis.empty.inputs, fnAbis.empty.outputs), expected);
        });

        //TODO: Re-enable after fixing since refactor
        test.skip("fnAbis.address", () => {
            const expected = `{ inputs: z.object({ to: zSol.addressZod }), inputsExample: {"to":"${zeroAddress}"}, outputs: z.object({  }), outputsExample: {} }`;
            assert.equal(genZodValidatorForFunction(fnAbis.address.inputs, fnAbis.address.outputs), expected);
        });

        test.skip("fnAbis.addressUnnamed", () => {
            const expected = `{ inputs: z.object({ "0": zSol.addressZod }), inputsExample: {"0":"${zeroAddress}"}, outputs: z.object({  }), outputsExample: {} }`;
            assert.equal(
                genZodValidatorForFunction(fnAbis.addressUnnamed.inputs, fnAbis.addressUnnamed.outputs),
                expected,
            );
        });

        test.skip("fnAbis.addressArray", () => {
            const expected = `{ inputs: z.object({ to: z.array(zSol.addressZod) }), inputsExample: {"to":"[]"}, outputs: z.object({  }), outputsExample: {} }`;
            assert.equal(genZodValidatorForFunction(fnAbis.addressArray.inputs, fnAbis.addressArray.outputs), expected);
        });

        test.skip("fnAbis.tuple", () => {
            const expected = `{ inputs: z.object({ target: z.object({ to: zSol.addressZod }) }), inputsExample: {"target":{"to":"0x0000000000000000000000000000000000000000"}}, outputs: z.object({  }), outputsExample: {} }`;
            assert.equal(genZodValidatorForFunction(fnAbis.tuple.inputs, fnAbis.tuple.outputs), expected);
        });

        test.skip("fnAbis.tupleArray", () => {
            const expected = `{ inputs: z.object({ target: z.array(z.object({ to: zSol.addressZod })) }), inputsExample: {"target":"[]"}, outputs: z.object({  }), outputsExample: {} }`;
            assert.equal(genZodValidatorForFunction(fnAbis.tupleArray.inputs, fnAbis.tupleArray.outputs), expected);
        });
    });

    describe("genZodValidatorForAbi", () => {
        test.skip("[fnAbis.uint256, fnAbis.address]", () => {
            const expectedUInt256 = `{ inputs: z.object({ amount: zSol.uint256Zod }), inputsExample: {"amount":"0"}, outputs: z.object({  }), outputsExample: {} }`;
            const expectedAddress = `{ inputs: z.object({ to: zSol.addressZod }), inputsExample: {"to":"${zeroAddress}"}, outputs: z.object({  }), outputsExample: {} }`;
            const expected = `{ fnUInt256: ${expectedUInt256},\nfnAddress: ${expectedAddress} }`;
            assert.equal(genZodValidatorForAbi([fnAbis.uint256, fnAbis.address]), expected);
        });
    });

    describe("genZodValidatorForContract", () => {
        test.skip("[fnAbis.uint256, fnAbis.address]", () => {
            const name = "MyContract";
            const zSolPackage = "../solidity/index.js";
            const expectedUInt256 = `{ inputs: z.object({ amount: zSol.uint256Zod }), inputsExample: {"amount":"0"}, outputs: z.object({  }), outputsExample: {} }`;
            const expectedAddress = `{ inputs: z.object({ to: zSol.addressZod }), inputsExample: {"to":"${zeroAddress}"}, outputs: z.object({  }), outputsExample: {} }`;
            const expected = `import { z } from "zod";\n\
import * as zSol from "${zSolPackage}";\n\
\n\
export const ${name} = { fnUInt256: ${expectedUInt256},\nfnAddress: ${expectedAddress} };\n`;

            const result = genZodValidatorForContract(name, [fnAbis.uint256, fnAbis.address], zSolPackage);
            assert.equal(result, expected);
        });
    });
});
