import type { TokenURIBaseURI } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURIBaseURI.js";

export interface TokenURIBaseURIInitializeArgs {
    admin: Parameters<TokenURIBaseURI["initialize"]>[0];
    contractUri?: Parameters<TokenURIBaseURI["initialize"]>[1];
    baseUri?: Parameters<TokenURIBaseURI["initialize"]>[2];
}

export function initializeUtil(args: TokenURIBaseURIInitializeArgs) {
    const { admin, contractUri, baseUri } = args;
    return [admin, contractUri ?? "", baseUri ?? ""] as [
        Parameters<TokenURIBaseURI["initialize"]>[0],
        Parameters<TokenURIBaseURI["initialize"]>[1],
        Parameters<TokenURIBaseURI["initialize"]>[2],
    ];
}
