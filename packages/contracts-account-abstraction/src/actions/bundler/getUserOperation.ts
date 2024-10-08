import { Client, GetLogsReturnType, GetTransactionReturnType, Transport } from "viem";
import { GetUserOperationParameters, UserOperationNotFoundError } from "viem/account-abstraction";
import { getAction, decodeFunctionData } from "viem/utils";
import { getLogs, getTransaction } from "viem/actions";

import { getSupportedEntryPoints } from "./getSupportedEntryPoints.js";
import { UserOperationEvent, handleOps } from "../../artifacts/IEntryPoint.js";
import { PackedUserOperation, toUserOperationEncoded } from "../../models/PackedUserOperation.js";
import { decodeUserOp } from "../../models/UserOperation.js";

/**
 * Retrieves information about a User Operation given a hash.
 *
 * - Docs: https://viem.sh/docs/actions/bundler/getUserOperation
 *
 * @param client - Client to use
 * @param parameters - {@link GetUserOperationParameters}
 * @returns The receipt. {@link GetUserOperationReturnType}
 *
 * @example
 * import { createBundlerClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getUserOperation } from 'viem/actions
 *
 * const client = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getUserOperation(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getUserOperation(client: Client<Transport>, { hash }: GetUserOperationParameters) {
    // Default entryPoint
    const supportedEntryPoints = await getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
    const entryPointAddress = supportedEntryPoints[0];

    const filterResult = (await getAction(
        //TODO: Why type mismatch
        client,
        getLogs,
        "getLogs",
    )({
        address: entryPointAddress,
        event: UserOperationEvent,
        //TODO: Filter smaller?
        fromBlock: 0n,
        toBlock: "latest",
        args: {
            userOpHash: hash,
        },
        strict: true,
    })) as GetLogsReturnType<typeof UserOperationEvent>;

    if (filterResult.length === 0) {
        throw new UserOperationNotFoundError({ hash });
    }

    const userOperationEvent = filterResult[0];
    const transactionHash = userOperationEvent.transactionHash;
    if (transactionHash === null) {
        // transaction pending
        throw new UserOperationNotFoundError({ hash });
    }

    let transaction: GetTransactionReturnType;
    try {
        transaction = (await getAction(client, getTransaction, "getTransaction")({ hash: transactionHash })) as any;
    } catch {
        throw new UserOperationNotFoundError({ hash });
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
        throw new UserOperationNotFoundError({ hash });
    }

    if (op === undefined) {
        throw new UserOperationNotFoundError({ hash });
    }

    const userOpEncoded = toUserOperationEncoded(op);
    const userOperation = decodeUserOp(userOpEncoded);

    return {
        blockHash: transaction.blockHash,
        blockNumber: transaction.blockNumber,
        entryPoint: entryPointAddress,
        transactionHash,
        userOperation,
    };
}
