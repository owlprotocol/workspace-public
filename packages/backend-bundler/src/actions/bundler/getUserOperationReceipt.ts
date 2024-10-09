import { Client, Transport } from "viem";

import { GetUserOperationReceiptParameters, GetUserOperationReceiptReturnType } from "viem/account-abstraction";
import { getUserOperationReceipt } from "@owlprotocol/contracts-account-abstraction/actions";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";

export async function getUserOperationReceiptWithFirebase(
    client: Client<Transport>,
    { hash }: GetUserOperationReceiptParameters,
): Promise<GetUserOperationReceiptReturnType> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const result = await getUserOperationReceipt(client, { hash });
    const { receipt, actualGasUsed, actualGasCost, success, logs } = result;

    ethUserOpResource.set(
        {
            chainId,
            userOpHash: hash,
            transactionHash: receipt.transactionHash,
            actualGasUsed,
            actualGasCost,
            success,
            logIds: logs.map((l) => {
                return { blockHash: l.blockHash, logIndex: l.logIndex };
            }),
        },
        { merge: true },
    );

    return result;
}
