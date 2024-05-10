import { Hex } from "viem";
import { z } from "zod";

// hexnum regex
const hexPattern = /^0x[0-9a-f]*$/;

export const executionResultSchemaV07 = z
    .tuple([
        z.bigint(),
        z.bigint(),
        z.bigint(),
        z.bigint(),
        z.bigint(),
        z.bigint(),
        z.boolean(),
        z.string().regex(hexPattern),
    ])
    .transform((val) => {
        return {
            preOpGas: val[0],
            paid: val[1],
            validationData: val[2],
            paymasterValidationData: val[3],
            paymasterVerificationGasLimit: val[4],
            paymasterPostOpGasLimit: val[5],
            targetSuccess: val[6],
            targetResult: val[7] as Hex,
        };
    });

export const executionResultSchema = executionResultSchemaV07;

export type ExecutionResult = z.infer<typeof executionResultSchema>;

export const targetCallResultSchema = z.object({
    gasUsed: z.bigint(),
    success: z.boolean(),
    returnData: z
        .string()
        .regex(hexPattern)
        .transform((val) => val as Hex),
});

export type TargetCallResult = z.infer<typeof targetCallResultSchema>;
