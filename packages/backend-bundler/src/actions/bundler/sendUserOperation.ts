import { Client, Transport, Chain, Account } from "viem";
import { SendUserOperationReturnType, UserOperation } from "viem/account-abstraction";
import { sendUserOperation } from "@owlprotocol/contracts-account-abstraction/actions";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";
import { getChainId } from "viem/actions";

export async function sendUserOperationWithFirebase(
    client: Client<Transport, Chain | undefined, Account>,
    parameters: UserOperation<"0.7">,
): Promise<SendUserOperationReturnType> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const userOpHash = await sendUserOperation(client, parameters);

    ethUserOpResource.upsert({
        chainId,
        userOpHash,
        ...parameters,
    });

    return userOpHash;
}
