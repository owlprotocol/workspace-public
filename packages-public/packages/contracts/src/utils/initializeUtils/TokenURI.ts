import type { TokenURI } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURI.js";

export interface TokenURIInitializeArgs {
    admin: Parameters<TokenURI["initialize"]>[0];
    contractUri?: Parameters<TokenURI["initialize"]>[1];
    uri?: Parameters<TokenURI["initialize"]>[2];
}

export function initializeUtil(args: TokenURIInitializeArgs) {
    const { admin, contractUri, uri } = args;
    return [admin, contractUri ?? "", uri ?? ""] as [
        Parameters<TokenURI["initialize"]>[0],
        Parameters<TokenURI["initialize"]>[1],
        Parameters<TokenURI["initialize"]>[2],
    ];
}
