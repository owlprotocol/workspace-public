import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { CouponInstance } from "../models/CouponInstance.js";

export const couponInstanceZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        couponDefinition: z.string().describe("coupon definition"),
        minted: z.boolean().describe("minted").optional(),
        redeemed: z.boolean().describe("redeemed").optional(),
        createdAt: z.number().describe("createdAt").optional(),
        couponStore: z.string().describe("coupon store").optional(),
        shopifyOrderId: z.string().describe("shopify order id"),
        orderStore: z.string().describe("order store").optional(),
    })
    .describe("coupon instance");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type CouponInstanceZodInferred = Readonly<z.infer<typeof couponInstanceZod>>;
expectType<TypeEqual<CouponInstance, CouponInstanceZodInferred>>(true);

/*
export const couponInstanceZod = couponInstanceZodInternal as Omit<typeof couponInstanceZodInternal, "_output"> & {
    _output: CouponInstance;
};
*/
