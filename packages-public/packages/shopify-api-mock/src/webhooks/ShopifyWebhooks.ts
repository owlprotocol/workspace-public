import {
    AddHandlersParams,
    DeliveryMethod,
    RegisterReturn,
    WebhookHandler,
    WebhookOperation,
    WebhookValidateParams,
    WebhookValidation,
} from "@shopify/shopify-api";
import { mapValues } from "lodash-es";
import { SessionInterface } from "../session/Session.js";

export interface ShopifyWebhooksInterface {
    register({ session }: { session: SessionInterface }): Promise<RegisterReturn>;
    validate({ rawBody }: WebhookValidateParams): Promise<WebhookValidation>;
    addHandlers(handlersToAdd: AddHandlersParams): void;
}

export class ShopifyWebhooksMock implements ShopifyWebhooksInterface {
    private webhooks: {
        [topic: string]: WebhookHandler[];
    } = {};

    /**
     * Register webhook
     * @param param0
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async register({ session }: { session: SessionInterface }): Promise<RegisterReturn> {
        return mapValues(this.webhooks, (handlers) => {
            return handlers.map(() => {
                return {
                    success: true,
                    deliveryMethod: DeliveryMethod.Http,
                    result: {} as any,
                    operation: WebhookOperation.Create,
                };
            });
        });
    }

    /**
     * Validate webhook
     * @param param0
     * @returns
     */
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

    /**
     * Add webhook handlers
     * @param handlersToAdd
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addHandlers(handlersToAdd: AddHandlersParams): void {
        Object.entries(handlersToAdd).map(([topic, handlers]) => {
            if (!this.webhooks[topic]) this.webhooks[topic] = [];

            if (Array.isArray(handlers)) {
                this.webhooks[topic].push(...handlers);
            } else {
                this.webhooks[topic].push(handlers);
            }
        });
    }
}
