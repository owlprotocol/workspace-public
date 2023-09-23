import { z } from "zod";

export type ShopifyLineItem = z.infer<typeof shopifyLineItemZod>;
export const shopifyLineItemZod = z.object({
    id: z.number().describe("").nullable().optional(),
    //admin_graphql_api_id: z.string().describe("").nullable().optional(),
    //fulfillable_quantity: z.string().describe("").nullable().optional(),
    //fulfillable_service: z.string().describe("").nullable().optional(),
    //fulfillment_satus: z.string().describe("").nullable().optional(),
    //gift_card: z.boolean().describe("").nullable().optional(),
    name: z.string().describe("").nullable().optional(),
    price: z.string().describe("").nullable().optional(),
    //product_exists: z.boolean().describe("").nullable().optional(),
    product_id: z.number().describe("").nullable().optional(),
    //quantity: z.number().describe("").nullable().optional(),
    total_discount: z.string().describe("").nullable().optional(),
    //variant_id: z.string().describe("").nullable().optional(),
});
