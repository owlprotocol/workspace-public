import { z } from "zod";

export type ShopifyOrderCreateHeader = z.infer<typeof shopifyOrderCreateHeadersZod>;
export type ShopifyOrderCreateBody = z.infer<typeof shopifyOrderCreateBodyZod>;
export type ShopifyOrderCreateRequest = {
    headers: ShopifyOrderCreateHeader;
    body: ShopifyOrderCreateBody;
};
export type ShopifyOrder = z.infer<typeof shopifOrderCreateZod>;

export const shopifyOrderCreateHeadersZod = z.object({
    "x-shopify-hmac-sha256": z.string().describe("hmac-sha256").optional(),
    "x-shopify-order-id": z.string().describe("order-id"),
    "x-shopify-shop-domain": z.string().describe("shop-domain"),
    "x-shopify-test": z.string().describe("shop-test").optional(),
    "x-shopify-topic": z.string().describe("topic (example orders/create)"),
    "x-shopify-triggered-at": z.string().describe("trigger").optional(),
    "x-shopify-webhook-id": z.string().describe("webbook id").optional(),
});

export const shopifyOrderCreateBodyZod = z.object({
    id: z.string().nullable().describe("id"),
    admin_graphql_api_id: z.string().describe("cancel reason").nullable().optional(),
    app_id: z.string().nullable().describe("app id").optional(),
    //browser_ip: z.string().nullable().describe("browser ip").optional(),
    buyer_accepts_marketing: z.boolean().nullable().describe("buyer accepts marketing").optional(),
    //cancel_reason: z.string().describe("cancel reason").nullable().optional(),
    //cart_token: z.string().describe("cart token").nullable().optional(),
    //checkout_id: z.string().describe("checkout id").nullable().optional(),
    //checkout_token: z.string().describe("checkout token").nullable().optional(),
    confirmation_number: z.string().describe("confirmation number").optional(),
    confirmed: z.boolean().describe("confirmed").nullable().optional(),
    contact_email: z.string().describe("contact email").nullable().optional(),
    created_at: z.string().describe("created at").nullable().optional(),
    currency: z.string().describe("currency").nullable().optional(),
    //current_subtotal_price: z.string().describe("current subtotal price").nullable().optional(),
    current_total_discounts: z.string().describe("contact total discounts").nullable().optional(),
    current_total_price: z.string().describe("current total price").nullable().optional(),
    current_total_tax: z.string().describe("current total tax").nullable().optional(),
    //customer_locale: z.string().describe("customer locale").nullable().optional(),
    discount_codes: z.array(z.string()).describe("discount codes").nullable().optional(),
    email: z.string().describe("email").nullable(),
    financial_status: z.string().describe("paid").nullable().optional(),
    fulfillment_status: z.string().describe("").nullable().optional(),
    name: z.string().describe("").nullable().optional(),
    number: z.number().describe("").nullable().optional(),
    order_number: z.number().describe("").nullable().optional(),
    //order_status_url: z.string().describe("").nullable().optional(),
    //processed_at: z.string().describe("").nullable().optional(),
    //reference: z.string().describe("").nullable().optional(),
    //subtotal_price: z.string().describe("").nullable().optional(),
    //tags: z.string().describe("").nullable().optional(),
    //test: z.boolean().describe("").nullable().optional(),
    //total_discounts: z.string().describe("").nullable().optional(),
    //total_price: z.string().describe("").nullable().optional(),
    //total_tax: z.string().describe("").nullable().optional(),
    //updated_at: z.string().describe("").nullable().optional(),
    //customer: shopifyCustomerZod,
    //line_items: z.array(shopifyLineItem),
});

export const shopifOrderCreateZod = z
    .object({
        headers: shopifyOrderCreateHeadersZod,
        body: shopifyOrderCreateBodyZod,
    })
    .transform(({ headers, body }) => {
        return {
            ...headers,
            ...body,
        };
    });
