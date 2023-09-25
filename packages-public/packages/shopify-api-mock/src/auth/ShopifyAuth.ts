import { BeginParams, CallbackParams } from "@shopify/shopify-api";
import { SessionInterface } from "../session/Session.js";

export interface ShopifyAuthInterface {
    callback(params: CallbackParams): Promise<{ headers: any; session: SessionInterface }>;
    begin(params: BeginParams): Promise<any>;
}

export class ShopifyAuthMock implements ShopifyAuthInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async callback(params: CallbackParams): Promise<{ headers: any; session: SessionInterface }> {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async begin(params: BeginParams): Promise<any> {
        params.rawResponse.send(200);
    }
}
