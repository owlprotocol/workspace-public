import { z } from "zod";
import * as zSol from "../solidity/index.js";

export const MyContract = {
    fnUInt256: { inputs: z.object({ amount: zSol.uint256Zod }), outputs: z.object({}) },
    fnAddress: { inputs: z.object({ to: zSol.addressZod }), outputs: z.object({}) }
};
