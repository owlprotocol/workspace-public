import { RestInterface, RestMock } from "./rest/Rest.js";
import { ShopifySessionInterface, ShopifySessionMock } from "./session/ShopifySession.js";
import { ShopifyWebhooksInterface, ShopifyWebhooksMock } from "./webhooks/ShopifyWebhooks.js";
import { ShopifyAuthInterface, ShopifyAuthMock } from "./auth/ShopifyAuth.js";
import { ShopifyUtilsInterface, ShopifyUtilsMock } from "./utils/ShopifyUtils.js";

export interface ShopifyInterface {
    auth: ShopifyAuthInterface;
    utils: ShopifyUtilsInterface;
    webhooks: ShopifyWebhooksInterface;
    session: ShopifySessionInterface;
    rest: RestInterface;
}

export class ShopifyMock implements ShopifyInterface {
    auth: ShopifyAuthMock;
    utils: ShopifyUtilsInterface;
    webhooks: ShopifyWebhooksMock;
    session: ShopifySessionMock;
    rest = RestMock;

    constructor() {
        this.auth = new ShopifyAuthMock();
        this.utils = new ShopifyUtilsMock();
        this.webhooks = new ShopifyWebhooksMock();
        this.session = new ShopifySessionMock();
    }
}
