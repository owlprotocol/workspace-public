import { Client, Transport, Hash } from "viem";
import {
    entryPoint07Address,
    GetUserOperationReceiptReturnType,
    UserOperationReceiptNotFoundError,
} from "viem/account-abstraction";
import { getBlockNumber, getLogs, getTransactionReceipt } from "viem/actions";
import { getAction } from "viem/utils";
import { evmos } from "viem/chains";
import { UserOperationEvent } from "../../artifacts/EntryPoint.js";

export async function getUserOperationReceipt(
    client: Client<Transport>,
    parameters: { hash: Hash },
): Promise<GetUserOperationReceiptReturnType> {
    const { hash } = parameters;

    const blockNumber = await getBlockNumber(client);
    //TODO: Parametrize rpc max range
    // Certain RPCs enforce a max block range
    let rpcMaxRange = 90_000n;
    if (client.chain?.id === evmos.id) rpcMaxRange = 2_000n;

    // If rpcMaxRange is less blockNumber, set fromBlock to rpcMaxRange away from blockNumber
    const fromBlock = rpcMaxRange < blockNumber ? blockNumber - rpcMaxRange : 0n;
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
        fromBlock,
        toBlock: "latest",
        strict: true,
    });

    const userOperationEvent = filterResult[0];
    if (!userOperationEvent) throw new UserOperationReceiptNotFoundError({ hash });

    // Get UserOp transaction receipt
    const transactionHash = userOperationEvent.transactionHash;
    const receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: transactionHash });

    // Filter receipt logs
    const logs = receipt.logs;
    // Filters logs emitted for this UserOp
    let startIndex = -1;
    let endIndex = -1;
    logs.forEach((log, index) => {
        if (log.topics[0] === userOperationEvent.topics[0]) {
            // Process UserOperationEvent
            if (log.topics[1] === userOperationEvent.topics[1]) {
                // It's our userOpHash. save as end of logs array
                endIndex = index;
            } else if (endIndex === -1) {
                // Different hash. remember it as beginning index, but only if we didn't find our end index yet.
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
        nonce: userOperationEvent.args.nonce,
        actualGasUsed: userOperationEvent.args.actualGasUsed,
        actualGasCost: userOperationEvent.args.actualGasCost,
        success: userOperationEvent.args.success,
        receipt,
        logs: filteredLogs,
    };
}
