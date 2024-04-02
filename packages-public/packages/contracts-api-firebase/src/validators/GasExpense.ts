import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "@owlprotocol/zod-sol";
import type {
    GasBudgetRuleByContractReadOnly,
    GasBudgetRuleGlobalReadOnly,
    GasExpenseDailyPublic,
    GasExpenseDailyReadOnly,
    GasExpenseMonthlyPublic,
    GasExpenseMonthlyReadOnly,
} from "../models/GasExpense.js";

export const gasExpenseDailyPublic = z
    .object({
        id: z.string().describe("id"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCost: z.number().describe("usd cost"),
    })
    .describe("public gas expense daily");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasExpenseDailyPublicZodInferred = Readonly<z.infer<typeof gasExpenseDailyPublic>>;
expectType<TypeEqual<GasExpenseDailyPublic, GasExpenseDailyPublicZodInferred>>(true);

export const gasExpenseMonthlyPublic = z
    .object({
        id: z.string().describe("id"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCost: z.number().describe("usd cost"),
    })
    .describe("public gas expense monthly");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasExpenseMonthlyPublicZodInferred = Readonly<z.infer<typeof gasExpenseMonthlyPublic>>;
expectType<TypeEqual<GasExpenseMonthlyPublic, GasExpenseMonthlyPublicZodInferred>>(true);

export const gasExpenseDailyReadOnly = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCost: z.number().describe("usd cost"),
    })
    .describe("organization gas expense daily");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasExpenseDailyReadOnlyZodInferred = Readonly<z.infer<typeof gasExpenseDailyReadOnly>>;
expectType<TypeEqual<GasExpenseDailyReadOnly, GasExpenseDailyReadOnlyZodInferred>>(true);

export const gasExpenseMonthlyReadOnly = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCost: z.number().describe("usd cost"),
    })
    .describe("organization gas expense monthly");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasExpenseMonthlyReadOnlyZodInferred = Readonly<z.infer<typeof gasExpenseMonthlyReadOnly>>;
expectType<TypeEqual<GasExpenseMonthlyReadOnly, GasExpenseMonthlyReadOnlyZodInferred>>(true);

export const gasBudgetRuleGlobalReadOnly = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCostMax: z.number().describe("usd cost max"),
        usdCostRemaining: z.number().describe("usd cost remaining"),
        usdCostTotal: z.number().describe("usd cost total"),
    })
    .describe("global gas budget rule");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasBudgetRuleGlobalReadOnlyZodInferred = Readonly<z.infer<typeof gasBudgetRuleGlobalReadOnly>>;
expectType<TypeEqual<GasBudgetRuleGlobalReadOnly, GasBudgetRuleGlobalReadOnlyZodInferred>>(true);

export const gasBudgetRuleByContractReadOnly = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        startDate: z.number().describe("start date"),
        endDate: z.number().describe("end date"),
        usdCostMax: z.number().describe("usd cost max"),
        usdCostRemaining: z.number().describe("usd cost remaining"),
        usdCostTotal: z.number().describe("usd cost total"),
        contracts: z
            .record(
                z.string().describe("networkId"),
                z.record(addressZod.describe("contract address"), z.boolean().describe("enabled")),
            )
            .describe("supported contracts for rule"),
    })
    .describe("per contract gas budget rule");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type GasBudgetRuleByContractReadOnlyZodInferred = Readonly<z.infer<typeof gasBudgetRuleByContractReadOnly>>;
expectType<TypeEqual<GasBudgetRuleByContractReadOnly, GasBudgetRuleByContractReadOnlyZodInferred>>(true);
