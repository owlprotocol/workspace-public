import { Chain, Client, decodeFunctionData, Transport } from "viem";
import {
    GetUserOperationParameters,
    GetUserOperationReturnType,
    UserOperationNotFoundError,
    entryPoint07Address,
    formatUserOperation,
} from "viem/account-abstraction";
import { getBlockNumber, getLogs, getTransaction } from "viem/actions";
import { getAction } from "viem/utils";
import { evmos, evmosTestnet, sei, seiDevnet, seiTestnet } from "viem/chains";
import { UserOperationEvent } from "../../artifacts/IEntryPointSimulations.js";
import { PackedUserOperation, toUserOperationEncoded } from "../../models/PackedUserOperation.js";
import { handleOps } from "../../artifacts/IEntryPoint.js";

export async function getUserOperation(
    client: Client<Transport, Chain>,
    { hash }: GetUserOperationParameters,
): Promise<GetUserOperationReturnType> {
    const chainIdNumber = client.chain.id;

    //TODO: Parametrize rpc max range
    // Certain RPCs enforce a max block range
    let rpcMaxRange = 90_000n;
    if (
        chainIdNumber === sei.id ||
        chainIdNumber === seiDevnet.id ||
        chainIdNumber === seiTestnet.id ||
        chainIdNumber === evmos.id ||
        chainIdNumber === evmosTestnet.id
    ) {
        rpcMaxRange = 2_000n;
    }

    const blockNumber = await getBlockNumber(client);

    // If rpcMaxRange is less blockNumber, set fromBlock to rpcMaxRange away from blockNumber
    const fromBlock = rpcMaxRange < blockNumber ? blockNumber - rpcMaxRange : 0n;

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
        fromBlock,
        toBlock: "latest",

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
