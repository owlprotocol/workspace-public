import { z } from "zod";
import { addressZod } from "@owlprotocol/zod-sol";

export interface User {
    readonly id: string;
    readonly email: string;
    readonly type?: "dev" | "user";
    readonly apiKey?: string;
    readonly dfnsAddress?: string;
    readonly dfnsId?: string;
    readonly gnosisAddress: {
        readonly [networkId: string]: string;
    };
    readonly topupTotals: {
        readonly [networkId: string]: {
            readonly [nativeOrERC20Address: string]: string;
        };
    };
    readonly topupMax: {
        readonly [networkId: string]: {
            readonly [nativeOrERC20Address: string]: string;
        };
    };
}

export const userZod = z.object({
    email: z.string().describe("email"),
    type: z.enum(["user", "dev"]).optional(),
    apiKey: z.string().describe("apiKey").optional(),
    dfnsAddress: addressZod.describe("dfnsAddress").optional(),
    dfnsId: z.string().describe("dfnsId").optional(),
    gnosisTxHash: z.string().describe("gnosisTxHash").optional(),
    gnosisAddress: z.record(z.string().describe("networkId"), addressZod.describe("address")),
    topupTotals: z.record(
        z.string().describe("networkId"),
        z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
    ),
    topupMax: z.record(
        z.string().describe("networkId"),
        z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
    ),
});
