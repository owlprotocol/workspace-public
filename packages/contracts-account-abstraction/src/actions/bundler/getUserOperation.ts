import { Client, decodeFunctionData, Transport } from "viem";
import {
    GetUserOperationParameters,
    GetUserOperationReturnType,
    UserOperationNotFoundError,
    entryPoint07Address,
    formatUserOperation,
} from "viem/account-abstraction";
import { getLogs, getTransaction } from "viem/actions";
import { getAction } from "viem/utils";
import { UserOperationEvent } from "../../artifacts/IEntryPointSimulations.js";
import { PackedUserOperation, toUserOperationEncoded } from "../../models/PackedUserOperation.js";
import { handleOps } from "../../artifacts/IEntryPoint.js";

export async function getUserOperation(
    client: Client<Transport>,
    { hash }: GetUserOperationParameters,
): Promise<GetUserOperationReturnType> {
    // Get UserOp log
    const filterResult = await getAction(
        client,
        getLogs,
        "getLogs",
    )({
        address: entryPoint07Address,
        event: UserOperationEvent,
        args: {
            userOpHash: hash,
        },
        strict: true,
    });

    const userOperationEvent = filterResult[0];
    if (!userOperationEvent) throw new UserOperationNotFoundError({ hash });

    // Get UserOp transaction
    const transactionHash = userOperationEvent.transactionHash;
    const transaction = await getAction(client, getTransaction, "getTransaction")({ hash: transactionHash });

    // Decode UserOp from call data
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
        throw new UserOperationNotFoundError({ hash });
    }

    if (op === undefined) {
        throw new UserOperationNotFoundError({ hash });
    }

    const userOperation = toUserOperationEncoded(op);

    return {
        blockHash: transaction.blockHash,
        blockNumber: transaction.blockNumber,
        entryPoint: entryPoint07Address,
        transactionHash,
        userOperation: formatUserOperation(userOperation),
    };
}
