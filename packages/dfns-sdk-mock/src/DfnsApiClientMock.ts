import type { AssetsClient } from "@dfns/sdk/codegen/Assets/index.js";
import type { AuthClient } from "@dfns/sdk/codegen/Auth/index.js";
import type { CallbacksClient } from "@dfns/sdk/codegen/Callbacks/index.js";
import type { PublicKeysClient } from "@dfns/sdk/codegen/PublicKeys/index.js";

import type { NetworksClient } from "@dfns/sdk/generated/networks/client.js";
import type { PermissionsClient } from "@dfns/sdk/generated/permissions/client.js";
import type { PoliciesClient } from "@dfns/sdk/generated/policies/client.js";
import type { SignersClient } from "@dfns/sdk/generated/signers/client.js";
import type { WebhooksClient } from "@dfns/sdk/generated/webhooks/client.js";

import { WalletsClientInterface, WalletsClientMock } from "./WalletsClientMock.js";

export interface DfnsApiClientInterface {
    assets: AssetsClient;
    auth: AuthClient;
    callbacks: CallbacksClient;
    networks: NetworksClient;
    permissions: PermissionsClient;
    policies: PoliciesClient;
    publicKeys: PublicKeysClient;
    wallets: WalletsClientInterface;
    webhooks: WebhooksClient;
    signers: SignersClient;
}

export class DfnsApiClientMock implements DfnsApiClientInterface {
    private _wallets: WalletsClientMock;

    constructor(mnemonic?: string) {
        this._wallets = new WalletsClientMock(mnemonic);
    }

    get assets(): AssetsClient {
        throw new Error("Unimplemented");
    }
    get auth(): AuthClient {
        throw new Error("Unimplemented");
    }
    get callbacks(): CallbacksClient {
        throw new Error("Unimplemented");
    }
    get networks(): NetworksClient {
        throw new Error("Unimplemented");
    }
    get permissions(): PermissionsClient {
        throw new Error("Unimplemented");
    }
    get policies(): PoliciesClient {
        throw new Error("Unimplemented");
    }
    get publicKeys(): PublicKeysClient {
        throw new Error("Unimplemented");
    }
    get wallets(): WalletsClientMock {
        return this._wallets;
    }
    get webhooks(): WebhooksClient {
        throw new Error("Unimplemented");
    }
    get signers(): SignersClient {
        throw new Error("Unimplemented");
    }
}
