import { constants } from "ethers";
import type { TokenURIDna } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURIDna.js";

export interface TokenURIDnaInitializeArgs {
    admin: Parameters<TokenURIDna["initialize"]>[0];
    contractUri?: Parameters<TokenURIDna["initialize"]>[1];
    baseUri?: Parameters<TokenURIDna["initialize"]>[2];
    dnaProvider?: Parameters<TokenURIDna["initialize"]>[3];
}

export function initializeUtil(args: TokenURIDnaInitializeArgs) {
    const { admin, contractUri, baseUri, dnaProvider } = args;
    return [admin, contractUri ?? "", baseUri ?? "", dnaProvider ?? constants.AddressZero] as [
        Parameters<TokenURIDna["initialize"]>[0],
        Parameters<TokenURIDna["initialize"]>[1],
        Parameters<TokenURIDna["initialize"]>[2],
        Parameters<TokenURIDna["initialize"]>[3],
    ];
}
