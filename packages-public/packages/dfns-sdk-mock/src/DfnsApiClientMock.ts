import type { AssetsClient } from "@dfns/sdk/codegen/Assets/index.js";
import type { AuthClient } from "@dfns/sdk/codegen/Auth/index.js";
import type { BlockchainsClient } from "@dfns/sdk/codegen/Blockchains/index.js";
import type { CallbacksClient } from "@dfns/sdk/codegen/Callbacks/index.js";
import type { PermissionsClient } from "@dfns/sdk/codegen/Permissions/index.js";
import type { PolicyExecutionClient } from "@dfns/sdk/codegen/PolicyExecution/index.js";
import type { PolicyManagementClient } from "@dfns/sdk/codegen/PolicyManagement/index.js";
import type { PublicKeysClient } from "@dfns/sdk/codegen/PublicKeys/index.js";
import { WalletsClientInterface, WalletsClientMock } from "./WalletsClientMock.js";

export interface DfnsApiClientInterface {
    assets: AssetsClient;
    auth: AuthClient;
    blockchains: BlockchainsClient;
    callbacks: CallbacksClient;
    permissions: PermissionsClient;
    policyExecution: PolicyExecutionClient;
    policyManagement: PolicyManagementClient;
    publicKeys: PublicKeysClient;
    wallets: WalletsClientInterface;
}

export class DfnsApiClientMock implements DfnsApiClientInterface {
    private _wallets: WalletsClientMock;

    constructor(mnemonic?: string, createTimeout = 0) {
        this._wallets = new WalletsClientMock(mnemonic, createTimeout);
    }

    get assets(): AssetsClient {
        throw new Error("Unimplemented");
    }
    get auth(): AuthClient {
        throw new Error("Unimplemented");
    }
    get blockchains(): BlockchainsClient {
        throw new Error("Unimplemented");
    }
    get callbacks(): CallbacksClient {
        throw new Error("Unimplemented");
    }
    get permissions(): PermissionsClient {
        throw new Error("Unimplemented");
    }
    get policyExecution(): PolicyExecutionClient {
        throw new Error("Unimplemented");
    }
    get policyManagement(): PolicyManagementClient {
        throw new Error("Unimplemented");
    }
    get publicKeys(): PublicKeysClient {
        throw new Error("Unimplemented");
    }
    get wallets(): WalletsClientMock {
        return this._wallets;
    }
}
