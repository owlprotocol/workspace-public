import { z } from "zod";
import { Address, getAddress } from "viem";

export const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const addressZodInternal = z
    .string()
    .regex(addressRegex)
    .transform((a) => getAddress(a))
    .describe("An ethereum address");

export const addressZod = addressZodInternal as Omit<typeof addressZodInternal, "_output" | "_input"> & {
    _input: Address;
    _output: Address;
};
