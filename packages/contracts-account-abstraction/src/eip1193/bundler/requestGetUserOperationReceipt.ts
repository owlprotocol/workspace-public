import {
    BundlerRpcSchema,
    decodeEventLog,
    EIP1193Parameters,
    EIP1193RequestFn,
    encodeEventTopics,
    Hex,
    numberToHex,
    Prettify,
    PublicRpcSchema,
    RpcTransactionReceipt,
} from "viem";
import { entryPoint07Address, UserOperationReceipt } from "viem/account-abstraction";

import { UserOperationEvent } from "../../artifacts/IEntryPoint.js";

export type RpcGetUserOperationReceiptReturnType07 = Prettify<
    UserOperationReceipt<"0.7", Hex, Hex, "0x0" | "0x1">
> | null;

export function createRequestGetUserOperationReceipt(request: EIP1193RequestFn<PublicRpcSchema>) {
    return async function (
        args: EIP1193Parameters<BundlerRpcSchema> & { method: "eth_getUserOperationReceipt" },
    ): Promise<RpcGetUserOperationReceiptReturnType07> {
        const [hash] = args.params;

        const filterResult = await request({
            method: "eth_getLogs",
            params: [
                {
                    address: entryPoint07Address,
                    topics: encodeEventTopics({
                        abi: [UserOperationEvent],
                        eventName: "UserOperationEvent",
                        args: {
                            userOpHash: hash,
                        },
                    }),
                    fromBlock: "0x0",
                    toBlock: "latest",
                },
            ],
        });

        if (filterResult.length === 0) {
            return null;
        }

        const userOperationLog = filterResult[0];
        const userOperationEvent = decodeEventLog({
            abi: [UserOperationEvent],
            eventName: "UserOperationEvent",
            data: userOperationLog.data,
            topics: userOperationLog.topics,
            strict: true,
        });

        const transactionHash = userOperationLog.transactionHash;
        if (transactionHash === null) {
            return null;
        }

        const receipt = (await request({
            method: "eth_getTransactionReceipt",
            params: [transactionHash],
        })) as RpcTransactionReceipt | null;
        if (!receipt) {
            return null;
        }

        //We will filter the receipt logs
        const logs = receipt.logs;
        //This logic filters logs emitted for this UserOp
        let startIndex = -1;
        let endIndex = -1;
        logs.forEach((log, index) => {
            if (log?.topics[0] === userOperationLog.topics[0]) {
                // process UserOperationEvent
                if (log.topics[1] === userOperationLog.topics[1]) {
                    // it's our userOpHash. save as end of logs array
                    endIndex = index;
                } else if (endIndex === -1) {
                    // it's a different hash. remember it as beginning index, but only if we didn't find our end index yet.
                    startIndex = index;
                }
            }
        });
        if (endIndex === -1) {
            // Should not happen
            throw new Error("fatal: no UserOperationEvent in logs");
        }

        const filteredLogs = logs.slice(startIndex + 1, endIndex);

        return {
            entryPoint: entryPoint07Address,
            userOpHash: hash,
            sender: userOperationEvent.args.sender,
            nonce: numberToHex(userOperationEvent.args.nonce),
            actualGasUsed: numberToHex(userOperationEvent.args.actualGasUsed),
            actualGasCost: numberToHex(userOperationEvent.args.actualGasCost),
            success: userOperationEvent.args.success,
            receipt,
            logs: filteredLogs,
        };
    };
}
