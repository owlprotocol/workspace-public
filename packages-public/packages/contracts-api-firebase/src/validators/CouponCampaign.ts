import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { CouponCampaign } from "../models/CouponCampaign.js";

export const couponCampaign = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        project: z.string().describe("project").optional(),
        name: z.string().describe("name").optional(),
        description: z.string().describe("description").optional(),
        status: z.enum(["active", "inactive"]).describe("status"),
    })
    .describe("coupon campaign");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type CouponCampaignZodInferred = Readonly<z.infer<typeof couponCampaign>>;
expectType<TypeEqual<CouponCampaign, CouponCampaignZodInferred>>(true);
