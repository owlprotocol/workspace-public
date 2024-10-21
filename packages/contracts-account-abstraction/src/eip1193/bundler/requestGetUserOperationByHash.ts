import {
    Address,
    BundlerRpcSchema,
    decodeEventLog,
    EIP1193Parameters,
    EIP1193RequestFn,
    encodeEventTopics,
    Hash,
    Hex,
    hexToNumber,
    numberToHex,
    Prettify,
    PublicRpcSchema,
    RpcTransaction,
} from "viem";
import { entryPoint07Address, UserOperation } from "viem/account-abstraction";
import { decodeFunctionData } from "viem/utils";

import { UserOperationEvent, handleOps } from "../../artifacts/IEntryPoint.js";
import { PackedUserOperation, toUserOperationEncoded } from "../../models/PackedUserOperation.js";

export type RpcGetUserOperationReturnType07 = Prettify<{
    /** The block hash the User Operation was included on. */
    blockHash: Hash;
    /** The block number the User Operation was included on. */
    blockNumber: Hex;
    /** The EntryPoint which handled the User Operation. */
    entryPoint: Address;
    /** The hash of the transaction which included the User Operation. */
    transactionHash: Hash;
    /* The transaction (optional to align with official interface) */
    transaction?: RpcTransaction;
    /** The User Operation. */
    userOperation: UserOperation<"0.7", Hex>;
}> | null;

export function createRequestGetUserOperationByHash(request: EIP1193RequestFn<PublicRpcSchema>) {
    return async function (
        args: EIP1193Parameters<BundlerRpcSchema> & { method: "eth_getUserOperationByHash" },
    ): Promise<RpcGetUserOperationReturnType07> {
        const [hash] = args.params;

        const blockNumberHex = await request({
            method: "eth_blockNumber",
        });
        //TODO: Parametrize rpc max range
        // Certain RPCs enforce a max block range
        const rpcMaxRange = 90_000;
        const blockNumber = hexToNumber(blockNumberHex);
        const fromBlock = Math.max(blockNumber - rpcMaxRange, 0);

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
                    fromBlock: numberToHex(fromBlock),
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

        const transaction = (await request({
            method: "eth_getTransactionByHash",
            params: [transactionHash],
        })) as RpcTransaction<false> | null;
        if (!transaction) {
            return null;
        }

        let op: PackedUserOperation | undefined = undefined;
        try {
            const decoded = decodeFunctionData({
                abi: [handleOps],
                data: transaction.input,
            });

            const ops = decoded.args[0];
            op = ops.find(
                (op: PackedUserOperation) =>
                    op.sender === userOperationEvent.args.sender && op.nonce === userOperationEvent.args.nonce,
            );
        } catch {
            return null;
        }

        if (op === undefined) {
            return null;
        }

        const userOperation = toUserOperationEncoded(op);

        return {
            blockHash: transaction.blockHash,
            blockNumber: transaction.blockNumber,
            entryPoint: entryPoint07Address,
            transactionHash,
            transaction,
            userOperation,
        };
    };
}
