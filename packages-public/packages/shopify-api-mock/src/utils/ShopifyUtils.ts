import { InvalidHostError, InvalidShopError } from "@shopify/shopify-api";

export function decodeHost(host: string): string {
    // eslint-disable-next-line no-warning-comments
    // TODO Remove the Buffer.from call when dropping Node 14 support
    return typeof atob === "undefined" ? Buffer.from(host, "base64").toString() : atob(host);
}

export function sanitizeShop(
    shop: string,
    throwOnInvalid?: boolean | undefined,
    customShopDomains?: (RegExp | string)[],
): string | null {
    const domainsRegex = ["myshopify\\.com", "shopify\\.com", "myshopify\\.io"];
    if (customShopDomains) {
        domainsRegex.push(...customShopDomains.map((regex) => (typeof regex === "string" ? regex : regex.source)));
    }

    const shopUrlRegex = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join("|")})[/]*$`);

    const sanitizedShop = shopUrlRegex.test(shop) ? shop : null;
    if (!sanitizedShop && throwOnInvalid) {
        throw new InvalidShopError("Received invalid shop argument");
    }

    return sanitizedShop;
}

export function sanitizeHost(host: string, throwOnInvalid?: boolean | undefined): string | null {
    const base64regex = /^[0-9a-zA-Z+/]+={0,2}$/;

    let sanitizedHost = base64regex.test(host) ? host : null;
    if (sanitizedHost) {
        const { hostname } = new URL(`https://${decodeHost(sanitizedHost)}`);

        const originsRegex = ["myshopify\\.com", "shopify\\.com", "myshopify\\.io", "spin\\.dev"];

        const hostRegex = new RegExp(`\\.(${originsRegex.join("|")})$`);
        if (!hostRegex.test(hostname)) {
            sanitizedHost = null;
        }
    }
    if (!sanitizedHost && throwOnInvalid) {
        throw new InvalidHostError("Received invalid host argument");
    }

    return sanitizedHost;
}

export interface ShopifyUtilsInterface {
    sanitizeShop(shop: string, throwOnInvalid?: boolean): string | null;
    sanitizeHost(host: string, throwOnInvalid?: boolean): string | null;
}

export class ShopifyUtilsMock implements ShopifyUtilsInterface {
    private customShopDomains?: (RegExp | string)[];

    sanitizeShop(shop: string, throwOnInvalid?: boolean | undefined): string | null {
        return sanitizeShop(shop, throwOnInvalid, this.customShopDomains);
    }

    sanitizeHost(host: string, throwOnInvalid?: boolean | undefined): string | null {
        return sanitizeHost(host, throwOnInvalid);
    }
}
