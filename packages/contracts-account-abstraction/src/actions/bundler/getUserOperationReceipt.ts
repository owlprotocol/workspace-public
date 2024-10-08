import { Address, Client, GetLogsReturnType, GetTransactionReceiptReturnType, Transport } from "viem";

import {
    UserOperationReceiptNotFoundError,
    GetUserOperationReceiptParameters,
} from "viem/account-abstraction";
import { getAction } from "viem/utils";
import { getLogs, getTransactionReceipt } from "viem/actions";

import { UserOperationEvent } from "../../artifacts/IEntryPoint.js";

/**
 * Returns the User Operation Receipt given a User Operation hash.
 *
 * - Docs: https://viem.sh/docs/actions/bundler/getUserOperationReceipt
 *
 * @param client - Client to use
 * @param parameters - {@link GetUserOperationReceiptParameters}
 * @returns The receipt. {@link GetUserOperationReceiptReturnType}
 *
 * @example
 * import { createBundlerClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getUserOperationReceipt } from 'viem/actions
 *
 * const client = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getUserOperationReceipt(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getUserOperationReceipt(client: Client<Transport> & { entryPointAddress: Address }, { hash }: GetUserOperationReceiptParameters) {
    const filterResult = (await getAction(
        client,
        getLogs,
        "getLogs",
    )({
        address: client.entryPointAddress,
        event: UserOperationEvent,
        //TODO: Filter smaller?
        fromBlock: 0n,
        toBlock: "latest",
        args: {
            userOpHash: hash,
        },
        strict: true,
    })) as GetLogsReturnType<typeof UserOperationEvent, [typeof UserOperationEvent], true>;

    if (filterResult.length === 0) {
        throw new UserOperationReceiptNotFoundError({ hash });
    }

    const userOperationEvent = filterResult[0];
    const transactionHash = userOperationEvent.transactionHash;
    if (transactionHash === null) {
        // transaction pending
        throw new UserOperationReceiptNotFoundError({ hash });
    }

    let receipt: GetTransactionReceiptReturnType;

    try {
        receipt = (await getAction(
            client,
            getTransactionReceipt,
            "getTransactionReceipt",
        )({ hash: transactionHash })) as any;
    } catch {
        throw new UserOperationReceiptNotFoundError({ hash });
    }

    //We will filter the receipt logs
    const logs = receipt.logs;
    //This logic filters logs emitted for this UserOp
    let startIndex = -1;
    let endIndex = -1;
    logs.forEach((log, index) => {
        if (log?.topics[0] === userOperationEvent.topics[0]) {
            // process UserOperationEvent
            if (log.topics[1] === userOperationEvent.topics[1]) {
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
        userOpHash: hash,
        sender: userOperationEvent.args.sender,
        nonce: userOperationEvent.args.nonce,
        actualGasUsed: userOperationEvent.args.actualGasUsed,
        actualGasCost: userOperationEvent.args.actualGasCost,
        success: userOperationEvent.args.success,
        receipt,
        logs: filteredLogs,
    };
}
