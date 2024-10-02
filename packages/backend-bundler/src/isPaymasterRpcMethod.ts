export type PaymasterRpcMethod = (typeof paymasterRpcMethods)[number];

export const paymasterRpcMethods = ["pm_sponsorUserOperation", "pm_validateSponsorshipPolicies"] as const;

/**
 * Check if RPC method is for paymaster.
 * @param method
 * @returns true if paymaster rpc method
 */
export function isPaymasterRpcMethod(method: string): method is PaymasterRpcMethod {
    return paymasterRpcMethods.includes(method as any);
}
