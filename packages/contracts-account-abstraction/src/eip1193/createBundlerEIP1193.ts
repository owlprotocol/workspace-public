import {
    Account,
    BundlerRpcSchema,
    Chain,
    Client,
    EIP1193Parameters,
    EIP1193RequestFn,
    numberToHex,
    Transport,
} from "viem";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";
import { transactionReceiptEncodeZod, logEncodeZod } from "@owlprotocol/zod-sol";
import { RpcEstimateUserOperationGasReturnType } from "viem/account-abstraction";
import {
    estimateUserOperationGas,
    getSupportedEntryPoints,
    getUserOperation,
    getUserOperationReceipt,
    sendUserOperation,
} from "../actions/index.js";
import { decodeUserOp, encodeUserOp } from "../models/UserOperation.js";

export function createBackendBundlerEIP1193(
    client: Client<Transport, Chain | undefined, Account>,
): EIP1193RequestFn<BundlerRpcSchema> {
    return async function (args: EIP1193Parameters<BundlerRpcSchema>) {
        try {
            if (args.method === "eth_chainId") {
                const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
                return numberToHex(chainId);
            } else if (args.method === "eth_supportedEntryPoints") {
                return await getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
            } else if (args.method === "eth_getUserOperationByHash") {
                const [hash] = args.params;
                const { blockHash, blockNumber, entryPoint, transactionHash, userOperation } = await getAction(
                    client,
                    getUserOperation,
                    "getUserOperation",
                )({ hash });

                return {
                    blockHash,
                    blockNumber: numberToHex(blockNumber),
                    entryPoint,
                    transactionHash,
                    userOperation: encodeUserOp(userOperation),
                };
            } else if (args.method === "eth_getUserOperationReceipt") {
                const [hash] = args.params;
                const { entryPoint, userOpHash, sender, nonce, actualGasUsed, actualGasCost, success, receipt, logs } =
                    await getAction(client, getUserOperationReceipt, "getUserOperationReceipt")({ hash });

                return {
                    entryPoint,
                    userOpHash,
                    sender,
                    nonce: numberToHex(nonce),
                    actualGasUsed: numberToHex(actualGasUsed),
                    actualGasCost: numberToHex(actualGasCost),
                    success,
                    receipt: transactionReceiptEncodeZod.parse(receipt),
                    logs: logs.map((l) => logEncodeZod.parse(l)),
                };
            } else if (args.method === "eth_estimateUserOperationGas") {
                console.debug(args);
                const [userOperationHex, entryPoint] = args.params;
                const supportedEntryPoints = await getAction(
                    client,
                    getSupportedEntryPoints,
                    "getSupportedEntryPoints",
                )({});
                if (!supportedEntryPoints.includes(entryPoint)) {
                    //TODO: Viem error for this?
                    throw new Error(`Unsupported entrypoint ${entryPoint}, expected one of ${supportedEntryPoints}`);
                }

                const userOperation = decodeUserOp(userOperationHex);
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
                console.debug(result);
                return result;
            } else if (args.method === "eth_sendUserOperation") {
                const [userOperationHex, entryPoint] = args.params;
                const supportedEntryPoints = await getAction(
                    client,
                    getSupportedEntryPoints,
                    "getSupportedEntryPoints",
                )({});
                if (!supportedEntryPoints.includes(entryPoint)) {
                    //TODO: Viem error for this?
                    throw new Error(`Unsupported entrypoint ${entryPoint}, expected one of ${supportedEntryPoints}`);
                }

                const userOperation = decodeUserOp(userOperationHex);
                const userOperationHash = await getAction(
                    client,
                    sendUserOperation,
                    "sendUserOperation",
                )(userOperation);

                return userOperationHash;
            }
        } catch (error) {
            return null;
        }
    } as any;
}
