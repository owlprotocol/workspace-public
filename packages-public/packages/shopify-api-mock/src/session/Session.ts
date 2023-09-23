import { OnlineAccessInfo, SessionParams } from "@shopify/shopify-api";

/** Session class interface */
export interface SessionInterface {
    readonly id: string;
    shop: string;
    state: string;
    isOnline: boolean;
    scope?: string;
    expires?: Date;
    accessToken?: string;
    onlineAccessInfo?: OnlineAccessInfo;

    isActive(scopes: string | string[]): boolean;

    toObject(): SessionParams;

    equals(other: SessionInterface | undefined): boolean;

    toPropertyArray(): [string, string | number | boolean][];
}

/** Session class mock */
export class SessionMock implements SessionInterface {
    readonly id: string;
    /** Shop domain */
    shop: string;
    state: string;
    isOnline: boolean;
    scope?: string;
    expires?: Date;
    accessToken?: string;
    onlineAccessInfo?: OnlineAccessInfo;

    constructor(params: SessionParams) {
        this.id = params.id;
        this.shop = params.shop;
        this.state = params.state;
        this.isOnline = params.isOnline;
        this.scope = params.scope;
        this.expires = params.expires;
        this.accessToken = params.accessToken;
        this.onlineAccessInfo = params.onlineAccessInfo;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public isActive(scopes: string | string[]): boolean {
        throw new Error("Unimplemented");
    }

    public toObject(): SessionParams {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public equals(other: SessionInterface | undefined): boolean {
        throw new Error("Unimplemented");
    }

    public toPropertyArray(): [string, string | number | boolean][] {
        throw new Error("Unimplemented");
    }
}
