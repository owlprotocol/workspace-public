import type { TokenDna } from "../../typechain/ethers/contracts/plugins/TokenDna/TokenDna.js";

export interface TokenDnaInitializeArgs {
    admin: Parameters<TokenDna["initialize"]>[0];
    contractUri?: Parameters<TokenDna["initialize"]>[1];
}

export function initializeUtil(args: TokenDnaInitializeArgs) {
    const { admin, contractUri } = args;
    return [admin, contractUri ?? ""] as [Parameters<TokenDna["initialize"]>[0], Parameters<TokenDna["initialize"]>[1]];
}
