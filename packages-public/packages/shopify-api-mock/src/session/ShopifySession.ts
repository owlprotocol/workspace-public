import { GetCurrentSessionIdParams, JwtPayload } from "@shopify/shopify-api";
import { SessionInterface, SessionMock } from "./Session.js";
import { sanitizeShop } from "../utils/ShopifyUtils.js";

/** ShopifySession module interface */
export interface ShopifySessionInterface {
    customAppSession(shop: string): SessionInterface;
    getCurrentId(params: GetCurrentSessionIdParams): Promise<string | undefined>;
    getOfflineId(shop: string): string;
    getJwtSessionId(shop: string, userId: string): string;
    decodeSessionToken(token: string, { checkAudience }: { checkAudience: boolean }): Promise<JwtPayload>;
}

export class ShopifySessionMock implements ShopifySessionInterface {
    private customShopDomains?: (RegExp | string)[];

    customAppSession(shop: string): SessionInterface {
        return new SessionMock({
            id: "",
            shop: `${sanitizeShop(shop, true, this.customShopDomains)}`,
            state: "",
            isOnline: false,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCurrentId(params: GetCurrentSessionIdParams): Promise<string | undefined> {
        throw new Error("Unimplemented");
    }

    getOfflineId(shop: string): string {
        return `offline_${sanitizeShop(shop, true, this.customShopDomains)}`;
    }

    getJwtSessionId(shop: string, userId: string): string {
        return `${sanitizeShop(shop, true, this.customShopDomains)}_${userId}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decodeSessionToken(token: string, { checkAudience }: { checkAudience: boolean }): Promise<JwtPayload> {
        throw new Error("Unimplemented");
    }
}
