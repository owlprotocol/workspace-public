import { z } from "zod";
import { Address, getAddress } from "viem";

export const addressRegex = /^0x[a-fA-F0-9]{40}$/;
export const addressZod = z
    .string()
    .regex(addressRegex)
    .transform((a) => getAddress(a))
    .describe("An ethereum address") as z.ZodEffects<z.ZodString, Address, Address>;
