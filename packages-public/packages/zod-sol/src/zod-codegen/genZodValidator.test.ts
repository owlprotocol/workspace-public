import { assert } from "chai"
import { genZodForAbiParamArray, genZodForAbiParamNonTuple, genZodForAbiParamTuple, genZodForAbiParamTupleArray, genZodValidatorForAbi, genZodValidatorForContract, genZodValidatorForFunction } from "./genZodValidator.js";

const fnAbis = {
    empty: {
        inputs: [],
        name: "fnEmpty",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    uint256: {
        inputs: [
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        name: "fnUInt256",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    address: {
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
        ],
        name: "fnAddress",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    addressUnnamed: {
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        name: "fnAddressUnnamed",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    addressArray: {
        inputs: [
            {
                name: "to",
                type: "address[]",
                internalType: "address[]",
            },
        ],
        name: "fnAddressArray",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    tuple: {
        inputs: [
            {
                name: "target",
                type: "tuple",
                internalType: "struct Target",
                components: [
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                ]
            },

        ],
        name: "fnTuple",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    tupleArray: {
        inputs: [
            {
                name: "target",
                type: "tuple[]",
                internalType: "struct Target[]",
                components: [
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                ]
            },

        ],
        name: "fnTupleArray",
        outputs: [],
        stateMutability: "view",
        type: "function",
    }
} as const

describe('genZodValidatorTest', function () {

    describe("genZodForAbiParamNonTuple", () => {
        it("uint256", () => {
            assert.equal(genZodForAbiParamNonTuple("uint256"), "zSol.uint256Zod")
        })
    })

    describe("genZodForAbiParamArray", () => {
        it("uint256[]", () => {
            assert.equal(genZodForAbiParamArray("uint256[]"), "z.array(zSol.uint256Zod)")
        })
    })

    describe("genZodForAbiParamTuple", () => {
        it("(address, uint256)", () => {
            const expected = "z.object({ 0: zSol.addressZod, 1: zSol.uint256Zod })";
            assert.equal(genZodForAbiParamTuple({
                type: "tuple", components: [{ type: "address" }, { type: "uint256" }]
            }), expected)
        })

        it("(address to, uint256 amount)", () => {
            const expected = "z.object({ to: zSol.addressZod, amount: zSol.uint256Zod })"
            assert.equal(genZodForAbiParamTuple({
                type: "tuple", components: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }]
            }), expected)
        })
    })

    describe("genZodForAbiParamTupleArray", () => {
        it("(address, uint256)", () => {
            const expected = "z.array(z.object({ 0: zSol.addressZod, 1: zSol.uint256Zod }))"
            assert.equal(genZodForAbiParamTupleArray({
                type: "tuple[]", components: [{ type: "address" }, { type: "uint256" }]
            }), expected)
        })

        it("(address to, uint256 amount)", () => {
            const expected = "z.array(z.object({ to: zSol.addressZod, amount: zSol.uint256Zod }))"
            assert.equal(genZodForAbiParamTupleArray({
                type: "tuple[]", components: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }]
            }), expected)
        })
    })

    describe("genZodValidatorForFunction", () => {
        it("fnAbis.uint256", () => {
            const expected = "{ inputs: z.object({ amount: zSol.uint256Zod }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.uint256.inputs, fnAbis.uint256.outputs), expected)
        })

        it("fnAbis.address", () => {
            const expected = "{ inputs: z.object({ to: zSol.addressZod }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.address.inputs, fnAbis.address.outputs), expected)
        })

        it("fnAbis.addressUnnamed", () => {
            const expected = "{ inputs: z.object({ 0: zSol.addressZod }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.addressUnnamed.inputs, fnAbis.addressUnnamed.outputs), expected)
        })

        it("fnAbis.addressArray", () => {
            const expected = "{ inputs: z.object({ to: z.array(zSol.addressZod) }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.addressArray.inputs, fnAbis.addressArray.outputs), expected)
        })

        it("fnAbis.tuple", () => {
            const expected = "{ inputs: z.object({ target: z.object({ to: zSol.addressZod }) }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.tuple.inputs, fnAbis.tuple.outputs), expected)
        })

        it("fnAbis.tupleArray", () => {
            const expected = "{ inputs: z.object({ target: z.array(z.object({ to: zSol.addressZod })) }), outputs: z.object({  }) }"
            assert.equal(genZodValidatorForFunction(fnAbis.tupleArray.inputs, fnAbis.tupleArray.outputs), expected)
        })
    })

    describe("genZodValidatorForAbi", () => {
        it("[fnAbis.uint256, fnAbis.address]", () => {
            const expectedUInt256 = "{ inputs: z.object({ amount: zSol.uint256Zod }), outputs: z.object({  }) }"
            const expectedAddress = "{ inputs: z.object({ to: zSol.addressZod }), outputs: z.object({  }) }"
            const expected = `{ fnUInt256: ${expectedUInt256},\nfnAddress: ${expectedAddress} }`
            assert.equal(genZodValidatorForAbi([fnAbis.uint256, fnAbis.address]), expected)
        })
    })

    describe("genZodValidatorForContract", () => {
        it("[fnAbis.uint256, fnAbis.address]", () => {
            const name = "MyContract"
            const zSolPackage = "../solidity/index.js"
            const expectedUInt256 = "{ inputs: z.object({ amount: zSol.uint256Zod }), outputs: z.object({  }) }"
            const expectedAddress = "{ inputs: z.object({ to: zSol.addressZod }), outputs: z.object({  }) }"
            const expected = `import { z } from "zod";\n\
import * as zSol from "${zSolPackage}";\n\
\n\
export const ${name} = { fnUInt256: ${expectedUInt256},\nfnAddress: ${expectedAddress} };\n`

            const result = genZodValidatorForContract(name, [fnAbis.uint256, fnAbis.address], zSolPackage);
            assert.equal(result, expected)
            console.debug(expected)
        })
    })
})
