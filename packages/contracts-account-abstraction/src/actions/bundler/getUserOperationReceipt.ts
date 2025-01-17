import {
    Address,
    Chain,
    Client,
    Transport,
    Hash,
    decodeEventLog,
    numberToHex,
    RpcTransactionReceipt,
    getAbiItem,
} from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { getBlockNumber, getLogs } from "viem/actions";
import { getAction } from "viem/utils";
import { UserOperationEvent } from "../../artifacts/EntryPoint.js";
import { RpcGetUserOperationReceiptReturnType07 } from "../../eip1193/bundler/requestGetUserOperationReceipt.js";

export async function getUserOperationReceipt(
    client: Client<Transport, Chain | undefined> & {
        entryPointSimulationsAddress: Address;
    },
    parameters: { hash: Hash },
): Promise<RpcGetUserOperationReceiptReturnType07 | null> {
    const { hash } = parameters;

    const blockNumber = await getBlockNumber(client);
    //TODO: Parametrize rpc max range
    // Certain RPCs enforce a max block range
    const rpcMaxRange = 90_000n;

    // If rpcMaxRange is less blockNumber, set fromBlock to rpcMaxRange away from blockNumber
    const fromBlock = rpcMaxRange < blockNumber ? blockNumber - rpcMaxRange : 0n;

    const filterResult = await getAction(
        client,
        getLogs,
        "getLogs",
    )({
        address: entryPoint07Address,
        event: getAbiItem({
            abi: [UserOperationEvent],
            name: "UserOperationEvent",
        }),
        args: { userOpHash: hash },
        fromBlock,
        toBlock: "latest",
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

    const receipt = (await client.request({
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
}
