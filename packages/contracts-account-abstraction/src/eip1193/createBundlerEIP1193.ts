import {
    Account,
    BundlerRpcSchema,
    Chain,
    Client,
    EIP1193Parameters,
    EIP1193RequestFn,
    numberToHex,
    RpcUserOperation,
    Transport,
    Address,
    PartialBy,
    Hex,
    RpcRequestError,
    PublicRpcSchema,
} from "viem";
import { getAction } from "viem/utils";
import { RpcEstimateUserOperationGasReturnType } from "viem/account-abstraction";
import {
    concatRequests,
    isPublicRpcMethod,
    requestPublicEIP1193,
    requestWithMemoizedChainId,
} from "@owlprotocol/backend-public/eip1193";
import { createRequestGetUserOperationByHash } from "./bundler/requestGetUserOperationByHash.js";
import { createRequestGetUserOperationReceipt } from "./bundler/requestGetUserOperationReceipt.js";
import {
    estimateUserOperationGas,
    getSupportedEntryPoints,
    getUserOperationGasPrice,
    sendUserOperation,
} from "../actions/index.js";
import { decodeUserOp } from "../models/UserOperation.js";

export type BundlerRpcMethod = (typeof bundlerRpcMethods)[number];

export const bundlerRpcMethods = [
    "eth_chainId",
    "eth_supportedEntryPoints",
    "eth_getUserOperationByHash",
    "eth_getUserOperationReceipt",
    "eth_sendUserOperation",
    "eth_estimateUserOperationGas",
] as const;

/**
 * Check if RPC method is for bundler.
 * @param method
 * @returns true if bundler rpc method
 */
export function isBundlerRpcMethod(method: string): method is BundlerRpcMethod {
    return bundlerRpcMethods.includes(method as any);
}

//TODO: Fully refactor as request

/**
 * Create bundler EIP1193 function
 * @param client
 * @param requestOverride custom override to bypass viem middleware (for getLogs)
 * @returns request function
 */
export function createBackendBundlerEIP1193(
    client: Client<Transport, Chain | undefined, Account>,
    config?: {
        requestOverride?: EIP1193RequestFn;
        createRequestGetUserOperationByHash?: typeof createRequestGetUserOperationByHash;
        createRequestGetUserOperationReceipt?: typeof createRequestGetUserOperationReceipt;
    },
): EIP1193RequestFn<BundlerRpcSchema> {
    const request = client.request ?? config?.requestOverride;
    const requestMemoizedChainId = requestWithMemoizedChainId(request);

    const requestGetUserOperationByHash = config?.createRequestGetUserOperationByHash
        ? config?.createRequestGetUserOperationByHash(requestMemoizedChainId)
        : createRequestGetUserOperationByHash(requestMemoizedChainId);
    const requestGetUserOperationReceipt = config?.createRequestGetUserOperationReceipt
        ? config.createRequestGetUserOperationReceipt(requestMemoizedChainId)
        : createRequestGetUserOperationReceipt(requestMemoizedChainId);

    // Fallback to Public RPC
    const requestPublic = async function (args: EIP1193Parameters<PublicRpcSchema>) {
        return requestPublicEIP1193(requestMemoizedChainId, args);
    } as EIP1193RequestFn;

    const requestBundler = async function (args: EIP1193Parameters<BundlerRpcSchema>) {
        // TODO: Validate params
        /*
        const bundlerRpcValidator = (await getBundlerOpenRpcSchema()).bundlerRpcValidator;
        const errors = bundlerRpcValidator.validate(args.method, args.params ?? []) as ParameterValidationError[];
        if (errors.length > 0) {
            throw new RpcRequestError({
                body: args,
                url: "",
                error: {
                    code: -32602,
                    message: errors[0].message,
                },
            });
        }
        */

        try {
            if (args.method === "eth_supportedEntryPoints") {
                return getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
            } else if (args.method === "eth_getUserOperationByHash") {
                return requestGetUserOperationByHash(args);
            } else if (args.method === "eth_getUserOperationReceipt") {
                return requestGetUserOperationReceipt(args);
            } else if (args.method === "eth_estimateUserOperationGas") {
                const [userOperationHex, entryPoint] = args.params as [
                    PartialBy<RpcUserOperation, "maxFeePerGas" | "maxPriorityFeePerGas">,
                    Address | undefined,
                ];
                const supportedEntryPoints = await getAction(
                    client,
                    getSupportedEntryPoints,
                    "getSupportedEntryPoints",
                )({});
                if (entryPoint && !supportedEntryPoints.includes(entryPoint)) {
                    //TODO: Viem error for this?
                    throw new Error(`Unsupported entrypoint ${entryPoint}, expected one of ${supportedEntryPoints}`);
                }

                let maxFeePerGas: Hex;
                let maxPriorityFeePerGas: Hex;
                if (userOperationHex.maxFeePerGas) {
                    maxFeePerGas = userOperationHex.maxFeePerGas;
                    // EntryPoint payment = min(maxFeePerGas, baseFee + maxPriorityFeePerGas)
                    // Default maxPriorityFeePerGas to maxFeePerGas
                    maxPriorityFeePerGas = userOperationHex.maxPriorityFeePerGas ?? userOperationHex.maxFeePerGas;
                } else {
                    const gasPrice = await getAction(client, getUserOperationGasPrice, "getUserOperationGasPrice")({});
                    maxFeePerGas = numberToHex(gasPrice.standard.maxFeePerGas);
                    maxPriorityFeePerGas = numberToHex(gasPrice.standard.maxPriorityFeePerGas);
                }

                const userOperation = decodeUserOp({ ...userOperationHex, maxFeePerGas, maxPriorityFeePerGas });
                const {
                    preVerificationGas,
                    verificationGasLimit,
                    callGasLimit,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                } = await getAction(client, estimateUserOperationGas, "estimateUserOperationGas")(userOperation);
                const result: RpcEstimateUserOperationGasReturnType = {
                    preVerificationGas: numberToHex(preVerificationGas),
                    verificationGasLimit: numberToHex(verificationGasLimit),
                    callGasLimit: numberToHex(callGasLimit),
                };
                if (paymasterVerificationGasLimit != undefined) {
                    result.paymasterVerificationGasLimit = numberToHex(paymasterVerificationGasLimit);
                }
                if (paymasterPostOpGasLimit != undefined) {
                    result.paymasterPostOpGasLimit = numberToHex(paymasterPostOpGasLimit);
                }
                return result;
            } else if (args.method === "eth_sendUserOperation") {
                const [userOperationHex, entryPoint] = args.params as [RpcUserOperation, Address | undefined];
                const supportedEntryPoints = await getAction(
                    client,
                    getSupportedEntryPoints,
                    "getSupportedEntryPoints",
                )({});
                if (entryPoint && !supportedEntryPoints.includes(entryPoint)) {
                    //TODO: Viem error for this?
                    throw new Error(`Unsupported entrypoint ${entryPoint}, expected one of ${supportedEntryPoints}`);
                }

                const userOperation = decodeUserOp(userOperationHex);
                const userOperationHash = await getAction(
                    client,
                    sendUserOperation,
                    "sendUserOperation",
                )(userOperation);
                console.debug({ userOperationHash });

                return userOperationHash;
            } else {
                throw new RpcRequestError({
                    body: args,
                    url: "",
                    error: {
                        code: -32601,
                        message: "Method not found",
                    },
                });
            }
        } catch (error) {
            if (error instanceof RpcRequestError) {
                throw error;
            }

            // Unhandled error
            console.error(error);
            return null;
        }
    } as any;

    return concatRequests([
        { request: requestBundler, isRpcMethod: isBundlerRpcMethod },
        {
            request: requestPublic,
            isRpcMethod: isPublicRpcMethod,
        },
    ]) as EIP1193RequestFn<BundlerRpcSchema>;
}
