import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { CouponInstance } from "../models/CouponInstance.js";

export const couponInstance = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        couponDefinition: z.string().describe("coupon definition"),
        redeemed: z.boolean().describe("redeemed").optional(),
        createdAt: z.date().describe("createdAt").optional(),
        couponStore: z.string().describe("coupon store").optional(),
        shopifyOrderId: z.string().describe("shopify order id"),
        orderStore: z.string().describe("order store").optional(),
    })
    .describe("coupon instance");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type CouponInstanceZodInferred = Readonly<z.infer<typeof couponInstance>>;
expectType<TypeEqual<CouponInstance, CouponInstanceZodInferred>>(true);
