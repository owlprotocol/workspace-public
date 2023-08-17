import { z } from "zod";
import * as zSol from "../solidity/index.js";

export const MyContract = {
    fnUInt256: {
        inputs: z.object({ admin: zSol.addressZod.optional().describe("Admin address"), amount: zSol.uint256Zod }),
        //TODO: Use docs?
        inputsExample: {},
        outputs: z.object({}),
        //TODO: Use docs?
        outputsExample: {},
    },
    fnAddress: { inputs: z.object({ to: zSol.addressZod }), outputs: z.object({}) }
};
