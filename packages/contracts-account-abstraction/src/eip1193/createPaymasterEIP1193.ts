import {
    Address,
    Chain,
    Client,
    EIP1193Parameters,
    EIP1193RequestFn,
    Hex,
    hexToNumber,
    LocalAccount,
    numberToHex,
    PaymasterRpcSchema,
    RpcUserOperation,
    Transport,
} from "viem";
import { getAction } from "viem/utils";
import { getPaymasterData, getPaymasterStubData, getUserOperationGasPrice } from "../actions/index.js";
import { decodeUserOp } from "../models/UserOperation.js";

export type PaymasterRpcMethod = (typeof paymasterRpcMethods)[number];

export const paymasterRpcMethods = [
    "pimlico_getUserOperationGasPrice",
    "pm_getPaymasterStubData",
    "pm_getPaymasterData",
] as const;

/**
 * Check if RPC method is for paymaster.
 * @param method
 * @returns true if paymaster rpc method
 */
export function isPaymasterRpcMethod(method: string): method is PaymasterRpcMethod {
    return paymasterRpcMethods.includes(method as any);
}

export function createBackendPaymasterEIP1193(
    client: Client<Transport, Chain | undefined, LocalAccount>,
): EIP1193RequestFn<PaymasterRpcSchema> {
    return async function (args: EIP1193Parameters<PaymasterRpcSchema>) {
        try {
            if ((args.method as any) === "pimlico_getUserOperationGasPrice") {
                const gasPrice = await getAction(client, getUserOperationGasPrice, "getUserOperationGasPrice")({});
                return {
                    slow: {
                        maxFeePerGas: numberToHex(gasPrice.slow.maxFeePerGas),
                        maxPriorityFeePerGas: numberToHex(gasPrice.slow.maxPriorityFeePerGas),
                    },
                    standard: {
                        maxFeePerGas: numberToHex(gasPrice.slow.maxFeePerGas),
                        maxPriorityFeePerGas: numberToHex(gasPrice.slow.maxPriorityFeePerGas),
                    },
                    fast: {
                        maxFeePerGas: numberToHex(gasPrice.slow.maxFeePerGas),
                        maxPriorityFeePerGas: numberToHex(gasPrice.slow.maxPriorityFeePerGas),
                    },
                };
            } else if (args.method === "pm_getPaymasterStubData") {
                const [userOperationHex, entryPointAddress, chainIdHex] = args.params as unknown as [
                    userOperation: Pick<
                        RpcUserOperation<"0.7">,
                        | "callData"
                        | "callGasLimit"
                        | "factory"
                        | "factoryData"
                        | "maxFeePerGas"
                        | "maxPriorityFeePerGas"
                        | "nonce"
                        | "sender"
                        | "preVerificationGas"
                        | "verificationGasLimit"
                    >,
                    entryPointAddress: Address,
                    chainIdHex: Hex,
                ];

                const userOperation = decodeUserOp(userOperationHex as any);

                const {
                    paymaster,
                    paymasterData,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                    sponsor,
                    isFinal,
                } = await getAction(
                    client,
                    getPaymasterStubData,
                    "getPaymasterStubData",
                )({ ...userOperation, entryPointAddress, chainId: hexToNumber(chainIdHex) });

                const result: {
                    paymaster: Address;
                    paymasterData: Hex;
                    paymasterVerificationGasLimit: Hex;
                    paymasterPostOpGasLimit: Hex;
                    sponsor?: { name: string; icon?: string | undefined } | undefined;
                    isFinal?: boolean | undefined;
                } = {
                    paymaster,
                    paymasterData,
                    //Interfaces don't match between official viem action & RPC. Default to 0
                    paymasterVerificationGasLimit: paymasterVerificationGasLimit
                        ? numberToHex(paymasterVerificationGasLimit)
                        : "0x",
                    paymasterPostOpGasLimit: numberToHex(paymasterPostOpGasLimit),
                };
                if (sponsor) {
                    result.sponsor = sponsor;
                }
                if (isFinal != undefined) {
                    result.isFinal = isFinal;
                }

                return result;
            } else if (args.method === "pm_getPaymasterData") {
                const [userOperationHex, entryPointAddress, chainIdHex] = args.params as unknown as [
                    userOperation: Pick<
                        RpcUserOperation<"0.7">,
                        | "callData"
                        | "callGasLimit"
                        | "factory"
                        | "factoryData"
                        | "maxFeePerGas"
                        | "maxPriorityFeePerGas"
                        | "nonce"
                        | "sender"
                        | "preVerificationGas"
                        | "verificationGasLimit"
                    >,
                    entryPointAddress: Address,
                    chainIdHex: Hex,
                ];

                const userOperation = decodeUserOp(userOperationHex as any);

                const { paymaster, paymasterData, paymasterVerificationGasLimit, paymasterPostOpGasLimit } =
                    await getAction(
                        client,
                        getPaymasterData,
                        "getPaymasterData",
                    )({ ...userOperation, entryPointAddress, chainId: hexToNumber(chainIdHex) });

                const result: {
                    paymaster: Address;
                    paymasterData: Hex;
                    paymasterVerificationGasLimit: Hex;
                    paymasterPostOpGasLimit: Hex;
                } = {
                    paymaster,
                    paymasterData,
                    //Interfaces don't match between official viem action & RPC. Default to 0
                    paymasterVerificationGasLimit: paymasterVerificationGasLimit
                        ? numberToHex(paymasterVerificationGasLimit)
                        : "0x",
                    //Interfaces don't match between official viem action & RPC. Default to 0
                    paymasterPostOpGasLimit: paymasterPostOpGasLimit ? numberToHex(paymasterPostOpGasLimit) : "0x",
                };

                return result;
            }
        } catch (error) {
            //TODO: Error handling
            return null;
        }
    } as any;
}
