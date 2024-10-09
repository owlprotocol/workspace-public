import { Client, numberToHex, Transport } from "viem";
import { GetUserOperationParameters } from "viem/account-abstraction";

import { GetUserOperationReturnType07, getUserOperation } from "@owlprotocol/contracts-account-abstraction/actions";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";

export async function getUserOperationWithFirebase(
    client: Client<Transport>,
    { hash }: GetUserOperationParameters,
): Promise<GetUserOperationReturnType07> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const result = await getUserOperation(client, { hash });
    const { transactionHash, transaction, userOperation } = result;

    ethUserOpResource.upsert({
        chainId,
        userOpHash: hash,
        transactionHash,
        blockHash: transaction?.blockHash ?? "0x",
        blockNumber: transaction ? numberToHex(transaction.blockNumber) : 0n,
        ...userOperation,
    });

    return result;
}
