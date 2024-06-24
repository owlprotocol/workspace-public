import { z } from "zod";
import { Hex } from "viem";

// hexnum regex
const hexPattern = /^0x[0-9a-f]*$/;

export const targetCallResultSchema = z.object({
    gasUsed: z.bigint(),
    success: z.boolean(),
    returnData: z
        .string()
        .regex(hexPattern)
        .transform((val) => val as Hex),
});

export type TargetCallResult = z.infer<typeof targetCallResultSchema>;
