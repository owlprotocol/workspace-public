export type WalletRpcMethod = (typeof walletRpcMethods)[number];

export const walletRpcMethods = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData_v4",
    "personal_sign",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_switchEthereumChain",
    "wallet_watchAsset",
] as const;

/**
 * Check if RPC method is for wallets.
 * @param method
 * @returns true if wallet rpc method
 */
export function isWalletRpcMethod(method: string): method is WalletRpcMethod {
    return walletRpcMethods.includes(method as any);
}
