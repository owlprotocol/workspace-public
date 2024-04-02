import { z } from "zod";

export type ShopifyCustomer = z.infer<typeof shopifyCustomerZod>;

export const shopifyCustomerZod = z.object({
    id: z.number().describe("").nullable().optional(),
    email: z.string().describe("").nullable().optional(),
    accepts_marketing: z.boolean().describe("").nullable().optional(),
    created_at: z.string().describe("").nullable().optional(),
    updated_at: z.string().describe("").nullable().optional(),
    state: z.string().describe("").nullable().optional(),
    verified_email: z.boolean().describe("").nullable().optional(),
    currency: z.string().describe("").nullable().optional(),
    admin_graphql_api_id: z.string().describe("").nullable().optional(),
});
