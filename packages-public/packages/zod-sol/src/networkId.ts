import { z } from "zod";
import { addressZod } from "./solidity/address.js";

export const networkIdZod = z.object({
    networkId: z
        .string()
        .regex(/^\d+$/)
        .describe("The network id"),
});

export const contractAddressZod = networkIdZod.extend({ address: addressZod })

