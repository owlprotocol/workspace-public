import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { CouponDefinition } from "../models/CouponDefinition.js";

export const couponDefinition = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        couponCampaign: z.string().describe("coupon campaign").optional(),
        shopifyPriceRuleId: z.string().describe("shopify price rule id").optional(),
        shopifyDiscountCodeId: z.string().describe("shopify discount code id").optional(),
        oncePerCustomer: z.boolean().describe("once per customer").optional(),
        tokenAddress: z.string().describe("token address"),
        tokenId: z.string().describe("token id"),
        networkId: z.string().describe("network id"),
        name: z.string().describe("name").optional(),
        description: z.string().describe("description").optional(),
        discountType: z.enum(["fixed_amount", "percentage"]).describe("discount type").optional(),
        discountValue: z.number().describe("discount value").optional(),
        status: z.enum(["active", "inactive"]).describe("status"),
        store: z.string().describe("description").optional(),
    })
    .describe("coupon definition");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type CouponDefinitionZodInferred = Readonly<z.infer<typeof couponDefinition>>;
expectType<TypeEqual<CouponDefinition, CouponDefinitionZodInferred>>(true);
