import { RegisterReturn, WebhookValidateParams, WebhookValidation } from "@shopify/shopify-api";
import { SessionInterface } from "../session/Session.js";

export interface ShopifyWebhooksInterface {
    register({ session }: { session: SessionInterface }): Promise<RegisterReturn>;
    validate({ rawBody }: WebhookValidateParams): Promise<WebhookValidation>;
}

export class ShopifyWebhooksMock implements ShopifyWebhooksInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register({ session }: { session: SessionInterface }): Promise<RegisterReturn> {
        throw new Error("Unimplemented");
    }

    async validate({ rawRequest }: WebhookValidateParams): Promise<WebhookValidation> {
        return {
            //Always valid
            valid: true,
            topic: rawRequest.headers["x-shopify-topic"],
            domain: rawRequest.headers["x-shopify-shop-domain"],
            //Dummy data
            webhookId: "mock",
            apiVersion: "mock",
            hmac: "mock",
        };
    }
}
